/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * LUMINA COMM - SELF-DEPENDENT ARCHITECTURE
 * 
 * STRATEGIC CONSTRAINT:
 * 1. Zero External Dependencies: Must function without internet.
 * 2. No External APIs/AI: All grammar and synthesis logic must be local.
 * 3. Privacy by Isolation: No data leaves the local device.
 */

import React, { useState } from 'react';
import * as Icons from 'lucide-react';
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
    updateSettings,
    saveMacro,
    deleteMacro,
    selectMacro,
    selectHistoryItem,
    selectAbbreviation,
    smoothedText 
  } = useCommunication('guided');

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const lastId = state.currentPhrase.length > 0 ? state.currentPhrase[state.currentPhrase.length - 1].id : 'START';
  
  const predictedId = React.useMemo(() => {
    if (state.currentNodeId === 'm_macros') return null;
    
    let bestId = null;
    let maxTrans = -1;
    
    currentMeanings.forEach(id => {
      const transCount = state.transitionStats[`${lastId}->${id}`] || 0;
      if (transCount > maxTrans && transCount > 0) {
        maxTrans = transCount;
        bestId = id;
      }
    });
    
    return bestId;
  }, [lastId, currentMeanings, state.transitionStats, state.currentNodeId]);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        speakPhrase();
      } else if (e.code === 'Backspace') {
        navigateBack();
      } else if (e.code === 'Escape') {
        clearPhrase();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [speakPhrase, navigateBack, clearPhrase]);

  const getGridClasses = () => {
    const density = state.settings.gridDensity;
    const count = currentMeanings.length;

    if (density === 'sparse') {
      return 'grid-cols-2 sm:grid-cols-3';
    }
    if (density === 'compact') {
      return 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-8';
    }

    // Default 'standard'
    if (count <= 4) return 'grid-cols-2 grid-rows-2';
    if (count <= 6) return 'grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2';
    if (count <= 9) return 'grid-cols-3 grid-rows-3';
    if (count <= 12) return 'grid-cols-3 sm:grid-cols-4 grid-rows-4 sm:grid-rows-3';
    return 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-5';
  };

  return (
    <div className={`h-svh w-full font-sans overflow-hidden flex flex-col p-2 sm:p-6 lg:p-10 transition-colors duration-500 ${isDarkMode ? 'bg-[#0a0a0b]' : 'bg-slate-300'}`}>
      {/* Outer "Hardware" Frame */}
      <div className={`flex-1 flex flex-col w-full h-full rounded-[40px] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border-b-[12px] border-black/30 relative transition-colors duration-300 ${isDarkMode ? 'bg-[#151619]' : 'bg-slate-100'}`}>
        
        {/* Hardware Status Header */}
        <header className={`h-12 flex-shrink-0 flex justify-between items-center px-4 border-b-2 transition-colors ${isDarkMode ? 'bg-[#1a1c21] border-black/40' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.3)]"></div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-2 h-2 rounded-full cursor-pointer hover:scale-150 transition-transform ${isDarkMode ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'bg-slate-300'}`}
                title="Toggle Theme"
              />
            </div>
            <div className={`flex gap-1 p-1 rounded-lg ${isDarkMode ? 'bg-black/40' : 'bg-slate-100'}`}>
              {(['essential', 'guided', 'express', 'social', 'hospital'] as InteractionMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`
                    px-2 py-0.5 text-[8px] font-black uppercase tracking-widest transition-all rounded
                    ${state.mode === m 
                      ? 'bg-orange-600 text-white' 
                      : isDarkMode ? 'text-slate-600 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}
                  `}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className={`text-[8px] font-black tracking-[0.4em] uppercase ${isDarkMode ? 'text-white/20' : 'text-slate-300'}`}>
            PRO-SERIES // MODEL-L
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Static Sidebar Navigation - Stable muscle memory anchor */}
          <aside className={`w-16 sm:w-20 flex-shrink-0 flex flex-col border-r-2 gap-3 p-3 transition-colors ${isDarkMode ? 'bg-[#151619] border-black/40' : 'bg-slate-50 border-slate-200'}`}>
            <NavControl icon={Icons.Home} onClick={reset} label="ROOT" darkMode={isDarkMode} />
            <NavControl icon={Icons.ChevronLeft} onClick={navigateBack} disabled={state.history.length <= 1} label="BACK" darkMode={isDarkMode} />
            <div className="flex-grow" />
            <NavControl icon={Icons.Trash2} onClick={clearPhrase} label="CLR" darkMode={isDarkMode} variant="danger" />
            
            {/* Conditional Settings Cog with Lockdown Support (Point 15) */}
            {!state.settings.isLocked ? (
              <button 
                onClick={() => setIsConfigOpen(true)}
                className={`h-16 flex flex-col items-center justify-center rounded-2xl border-2 transition-all ${isDarkMode ? 'bg-[#222] border-black text-slate-500 hover:text-white' : 'bg-white border-slate-300 text-slate-400 hover:text-slate-600'}`}
              >
                <Icons.Settings size={20} />
                <span className="text-[7px] font-black mt-1">SYS</span>
              </button>
            ) : (
              <div 
                onMouseDown={() => {
                  const t = setTimeout(() => {
                    updateSettings({ isLocked: false });
                  }, 3000);
                  (window as any)._unlockTimer = t;
                }}
                onMouseUp={() => clearTimeout((window as any)._unlockTimer)}
                onMouseLeave={() => clearTimeout((window as any)._unlockTimer)}
                onTouchStart={() => {
                  const t = setTimeout(() => {
                    updateSettings({ isLocked: false });
                  }, 3000);
                  (window as any)._unlockTimer = t;
                }}
                onTouchEnd={() => clearTimeout((window as any)._unlockTimer)}
                className="h-16 flex flex-col items-center justify-center opacity-10 cursor-help"
              >
                <Icons.Lock size={12} />
              </div>
            )}
          </aside>

          {/* Main Interaction Stage */}
          <main className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden relative">
            {/* Panic Button "Panic Zone" (Point 5) */}
            {state.settings.showPanicButton && (
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50">
                <button
                  onClick={() => handleMeaningClick('m_panic')}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all animate-pulse border-4 border-white/20"
                  title="EMERGENCY PANIC"
                >
                  <Icons.Siren size={32} />
                </button>
              </div>
            )}
            {/* Minimal Intent Breadcrumb Bar */}
            <section className="mb-4 flex gap-2 items-center">
              <div className="flex-grow">
                <PhrasePreview 
                  phrase={state.currentPhrase} 
                  smoothedText={smoothedText} 
                  tone={state.currentTone}
                  darkMode={isDarkMode}
                  onClear={clearPhrase}
                  accentColor={state.settings.accentColor}
                />
              </div>
              {state.currentPhrase.length > 0 && (
                <button
                  onClick={() => {
                    const label = prompt('Name this Macro:');
                    if (label) saveMacro(label);
                  }}
                  className={`h-22 px-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-yellow-500 hover:text-yellow-400' : 'bg-white border-slate-200 text-yellow-600 hover:text-yellow-700'}`}
                  title="SAVE AS MACRO"
                >
                  <Icons.Zap size={24} />
                  <span className="text-[8px] font-black uppercase">SAVE</span>
                </button>
              )}
            </section>

            {/* Dynamic Semantic Mesh */}
            <section className="flex-grow overflow-hidden mb-3">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={state.currentNodeId + state.mode}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.12 }}
                  className={`grid gap-3 sm:gap-4 h-full w-full ${getGridClasses()}`}
                  id="comm-grid"
                >
                  {/* Visual Anchoring Pattern (Point 11) - Static landmarks for spatial memory */}
                  <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 pointer-events-none opacity-[0.03] overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="border border-white flex items-center justify-center font-mono text-[8px] font-black">
                        {String.fromCharCode(65 + Math.floor(i/4))}{i%4 + 1}
                      </div>
                    ))}
                  </div>

                  {state.currentNodeId === 'm_macros' ? (
                    state.macros.length > 0 ? (
                      state.macros.map((macro) => (
                        <div key={macro.id} className="h-full w-full min-h-0 relative group">
                          <button
                            onClick={() => selectMacro(macro)}
                            className={`
                              h-full w-full rounded-[32px] border-2 flex flex-col items-center justify-center gap-2 p-2 transition-all active:scale-95
                              ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white hover:border-yellow-500/50' : 'bg-white border-slate-200 text-slate-900 hover:border-yellow-500/50'}
                            `}
                          >
                            <Icons.Zap size={32} className="text-yellow-500" />
                            <span className="text-[10px] sm:text-xs font-black uppercase text-center overflow-hidden line-clamp-2 px-2">
                               {macro.label}
                            </span>
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteMacro(macro.id); }}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                          >
                            <Icons.X size={16} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full flex flex-col items-center justify-center text-slate-500 gap-4">
                        <Icons.Zap size={48} className="opacity-20" />
                        <p className="font-black uppercase tracking-widest text-xs">No Macros Saved Yet</p>
                      </div>
                    )
                  ) : state.currentNodeId === 'm_history' ? (
                    state.phraseHistory.length > 0 ? (
                      state.phraseHistory.map((text, i) => (
                        <button
                          key={i}
                          onClick={() => selectHistoryItem(text)}
                          className={`
                            h-full w-full rounded-[32px] border-2 flex flex-col items-center justify-center p-4 transition-all active:scale-95
                            ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500/50' : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-500/50'}
                          `}
                        >
                          <Icons.History size={24} className="text-indigo-400 mb-2 opacity-50" />
                          <span className="text-[10px] sm:text-xs font-medium text-center line-clamp-3">
                            {text}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="col-span-full flex flex-col items-center justify-center text-slate-500 gap-4">
                        <Icons.History size={48} className="opacity-20" />
                        <p className="font-black uppercase tracking-widest text-xs">No History Yet</p>
                      </div>
                    )
                  ) : state.currentNodeId === 'm_abbr' ? (
                    state.abbreviations.map((abbr) => (
                      <button
                        key={abbr.id}
                        onClick={() => selectAbbreviation(abbr)}
                        className={`
                          h-full w-full rounded-[32px] border-2 flex flex-col items-center justify-center gap-2 p-4 transition-all active:scale-95
                          ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100 hover:border-emerald-500/50' : 'bg-white border-slate-200 text-slate-900 hover:border-emerald-500/50'}
                        `}
                      >
                        <span className="text-lg font-black tracking-tighter text-emerald-500">
                          {abbr.short}
                        </span>
                        <span className="text-[8px] font-black uppercase text-slate-500">
                          {abbr.meaningIds.length} TAPS
                        </span>
                      </button>
                    ))
                  ) : (
                    currentMeanings.map(id => {
                      const meaning = MEANINGS[id];
                      if (!meaning) return null;
                      
                      const isScaffold = !!SUBTREES[id] && state.mode !== 'essential';
                      const usageCount = state.usageStats[id] || 0;
                      const isHot = usageCount >= 5;
                      
                      return (
                        <div key={id} className="h-full w-full min-h-0">
                          <SemanticButton 
                            meaning={meaning}
                            onClick={() => handleMeaningClick(id)}
                            variant={isScaffold ? 'scaffold' : (meaning.isUrgent ? 'urgent' : 'primary')}
                            active={id === 'm_not' && state.isNegated}
                            darkMode={isDarkMode}
                            holdDelay={state.settings.holdToActivateDelay}
                            dwellTime={state.settings.dwellTime}
                            isHot={isHot}
                            isPredicted={id === predictedId}
                            isLearningMode={state.settings.learningMode}
                            accentColor={state.settings.accentColor}
                          />
                        </div>
                      );
                    })
                  )}
                </motion.div>
              </AnimatePresence>
            </section>

            {/* Final Execution Trigger - Only the Speak Action */}
            <footer className="flex-shrink-0 h-20">
              <button
                onClick={() => speak()}
                disabled={state.currentPhrase.length === 0}
                className={`w-full h-full rounded-3xl font-black text-xl uppercase tracking-[0.3em] transition-all border-b-[8px] active:border-b-0 active:translate-y-2 flex items-center justify-center gap-4 ${
                  state.currentPhrase.length === 0 
                  ? 'bg-slate-200 text-slate-400 border-slate-300 opacity-20 grayscale' 
                  : 'bg-orange-600 text-white border-orange-800 shadow-[0_10px_30px_rgba(234,88,12,0.3)]'
                }`}
              >
                <Icons.Play size={32} />
                ACTIVATE INTENT
              </button>
            </footer>
          </main>
        </div>
      </div>

      <ConfigPanel 
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        currentMode={state.mode}
        onModeChange={(mode) => {
          setMode(mode);
          setIsConfigOpen(false);
        }}
        settings={state.settings}
        onSettingsChange={updateSettings}
      />

      {/* Stealth Mode Overlay (Point 9) - Red tint for night use */}
      {state.settings.stealthMode && (
        <div className="fixed inset-0 bg-red-900/20 pointer-events-none z-[100] mix-blend-multiply transition-opacity duration-1000" />
      )}
    </div>
  );
}

// Subtle integrated Navigation Control for header/integrated areas
function NavControl({ icon: Icon, onClick, disabled, label, darkMode, variant = 'primary' }: any) {
  return (
    <motion.button
      whileTap={disabled ? {} : { y: 2 }}
      onClick={disabled ? undefined : onClick}
      className={`
        flex-1 flex flex-col items-center justify-center rounded-2xl border-2 transition-all px-4 sm:px-6 py-2 min-w-[70px]
        ${disabled ? 'opacity-20 cursor-not-allowed grayscale' : 'cursor-pointer active:shadow-inner active:bg-black/10'}
        ${variant === 'danger' 
          ? 'bg-red-500/10 border-red-500/40 text-red-500 hover:bg-red-500/20' 
          : darkMode 
            ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white' 
            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}
      `}
    >
      <Icon size={18} className="mb-1" />
      <span className="text-[9px] font-black tracking-widest uppercase">{label}</span>
    </motion.button>
  );
}

