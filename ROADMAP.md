# Lumina Comm: The 100-Point Strategic Roadmap

## Foundational Principles (Enforced Ongoing)
- **Zero External Dependencies**: The application must remain 100% functional without an internet connection.
- **No External APIs/AI**: No calls to LLMs, external grammar engines, or cloud-based processing. All intelligence must be local, deterministic, and self-contained.
- **Privacy by Isolation**: User data never leaves the local device. No cloud sync, no telemetry, no tracking.
- **Accessibility-First Design**: ALL interfaces must meet WCAG 2.1 AA standards as a baseline, ensuring high contrast, screen-reader compatibility, and large touch targets (min 44px).

## Phase 0: Accessibility & UX Baseline Audit (COMPLETED)
1.  **Global Type-Scale Audit (COMPLETED)**: Eliminating all font sizes below 10pt (13px) to ensure readability for users with low vision.
2.  **WCAG Color Contrast Correction (COMPLETED)**: Systematic review of all foreground/background pairs to exceed 4.5:1 ratio across Light and Dark themes.
3.  **Touch Target Standardization (COMPLETED)**: Ensuring all interactive elements (navigation, grammar, modes) have a minimum clickable area of 44x44px.
4.  **Semantic Focus Management (COMPLETED)**: Clear visual "focus rings" or bounding boxes for all active states.
5.  **Motion-Sensitive UI (COMPLETED)**: Options to reduce or disable layout animations for users with vestibular disorders.

## I. UI/UX & Physical Accessibility (Points 1-15)
1.  **High-Contrast Profiles (COMPLETED)**: Functional Light/Dark themes with consistent hierarchy.
2.  **Haptic Feedback Engine (COMPLETED)**: Variable vibration patterns for confirmation (using Web Vibration API).
3.  **Dwell-Time Activation (COMPLETED)**: Support for eye-tracking and head-tracking inputs via timed hover.
4.  **Hardware Switch Integration (COMPLETED)**: Mapping keyboard keys (Space, Enter, Backspace) as HID switches.
5.  **Oversized "Panic" Zones (COMPLETED)**: Dedicated emergency trigger button for immediate output.
6.  **Scan-Mode Navigation**: Row/Column scanning for single-switch users.
7.  **Dynamic Sizing (COMPLETED)**: Proportional grid scaling that eliminates scrollbars.
8.  **Anti-Fatigue Layouts**: Moving most-used items to high-motor-stability zones.
9.  **Dark-Mode/Stealth Mode (COMPLETED)**: For use in theaters or bedside without light-pollution.
10. **Touch-Hold Protections (COMPLETED)**: Delay-on-release for users with tremors or "heavy" touch.
11. **Visual Target Anchoring (COMPLETED)**: Stationary visual landmarks to aid spatial memory.
12. **Gaze Buffer**: Preventing accidental triggers during eye-tracking "sweeps."
13. **Responsive Density (COMPLETED)**: Automatically shifting from 4x4 to 12x12 based on user settings.
14. **Cross-Platform Parity**: Identical motor-memory paths on Mobile, Tablet, and Desktop.
15. **Interface "Lockdown" (COMPLETED)**: Preventing accidental mode-switches during intense use.

## II. Semantic Engine & Grammar (Points 16-30)
16. **Intent Smoothing (IMPROVED)**: Converting scaffold paths into grammatical sentences.
17. **Tense Control (COMPLETED)**: Added Past/Present/Future modifiers.
18. **Pluralization Logic (COMPLETED)**: Context-aware count modifiers.
19. **Sentiment Analysis (COMPLETED)**: Detecting "Urgent" vs "Casual" based on repetition and whisper mode.
20. **Nuance Modifiers (COMPLETED)**: "A little," "Very," "Exactly" for expressiveness.
21. **Contextual Verbs (COMPLETED)**: "Eat" and "Drink" available in food contexts.
22. **Abbreviation Expansion (COMPLETED)**: User-definable shorthand paths (e.g., "HNP" -> "Help Now Place").
23. **Core Semantic Dictionary**: Expanding from 30 to 500+ baked-in meanings.
24. **Grammar Pattern Engine**: Local deterministic rules for high-cognition phrase polishing.
25. **Multi-Step Scaffold**: Allowing 4+ levels of depth for complex storytelling.
26. **Part-of-Speech Coloring (COMPLETED)**: Visual color cues for Verbs, Nouns, and Modifiers.
27. **Synonym Suggestions**: "I feel pain" -> "I feel... sharp/dull/aching."
28. **Negation Toggle (COMPLETED)**: A global "NOT" modifier that flips the meaning of the next tap.
29. **Question Mode (COMPLETED)**: Converting any statement into a query.
30. **Interjection Layer (COMPLETED)**: Immediate access to non-verbal sounds and urgent responses.

## III. Situational & Specialist Modes (Points 31-45)
31. **Medical Mode (COMPLETED)**: Specialized phrases for medical needs.
32. **Legal/Rights Mode**: Phrases for asserting autonomy, consent, and legal status.
33. **Retail/Commerce Mode (COMPLETED)**: "How much?", "Credit card?", "Receipt?".
34. **Crisis/Emergency Mode (COMPLETED)**: Priority configurations for medical/urgent needs.
35. **Intimate/Relationship Mode**: Phrases for private connection and vulnerability.
36. **Work/Professional Mode**: Jargon and industry-specific semantic layers.
37. **Classroom Mode**: "I have a question," "Need a break," "Collaborate."
38. **Banter Mode**: Sarcastic, funny, and casual social scripts.
39. **Protest/Public Event Mode**: Megaphone-loud phrases and short chants.
40. **Travel/Navigation Mode**: "Where is?", "Airport," "Hotel," "Bathroom."
41. **Religious/Spiritual Mode**: Specialized prayers, terms of faith, or meditation.
42. **Financial Mode**: Numbers, banking actions, and currency semantics.
43. **Gaming Mode**: Short-shorthand for multiplayer collaboration ("Heal me," "Go left").
44. **Grief/Support Mode**: Navigating heavy emotions and comfort requests.
45. **Conflict Resolution Mode**: "I need space," "Let's talk later," "I'm overwhelmed."

