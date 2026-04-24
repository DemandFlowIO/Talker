/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Meaning } from '../types';

interface SemanticButtonProps {
  meaning: Meaning;
  onClick: () => void;
  variant?: 'primary' | 'urgent' | 'scaffold' | 'modifier';
  className?: string;
  disabled?: boolean;
  active?: boolean;
  darkMode?: boolean;
  holdDelay?: number;
}

export const SemanticButton: React.FC<SemanticButtonProps> = ({ 
  meaning, 
  onClick, 
  variant = 'primary',
  className = '',
  disabled = false,
  active = false,
  darkMode = true,
  holdDelay = 0
}) => {
  const IconComponent = (Icons as any)[meaning.icon] || Icons.HelpCircle;
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHolding && holdDelay > 0) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / holdDelay, 1);
        setHoldProgress(progress);
        if (progress >= 1) {
          clearInterval(interval);
          handleTrigger();
        }
      }, 16);
      return () => clearInterval(interval);
    } else {
      setHoldProgress(0);
    }
  }, [isHolding, holdDelay]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    if (holdDelay > 0) {
      setIsHolding(true);
    }
  };

  const handlePointerUp = () => {
    setIsHolding(false);
  };

  const handleTrigger = () => {
    setIsHolding(false);
    onClick();
  };

  const handleClick = (e: React.MouseEvent) => {
    if (holdDelay > 0) {
      e.preventDefault();
      return;
    }
    onClick();
  };

  const getVariantStyles = () => {
    if (active) {
      return 'bg-indigo-600 text-white border-indigo-900 shadow-[0_8px_0_#312e81] active:translate-y-2 active:shadow-none';
    }

    const category = meaning.category;

    // Part-of-Speech Coloring (Lumina Strategic Roadmap Point 26)
    if (category === 'essential' || meaning.isUrgent) {
      if (meaning.id === 'help' || meaning.id.includes('pain') || meaning.id.includes('breath')) {
        return `${darkMode ? 'bg-red-950 text-red-100 border-red-700' : 'bg-red-500 text-white border-red-800'} shadow-[0_8px_0_#991b1b] active:shadow-none active:translate-y-2`;
      }
      if (meaning.id === 'yes') {
        return `${darkMode ? 'bg-green-950 text-green-100 border-green-700' : 'bg-green-600 text-white border-green-800'} shadow-[0_8px_0_#166534] active:shadow-none active:translate-y-2`;
      }
      if (meaning.id === 'no' || meaning.id === 'stop') {
        return `${darkMode ? 'bg-orange-950 text-orange-100 border-orange-700' : 'bg-orange-600 text-white border-orange-800'} shadow-[0_8px_0_#9a3412] active:shadow-none active:translate-y-2`;
      }
      // General urgent
      return `${darkMode ? 'bg-red-900/60 text-red-100 border-red-700' : 'bg-red-400 text-white border-red-600'} shadow-[0_8px_0_#7f1d1d] active:shadow-none active:translate-y-2`;
    }

    if (category === 'scaffold' || category === 'verb') {
      return `${darkMode ? 'bg-blue-900/40 text-blue-100 border-blue-700 shadow-[0_8px_0_#1e3a8a]' : 'bg-blue-500 text-white border-blue-800 shadow-[0_8px_0_#1e40af]'} active:shadow-none active:translate-y-2`;
    }

    if (category === 'noun') {
      return `${darkMode ? 'bg-emerald-900/40 text-emerald-100 border-emerald-700 shadow-[0_8px_0_#064e3b]' : 'bg-emerald-500 text-white border-emerald-800 shadow-[0_8px_0_#065f46]'} active:shadow-none active:translate-y-2`;
    }

    if (category === 'adjective') {
      return `${darkMode ? 'bg-amber-900/40 text-amber-100 border-amber-700 shadow-[0_8px_0_#78350f]' : 'bg-amber-500 text-white border-amber-800 shadow-[0_8px_0_#92400e]'} active:shadow-none active:translate-y-2`;
    }

    if (category === 'social') {
      return `${darkMode ? 'bg-purple-900/40 text-purple-100 border-purple-700 shadow-[0_8px_0_#4c1d95]' : 'bg-purple-500 text-white border-purple-800 shadow-[0_8px_0_#5b21b6]'} active:shadow-none active:translate-y-2`;
    }

    if (category === 'modifier') {
      return `${darkMode ? 'bg-slate-800 text-slate-100 border-slate-600 shadow-[0_8px_0_#0f172a]' : 'bg-slate-500 text-white border-slate-700 shadow-[0_8px_0_#1e293b]'} active:shadow-none active:translate-y-2`;
    }
    
    if (category === 'quantity') {
      return `${darkMode ? 'bg-cyan-900/40 text-cyan-100 border-cyan-700 shadow-[0_8px_0_#164e63]' : 'bg-cyan-500 text-white border-cyan-800 shadow-[0_8px_0_#155e75]'} active:shadow-none active:translate-y-2`;
    }

    // Default / Scaffolds
    if (variant === 'scaffold') {
      return `${darkMode ? 'bg-blue-900/30 text-blue-400 border-blue-800' : 'bg-[#dbeafe] text-[#1e40af] border-[#60a5fa]'} border-dashed shadow-[0_8px_0_#3b82f6] active:shadow-none active:translate-y-2`;
    }

    // Default / Primary
    return `${darkMode ? 'bg-[#1c1d21] text-slate-300 border-black shadow-[0_8px_0_#000]' : 'bg-white text-[#151619] border-[#cbd5e1] shadow-[0_8px_0_#cbd5e1]'} active:shadow-none active:translate-y-2 border-2`;
  };

  return (
    <motion.button
      whileTap={disabled ? {} : { y: 6 }}
      onClick={disabled ? undefined : handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`
        flex flex-col items-center justify-center p-2 sm:p-3 rounded-[32px] border-2 transition-all cursor-pointer
        h-full w-full relative group min-h-0
        ${getVariantStyles()}
        ${disabled ? 'opacity-30 cursor-not-allowed grayscale shadow-none translate-y-2' : ''}
        ${className}
      `}
      id={`button-${meaning.id}`}
    >
      {/* Hold Progress Overlay */}
      {isHolding && holdDelay > 0 && (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[32px]">
          <motion.div 
            className="absolute bottom-0 left-0 w-full bg-white/20 origin-bottom"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: holdProgress }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      <div className="flex-1 flex items-center justify-center p-1 w-full min-h-0 z-10">
        <IconComponent strokeWidth={3.5} className="w-full h-full max-h-[70%] sm:max-h-[85%] transition-transform group-active:scale-90" />
      </div>
      <span className="font-black uppercase text-[12px] sm:text-sm lg:text-lg text-center leading-none tracking-widest mt-1 mb-2 shrink-0 z-10">
        {meaning.label}
      </span>
    </motion.button>
  );
};
