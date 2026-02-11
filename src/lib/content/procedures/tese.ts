import { ProcedureContent, getVariationKey } from '../types';

/**
 * MICROSCOPE-ASSISTED TESTICULAR SPERM EXTRACTION (TeSE)
 * 
 * Clinical Data Sources:
 * - NHS Trust guidelines (Manchester, Cambridge)
 * - BAUS patient information
 * - Recovery timeline: 7-14 days
 * - Day case procedure under general anaesthetic
 * 
 * Key recovery milestones:
 * - Days 0-2: Most discomfort, ice packs and scrotal support essential
 * - Days 3-7: Significant improvement, stitches dissolving
 * - Week 2: Complete recovery for most patients
 */

export const teseFriendlyYou: ProcedureContent = {
    procedureId: 'tese',
    procedureName: 'Microscope-Assisted Testicular Sperm Extraction (TeSE)',
    recoveryType: 'day-case',
    totalRecoveryDays: 7,

    preOperative: {
        welcomeTitle: "Welcome to your TeSE recovery journey",
        welcomeBody: "This procedure is a crucial step in your fertility journey. Most people recover within 1-2 weeks with minimal complications. We'll guide you through every step of your recovery.",

        procedureDescription: "Your microscope-assisted testicular sperm extraction involves retrieving sperm directly from your testicular tissue through a small scrotal incision. The surgeon uses a high-powered operating microscope to identify the best areas for sperm extraction while minimizing tissue damage. This is performed under general anaesthetic and takes about 2-4 hours. You'll go home the same day with dissolvable stitches.",

        preparationInstructions: [
            "Fast for 6 hours before your procedure",
            "Shower on the morning of surgery",
            "Bring loose, comfortable clothing",
            "Purchase a scrotal support (jockstrap) before surgery—essential for recovery",
            "Arrange for someone to drive you home and stay with you for 24 hours",
            "Have paracetamol, ibuprofen, and ice packs ready at home"
        ],

        faqs: [
            {
                question: "Will this hurt?",
                answer: "You'll have general anaesthetic, so you won't feel anything during the procedure. Afterwards, most people describe mild to moderate aching for a few days. Simple painkillers work well for most patients, though some may need stronger medication for the first 2-3 days."
            },
            {
                question: "Will they find sperm?",
                answer: "Microscope-assisted TeSE can improve sperm retrieval in some men, but success varies depending on the underlying cause. Your fertility specialist will discuss your specific chances based on your diagnosis."
            },
            {
                question: "How long off work?",
                answer: "Most people return to work within 1-2 weeks. Desk jobs: typically 3-7 days. Physical jobs: 10-14 days. Listen to your body and don't rush back."
            },
            {
                question: "Will I need this again?",
                answer: "Usually, retrieved sperm can be frozen for future use in IVF/ICSI cycles. If sperm is found and successfully frozen, you may not need another TeSE procedure."
            },
            {
                question: "When can I have sex again?",
                answer: "Wait at least 1-2 weeks before sexual activity, or until you feel completely comfortable. Your surgeon will confirm timing at your follow-up."
            }
        ]
    },

    postOperative: {
        recoveryIntroTitle: "Your 7-day recovery plan",
        recoveryIntroBody: "TeSE recovery is relatively quick for most people. The keys to a smooth recovery are: wearing scrotal support (often for about 2 weeks), using ice packs, resting for the first 48 hours, and avoiding strenuous activity for 2 weeks. Here's what to expect.",

        recoveryTimeline: [
            {
                dayNumber: 0,
                phase: 'surgery',
                title: "Surgery day",
                normalExperiences: [
                    "Grogginess from general anaesthetic",
                    "Scrotal discomfort and aching—this is the most uncomfortable day",
                    "Swelling starting to appear",
                    "Minor bleeding or oozing from the incision"
                ],
                forecast: "Tonight and tomorrow will be the most uncomfortable. Take your painkillers regularly, use ice packs, and keep that scrotal support on.",
                activities: [
                    { label: "Rest at home", status: "allowed", icon: "Home" },
                    { label: "Ice packs (20 min on/off)", status: "allowed", icon: "Snowflake" },
                    { label: "Gentle walking in the house", status: "caution", icon: "Footprints" },
                    { label: "Driving", status: "avoid", icon: "Car" }
                ],
                redFlags: [
                    "Heavy bleeding from the incision",
                    "Severe pain not controlled by medication",
                    "Difficulty passing urine",
                    "Fever above 38°C"
                ],
                nurseNote: "Wear your scrotal support continuously (even while sleeping) for the first 48 hours. Apply ice for 20 minutes every 2-3 hours today—this really helps with pain and swelling.",
                whyThisHappens: "The testis has a rich blood supply, so swelling is expected. The procedure involves tissue extraction, which causes more inflammation than other scrotal procedures. This settles quickly with proper care."
            },
            {
                dayNumber: 1,
                phase: 'early',
                title: "First full day",
                normalExperiences: [
                    "Swelling may look worse than yesterday—peaks at days 1-2",
                    "Bruising appearing (yellow, purple, or blue discoloration)",
                    "Aching continues but should be manageable with painkillers",
                    "Feeling tired from the anaesthetic and healing process"
                ],
                activities: [
                    { label: "Rest at home", status: "allowed", icon: "Home" },
                    { label: "Continue ice packs", status: "allowed", icon: "Snowflake" },
                    { label: "Short walks indoors", status: "allowed", icon: "Footprints" },
                    { label: "Shower (gently)", status: "caution", icon: "ShowerHead" }
                ],
                nurseNote: "Keep wearing that scrotal support! Continue ice packs regularly. Rest is crucial these first 48-72 hours—resist the urge to do too much."
            },
            {
                dayNumber: 3,
                phase: 'early',
                title: "Turning point",
                normalExperiences: [
                    "Swelling starting to reduce",
                    "Pain noticeably better—many people stop stronger painkillers now",
                    "Bruising may be more prominent but will start fading",
                    "Energy levels improving"
                ],
                forecast: "You've turned the corner! The next few days will show steady improvement.",
                activities: [
                    { label: "Light activities at home", status: "allowed", icon: "Home" },
                    { label: "Short walks outdoors", status: "allowed", icon: "Footprints" },
                    { label: "Working from home (desk job)", status: "caution", icon: "Laptop" },
                    { label: "Driving short distances", status: "caution", icon: "Car" }
                ],
                nurseNote: "You can reduce scrotal support to daytime only now, but keep wearing it during activities and when out and about."
            },
            {
                dayNumber: 5,
                phase: 'healing',
                title: "Steady improvement",
                normalExperiences: [
                    "Swelling much reduced",
                    "Minimal discomfort—paracetamol occasionally if needed",
                    "Stitches starting to dissolve",
                    "Feeling mostly back to normal"
                ],
                activities: [
                    { label: "Return to desk work", status: "allowed", icon: "Briefcase" },
                    { label: "All normal daily activities", status: "allowed", icon: "Activity" },
                    { label: "Light exercise (walking)", status: "caution", icon: "Footprints" },
                    { label: "Heavy lifting", status: "avoid", icon: "Dumbbell" }
                ],
                nurseNote: "Most people feel quite normal by now. Remember—no strenuous activity or heavy lifting for another week."
            },
            {
                dayNumber: 7,
                phase: 'final',
                title: "One week—recovery complete",
                normalExperiences: [
                    "Minimal to no swelling",
                    "Incision healing well",
                    "Stitches dissolved or nearly gone",
                    "Feeling back to normal"
                ],
                forecast: "You've completed your recovery! You can gradually return to all activities, including exercise and sexual activity when comfortable.",
                activities: [
                    { label: "All normal activities", status: "allowed", icon: "Activity" },
                    { label: "Return to physical work", status: "caution", icon: "Briefcase" },
                    { label: "Light to moderate exercise", status: "caution", icon: "Dumbbell" },
                    { label: "Sexual activity", status: "caution", icon: "Heart" }
                ],
                nurseNote: "Excellent! Most people are fully recovered by 1-2 weeks. Continue avoiding strenuous exercise or heavy lifting for another week (total 14 days). Your fertility clinic will contact you about next steps for IVF/ICSI if sperm was successfully retrieved and frozen."
            }
        ],

        generalRedFlags: [
            "Increasing pain, redness, swelling, or heat after the first few days",
            "Heavy bleeding or blood clots from the incision",
            "Green, yellow, or foul-smelling discharge",
            "Fever above 38°C (100.4°F)",
            "Severe scrotal swelling or a hard, painful lump (haematoma)",
            "Difficulty passing urine"
        ],

        activityRestrictions: {
            driving: "Avoid for 24 hours after general anaesthetic. Resume when you feel comfortable and can perform an emergency stop without pain (usually 3-5 days).",

            work: "Desk jobs: 3-7 days. Physical jobs: 10-14 days. Listen to your body—if it's uncomfortable, wait a bit longer.",

            exercise: "Walking: immediate (encouraged from day 1). Light exercise: wait 7-10 days. Strenuous exercise, heavy lifting (over 10 lbs), vigorous activity: wait 10-14 days minimum. Contact sports: wait 2-4 weeks.",

            sexualActivity: "Wait at least 1-2 weeks before any sexual activity, or until you feel completely comfortable. Start gently when you resume. Get clearance at your follow-up if you're uncertain."
        }
    },

    uiMicrocopy: {
        checklistItems: [
            {
                key: "pain_relief",
                text: "Take painkillers regularly (paracetamol, codeine, or ibuprofen)",
                category: "medication"
            },
            {
                key: "ice_pack",
                text: "Apply ice pack to scrotum for 20 minutes (first 24-48hrs)",
                category: "wound-care"
            },
            {
                key: "scrotal_support",
                text: "Wear scrotal support (jockstrap) continuously",
                category: "wound-care"
            },
            {
                key: "rest",
                text: "Rest for 48-72 hours at home",
                category: "activity"
            },
            {
                key: "wound_check",
                text: "Check incision for signs of infection",
                category: "monitoring"
            },
            {
                key: "avoid_lifting",
                text: "Avoid heavy lifting and strenuous activity",
                category: "activity"
            },
            {
                key: "stay_mobile",
                text: "Walk gently each day to reduce clot risk",
                category: "activity"
            }
        ],

        progressMessages: {
            dayComplete: "Well done! Another day of healing complete.",
            weekComplete: "Excellent! You've completed your recovery week.",
            halfwayPoint: "You're halfway through—keep up the good work!",
            almostDone: "Nearly there! Just a bit more time needed."
        },

        completionTitle: "Recovery complete—excellent work!",
        completionBody: "You've successfully completed your TeSE recovery programme. You should now be feeling back to normal and able to return to all activities. Your fertility clinic will be in touch about next steps. Make sure to attend your follow-up appointment."
    }
};

export const tese = {
    [getVariationKey('friendly', 'you')]: teseFriendlyYou
};
