/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Meaning, InteractionMode } from './types';

export const MEANINGS: Record<string, Meaning> = {
  'yes': { id: 'yes', label: 'Yes', icon: 'CheckCircle2', output: 'Yes.', isUrgent: true, category: 'essential' },
  'no': { id: 'no', label: 'No', icon: 'XCircle', output: 'No.', isUrgent: true, category: 'essential' },
  'help': { id: 'help', label: 'Help', icon: 'AlertCircle', output: 'I need help.', isUrgent: true, category: 'essential' },
  'stop': { id: 'stop', label: 'Stop', icon: 'Octagon', output: 'Stop.', isUrgent: true, category: 'essential' },
  'bathroom': { id: 'bathroom', label: 'Bathroom', icon: 'Waves', output: 'I need the bathroom.', isUrgent: true, category: 'noun' },
  'water': { id: 'water', label: 'Water', icon: 'Droplets', output: 'I need water.', isUrgent: true, category: 'noun' },
  'food': { id: 'food', label: 'Food', icon: 'Utensils', output: 'I want food.', isUrgent: true, category: 'noun' },
  'pain': { id: 'pain', label: 'Pain', icon: 'Activity', output: 'I am in pain.', isUrgent: true, category: 'adjective' },
  'hot': { id: 'hot', label: 'Hot', icon: 'ThermometerSun', output: 'I am hot.', category: 'adjective' },
  'cold': { id: 'cold', label: 'Cold', icon: 'ThermometerSnowflake', output: 'I am cold.', category: 'adjective' },
  'tired': { id: 'tired', label: 'Tired', icon: 'Moon', output: 'I am tired.', category: 'adjective' },
  'more': { id: 'more', label: 'More', icon: 'Plus', output: 'More.', category: 'modifier' },
  'again': { id: 'again', label: 'Again', icon: 'RotateCcw', output: 'Again.', category: 'modifier' },
  'different': { id: 'different', label: 'Different', icon: 'Shuffle', output: 'Something different.', category: 'modifier' },
  'want': { id: 'want', label: 'I want', icon: 'Hand', output: 'I want...', category: 'scaffold' },
  'need': { id: 'need', label: 'I need', icon: 'Contact2', output: 'I need...', category: 'scaffold' },
  'feel': { id: 'feel', label: 'I feel', icon: 'Heart', output: 'I feel...', category: 'scaffold' },
  'now': { id: 'now', label: 'Now', icon: 'Clock', output: 'Now.', category: 'modifier' },
  'later': { id: 'later', label: 'Later', icon: 'Timer', output: 'Later.', category: 'modifier' },
  'family': { id: 'family', label: 'Family', icon: 'Users', output: 'My family.', category: 'noun' },
  'nurse': { id: 'nurse', label: 'Nurse', icon: 'Stethoscope', output: 'The nurse.', category: 'noun' },
  'doctor': { id: 'doctor', label: 'Doctor', icon: 'UserCog', output: 'The doctor.', category: 'noun' },
  'phone': { id: 'phone', label: 'Phone', icon: 'Smartphone', output: 'My phone.', category: 'noun' },
  'outside': { id: 'outside', label: 'Outside', icon: 'TreePine', output: 'Outside.', category: 'noun' },
  'medicine': { id: 'medicine', label: 'Medicine', icon: 'Pill', output: 'Medicine.', category: 'noun' },
  'bed': { id: 'bed', label: 'Bed', icon: 'Bed', output: 'Bed.', category: 'noun' },
  'chair': { id: 'chair', label: 'Chair', icon: 'Armchair', output: 'Chair.', category: 'noun' },
  'rest': { id: 'rest', label: 'Rest', icon: 'Battery', output: 'Rest.', category: 'verb' },
  'body': { id: 'body', label: 'Body', icon: 'Accessibility', output: 'My body.', category: 'noun' },
  'place': { id: 'place', label: 'Place', icon: 'MapPin', output: 'Place.', category: 'noun' },
  'action': { id: 'action', label: 'Action', icon: 'Play', output: 'Action.', category: 'scaffold' },
  // Vulgar Mode Meanings
  'v_bullshit': { id: 'v_bullshit', label: 'Bullshit!', icon: 'Bomb', output: 'That is total bullshit!', isUrgent: true, category: 'social' },
  'v_moveit': { id: 'v_moveit', label: 'Move It', icon: 'Zap', output: 'Get out of the way! Move it!', isUrgent: true, category: 'verb' },
  'v_shut': { id: 'v_shut', label: 'Shut Up', icon: 'MessageSquareX', output: 'Shut the hell up!', isUrgent: true, category: 'social' },
  'v_dumb': { id: 'v_dumb', label: 'You Dumb?', icon: 'Brain', output: 'Are you stupid or something?', isUrgent: true, category: 'social' },
  'v_hell': { id: 'v_hell', label: 'Hell No', icon: 'XOctagon', output: 'Hell no!', isUrgent: true, category: 'social' },
  'v_damnit': { id: 'v_damnit', label: 'Damnit', icon: 'Flame', output: 'Damnit!', isUrgent: true, category: 'social' },
  'v_getout': { id: 'v_getout', label: 'Get Out', icon: 'DoorOpen', output: 'Get the hell out of here!', isUrgent: true, category: 'social' },
  'v_wtf': { id: 'v_wtf', label: 'WTF', icon: 'Search', output: 'What the hell are you doing?', isUrgent: true, category: 'social' },
  'v_payme': { id: 'v_payme', label: 'Pay Me', icon: 'DollarSign', output: 'Where is my damn money?', isUrgent: true, category: 'social' },
  // Social Mode Meanings
  's_joke': { id: 's_joke', label: 'Joke', icon: 'Laugh', output: 'I have a joke for you.', isUrgent: true, category: 'social' },
  's_thanks': { id: 's_thanks', label: 'Thanks', icon: 'Gift', output: 'Thank you so much.', isUrgent: true, category: 'social' },
  's_sorry': { id: 's_sorry', label: 'Sorry', icon: 'Frown', output: 'I am so sorry.', isUrgent: true, category: 'social' },
  's_love': { id: 's_love', label: 'Love', icon: 'Heart', output: 'I love you.', isUrgent: true, category: 'social' },
  's_how': { id: 's_how', label: 'How?', icon: 'HelpCircle', output: 'How are you doing?', category: 'social' },
  's_fine': { id: 's_fine', label: 'Fine', icon: 'Smile', output: 'I am doing fine.', isUrgent: true, category: 'social' },
  's_cool': { id: 's_cool', label: 'Cool', icon: 'ThumbsUp', output: 'That is really cool.', isUrgent: true, category: 'social' },
  's_wait': { id: 's_wait', label: 'Wait', icon: 'Hand', output: 'One second, please.', isUrgent: true, category: 'social' },
  's_bye': { id: 's_bye', label: 'Bye', icon: 'LogOut', output: 'Goodbye!', isUrgent: true, category: 'social' },
  // Hospital Mode Meanings
  'h_nurse': { id: 'h_nurse', label: 'Nurse', icon: 'UserPlus', output: 'I need a nurse.', isUrgent: true, category: 'noun' },
  'h_doctor': { id: 'h_doctor', label: 'Doctor', icon: 'Stethoscope', output: 'I want to see the doctor.', category: 'noun' },
  'h_meds': { id: 'h_meds', label: 'Meds', icon: 'Pill', output: 'Is it time for my medicine?', category: 'noun' },
  'h_reposition': { id: 'h_reposition', label: 'Shift', icon: 'Move', output: 'I need to be repositioned.', category: 'verb' },
  'h_suction': { id: 'h_suction', label: 'Suction', icon: 'Wind', output: 'I need suctioning.', isUrgent: true, category: 'verb' },
  'h_breath': { id: 'h_breath', label: 'Breath', icon: 'Thermometer', output: 'I am having trouble breathing.', isUrgent: true, category: 'essential' },
  'h_pain_hi': { id: 'h_pain_hi', label: 'Hi Pain', icon: 'AlertTriangle', output: 'I have high pain.', isUrgent: true, category: 'essential' },
  'h_pain_lo': { id: 'h_pain_lo', label: 'Lo Pain', icon: 'Activity', output: 'I have low pain.', category: 'adjective' },
  'h_thirsty': { id: 'h_thirsty', label: 'Thirsty', icon: 'Droplet', output: 'I am very thirsty.', category: 'adjective' },
  // Semantic Modifiers (Point 28)
  'm_not': { id: 'm_not', label: 'NOT', icon: 'Ban', output: 'not', isUrgent: true, category: 'modifier' },
  'm_past': { id: 'm_past', label: 'PAST', icon: 'History', output: 'before', category: 'modifier' },
  'm_present': { id: 'm_present', label: 'NOW', icon: 'Clock', output: 'now', category: 'modifier' },
  'm_future': { id: 'm_future', label: 'FUTURE', icon: 'FastForward', output: 'later', category: 'modifier' },
  'm_question': { id: 'm_question', label: 'ASK?', icon: 'HelpCircle', output: '', category: 'modifier' },
  // Nuance Modifiers (Point 20)
  'm_very': { id: 'm_very', label: 'Very', icon: 'ArrowUpCircle', output: 'very', category: 'modifier' },
  'm_little': { id: 'm_little', label: 'Little', icon: 'ArrowDownCircle', output: 'a little', category: 'modifier' },
  'm_exactly': { id: 'm_exactly', label: 'Exactly', icon: 'Target', output: 'exactly', category: 'modifier' },
  // Non-Verbal Sounds (Point 78)
  'fx_laugh': { id: 'fx_laugh', label: 'Laugh', icon: 'Mic2', output: '[laughter]', isUrgent: true, category: 'social' },
  'fx_cough': { id: 'fx_cough', label: 'Cough', icon: 'Wind', output: '[cough]', isUrgent: true, category: 'social' },
  'fx_ahem': { id: 'fx_ahem', label: 'Ahem', icon: 'VolumeX', output: '[clears throat]', isUrgent: true, category: 'social' },
  // Tone Modifiers (Point 76)
  't_polite': { id: 't_polite', label: 'Polite', icon: 'HeartHandshake', output: '', category: 'modifier' },
  't_urgent': { id: 't_urgent', label: 'Urgent!', icon: 'Siren', output: '', category: 'modifier' },
  't_angry': { id: 't_angry', label: 'Angry', icon: 'Frown', output: '', category: 'modifier' },
  // Retail Mode (Point 33)
  'r_price': { id: 'r_price', label: 'Price?', icon: 'Tag', output: 'How much does this cost?', category: 'social' },
  'r_buy': { id: 'r_buy', label: 'Buy', icon: 'ShoppingCart', output: 'I want to buy this.', category: 'verb' },
  'r_size': { id: 'r_size', label: 'Size', icon: 'Ruler', output: 'I need a different size.', category: 'noun' },
  'r_receipt': { id: 'r_receipt', label: 'Receipt', icon: 'FileText', output: 'I need a receipt.', category: 'noun' },
  'r_bag': { id: 'r_bag', label: 'Bag', icon: 'ShoppingBag', output: 'I need a bag.', category: 'noun' },
  'r_card': { id: 'r_card', label: 'Card', icon: 'CreditCard', output: 'I will pay by card.', category: 'noun' },
  'modifiers': { id: 'modifiers', label: 'Mod...', icon: 'Settings2', output: '', category: 'scaffold' },
  'q_one': { id: 'q_one', label: '1', icon: 'Hash', output: 'one', category: 'quantity' },
  'q_some': { id: 'q_some', label: 'Some', icon: 'Waves', output: 'some', category: 'quantity' },
  'q_many': { id: 'q_many', label: 'Many', icon: 'LayoutGrid', output: 'many', category: 'quantity' },
  'food_eat': { id: 'food_eat', label: 'Eat', icon: 'UtensilsCrossed', output: 'I want to eat.', category: 'verb' },
  'food_drink': { id: 'food_drink', label: 'Drink', icon: 'GlassWater', output: 'I want a drink.', category: 'verb' },
  'm_panic': { id: 'm_panic', label: 'PANIC', icon: 'Siren', output: 'EMERGENCY! I NEED HELP NOW!', isUrgent: true, category: 'essential' },
  'm_macros': { id: 'm_macros', label: 'Macros', icon: 'Zap', output: '', category: 'scaffold' },
  'm_emoji': { id: 'm_emoji', label: 'Emoji', icon: 'Smile', output: '', category: 'scaffold' },
  'm_history': { id: 'm_history', label: 'History', icon: 'History', output: '', category: 'scaffold' },
  'm_abbr': { id: 'm_abbr', label: 'Shorts', icon: 'ZapOff', output: '', category: 'scaffold' },
  // Emojis (Point 30)
  'e_smile': { id: 'e_smile', label: '😊', icon: 'Smile', output: '[smiling face]', category: 'social' },
  'e_laugh': { id: 'e_laugh', label: '😂', icon: 'Laugh', output: '[tears of joy]', category: 'social' },
  'e_heart': { id: 'e_heart', label: '❤️', icon: 'Heart', output: '[heart]', category: 'social' },
  'e_thumbs': { id: 'e_thumbs', label: '👍', icon: 'ThumbsUp', output: '[thumbs up]', category: 'social' },
  'e_clap': { id: 'e_clap', label: '👏', icon: 'Hand', output: '[clapping hands]', category: 'social' },
  'e_party': { id: 'e_party', label: '🎉', icon: 'PartyPopper', output: '[party popper]', category: 'social' },
  'e_fire': { id: 'e_fire', label: '🔥', icon: 'Flame', output: '[fire]', category: 'social' },
  'e_cry': { id: 'e_cry', label: '😢', icon: 'Frown', output: '[crying face]', category: 'social' },
  'e_angry': { id: 'e_angry', label: '😠', icon: 'Angry', output: '[angry face]', category: 'social' },
  'e_wave': { id: 'e_wave', label: '👋', icon: 'Hand', output: '[waving hand]', category: 'social' },
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
    'need', 'feel', 'family', 'm_macros'
  ],
  express: [
    'yes', 'no', 'help', 'want',
    'need', 'feel', 'family', 'nurse',
    'food', 'body', 'place', 'action',
    'now', 'later', 'm_macros', 'm_history',
    'm_abbr'
  ],
  vulgar: [
    'v_bullshit', 'v_moveit', 'v_shut', 'v_dumb',
    'v_hell', 'v_damnit', 'v_getout', 'v_wtf',
    'v_payme', 'yes', 'no', 'stop'
  ],
  social: [
    's_thanks', 's_joke', 's_love', 's_how',
    's_fine', 's_cool', 's_wait', 's_bye',
    's_sorry', 'fx_laugh', 'm_not', 'm_emoji'
  ],
  hospital: [
    'h_nurse', 'h_doctor', 'h_meds', 'h_reposition',
    'h_suction', 'h_breath', 'h_pain_hi', 'h_pain_lo',
    'h_thirsty', 'fx_cough', 'm_not', 'help'
  ],
  retail: [
    'r_price', 'r_buy', 'r_size', 'r_receipt',
    'r_bag', 'r_card', 's_thanks', 'help'
  ],
  crisis: [
    'help', 'pain', 'h_breath', 'h_pain_hi',
    'h_suction', 's_wait', 'nurse', 'doctor'
  ]
};

export const SUBTREES: Record<string, string[]> = {
  'want': ['water', 'food', 'phone', 'outside', 'medicine', 'bed', 'chair', 'rest', 'm_very', 'm_little', 'modifiers'],
  'need': ['help', 'bathroom', 'water', 'food', 'medicine', 'nurse', 'doctor', 'm_exactly', 'modifiers'],
  'feel': ['pain', 'hot', 'cold', 'tired', 'more', 'different', 'm_very', 'm_little', 'modifiers'],
  'body': ['pain', 'hot', 'cold', 'tired', 'rest', 'modifiers'],
  'place': ['outside', 'bed', 'chair', 'bathroom', 'modifiers'],
  'action': ['stop', 'more', 'again', 'different', 'rest', 'modifiers'],
  'food': ['food_eat', 'food_drink', 'water', 'food', 'more', 'different', 'modifiers'],
  'm_emoji': ['e_smile', 'e_laugh', 'e_heart', 'e_thumbs', 'e_clap', 'e_party', 'e_fire', 'e_cry', 'e_angry', 'e_wave'],
  'modifiers': ['m_not', 'm_past', 'm_future', 'm_question', 'q_one', 'q_some', 'q_many', 't_urgent', 't_polite', 't_angry'],
};
