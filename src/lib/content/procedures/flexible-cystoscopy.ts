import { ProcedureContent, getVariationKey } from '../types';

/**
 * FLEXIBLE CYSTOSCOPY
 * 
 * Clinical Data Sources:
 * - NHS Trust guidelines (multiple trusts)
 * - BAUS patient information
 * - Recovery timeline: 1-3 days
 * - Outpatient procedure under local anaesthetic
 * 
 * Key recovery points:
 * - Minimal recovery needed - can return to work same/next day
 * - Drink plenty of fluids for 24-72 hours
 * - Light pink urine for up to 48 hours is normal
 * - Burning sensation when urinating for up to 48 hours
 */

export const flexibleCystoscopyFriendlyYou: ProcedureContent = {
    procedureId: 'flexible-cystoscopy',
    procedureName: 'Flexible Cystoscopy',
    recoveryType: 'day-case',
    totalRecoveryDays: 3,

    preOperative: {
        welcomeTitle: "Welcome to your cystoscopy journey",
        welcomeBody: "This is a quick diagnostic procedure with minimal recovery time. Most people return to normal activities the same day or next day. We'll guide you through what to expect.",

        procedureDescription: "Your flexible cystoscopy involves examining your bladder using a thin, flexible camera inserted through your urethra. Local anaesthetic gel is used to minimize discomfort. The procedure takes about 5-15 minutes. You can usually drive yourself home and return to work the same day.",

        preparationInstructions: [
            "No fasting required—you can eat and drink normally before and after",
            "Wear comfortable clothing",
            "You may drive yourself (local anaesthetic only)",
            "Have paracetamol at home in case of mild discomfort",
            "Plan to drink plenty of water after the procedure"
        ],

        faqs: [
            {
                question: "Will it hurt?",
                answer: "Local anaesthetic gel makes the procedure uncomfortable rather than painful for most people. You'll feel pressure and an urge to urinate, but most people describe it as tolerable. The discomfort is brief—the procedure only takes 5-15 minutes."
            },
            {
                question: "Is blood in urine normal?",
                answer: "Yes, light pink urine for up to 48 hours is completely normal. Dark red blood or clots are not normal and require medical attention. Drinking plenty of fluids helps clear the blood."
            },
            {
                question: "Can I drive after?",
                answer: "Yes, with local anaesthetic gel only, you can drive yourself. If you had sedation or general anaesthetic (rigid cystoscopy), you cannot drive for 24 hours."
            },
            {
                question: "When can I return to work?",
                answer: "Most people return to work the same day or next day. If you had sedation or feel uncomfortable, take the day off."
            },
            {
                question: "How soon will I get results?",
                answer: "Your doctor may discuss initial findings immediately after the procedure. If a biopsy was taken, results typically take 1-2 weeks."
            }
        ]
    },

    postOperative: {
        recoveryIntroTitle: "Your 3-day recovery plan",
        recoveryIntroBody: "Flexible cystoscopy has one of the easiest recoveries of all urological procedures. The key is drinking plenty of fluids to flush your system and avoiding heavy lifting for a day or two. Most people experience minor symptoms for 24-48 hours then return to normal.",

        recoveryTimeline: [
            {
                dayNumber: 0,
                phase: 'surgery',
                title: "Procedure day",
                normalExperiences: [
                    "Burning or stinging when passing urine—very common",
                    "Needing to urinate more frequently than usual",
                    "Light pink urine (may appear after you get home)",
                    "Mild discomfort in the urethra or bladder area"
                ],
                forecast: "The burning sensation when urinating is the main complaint for the first 24-48 hours. This is completely normal and will improve quickly.",
                activities: [
                    { label: "Return to work", status: "allowed", icon: "Briefcase" },
                    { label: "Driving", status: "allowed", icon: "Car" },
                    { label: "All normal activities", status: "allowed", icon: "Activity" },
                    { label: "Strenuous exercise", status: "caution", icon: "Dumbbell" }
                ],
                redFlags: [
                    "Unable to pass urine",
                    "Heavy bleeding or blood clots",
                    "Severe pain not relieved by paracetamol",
                    "Fever above 38°C"
                ],
                nurseNote: "Drink at least 2 litres (3-4 pints) of water over the next 24 hours. This really helps reduce the burning sensation and clears any blood from your system. Avoid caffeine and alcohol for 48 hours. Sitting in a warm bath can help with discomfort.",
                whyThisHappens: "The flexible camera causes minor irritation to the delicate urethra lining. Your body responds with mild inflammation, causing the burning sensation and frequency. This settles within 48 hours as the inflammation resolves."
            },
            {
                dayNumber: 1,
                phase: 'early',
                title: "The day after",
                normalExperiences: [
                    "Burning sensation improving but still present",
                    "Urine should be clearer or just slightly pink",
                    "Frequency improving",
                    "Feeling mostly back to normal"
                ],
                activities: [
                    { label: "All normal activities", status: "allowed", icon: "Activity" },
                    { label: "Light exercise", status: "allowed", icon: "Footprints" },
                    { label: "Moderate exercise", status: "caution", icon: "Dumbbell" }
                ],
                nurseNote: "Keep drinking plenty of fluids. Most people feel almost normal by today. Avoid caffeine and alcohol as they can irritate the bladder."
            },
            {
                dayNumber: 2,
                phase: 'final',
                title: "Day 2—recovery complete",
                normalExperiences: [
                    "Minimal to no burning when urinating",
                    "Urine should be clear",
                    "Urinary frequency back to normal",
                    "Feeling completely normal"
                ],
                forecast: "You're essentially fully recovered! If a biopsy was taken, slight bleeding may continue for another day or two—this is normal.",
                activities: [
                    { label: "All activities unrestricted", status: "allowed", icon: "Activity" },
                    { label: "All exercise", status: "allowed", icon: "Dumbbell" },
                    { label: "Swimming", status: "allowed", icon: "Waves" }
                ],
                nurseNote: "Excellent! Most people are completely back to normal by 48-72 hours. Continue with your normal fluid intake. If you had a biopsy and still have light bleeding, this can continue for up to 3-5 days—keep drinking fluids."
            }
        ],

        generalRedFlags: [
            "Unable to pass urine and experiencing abdominal pain",
            "Heavy bleeding that doesn't stop",
            "Significant blood clots",
            "High temperature or fever (above 38°C)",
            "Persistent or worsening pain when urinating after 2-3 days",
            "Cloudy urine with unpleasant smell (possible infection)",
            "Feeling generally unwell or experiencing chills"
        ],

        activityRestrictions: {
            driving: "You can drive yourself home after local anaesthetic. Avoid driving for 24 hours if you had sedation.",

            work: "Most people return to work the same day or next day. Take the day off if you feel uncomfortable.",

            exercise: "Light activity: same day. Moderate exercise: next day. Strenuous exercise or heavy lifting: wait 24-48 hours and until bleeding settles. Swimming: wait until urine is completely clear (usually 2-3 days).",

            sexualActivity: "No specific restrictions, but you may prefer to wait 24-48 hours until symptoms settle. Use your comfort as a guide."
        }
    },

    uiMicrocopy: {
        checklistItems: [
            {
                key: "hydration",
                text: "Drink at least 2 litres of water over 24 hours",
                category: "activity"
            },
            {
                key: "pain_relief",
                text: "Take paracetamol if needed for discomfort",
                category: "medication"
            },
            {
                key: "urine_check",
                text: "Monitor urine for blood (light pink is normal)",
                category: "monitoring"
            },
            {
                key: "avoid_irritants",
                text: "Avoid caffeine and alcohol for 48 hours",
                category: "activity"
            },
            {
                key: "warm_bath",
                text: "Take a warm bath if experiencing discomfort",
                category: "wound-care"
            }
        ],

        progressMessages: {
            dayComplete: "Well done! Another day closer to full recovery.",
            weekComplete: "You've completed your recovery!",
            halfwayPoint: "Halfway there—symptoms should be improving.",
            almostDone: "Almost done—you should be feeling much better now."
        },

        completionTitle: "Recovery complete!",
        completionBody: "You've successfully completed your recovery from flexible cystoscopy. You should be feeling completely back to normal. If a biopsy was taken, your doctor will contact you with results in 1-2 weeks. If you have any concerns after this point, don't hesitate to contact your GP or the urology department."
    }
};

export const flexibleCystoscopy = {
    [getVariationKey('friendly', 'you')]: flexibleCystoscopyFriendlyYou
};
