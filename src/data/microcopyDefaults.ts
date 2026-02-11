/**
 * Centralized registry of hardcoded microcopy strings used as fallbacks.
 * These are used when Sanity content is missing for a specific key.
 */

export const microcopyDefaults: Record<string, string> = {
    // Greetings
    "greeting.morning": "Good morning — here's what to expect today.",
    "greeting.afternoon": "Good afternoon — here's what to expect today.",
    "greeting.evening": "Good evening — here's what to expect tonight.",
    "greeting.completion": "Another day complete.",

    // Progress Hints
    "progress.tracking": "You're {progress}% through your recovery plan. Keep listening to your body today.",
    "progress.exploring": "Tap any card below to preview what recovery feels like.",

    // Weekly Milestones
    "milestone.7": "Another week behind you. Keep the pace gentle.",
    "milestone.14": "Two weeks done. You're halfway through the key healing phase.",
    "milestone.21": "Three weeks complete. Your body is rebuilding strength.",
    "milestone.28": "Four weeks reached. You've come a long way.",

    // Encouragement (Random/Daily)
    "encouragement.0": "Small steps count most.",
    "encouragement.1": "You're doing well.",
    "encouragement.2": "Trust the process.",
    "encouragement.3": "Rest is part of healing.",
    "encouragement.4": "Every day adds up.",
    "encouragement.5": "Be patient with yourself.",
    "encouragement.6": "Progress isn't always visible.",
    "encouragement.7": "Healing takes time.",
    "encouragement.8": "Listen to your body.",
    "encouragement.9": "You're on track.",

    // Quick Access: Pain Control
    "quick.pain.title": "Pain Control",
    "quick.pain.content": "Take paracetamol (1g) every 6 hours. Ibuprofen (400mg) can be added if needed. Always take with food. Avoid aspirin unless prescribed.",

    // Quick Access: Wound Care
    "quick.wound.title": "Wound Care",
    "quick.wound.content": "Keep clean and dry for 7 days. After dressing removal, gentle shower is fine. Pat dry, don't rub. No swimming or baths until follow-up.",

    // Quick Access: Activity
    "quick.activity.title": "Activity Guide",
    "quick.activity.content": "Week 1: Rest, short walks only. Week 2: Light activities, no lifting >5kg. Week 3-4: Gradual return and avoid contact sports.",

    // Quick Access: When to Call
    "quick.call.title": "When to Call Us",
    "quick.call.fallback": "Call NHS 111 for urgent medical advice or 999 for life-threatening emergencies while we publish your site-specific number.",
    "quick.call.urgent_prefix": "Urgent line: {phone}. Call immediately for severe pain, heavy bleeding, fever, breathing issues, or spreading infection.",
    "quick.call.ooh_suffix": " Out of hours: {phone}.",
    "quick.call.ooh_fallback": " Out of hours support: NHS 111.",

    // Welcome Screen
    "welcome.headline": "Welcome to GGO Compass",
    "welcome.subline": "Your personal guide from booking to recovery.",
    "welcome.button": "Begin",
    "welcome.privacy": "Your data never leaves this device.",

    // Splash Screen
    "splash.tagline": "Guiding you, step by step.",

    // Mode Select Screen
    "mode.headline": "How would you like to begin?",
    "mode.subline": "Choose your path forward.",
    "mode.explore.title": "Explore a Journey",
    "mode.explore.subtitle": "Learn about the process.",
    "mode.explore.description": "Browse all days freely. See what to expect at each phase — perfect for planning ahead or understanding the full journey.",
    "mode.explore.button": "Learn more",
    "mode.track.title": "Track My Journey",
    "mode.track.subtitle": "Follow your own path.",
    "mode.track.description": "You're booked and ready. See today's guidance and unlock each day automatically as you progress through recovery.",
    "mode.track.button": "Start my journey",

    // Personalise Screen
    "personalise.headline": "Make it yours",
    "personalise.subline": "Choose how you see and hear your journey.",
    "personalise.name.label": "What should we call you?",
    "personalise.name.optional": "(optional)",
    "personalise.name.placeholder": "Enter your name",
    "personalise.name.hint": "We’ll use this to personalise headers across your journey.",
    "personalise.pronouns.title": "Pronouns",
    "personalise.pronouns.subtitle": "Choose how we refer to you.",
    "personalise.tone.title": "Tone",
    "personalise.tone.subtitle": "Pick a language style that feels right.",
    "personalise.accessibility.title": "Accessibility",
    "personalise.accessibility.subtitle": "Adjust contrast, motion and readability.",
    "personalise.privacy": "Compass stores data only on your device.",
    "personalise.button": "Next",

    // Recovery Screen UI
    "recovery.surgery_date.label": "Surgery date:",
    "recovery.surgery_date.not_set": "Not set",
    "recovery.surgery_date.change": "Change",
    "recovery.surgery_date.set": "Set",
    "recovery.surgery_date.save": "Save",
    "recovery.surgery_date.cancel": "Cancel",
    "recovery.surgery_date.clear": "Clear",
    "recovery.progress.label": "Recovery progress: {progress}%",
    "recovery.mood.title": "Mood & Feeling",
    "recovery.note.placeholder": "Add a note...",
    "recovery.emergency.title": "Emergency Support",
    "recovery.emergency.subtitle": "Always available",
    "recovery.emergency.nhs111": "Call NHS 111",
    "recovery.emergency.nhs999": "999",
    "recovery.emergency.team": "Your surgical team",

    // Website Links (Editable in Sanity, hardcoded fallback)
    "link.main_website": "https://ggomedical.co.uk",
    "link.patient_info": "https://ggomedical.co.uk/patient-information",
    "link.anaesthesia_info": "https://ggomedical.co.uk/anaesthesia-explained",
    "link.preop_guide": "https://ggomedical.co.uk/preparing-for-surgery",

    // Get Ready Content (General)
    "prepare.headline": "Getting Ready for Your Procedure",
    "prepare.subline": "Everything you need to know before you arrive.",
    "prepare.anaesthesia.title": "Anaesthesia Information",
    "prepare.anaesthesia.content": "Depending on your procedure, you may have local, regional, or general anaesthesia. If you are having sedation or general anaesthesia, you MUST follow fasting instructions (no food for 6 hours, clear water only up to 2 hours before).",
    "prepare.bring.title": "What to Bring to Hospital",
    "prepare.bring.daycase": "For day-case procedures: Comfortable loose clothing, your regular medications, and something to read. You must have a responsible adult to drive you home and stay with you for 24 hours.",
    "prepare.bring.admitted": "For inpatient stays: Overnight bag with toiletries, pyjamas, slippers, and all current medications in their original packaging.",
    "prepare.ready.headline": "Final Checklist",
    "prepare.ready.items": "Confirm transport home; Prepare your recovery space; Check fasting times; Bring your medical records.",
};
