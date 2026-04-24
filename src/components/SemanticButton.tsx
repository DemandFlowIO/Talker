/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';
import { Meaning } from '../types';

interface SemanticButtonProps {
  meaning: Meaning;
  onClick: () => void;
  variant?: 'primary' | 'urgent' | 'scaffold' | 'modifier';
  className?: string;
  disabled?: boolean;
}

export const SemanticButton: React.FC<SemanticButtonProps> = ({ 
  meaning, 
  onClick, 
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  const IconComponent = (Icons as any)[meaning.icon] || Icons.HelpCircle;

  const getVariantStyles = () => {
    // Priority concepts / Urgent
    if (meaning.isUrgent) {
      if (meaning.id === 'help') return 'bg-[#dc2626] text-white border-[#991b1b] shadow-[0_8px_0_#991b1b] active:shadow-none active:translate-y-2';
      if (meaning.id === 'yes') return 'bg-[#16a34a] text-white border-[#14532d] shadow-[0_8px_0_#14532d] active:shadow-none active:translate-y-2';
      if (meaning.id === 'no') return 'bg-[#ea580c] text-white border-[#9a3412] shadow-[0_8px_0_#9a3412] active:shadow-none active:translate-y-2';
      if (meaning.id === 'stop') return 'bg-[#000000] text-white border-[#000000] shadow-[0_8px_0_#444] active:shadow-none active:translate-y-2';
      return 'bg-[#ef4444] text-white border-[#b91c1c] shadow-[0_8px_0_#b91c1c] active:shadow-none active:translate-y-2';
    }

    // Scaffolds
    if (variant === 'scaffold') {
      return 'bg-[#dbeafe] text-[#1e40af] border-[#60a5fa] border-dashed shadow-[0_8px_0_#60a5fa] active:shadow-none active:translate-y-2';
    }

    // Default / Primary
    return 'bg-white text-[#151619] border-[#cbd5e1] shadow-[0_8px_0_#cbd5e1] active:shadow-none active:translate-y-2 border-2';
  };

  return (
    <motion.button
      whileTap={disabled ? {} : { y: 6 }}
      onClick={disabled ? undefined : onClick}
      className={`
        flex flex-col items-center justify-center p-2 sm:p-3 rounded-[32px] border-2 transition-all cursor-pointer
        h-full w-full relative group min-h-0
        ${getVariantStyles()}
        ${disabled ? 'opacity-30 cursor-not-allowed grayscale shadow-none translate-y-2' : ''}
        ${className}
      `}
      id={`button-${meaning.id}`}
    >
      <div className="flex-1 flex items-center justify-center p-1 w-full min-h-0">
        <IconComponent strokeWidth={3.5} className="w-full h-full max-h-[65%] sm:max-h-[75%] transition-transform group-active:scale-95" />
      </div>
      <span className="font-black uppercase text-[10px] sm:text-xs lg:text-base text-center leading-none tracking-widest mt-1 mb-2 shrink-0">
        {meaning.label}
      </span>
    </motion.button>
  );
};
