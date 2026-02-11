import { ProcedureContent, getVariationKey } from '../types';

/**
 * TURP - Transurethral Resection of the Prostate
 * 
 * Clinical Data Sources:
 * - NHS guidelines
 * - BAUS patient information
 * - Recovery timeline: 4-6 weeks complete recovery
 * - 1-4 day hospital stay with catheter
 * 
 * Key recovery milestones:
 * - Days 0-3: Hospital stay, catheter in place
 * - Week 1: Catheter removal, blood in urine common
 * - Weeks 2-4: Gradual improvement, blood may recur around day 10-14
 * - Weeks 4-6: Complete recovery, return to all activities
 */

export const turpFriendlyYou: ProcedureContent = {
    procedureId: 'turp',
    procedureName: 'TURP (Transurethral Resection of the Prostate)',
    recoveryType: 'overnight',
    totalRecoveryDays: 28, // 4 weeks minimum

    preOperative: {
        welcomeTitle: "Welcome to your TURP recovery journey",
        welcomeBody: "TURP is one of the most effective treatments for prostate enlargement. Most people experience significant improvement in urinary symptoms. Recovery takes 4-6 weeks, and we'll guide you through every step.",

        procedureDescription: "Your TURP involves removing excess prostate tissue through your urethra using a specialized instrument. There are no external incisions. The procedure is performed under spinal or general anaesthetic and takes 45-90 minutes. You'll stay in hospital for about 1-3 days with a catheter to drain urine while initial healing occurs.",

        preparationInstructions: [
            "Fast for 6 hours before your procedure",
            "Bring comfortable, loose clothing for after surgery",
            "Pack essentials for a 1-3 day hospital stay",
            "Arrange for someone to collect you from hospital",
            "Ensure you have paracetamol and laxatives at home",
            "Arrange time off work (2-4 weeks depending on job type)"
        ],

        faqs: [
            {
                question: "How long will the catheter stay in?",
                answer: "Typically 1-3 days. It's removed when your urine becomes clear and swelling subsides. If you have difficulty urinating after catheter removal, a new one may be inserted temporarily—this is not uncommon and doesn't indicate a problem."
            },
            {
                question: "Is blood in urine normal?",
                answer: "Yes, it's very common. Expect blood for 1-3 weeks. It often reappears around day 10-14 as scabs from the prostate fall away. Drinking plenty of fluids helps. Heavy bleeding or large clots require medical attention."
            },
            {
                question: "Will I be incontinent?",
                answer: "Temporary leakage is common after catheter removal but usually improves quickly. Close-to-normal bladder control is expected within 3-6 months. Pelvic floor exercises (Kegel exercises) help significantly."
            },
            {
                question: "What about sexual function?",
                answer: "Most men experience retrograde ejaculation after TURP—semen goes into the bladder instead of being expelled. This is permanent but harmless. Erectile function is usually preserved. Sexual activity can usually resume after about 4 weeks."
            },
            {
                question: "When can I return to work?",
                answer: "Desk jobs: 2-3 weeks. Physical jobs: 3-4 weeks. Full recovery takes 4-6 weeks. Don't rush back—your body needs time to heal."
            }
        ]
    },

    postOperative: {
        recoveryIntroTitle: "Your 4-week recovery plan",
        recoveryIntroBody: "TURP recovery requires patience. The first week is about managing the catheter and initial healing. Weeks 2-4 focus on gradually increasing activity while your prostate continues to heal. Most people see significant symptom improvement within a few weeks.",

        recoveryTimeline: [
            {
                dayNumber: 0,
                phase: 'surgery',
                title: "Surgery day—in hospital",
                normalExperiences: [
                    "Catheter in place draining into a bag",
                    "Some bladder discomfort or cramping (bladder spasms)",
                    "Blood in the catheter bag—this is normal",
                    "Grogginess from anaesthetic"
                ],
                forecast: "You'll stay in hospital for 1-4 days. The catheter may be uncomfortable but is essential for healing. Bladder spasms are common—medication can help.",
                activities: [
                    { label: "Rest in hospital bed", status: "allowed", icon: "Bed" },
                    { label: "Gentle walking on ward", status: "allowed", icon: "Footprints" },
                    { label: "Use bedside commode or toilet", status: "allowed", icon: "Toilet" }
                ],
                redFlags: [
                    "No urine draining through catheter",
                    "Severe pain not controlled by medication",
                    "Heavy bleeding or large blood clots blocking catheter"
                ],
                nurseNote: "Drink plenty of fluids to flush your system. The hospital staff will monitor your catheter and may perform bladder washouts if needed. Don't be alarmed by blood in the catheter bag—this is expected.",
                whyThisHappens: "The procedure removes prostate tissue, leaving a raw surface that bleeds and heals over time. The catheter keeps the bladder empty while swelling subsides and allows monitoring of bleeding."
            },
            {
                dayNumber: 3,
                phase: 'early',
                title: "Catheter removal day (typically)",
                normalExperiences: [
                    "Relief when catheter is removed",
                    "First urination may be difficult or painful",
                    "Increased urgency and frequency",
                    "Some leakage or dribbling is normal"
                ],
                forecast: "Once you can urinate on your own and urine is reasonably clear, you'll be discharged home. The first week at home focuses on rest and gradual mobility.",
                activities: [
                    { label: "Going home", status: "allowed", icon: "Home" },
                    { label: "Short walks", status: "allowed", icon: "Footprints" },
                    { label: "Shower", status: "allowed", icon: "ShowerHead" },
                    { label: "Driving", status: "avoid", icon: "Car" }
                ],
                nurseNote: "If you have difficulty urinating after catheter removal, don't panic. A temporary catheter may be reinserted for a few more days. This happens to some people and doesn't mean the surgery hasn't worked."
            },
            {
                dayNumber: 7,
                phase: 'healing',
                title: "One week at home",
                normalExperiences: [
                    "Blood in urine may still be present (pink to light red)",
                    "Urgency and frequency gradually improving",
                    "Stream strength improving noticeably",
                    "Some leakage when moving, coughing, or sneezing"
                ],
                forecast: "Most people are feeling significantly better by now. You're still healing internally, so take it easy. Blood may reappear around day 7-14—this is normal.",
                activities: [
                    { label: "Light activities at home", status: "allowed", icon: "Home" },
                    { label: "Short walks outdoors", status: "allowed", icon: "Footprints" },
                    { label: "Driving short distances", status: "caution", icon: "Car" },
                    { label: "Light housework", status: "caution", icon: "Home" }
                ],
                nurseNote: "Don't be alarmed if blood reappears around day 10-14—this is when scabs from the prostate fall away. Drink extra fluids and rest. If bleeding is heavy, contact your GP."
            },
            {
                dayNumber: 14,
                phase: 'healing',
                title: "Two weeks—steady improvement",
                normalExperiences: [
                    "Urine should be clearer most of the time",
                    "Frequency and urgency much improved",
                    "Leakage reducing",
                    "Stream strength good"
                ],
                forecast: "You're making excellent progress. Over the next 2 weeks, you can gradually increase activity and plan your return to work (desk jobs).",
                activities: [
                    { label: "Return to desk work", status: "caution", icon: "Briefcase" },
                    { label: "Driving regularly", status: "allowed", icon: "Car" },
                    { label: "Light exercise (walking)", status: "allowed", icon: "Footprints" },
                    { label: "Heavy lifting", status: "avoid", icon: "Dumbbell" }
                ],
                nurseNote: "Start pelvic floor exercises (Kegel exercises) if you haven't already—they significantly improve incontinence recovery. Squeeze the muscles you use to stop urinating mid-flow, hold for 3-5 seconds, repeat 10 times, 3 times daily."
            },
            {
                dayNumber: 21,
                phase: 'strengthening',
                title: "Three weeks—returning to normal",
                normalExperiences: [
                    "Urine should be clear",
                    "Frequency and urgency near normal",
                    "Minimal to no leakage",
                    "Feeling much more like yourself"
                ],
                forecast: "You're approaching full recovery. You can resume most normal activities. Sexual activity is usually delayed until around 4 weeks and should be cleared by your surgeon.",
                activities: [
                    { label: "All desk/office work", status: "allowed", icon: "Briefcase" },
                    { label: "Moderate exercise", status: "caution", icon: "Dumbbell" },
                    { label: "Sexual activity", status: "avoid", icon: "Heart" },
                    { label: "Physical work", status: "caution", icon: "Briefcase" }
                ],
                nurseNote: "Remember that retrograde ejaculation is permanent—semen will go into your bladder. This is normal after TURP and doesn't affect pleasure or erectile function. It just means no ejaculation externally."
            },
            {
                dayNumber: 28,
                phase: 'final',
                title: "Four weeks—recovery essentials complete",
                normalExperiences: [
                    "Urinary symptoms much improved from before surgery",
                    "Good bladder control (may still be improving)",
                    "Clear urine",
                    "Feeling back to normal"
                ],
                forecast: "You've completed the critical recovery period. Continue pelvic floor exercises. Full bladder control may take another 2-3 months to be optimal.",
                activities: [
                    { label: "All work activities", status: "allowed", icon: "Briefcase" },
                    { label: "All exercise", status: "allowed", icon: "Dumbbell" },
                    { label: "Sexual activity", status: "allowed", icon: "Heart" },
                    { label: "Heavy lifting (gradual)", status: "caution", icon: "Dumbbell" }
                ],
                nurseNote: "Congratulations on completing your recovery! Continue pelvic floor exercises for another 2-3 months to optimize bladder control. Attend your follow-up appointment to assess surgical success and symptom improvement."
            }
        ],

        generalRedFlags: [
            "Unable to pass urine and experiencing pain",
            "Heavy bleeding that doesn't stop after resting and drinking fluids",
            "Large blood clots preventing urination",
            "Fever above 38°C (100.4°F)",
            "Severe or increasing pain not controlled by painkillers",
            "Increasing urgency with burning sensation and cloudy/foul-smelling urine (infection)"
        ],

        activityRestrictions: {
            driving: "Avoid driving for about 2 weeks after surgery, or until you can comfortably perform an emergency stop and are no longer taking prescription pain medication. Resume gradually.",

            work: "Desk jobs: 2-3 weeks. Physical jobs involving lifting or exertion: 3-4 weeks. Full recovery takes 4-6 weeks—don't rush back if you're still experiencing symptoms.",

            exercise: "Walking: immediate (encouraged from hospital discharge). Light exercise: wait 2-3 weeks. Strenuous exercise, heavy lifting, vigorous activity: wait 4-6 weeks. Swimming: wait until bleeding has completely stopped and you're confident with bladder control (typically 3-4 weeks). Avoid straining or holding your breath during lifting.",

            sexualActivity: "Wait at least 4 weeks before resuming sexual activity. Remember that retrograde ejaculation is permanent after TURP—semen enters the bladder and comes out with urine later. This is normal and doesn't affect sexual pleasure or erectile function."
        }
    },

    uiMicrocopy: {
        checklistItems: [
            {
                key: "pain_relief",
                text: "Take prescribed painkillers as needed",
                category: "medication"
            },
            {
                key: "hydration",
                text: "Drink at least 2 litres of fluids daily",
                category: "activity"
            },
            {
                key: "monitor_urine",
                text: "Monitor urine for blood (pink/light red is normal)",
                category: "monitoring"
            },
            {
                key: "pelvic_floor",
                text: "Practice pelvic floor exercises (Kegel exercises)",
                category: "activity"
            },
            {
                key: "avoid_constipation",
                text: "Prevent constipation (use laxatives if needed)",
                category: "activity"
            },
            {
                key: "avoid_straining",
                text: "Avoid heavy lifting and straining",
                category: "activity"
            },
            {
                key: "gentle_walking",
                text: "Walk gently each day",
                category: "activity"
            }
        ],

        progressMessages: {
            dayComplete: "Well done! Another day of healing complete.",
            weekComplete: "Excellent progress! You've completed week {weekNumber} of recovery.",
            halfwayPoint: "You're halfway through your recovery—great work!",
            almostDone: "Nearly there! Just a bit more time for complete healing."
        },

        completionTitle: "Recovery complete—well done!",
        completionBody: "You've successfully completed your 4-week TURP recovery programme. You should be experiencing significant improvement in your urinary symptoms. Continue with pelvic floor exercises to optimize bladder control over the next few months. Make sure to attend your follow-up appointment to assess the success of your surgery."
    }
};

export const turp = {
    [getVariationKey('friendly', 'you')]: turpFriendlyYou
};
