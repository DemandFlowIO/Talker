/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronLeft, Home, Trash2, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationControlsProps {
  onBack: () => void;
  onHome: () => void;
  onClear: () => void;
  onSpeak: () => void;
  canBack: boolean;
  canSpeak: boolean;
  mode: InteractionMode;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onBack,
  onHome,
  onClear,
  onSpeak,
  canBack,
  canSpeak,
  mode
}) => {
  const isEssential = mode === 'essential';

  return (
    <div className={`grid gap-2 sm:gap-4 h-full ${isEssential ? 'grid-cols-8' : 'grid-cols-6'}`}>
      <div className={`${isEssential ? 'col-span-1' : 'col-span-1'}`}>
        <ControlButton 
          label="Back" 
          icon={ChevronLeft} 
          onClick={onBack} 
          disabled={!canBack} 
          compact={isEssential}
        />
      </div>
      <div className={`${isEssential ? 'col-span-1' : 'col-span-1'}`}>
        <ControlButton 
          label="Home" 
          icon={Home} 
          onClick={onHome} 
          compact={isEssential}
        />
      </div>
      <div className={`${isEssential ? 'col-span-1' : 'col-span-1'}`}>
        <ControlButton 
          label="Clear" 
          icon={Trash2} 
          onClick={onClear} 
          compact={isEssential}
        />
      </div>
      
      <div className={`${isEssential ? 'col-span-5' : 'col-span-3'} relative`}>
        <motion.button
          whileTap={!canSpeak ? {} : { y: 4 }}
          onClick={!canSpeak ? undefined : onSpeak}
          className={`
            w-full h-full bg-orange-600 text-white rounded-2xl flex items-center justify-center space-x-3 sm:space-x-6 border-b-[6px] sm:border-b-[10px] border-orange-800 transition-all
            ${!canSpeak ? 'opacity-30 grayscale border-none translate-y-1' : 'cursor-pointer active:border-b-0 active:translate-y-4'}
          `}
          id="control-speak"
        >
          <Volume2 size={isEssential ? 28 : 32} strokeWidth={4} className="sm:scale-125" />
          <span className={`${isEssential ? 'text-lg sm:text-2xl' : 'text-xl sm:text-3xl'} font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] italic`}>SPEAK</span>
        </motion.button>
        {!isEssential && (
          <div className="absolute -bottom-2 sm:-bottom-3 right-4 text-[7px] sm:text-[9px] font-mono text-[#888] uppercase tracking-widest hidden sm:block">
            Primary Voice Trigger
          </div>
        )}
      </div>
    </div>
  );
};

interface ControlButtonProps {
  label: string;
  icon: any;
  onClick: () => void;
  disabled?: boolean;
  compact?: boolean;
}

const ControlButton: React.FC<ControlButtonProps> = ({ 
  label, icon: Icon, onClick, disabled, compact
}) => {
  return (
    <motion.button
      whileTap={disabled ? {} : { y: 4 }}
      onClick={disabled ? undefined : onClick}
      className={`
        flex items-center justify-center rounded-2xl transition-all
        bg-[#333] text-white border-b-4 border-black font-mono
        ${disabled ? 'opacity-30 grayscale border-none translate-y-1' : 'cursor-pointer active:border-b-0 active:translate-y-1'}
        ${compact ? 'flex-col sm:space-y-0 p-1' : 'flex-row sm:space-x-2 p-3'}
        h-full w-full
      `}
      id={`control-${label.toLowerCase()}`}
    >
      <Icon size={compact ? 24 : 20} strokeWidth={3} className="text-orange-500" />
      {!compact && (
        <span className="text-[10px] uppercase font-mono tracking-tighter font-bold hidden sm:block">{label}</span>
      )}
      {compact && (
        <span className="text-[8px] uppercase font-mono tracking-tighter font-bold hidden md:block mt-1">{label}</span>
      )}
    </motion.button>
  );
};
