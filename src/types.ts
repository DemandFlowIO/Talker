/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LucideIcon } from 'lucide-react';

export type InteractionMode = 'essential' | 'guided' | 'express';

export type SemanticRole = 'direct' | 'scaffold' | 'modifier' | 'navigation';

export interface Meaning {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  output: string; // Solo output phrase
  category?: string;
  isUrgent?: boolean;
}

export interface NavigationNode {
  id: string;
  meanings: string[]; // List of meaning IDs
  parent?: string;
  title?: string;
}

export interface SemanticState {
  currentPhrase: Meaning[];
  mode: InteractionMode;
  currentNodeId: string;
  history: string[];
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
