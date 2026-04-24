/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Meaning } from './types';

export function smoothPhrase(phrase: Meaning[]): string {
  if (phrase.length === 0) return '';
  
  const first = phrase[0];
  const rest = phrase.slice(1);

  // If it's a single direct meaning
  if (phrase.length === 1) {
    return first.output;
  }

  // Scaffold logic
  if (['want', 'need', 'feel'].includes(first.id)) {
    const base = first.label; // "I want", "I need", "I feel"
    const words = rest.map(m => m.label.toLowerCase());
    
    // Simple join for now, could be more sophisticated
    // "I want" + "water" + "cold" + "now" -> "I want water cold now"
    // Better: Filter out some "I" if they are in labels
    
    return `${base} ${words.join(' ')}.`;
  }

  // Fallback: just join the outputs or labels
  return phrase.map(m => m.label).join(' ') + '.';
}