## IV. Personalization & Configuration (Points 46-60)
46. **User Profiles**: Distinct configurations for different times of day or caregivers.
47. **Theme Customization (COMPLETED)**: User-selectable accent colors beyond basic Light/Dark.
48. **Custom Meaning Creation**: Users can upload their own icons and text-to-speech.
49. **Photo-Buttons**: Using real photos of family members or objects.
50. **Macro-Recording (COMPLETED)**: Recording a sequence of taps as a single "Super Button."
51. **Voice Choice (COMPLETED)**: Access to system-diverse voices with custom selection.
52. **Pitch/Rate Modulation (COMPLETED)**: Adjusting voice speed for urgency or fatigue.
53. **Local Signal Persistence (COMPLETED)**: Saving accessibility settings and usage stats across sessions.
54. **Home Grid Anchoring**: Pinning specific buttons so they never move.
55. **Automatic Mode Switching**: Time-based switching (e.g., Essential mode at night).
56. **External Meaning Import**: Pulling from standard AAC symbols (Boardmaker, etc.).
57. **Caregiver Auth**: Hidden gesture to access config to prevent accidental changes.
58. **Secondary Display Mirroring**: Displaying text on a separate phone or watch.
59. **Smart Home Integration**: "I want... [Lights] [On]."
60. **Meaning Export**: Sharing custom buttons between users.

## V. Intelligence & Context (Points 61-75)
61. **Time-Awareness**: "I want breakfast" in morning vs "Dinner" at night.
62. **Geo-Fencing**: Showing "Retail" mode automatically when at a store.
63. **Success Tracking**: Logging which paths lead to "Speak" vs "Clear."
64. **Predictive Next-Tap (COMPLETED)**: Subtly glowing the most likely next button based on transition history.
65. **Ambient Noise Sensing**: Auto-adjusting volume based on room noise.
66. **Heart-Rate Sync**: Surfacing "Pain" or "Help" if heart-rate spikes (Wearable sync).
67. **Conversation History (COMPLETED)**: Accessing previously used phrases for quick re-use.
68. **Topic Detection**: Grouping relevant buttons based on current conversation.
69. **Simplified Retrieval**: A "Search-by-Tap" system for deep hierarchies.
70. **Pattern Recall**: Quick access to previously used local phrase templates.
71. **Correction Learning**: Learning that "Water" -> "Food" was a mistake and "Water" -> "Now" was the goal.
72. **Fatigue Sensing**: Detecting "Slow taps" and offering to switch to Essential mode.
73. **Interactive Onboarding**: A gamified guide to learning the semantic paths.
74. **Semantic Auto-Correction**: Fixing logical errors like "I want cold hot."
75. **Contextual Suggestion Bar**: A row of dynamic shortcuts that changes constantly.

## VI. Social & Emotional Connectivity (Points 76-85)
76. **Emotional Tone Selection (COMPLETED)**: (Polite, Urgent, Angry) affecting speech synthesis parameters.
77. **Sarcasm Detection**: Specialized intonation for witty responses.
78. **Non-Verbal Sounds (COMPLETED)**: Including coughs, laughs, and "Ahem" as immediate interjections.
79. **Message Scheduling**: "Remind me to say [Phrase] when [Person] arrives."
80. **Whisper Mode (COMPLETED)**: Low-volume output for secret or private talk.
81. **Learning Mode (COMPLETED)**: Visual emphasis on frequently used patterns.
82. **Doubt/Uncertainty Indicators**: Outputting "I think I want..."
83. **Shared Canvas**: Visual drawings to accompany synthesized speech.
84. **Group Communication**: Connecting with other Lumina users in proximity.
85. **Idiom Layer**: "Piece of cake," "Bite the bullet," "Break a leg."

## VII. Technical Foundations (Points 86-95)
86. **Offline First**: 100% functionality without internet.
87. **PWA Support**: Installing as a native app for instant launch.
88. **End-to-End Encryption**: Secure logging of personal data.
89. **Local Sync**: File-based profile transfer between local devices via manual export/import.
90. **Latency Optimization**: Sub-10ms response from tap to visual feedback.
91. **Battery Management**: Ultra-low-power mode for long days.
92. **Error Logging**: Telemetry to find "Confusing" UI paths.
93. **Modular CSS Variables**: For instant color-blindness adaptation.
94. **Canvas-Based Rendering**: For smooth 120fps animations on complex grids.
95. **API for Developers**: Letting others build specialized "Mode Plugins."

## VIII. Expansion & Impact (Points 96-100)
96. **Embedded Dictionary**: Local translation support within the app bundle.
97. **Open Meaning Standard**: Pushing Lumina’s semantics as a new AAC standard.
98. **Low-Resource Hardware**: Porting specifically to $20 tablets for global access.
99. **Bio-Feedback Input**: Using EMG/Muscle sensors for non-motor users.
100. **The "Infinite Grid"**: A procedural generation system that maps the entire human experience.
