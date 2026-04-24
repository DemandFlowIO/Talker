/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { InteractionMode, SemanticState, Meaning } from '../types';
import { MEANINGS, MODE_CONFIGS, SUBTREES } from '../constants';
import { smoothPhrase } from '../utils';

export function useCommunication(initialMode: InteractionMode = 'guided') {
  const [state, setState] = useState<SemanticState>({
    currentPhrase: [],
    mode: initialMode,
    currentNodeId: 'root',
    history: ['root'],
  });

  const setMode = useCallback((mode: InteractionMode) => {
    setState(prev => ({
      ...prev,
      mode,
      currentPhrase: [],
      currentNodeId: 'root',
      history: ['root'],
    }));
  }, []);

  const selectMeaning = useCallback((meaningId: string) => {
    const meaning = MEANINGS[meaningId];
    if (!meaning) return;

    setState(prev => {
      // In essential mode, we reset phrase on every tap to ensure it's a one-tap direct output
      const nextPhrase = prev.mode === 'essential' ? [meaning] : [...prev.currentPhrase, meaning];
      
      // Check if this meaning opens a subtree
      // Essential mode should NOT branch; it should treat everything as direct output
      const hasSubtree = !!SUBTREES[meaningId] && prev.mode !== 'essential';
      
      if (hasSubtree) {
        return {
          ...prev,
          currentPhrase: nextPhrase,
          currentNodeId: meaningId,
          history: [...prev.history, meaningId]
        };
      } else {
        // It's a leaf node or we are in Essential mode
        return {
          ...prev,
          currentPhrase: nextPhrase,
        };
      }
    });
  }, []);

  const navigateBack = useCallback(() => {
    setState(prev => {
      if (prev.history.length <= 1) return prev;
      
      const newHistory = prev.history.slice(0, -1);
      const prevNodeId = newHistory[newHistory.length - 1];
      
      // Also potentially pop from phrase if the node we moved away from was a scaffold
      const newPhrase = prev.currentPhrase.slice(0, -1);

      return {
        ...prev,
        history: newHistory,
        currentNodeId: prevNodeId,
        currentPhrase: newPhrase
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPhrase: [],
      currentNodeId: 'root',
      history: ['root']
    }));
  }, []);

  const clearPhrase = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPhrase: []
    }));
  }, []);

  const getCurrentMeanings = useCallback(() => {
    if (state.currentNodeId === 'root') {
      return MODE_CONFIGS[state.mode];
    }
    return SUBTREES[state.currentNodeId] || [];
  }, [state.mode, state.currentNodeId]);

  const speak = useCallback((text?: string) => {
    const toSpeak = text || smoothPhrase(state.currentPhrase);
    if (!toSpeak) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(toSpeak);
      window.speechSynthesis.speak(utterance);
    }
    
    // Clear phrase after speaking if it was a manual speak action (optional, depends on UX)
    // For now, let's keep it so user can see what they said.
  }, [state.currentPhrase]);

  return {
    state,
    selectMeaning,
    navigateBack,
    reset,
    clearPhrase,
    setMode,
    currentMeanings: getCurrentMeanings(),
    speak,
    smoothedText: smoothPhrase(state.currentPhrase)
  };
}
