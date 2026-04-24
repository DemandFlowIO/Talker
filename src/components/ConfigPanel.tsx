/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InteractionMode, AccessibilitySettings } from '../types';

interface ConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: InteractionMode;
  onModeChange: (mode: InteractionMode) => void;
  settings: AccessibilitySettings;
  onSettingsChange: (settings: AccessibilitySettings) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  isOpen,
  onClose,
  currentMode,
  onModeChange,
  settings,
  onSettingsChange
}) => {
  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#151619]/90 backdrop-blur-md z-40"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] bg-[#E6E6E6] rounded-[40px] p-6 sm:p-10 z-50 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-[12px] border-[#222] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6 sm:mb-10 bg-[#151619] -m-10 p-6 px-10 rounded-t-2xl border-b-4 border-[#333]">
              <div className="flex items-center gap-4">
                <Settings className="text-orange-500" size={32} strokeWidth={3} />
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Maintenance Panel</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 bg-[#333] hover:bg-orange-600 rounded-lg transition-colors text-white"
              >
                <X size={28} strokeWidth={3} />
              </button>
            </div>

            <div className="mt-12 space-y-10">
              {/* Interaction Mode */}
              <div>
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[3px] text-slate-500 mb-6">Interaction Protocol Selector</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <ModeOption 
                    mode="essential" title="Essential" description="Direct." active={currentMode === 'essential'} onClick={() => onModeChange('essential')}
                  />
                  <ModeOption 
                    mode="guided" title="Guided" description="Structured paths." active={currentMode === 'guided'} onClick={() => onModeChange('guided')}
                  />
                  <ModeOption 
                    mode="express" title="Express" description="Syntax-rich." active={currentMode === 'express'} onClick={() => onModeChange('express')}
                  />
                  <ModeOption 
                    mode="social" title="Social" description="Conversational." active={currentMode === 'social'} onClick={() => onModeChange('social')}
                  />
                  <ModeOption 
                    mode="hospital" title="Medical" description="Hospital mode." active={currentMode === 'hospital'} onClick={() => onModeChange('hospital')}
                  />
                  <ModeOption 
                    mode="retail" title="Retail" description="Shopping mode." active={currentMode === 'retail'} onClick={() => onModeChange('retail')}
                  />
                  <ModeOption 
                    mode="crisis" title="Crisis" description="High urgency." active={currentMode === 'crisis'} onClick={() => onModeChange('crisis')}
                  />
                  <ModeOption 
                    mode="vulgar" title="Vulgar" description="Unfiltered." active={currentMode === 'vulgar'} onClick={() => onModeChange('vulgar')}
                  />
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[3px] text-slate-500 mb-6 font-black">Hardware & Accessibility Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/50 p-6 rounded-3xl border-2 border-white">
                  <div className="flex items-center justify-between">
                    <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Haptic Feedback</span>
                    <button 
                      onClick={() => updateSetting('hapticsEnabled', !settings.hapticsEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${settings.hapticsEnabled ? 'bg-green-500' : 'bg-slate-300'}`}
                    >
                      <motion.div 
                        animate={{ x: settings.hapticsEnabled ? 24 : 0 }}
                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Stealth Mode (Zero-Light)</span>
                    <button 
                      onClick={() => updateSetting('stealthMode', !settings.stealthMode)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${settings.stealthMode ? 'bg-orange-500' : 'bg-slate-300'}`}
                    >
                      <motion.div 
                        animate={{ x: settings.stealthMode ? 24 : 0 }}
                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Learning Mode (Favorite Cues)</span>
                    <button 
                      onClick={() => updateSetting('learningMode', !settings.learningMode)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${settings.learningMode ? 'bg-blue-500' : 'bg-slate-300'}`}
                    >
                      <motion.div 
                        animate={{ x: settings.learningMode ? 24 : 0 }}
                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Interface Lockdown</span>
                    <button 
                      onClick={() => updateSetting('isLocked', !settings.isLocked)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${settings.isLocked ? 'bg-red-500' : 'bg-slate-300'}`}
                    >
                      <motion.div 
                        animate={{ x: settings.isLocked ? 24 : 0 }}
                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Whisper Mode</span>
                    <button 
                      onClick={() => updateSetting('whisperMode', !settings.whisperMode)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${settings.whisperMode ? 'bg-indigo-500' : 'bg-slate-300'}`}
                    >
                      <motion.div 
                        animate={{ x: settings.whisperMode ? 24 : 0 }}
                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Show Panic Button</span>
                    <button 
                      onClick={() => updateSetting('showPanicButton', !settings.showPanicButton)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${settings.showPanicButton ? 'bg-red-500' : 'bg-slate-300'}`}
                    >
                      <motion.div 
                        animate={{ x: settings.showPanicButton ? 24 : 0 }}
                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </div>

                  <div className="col-span-full">
                    <div className="flex justify-between mb-4">
                       <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Theme Accent Color</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                       {['#f97316', '#3b82f6', '#10b981', '#f43f5e', '#8b5cf6', '#06b6d4'].map(color => (
                         <button
                           key={color}
                           onClick={() => updateSetting('accentColor', color)}
                           className={`w-8 h-8 rounded-full border-4 shrink-0 ${settings.accentColor === color ? 'border-white ring-2 ring-slate-400' : 'border-transparent'}`}
                           style={{ backgroundColor: color }}
                         />
                       ))}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <div className="flex justify-between mb-2">
                       <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Voice Selection</span>
                    </div>
                    <select 
                      value={settings.voiceURI}
                      onChange={(e) => updateSetting('voiceURI', e.target.value)}
                      className="w-full bg-slate-200 p-3 rounded-2xl font-mono text-xs font-bold outline-none focus:ring-2 ring-blue-500"
                    >
                      <option value="">System Default</option>
                      {window.speechSynthesis.getVoices().map(voice => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-full bg-slate-200/50 p-4 rounded-3xl">
                    <div className="flex justify-between mb-4">
                       <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Grid Density Selector</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                       {(['sparse', 'standard', 'compact'] as const).map(d => (
                         <button
                           key={d}
                           onClick={() => updateSetting('gridDensity', d)}
                           className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                             settings.gridDensity === d ? 'bg-[#151619] text-white shadow-lg' : 'bg-white text-slate-400 border-2 border-slate-200'
                           }`}
                         >
                           {d}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <div className="flex justify-between mb-2">
                       <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Hold-to-Activate Delay</span>
                       <span className="font-mono text-xs font-bold text-orange-600">{settings.holdToActivateDelay}ms</span>
                    </div>
                    <input 
                      type="range" min="0" max="2000" step="100"
                      value={settings.holdToActivateDelay}
                      onChange={(e) => updateSetting('holdToActivateDelay', parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                  </div>

                  <div className="col-span-full">
                    <div className="flex justify-between mb-2">
                       <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Dwell-Time Activation (Hover)</span>
                       <span className="font-mono text-xs font-bold text-red-600">{settings.dwellTime === 0 ? 'OFF' : settings.dwellTime + 'ms'}</span>
                    </div>
                    <input 
                      type="range" min="0" max="3000" step="100"
                      value={settings.dwellTime}
                      onChange={(e) => updateSetting('dwellTime', parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                  </div>

                  <div className="col-span-1">
                    <div className="flex justify-between mb-2">
                       <span className="font-black uppercase text-[10px] tracking-widest text-[#151619]">Voice Pitch</span>
                       <span className="font-mono text-xs font-bold text-blue-600">{settings.voicePitch.toFixed(1)}</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="2.0" step="0.1"
                      value={settings.voicePitch}
                      onChange={(e) => updateSetting('voicePitch', parseFloat(e.target.value))}
                      className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="col-span-1">
                    <div className="flex justify-between mb-2">
                       <span className="font-black uppercase text-[10px] tracking-widest text-[#151619]">Voice Rate</span>
                       <span className="font-mono text-xs font-bold text-green-600">{settings.voiceRate.toFixed(1)}</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="2.5" step="0.1"
                      value={settings.voiceRate}
                      onChange={(e) => updateSetting('voiceRate', parseFloat(e.target.value))}
                      className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#151619] p-6 rounded-2xl border-l-4 border-orange-500 shadow-inner">
                <p className="text-slate-400 font-mono text-[11px] leading-relaxed uppercase tracking-tighter">
                  Accessibility settings persist in local signal buffer. 
                  Lumina Comm v0.4.5-STABLE.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface ModeOptionProps {
  mode: InteractionMode;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

const ModeOption: React.FC<ModeOptionProps> = ({ title, description, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      text-left p-6 rounded-3xl border-b-8 transition-all
      ${active 
        ? 'bg-orange-600 text-white border-orange-800 shadow-inner translate-y-2' 
        : 'bg-white text-[#151619] border-[#ccc] hover:border-orange-400'}
    `}
  >
    <div className="text-xl font-black uppercase tracking-tighter mb-2">{title}</div>
    <div className={`text-[10px] font-bold uppercase tracking-tight leading-tight ${active ? 'text-orange-100' : 'text-slate-500'}`}>
      {description}
    </div>
  </button>
);
