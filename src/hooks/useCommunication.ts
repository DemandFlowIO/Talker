/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { InteractionMode, SemanticState, Meaning, AccessibilitySettings } from '../types';
import { MEANINGS, MODE_CONFIGS, SUBTREES } from '../constants';
import { smoothPhrase } from '../utils';

export function useCommunication(initialMode: InteractionMode = 'guided') {
  const [state, setState] = useState<SemanticState>(() => {
    const saved = localStorage.getItem('lumina_settings');
    const savedUsage = localStorage.getItem('lumina_usage');
    const savedTransitions = localStorage.getItem('lumina_transitions');
    const savedMacros = localStorage.getItem('lumina_macros');
    const savedHistory = localStorage.getItem('lumina_phrase_history');
    const savedAbbr = localStorage.getItem('lumina_abbreviations');
    const defaultSettings: AccessibilitySettings = {
      hapticsEnabled: true,
      holdToActivateDelay: 0,
      highContrast: false,
      stealthMode: false,
      voicePitch: 1.0,
      voiceRate: 1.0,
      voiceURI: '',
      gridDensity: 'standard',
      learningMode: true,
      isLocked: false,
      dwellTime: 0,
      accentColor: '#f97316', // Default orange
      whisperMode: false,
      showPanicButton: true
    };

    return {
      currentPhrase: [],
      mode: initialMode,
      currentNodeId: 'root',
      history: ['root'],
      currentTone: 'polite',
      isNegated: false,
      isQuestion: false,
      tense: 'present',
      settings: saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings,
      usageStats: savedUsage ? JSON.parse(savedUsage) : {},
      transitionStats: savedTransitions ? JSON.parse(savedTransitions) : {},
      macros: savedMacros ? JSON.parse(savedMacros) : [],
      phraseHistory: savedHistory ? JSON.parse(savedHistory) : [],
      abbreviations: savedAbbr ? JSON.parse(savedAbbr) : [
        { id: 'abbr_1', short: 'HNP', meaningIds: ['help', 'now', 'place'] },
        { id: 'abbr_2', short: 'WFN', meaningIds: ['water', 'feel', 'now'] }
      ]
    };
  });

  // Persist settings when they change (Point 53)
  useEffect(() => {
    localStorage.setItem('lumina_settings', JSON.stringify(state.settings));
  }, [state.settings]);

  useEffect(() => {
    localStorage.setItem('lumina_usage', JSON.stringify(state.usageStats));
  }, [state.usageStats]);

  useEffect(() => {
    localStorage.setItem('lumina_transitions', JSON.stringify(state.transitionStats));
  }, [state.transitionStats]);

  useEffect(() => {
    localStorage.setItem('lumina_macros', JSON.stringify(state.macros));
  }, [state.macros]);

  useEffect(() => {
    localStorage.setItem('lumina_phrase_history', JSON.stringify(state.phraseHistory));
  }, [state.phraseHistory]);

  useEffect(() => {
    localStorage.setItem('lumina_abbreviations', JSON.stringify(state.abbreviations));
  }, [state.abbreviations]);

  const vibrate = useCallback((pattern: number | number[] = 10) => {
    if (state.settings.hapticsEnabled && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, [state.settings.hapticsEnabled]);

  const setMode = useCallback((mode: InteractionMode) => {
    setState(prev => ({
      ...prev,
      mode,
      currentPhrase: [],
      currentNodeId: 'root',
      history: ['root'],
      currentTone: 'polite',
      isNegated: false,
      isQuestion: false,
      tense: 'present'
    }));
  }, []);

  const speakInternal = useCallback((text: string, tone: string = 'polite') => {
    let toSpeak = text;
    if (!toSpeak) return;

    // Apply tone modifiers to text
    if (tone === 'urgent') {
      toSpeak = "Urgent: " + toSpeak;
    } else if (tone === 'angry') {
      toSpeak = "Listen carefully: " + toSpeak;
    } else if (tone === 'polite') {
      if (!toSpeak.toLowerCase().includes('please')) {
        toSpeak = toSpeak + " please.";
      }
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(toSpeak);
      
      utterance.pitch = state.settings.voicePitch;
      utterance.rate = state.settings.voiceRate;
      utterance.volume = state.settings.whisperMode ? 0.3 : 1.0;

      if (state.settings.whisperMode) {
        utterance.pitch *= 0.8;
        utterance.rate *= 0.6;
      }

      if (state.settings.voiceURI) {
        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(v => v.voiceURI === state.settings.voiceURI);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }

      if (tone === 'urgent') {
        utterance.rate *= 1.3;
        utterance.pitch *= 1.2;
      } else if (tone === 'angry') {
        utterance.rate *= 0.8;
        utterance.pitch *= 0.7;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  }, [state.settings.voicePitch, state.settings.voiceRate, state.settings.voiceURI]);

  const selectMeaning = useCallback((meaningId: string) => {
    const meaning = MEANINGS[meaningId];
    if (!meaning) return;

    vibrate(15);

    // Track usage and transitions (Point 40, 64)
    setState(prev => {
      const lastMeaningIdInState = prev.currentPhrase.length > 0 ? prev.currentPhrase[prev.currentPhrase.length - 1].id : 'START';
      const transitionKey = `${lastMeaningIdInState}->${meaningId}`;
      
      return {
        ...prev,
        usageStats: {
          ...prev.usageStats,
          [meaningId]: (prev.usageStats[meaningId] || 0) + 1
        },
        transitionStats: {
          ...prev.transitionStats,
          [transitionKey]: (prev.transitionStats[transitionKey] || 0) + 1
        }
      };
    });

    // Sentiment Analysis (Point 19) - Repeated selection escalates to urgent
    const lastMeaningId = state.currentPhrase.length > 0 ? state.currentPhrase[state.currentPhrase.length - 1].id : null;
    const isRepeat = lastMeaningId === meaningId;

    // Handle Tone Modifiers (Point 76)
    if (meaningId.startsWith('t_')) {
      const tone = meaningId.split('_')[1] as any;
      setState(prev => ({ ...prev, currentTone: tone }));
      return;
    }

    // Handle Negation Modifier (Point 28)
    if (meaningId === 'm_not') {
      setState(prev => ({ ...prev, isNegated: !prev.isNegated }));
      return;
    }

    // Handle Tense Modifiers (Point 17)
    if (meaningId === 'm_past') {
      setState(prev => ({ ...prev, tense: prev.tense === 'past' ? 'present' : 'past' }));
      return;
    }
    if (meaningId === 'm_present') {
      setState(prev => ({ ...prev, tense: 'present' }));
      return;
    }
    if (meaningId === 'm_future') {
      setState(prev => ({ ...prev, tense: prev.tense === 'future' ? 'present' : 'future' }));
      return;
    }

    // Handle Question Modifier (Point 29)
    if (meaningId === 'm_question') {
      setState(prev => ({ ...prev, isQuestion: !prev.isQuestion }));
      return;
    }

    // Handle Non-Verbal Sounds (Point 78) - Immediate Trigger
    if (meaningId.startsWith('fx_')) {
      speakInternal(meaning.output, 'polite');
      return;
    }

    setState(prev => {
      let finalMeaning = meaning;
      
      // If negated, wrap the meaning (simplified version)
      if (prev.isNegated) {
        finalMeaning = {
          ...meaning,
          label: `NOT ${meaning.label}`,
          output: `not ${meaning.output.toLowerCase()}`
        };
      }

      // Automatically escalate tone if repeated (Point 19)
      const isEscalation = isRepeat && meaning.category !== 'scaffold';
      const tone = isEscalation ? 'urgent' : prev.currentTone;

      // In essential mode, we reset phrase on every tap to ensure it's a one-tap direct output
      const nextPhrase = prev.mode === 'essential' ? [finalMeaning] : [...prev.currentPhrase, finalMeaning];
      
      // Check if this meaning opens a subtree
      const hasSubtree = !!SUBTREES[meaningId] && prev.mode !== 'essential' && !prev.isNegated;
      
      if (hasSubtree) {
        return {
          ...prev,
          currentPhrase: nextPhrase,
          currentNodeId: meaningId,
          history: [...prev.history, meaningId],
          isNegated: false,
          currentTone: tone
        };
      } else {
        // It's a leaf node or we are in Essential mode
        return {
          ...prev,
          currentPhrase: nextPhrase,
          isNegated: false,
          currentTone: tone
        };
      }
    });
  }, [speakInternal]);

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
        currentPhrase: newPhrase,
        isNegated: false
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPhrase: [],
      currentNodeId: 'root',
      history: ['root'],
      isNegated: false
    }));
  }, []);

  const clearPhrase = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPhrase: [],
      isNegated: false
    }));
  }, []);

  const getCurrentMeanings = useCallback(() => {
    if (state.currentNodeId === 'root') {
      return MODE_CONFIGS[state.mode];
    }
    return SUBTREES[state.currentNodeId] || [];
  }, [state.mode, state.currentNodeId]);

  const speak = useCallback((text?: string) => {
    const toSpeak = text || smoothPhrase(state.currentPhrase, {
      tense: state.tense,
      isQuestion: state.isQuestion
    });
    speakInternal(toSpeak, state.currentTone);

    if (state.currentPhrase.length > 0) {
      setState(prev => ({
        ...prev,
        phraseHistory: [toSpeak, ...prev.phraseHistory].slice(0, 50)
      }));
    }
  }, [state.currentPhrase, state.currentTone, state.tense, state.isQuestion, speakInternal]);

  const updateSettings = useCallback((newSettings: AccessibilitySettings) => {
    setState(prev => ({ ...prev, settings: newSettings }));
  }, []);

  const saveMacro = useCallback((label: string) => {
    if (state.currentPhrase.length === 0) return;
    const text = smoothPhrase(state.currentPhrase, {
      tense: state.tense,
      isQuestion: state.isQuestion
    });
    const macro: Macro = {
      id: `macro_${Date.now()}`,
      label,
      output: text,
      meanings: [...state.currentPhrase]
    };
    setState(prev => ({ ...prev, macros: [...prev.macros, macro], currentPhrase: [] }));
  }, [state.currentPhrase, state.tense, state.isQuestion]);

  const deleteMacro = useCallback((id: string) => {
    setState(prev => ({ ...prev, macros: prev.macros.filter(m => m.id !== id) }));
  }, []);

  const selectMacro = useCallback((macro: Macro) => {
    speakInternal(macro.output, 'polite');
    vibrate(15);
  }, [speakInternal, vibrate]);

  const selectHistoryItem = useCallback((text: string) => {
    speakInternal(text, 'polite');
    vibrate(15);
  }, [speakInternal, vibrate]);

  const selectAbbreviation = useCallback((abbr: Abbreviation) => {
    const meanings = abbr.meaningIds.map(id => MEANINGS[id]).filter(Boolean);
    setState(prev => ({
      ...prev,
      currentPhrase: [...prev.currentPhrase, ...meanings]
    }));
    vibrate(20);
  }, [vibrate]);

  return {
    state,
    selectMeaning,
    navigateBack,
    reset,
    clearPhrase,
    setMode,
    updateSettings,
    saveMacro,
    deleteMacro,
    selectMacro,
    selectHistoryItem,
    selectAbbreviation,
    currentMeanings: getCurrentMeanings(),
    speak,
    smoothedText: smoothPhrase(state.currentPhrase, {
      tense: state.tense,
      isQuestion: state.isQuestion
    })
  };
}
