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

                  <div className="col-span-full">
                    <div className="flex justify-between mb-2">
                       <span className="font-black uppercase text-xs tracking-widest text-[#151619]">Hold-to-Activate Delay</span>
                       <span className="font-mono text-xs font-bold text-orange-600">{settings.holdToActivateDelay}ms</span>
                    </div>
                    <input 
                      type="range" min="0" max="2000" step="250"
                      value={settings.holdToActivateDelay}
                      onChange={(e) => updateSetting('holdToActivateDelay', parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-orange-600"
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
