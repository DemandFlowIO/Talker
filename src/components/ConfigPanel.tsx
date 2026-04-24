/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InteractionMode } from '../types';

interface ConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: InteractionMode;
  onModeChange: (mode: InteractionMode) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  isOpen,
  onClose,
  currentMode,
  onModeChange
}) => {
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
            className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[80vh] bg-[#E6E6E6] rounded-[40px] p-10 z-50 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-[12px] border-[#222]"
          >
            <div className="flex justify-between items-center mb-10 bg-[#151619] -m-10 p-6 px-10 rounded-t-2xl border-b-4 border-[#333]">
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
              <div>
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[3px] text-slate-500 mb-6">Interaction Protocol Selector</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <ModeOption 
                    mode="essential"
                    title="Essential"
                    description="Fixed grid. Direct output."
                    active={currentMode === 'essential'}
                    onClick={() => onModeChange('essential')}
                  />
                  <ModeOption 
                    mode="guided"
                    title="Guided"
                    description="Structured branching paths."
                    active={currentMode === 'guided'}
                    onClick={() => onModeChange('guided')}
                  />
                  <ModeOption 
                    mode="express"
                    title="Express"
                    description="Deep syntax assembly."
                    active={currentMode === 'express'}
                    onClick={() => onModeChange('express')}
                  />
                </div>
              </div>

              <div className="bg-[#151619] p-6 rounded-2xl border-l-4 border-orange-500 shadow-inner">
                <p className="text-slate-400 font-mono text-[11px] leading-relaxed uppercase tracking-tighter">
                  Caution: Changes to interaction mode will reset current signal buffer. 
                  Lumina Comm v0.4.2-MVP Specialist Tools.
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
