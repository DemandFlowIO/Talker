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
  tone?: string;
  darkMode?: boolean;
  onClear?: () => void;
  accentColor?: string;
}

export const PhrasePreview: React.FC<PhrasePreviewProps> = ({ phrase, smoothedText, tone, darkMode = true, onClear, accentColor = '#f97316' }) => {
  const hasNegation = phrase.some(m => m.label.startsWith('NOT')) || smoothedText.toLowerCase().includes('not');

  return (
    <motion.div 
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.x < -100) {
          onClear?.();
        }
      }}
      className={`h-12 sm:h-16 rounded-full border-2 flex items-center px-4 sm:px-6 relative transition-all duration-300 ${
      darkMode 
        ? (hasNegation ? 'bg-red-900/10 border-red-900/30' : 'bg-[#1a1c21] border-white/10') 
        : (hasNegation ? 'bg-red-50 border-red-200' : 'bg-slate-100 border-slate-300')
    }`}>
      <div className="flex-1 flex items-center gap-2 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {phrase.length === 0 ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              className={`text-[10px] font-black tracking-[0.3em] uppercase ${darkMode ? 'text-white' : 'text-slate-900'}`}
            >
              READY
            </motion.div>
          ) : (
            phrase.map((m, i) => (
              <motion.div
                key={`${m.id}-${i}`}
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`flex items-center shrink-0 h-6 px-2 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                  darkMode ? 'bg-white/10 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                {m.label}
                {i < phrase.length - 1 && <Icons.ChevronRight size={10} className="ml-1 opacity-40" />}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 ml-4">
        {tone && (
          <div className={`px-2 py-0.5 rounded-full text-[8px] font-black border uppercase tracking-tighter ${
            tone === 'urgent' ? 'bg-red-600 border-red-800 text-white' :
            tone === 'angry' ? 'bg-slate-900 border-black text-white' :
            'bg-indigo-600 border-indigo-800 text-white'
          }`}>
            {tone}
          </div>
        )}
        <div className="w-2 h-2 rounded-full" style={phrase.length > 0 ? { backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` } : { backgroundColor: '#334155' }} />
      </div>
    </motion.div>
  );
};
