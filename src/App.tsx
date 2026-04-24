/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InteractionMode } from './types';
import { useCommunication } from './hooks/useCommunication';
import { MEANINGS, SUBTREES } from './constants';
import { PhrasePreview } from './components/PhrasePreview';
import { NavigationControls } from './components/NavigationControls';
import { SemanticButton } from './components/SemanticButton';
import { ConfigPanel } from './components/ConfigPanel';

export default function App() {
  const { 
    state, 
    selectMeaning, 
    navigateBack, 
    reset, 
    clearPhrase, 
    setMode, 
    currentMeanings, 
    speak, 
    smoothedText 
  } = useCommunication('guided');

  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleMeaningClick = (id: string) => {
    const meaning = MEANINGS[id];
    if (!meaning) return;

    selectMeaning(id);

    // Auto-speak conditions:
    // 1. Essential mode: Speak everything immediately (direct mapping)
    // 2. Urgent meanings: Speak immediately in any mode (fast access)
    if (state.mode === 'essential' || meaning.isUrgent) {
      speak(meaning.output);
    }
  };

  return (
    <div className="h-svh w-full bg-[#151619] text-slate-900 font-sans overflow-hidden flex flex-col p-4 sm:p-6 lg:p-8">
      {/* Outer "Hardware" Frame - Subtly present but not eating space */}
      <div className="flex-1 flex flex-col w-full h-full bg-[#E6E6E6] rounded-[32px] overflow-hidden shadow-2xl border-b-[8px] border-black/20 relative">
        
        {/* Hardware Header - Fixed Height */}
        <header className="h-16 flex-shrink-0 flex justify-between items-center bg-[#151619] px-6 border-b-2 border-black/40">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>
              <div className="w-2.5 h-2.5 bg-orange-400 rounded-full shadow-[0_0_8px_rgba(251,146,60,0.6)]"></div>
            </div>
            <h1 className="font-black text-xs tracking-[0.25em] text-[#8E9299] uppercase hidden sm:block">
              LUMINA <span className="text-orange-500">SYSTEM</span> OS v0.5
            </h1>
          </div>

          <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-sm">
            {(['essential', 'guided', 'express'] as InteractionMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`
                  px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all rounded-lg
                  ${state.mode === m 
                    ? 'bg-orange-600 text-white shadow-lg scale-105 z-10' 
                    : 'text-[#8E9299] hover:text-white hover:bg-white/5'}
                `}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsConfigOpen(true)}
              className="p-2.5 bg-[#333] hover:bg-[#444] rounded-lg transition-all text-white border-b-2 border-black active:border-b-0 active:translate-y-0.5"
              id="open-config"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        <main className="flex-grow flex flex-col p-2 sm:p-4 overflow-hidden">
          {/* Display Area - Compact but high-contrast */}
          <section className="flex-shrink-0 mb-2">
            <PhrasePreview 
              phrase={state.currentPhrase} 
              smoothedText={smoothedText} 
            />
          </section>

          {/* Dynamic Action Area - Strictly non-scrolling proportional grid */}
          <section className="flex-grow overflow-hidden mb-3">
            <AnimatePresence mode="wait">
              <motion.div 
                key={state.currentNodeId + state.mode}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.12 }}
                className={`grid gap-2 sm:gap-3 h-full w-full ${
                  state.mode === 'essential' 
                    ? 'grid-cols-3 grid-rows-3' 
                    : state.mode === 'guided'
                      ? 'grid-cols-3 sm:grid-cols-4 grid-rows-4 sm:grid-rows-3'
                      : 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 grid-rows-4 lg:grid-rows-3'
                }`}
                id="comm-grid"
              >
                {currentMeanings.map(id => {
                  const meaning = MEANINGS[id];
                  if (!meaning) return null;
                  
                  const isScaffold = !!SUBTREES[id] && state.mode !== 'essential';
                  
                  return (
                    <div key={id} className="h-full w-full min-h-0">
                      <SemanticButton 
                        meaning={meaning}
                        onClick={() => handleMeaningClick(id)}
                        variant={isScaffold ? 'scaffold' : 'primary'}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </section>

          {/* System Control Deck - Compact layout */}
          <footer className="flex-shrink-0 h-20 sm:h-24">
            <NavigationControls 
              onBack={navigateBack}
              onHome={reset}
              onClear={clearPhrase}
              onSpeak={() => speak()}
              canBack={state.history.length > 1}
              canSpeak={state.currentPhrase.length > 0}
              mode={state.mode}
            />
          </footer>
        </main>
      </div>

      <ConfigPanel 
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        currentMode={state.mode}
        onModeChange={(mode) => {
          setMode(mode);
          setIsConfigOpen(false);
        }}
      />
    </div>
  );
}

