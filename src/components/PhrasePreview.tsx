/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Meaning } from '../types';

interface PhrasePreviewProps {
  phrase: Meaning[];
  smoothedText: string;
}

export const PhrasePreview: React.FC<PhrasePreviewProps> = ({ phrase, smoothedText }) => {
  return (
    <div className="h-24 sm:h-28 bg-white rounded-2xl border-4 border-[#151619] flex items-center px-4 sm:px-8 shadow-inner relative">
      <div className="absolute -top-3 left-6 sm:left-8 bg-[#151619] text-white px-3 py-1 text-[8px] sm:text-[9px] uppercase tracking-[2px] font-black rounded-lg">
        ACTIVE INTENT
      </div>
      
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <div className="flex flex-wrap gap-2 mb-1 min-h-[16px] sm:min-h-[20px] items-center overflow-hidden h-4 sm:h-5">
          <AnimatePresence>
            {phrase.map((m, i) => (
              <motion.span
                key={`${m.id}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.6, x: 0 }}
                className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#151619] flex items-center shrink-0"
              >
                {m.label} {i < phrase.length - 1 ? <Icons.ChevronRight size={10} className="mx-1" /> : ''}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="text-2xl sm:text-4xl font-black text-[#151619] tracking-tighter uppercase leading-none truncate pr-4">
          {phrase.length > 0 ? (
            <div className="flex items-baseline gap-2">
              <span className="opacity-30">{phrase.slice(0, -1).map(m => m.label).join(' ')}</span>
              <span className="text-orange-600 underline decoration-4 underline-offset-4 sm:decoration-6 sm:underline-offset-8">
                {phrase[phrase.length - 1].label}
              </span>
            </div>
          ) : (
            <span className="opacity-10 animate-pulse italic">Awaiting Input...</span>
          )}
        </div>
      </div>

      <div className="ml-auto hidden md:flex items-center space-x-3">
        <div className="w-1.5 h-10 bg-[#e0e0e0] rounded-full overflow-hidden relative">
          <div className="absolute bottom-0 w-full bg-orange-500 h-1/2"></div>
        </div>
        <div className="text-[8px] font-mono text-[#8E9299] leading-none text-right">
          SIGNAL<br/>ACTIVE
        </div>
      </div>
    </div>
  );
};
