/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LucideIcon } from 'lucide-react';

export type InteractionMode = 'essential' | 'guided' | 'express' | 'vulgar' | 'social' | 'hospital' | 'retail' | 'crisis';

export type SemanticRole = 'direct' | 'scaffold' | 'modifier' | 'navigation';

export type SemanticCategory = 'noun' | 'verb' | 'adjective' | 'social' | 'modifier' | 'essential' | 'scaffold' | 'quantity';

export interface Meaning {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  output: string; // Solo output phrase
  category?: SemanticCategory;
  isUrgent?: boolean;
}

export interface NavigationNode {
  id: string;
  meanings: string[]; // List of meaning IDs
  parent?: string;
  title?: string;
}

export interface AccessibilitySettings {
  hapticsEnabled: boolean;
  holdToActivateDelay: number; // 0 = immediate, > 0 = ms delay
  highContrast: boolean;
  stealthMode: boolean;
  voicePitch: number;
  voiceRate: number;
  voiceURI: string;
  gridDensity: 'sparse' | 'standard' | 'compact';
  learningMode: boolean;
  isLocked: boolean;
  dwellTime: number; // 0 means disabled, otherwise ms
  accentColor: string;
  whisperMode: boolean;
  showPanicButton: boolean;
}

export interface Macro {
  id: string;
  label: string;
  output: string;
  meanings: Meaning[];
}

export interface Abbreviation {
  id: string;
  short: string; // e.g. "hnp"
  meaningIds: string[]; // e.g. ["help", "now", "place"]
}

export interface SemanticState {
  currentPhrase: Meaning[];
  mode: InteractionMode;
  currentNodeId: string;
  history: string[];
  currentTone?: 'polite' | 'urgent' | 'angry';
  isNegated?: boolean;
  isQuestion?: boolean;
  tense?: 'present' | 'past' | 'future';
  settings: AccessibilitySettings;
  usageStats: Record<string, number>;
  transitionStats: Record<string, number>; // Key: "fromId->toId"
  macros: Macro[];
  phraseHistory: string[];
  abbreviations: Abbreviation[];
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}
