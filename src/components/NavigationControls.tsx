/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronLeft, Home, Trash2, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { InteractionMode } from '../types';

interface NavigationControlsProps {
  onSpeak: () => void;
  canSpeak: boolean;
  mode: InteractionMode;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onSpeak,
  canSpeak,
  mode
}) => {
  const isEssential = mode === 'essential' || mode === 'vulgar' || mode === 'hospital' || mode === 'social';

  return (
    <div className="flex h-full w-full justify-center">
      <div className="w-full max-w-4xl relative">
        <motion.button
          whileTap={!canSpeak ? {} : { y: 4 }}
          onClick={!canSpeak ? undefined : onSpeak}
          className={`
            w-full h-full flex items-center justify-center space-x-4 sm:space-x-8 rounded-[24px] sm:rounded-[32px] border-b-[8px] sm:border-b-[12px] transition-all
            ${canSpeak 
              ? 'bg-orange-600 border-orange-900 text-white cursor-pointer active:border-b-0 active:translate-y-2 sm:active:translate-y-3 shadow-2xl' 
              : 'bg-[#1a1a1a] border-none text-[#444] cursor-not-allowed translate-y-2'}
          `}
          id="control-speak"
        >
          <Volume2 size={32} strokeWidth={4} className={canSpeak ? "sm:scale-[1.5] animate-pulse" : ""} />
          <span className="text-xl sm:text-4xl font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] italic">
            {canSpeak ? 'SPEAK OUTPUT' : 'INPUT NEEDED'}
          </span>
        </motion.button>
        {canSpeak && (
          <div className="absolute -bottom-2 sm:-bottom-3 right-8 text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-[0.4em] font-black hidden sm:block">
            PROTOCOL: ACTIVE // VOICE ENABLED
          </div>
        )}
      </div>
    </div>
  );
};
