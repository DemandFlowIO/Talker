/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Meaning } from './types';

export function smoothPhrase(phrase: Meaning[], options: { tense?: string, isQuestion?: boolean } = {}): string {
  if (phrase.length === 0) return '';
  
  const { tense = 'present', isQuestion = false } = options;
  const first = phrase[0];
  const rest = phrase.slice(1);

  let result = '';

  // Scaffold logic
  if (['want', 'need', 'feel'].includes(first.id)) {
    let base = first.label; // "I want", "I need", "I feel"
    
    // Tense transformations
    if (tense === 'past') {
      if (first.id === 'want') base = "I wanted";
      if (first.id === 'need') base = "I needed";
      if (first.id === 'feel') base = "I felt";
    } else if (tense === 'future') {
      base = `I will ${first.id}`;
    }

    const words = rest.map((m, i) => {
      let label = m.label.toLowerCase();
      
      // Pluralization Logic (Point 18)
      // Check if current is noun and previous was a 'plural' quantity
      const prev = i > 0 ? rest[i-1] : (phrase[0]);
      if (m.category === 'noun' && prev.category === 'quantity') {
        if (prev.id === 'q_some' || prev.id === 'q_many') {
          if (label.endsWith('y') && !label.endsWith('ay') && !label.endsWith('ey')) {
            label = label.slice(0, -1) + 'ies';
          } else if (label.endsWith('sh') || label.endsWith('ch') || label.endsWith('x') || label.endsWith('s')) {
            label += 'es';
          } else {
            label += 's';
          }
        }
      }
      return label;
    });
    result = `${base} ${words.join(' ')}`;
  } else {
    // Fallback: just join the labels
    result = phrase.map(m => m.label).join(' ');
  }

  // Question transformation
  if (isQuestion) {
    if (result.startsWith('I want')) result = result.replace('I want', 'Do I want');
    else if (result.startsWith('I wanted')) result = result.replace('I wanted', 'Did I want');
    else if (result.startsWith('I will want')) result = result.replace('I will want', 'Will I want');
    else if (result.startsWith('I need')) result = result.replace('I need', 'Do I need');
    else if (result.startsWith('I felt')) result = result.replace('I felt', 'Did I feel');
    else result = `Am I ${result.toLowerCase()}`;
    
    result = result.trim() + '?';
  } else {
    result = result.trim() + '.';
  }

  return result;
}
