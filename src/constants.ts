/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Meaning, InteractionMode } from './types';

export const MEANINGS: Record<string, Meaning> = {
  'yes': { id: 'yes', label: 'Yes', icon: 'CheckCircle2', output: 'Yes.', isUrgent: true },
  'no': { id: 'no', label: 'No', icon: 'XCircle', output: 'No.', isUrgent: true },
  'help': { id: 'help', label: 'Help', icon: 'AlertCircle', output: 'I need help.', isUrgent: true },
  'stop': { id: 'stop', label: 'Stop', icon: 'Octagon', output: 'Stop.', isUrgent: true },
  'bathroom': { id: 'bathroom', label: 'Bathroom', icon: 'Waves', output: 'I need the bathroom.', isUrgent: true },
  'water': { id: 'water', label: 'Water', icon: 'Droplets', output: 'I need water.', isUrgent: true },
  'food': { id: 'food', label: 'Food', icon: 'Utensils', output: 'I want food.', isUrgent: true },
  'pain': { id: 'pain', label: 'Pain', icon: 'Activity', output: 'I am in pain.', isUrgent: true },
  'hot': { id: 'hot', label: 'Hot', icon: 'ThermometerSun', output: 'I am hot.' },
  'cold': { id: 'cold', label: 'Cold', icon: 'ThermometerSnowflake', output: 'I am cold.' },
  'tired': { id: 'tired', label: 'Tired', icon: 'Moon', output: 'I am tired.' },
  'more': { id: 'more', label: 'More', icon: 'Plus', output: 'More.' },
  'again': { id: 'again', label: 'Again', icon: 'RotateCcw', output: 'Again.' },
  'different': { id: 'different', label: 'Different', icon: 'Shuffle', output: 'Something different.' },
  'want': { id: 'want', label: 'I want', icon: 'Hand', output: 'I want...' },
  'need': { id: 'need', label: 'I need', icon: 'Contact2', output: 'I need...' },
  'feel': { id: 'feel', label: 'I feel', icon: 'Heart', output: 'I feel...' },
  'now': { id: 'now', label: 'Now', icon: 'Clock', output: 'Now.' },
  'later': { id: 'later', label: 'Later', icon: 'Timer', output: 'Later.' },
  'family': { id: 'family', label: 'Family', icon: 'Users', output: 'My family.' },
  'nurse': { id: 'nurse', label: 'Nurse', icon: 'Stethoscope', output: 'The nurse.' },
  'doctor': { id: 'doctor', label: 'Doctor', icon: 'UserCog', output: 'The doctor.' },
  'phone': { id: 'phone', label: 'Phone', icon: 'Smartphone', output: 'My phone.' },
  'outside': { id: 'outside', label: 'Outside', icon: 'TreePine', output: 'Outside.' },
  'medicine': { id: 'medicine', label: 'Medicine', icon: 'Pill', output: 'Medicine.' },
  'bed': { id: 'bed', label: 'Bed', icon: 'Bed', output: 'Bed.' },
  'chair': { id: 'chair', label: 'Chair', icon: 'Armchair', output: 'Chair.' },
  'rest': { id: 'rest', label: 'Rest', icon: 'Battery', output: 'Rest.' },
  'body': { id: 'body', label: 'Body', icon: 'Accessibility', output: 'My body.' },
  'place': { id: 'place', label: 'Place', icon: 'MapPin', output: 'Place.' },
  'action': { id: 'action', label: 'Action', icon: 'Play', output: 'Action.' },
};

export const MODE_CONFIGS: Record<InteractionMode, string[]> = {
  essential: [
    'yes', 'no', 'help', 'water', 
    'food', 'bathroom', 'pain', 'stop', 
    'more'
  ],
  guided: [
    'yes', 'no', 'help', 'bathroom',
    'water', 'food', 'pain', 'want',
    'need', 'feel', 'family', 'nurse'
  ],
  express: [
    'yes', 'no', 'help', 'want',
    'need', 'feel', 'family', 'nurse',
    'food', 'body', 'place', 'action',
    'now', 'later', 'more'
  ]
};

export const SUBTREES: Record<string, string[]> = {
  'want': ['water', 'food', 'phone', 'outside', 'medicine', 'bed', 'chair', 'rest'],
  'need': ['help', 'bathroom', 'water', 'food', 'medicine', 'nurse', 'doctor'],
  'feel': ['pain', 'hot', 'cold', 'tired', 'more', 'different'],
  'body': ['pain', 'hot', 'cold', 'tired', 'rest'],
  'place': ['outside', 'bed', 'chair', 'bathroom'],
  'action': ['stop', 'more', 'again', 'different', 'rest'],
  'food': ['water', 'food', 'more', 'different'],
};
