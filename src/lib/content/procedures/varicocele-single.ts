import { ProcedureContent, getVariationKey } from '../types';

/**
 * MICROSURGICAL VARICOCELE CORRECTION - Single-sided
 * 
 * Clinical Data Sources:
 * - NHS Trust guidelines (UHS, Cambridge, Royal Devon)
 * - BAUS patient information
 * - Recovery timeline: 2-3 weeks complete recovery
 * - Day case or overnight stay procedure
 * 
 * Key recovery milestones:
 * - Days 0-3: Most pain and swelling, ice packs helpful
 * - Week 1: Return to light work, continued scrotal support
 * - Weeks 2-3: Resume normal activities, can return to full work
 * - Week 3+: Resume sexual activity, strenuous exercise
 */

export const varicoceleSingleFriendlyYou: ProcedureContent = {
    procedureId: 'varicocele-single',
    procedureName: 'Microsurgical Varicocele Correction (Single-sided)',
    recoveryType: 'day-case',
    totalRecoveryDays: 21,

    preOperative: {
        welcomeTitle: "Welcome to your varicocele surgery recovery journey",
        welcomeBody: "This procedure has excellent success rates for improving fertility and reducing discomfort. Most people recover fully within 2-3 weeks, and we'll support you through every step.",

        procedureDescription: "Your microsurgical varicocele correction involves tying off enlarged veins in your scrotum through a small groin incision. The surgeon uses a high-powered operating microscope to ensure precision and minimize complications. This is typically performed under general anaesthetic and takes about 60-90 minutes. You may go home the same day or stay overnight.",

        preparationInstructions: [
            "Fast for 6 hours before your procedure",
            "Shower on the morning of surgery",
            "Bring loose, comfortable clothing and supportive underwear",
            "Arrange for someone to drive you home",
            "Have paracetamol and ibuprofen at home",
            "Purchase scrotal support or tight-fitting underwear before surgery"
        ],

        faqs: [
            {
                question: "Will this improve my fertility?",
                answer: "Some men see improvement in sperm parameters after surgery, but results vary. Fertility-related changes typically take 3-6 months because it takes time for new sperm to develop. Your specialist will discuss what to expect for your situation."
            },
            {
                question: "How painful is the recovery?",
                answer: "Most people describe moderate discomfort rather than severe pain. The groin area may feel sore for the first week, and you'll need prescription painkillers for 2-3 days. By week 2, most people only need occasional paracetamol."
            },
            {
                question: "When can I return to work?",
                answer: "Desk jobs: typically 3-5 days. Physical jobs involving heavy lifting: 2-3 weeks. Listen to your body and don't rush back if you're still uncomfortable."
            },
            {
                question: "Will the varicocele come back?",
                answer: "Microsurgical repair has a low recurrence rate compared with other techniques because of the precision of the operating microscope. Your surgeon can discuss your individual risk."
            },
            {
                question: "When can I have sex again?",
                answer: "Wait at least 2 weeks before sexual activity. Resuming too early can put pressure on the incision and delay healing. Your surgeon will confirm when it's safe at your follow-up."
            }
        ]
    },

    postOperative: {
        recoveryIntroTitle: "Your 3-week recovery plan",
        recoveryIntroBody: "Varicocele repair recovery is straightforward for most people. The key is wearing scrotal support, managing swelling with ice, and gradually increasing your activity level. Here's your day-by-day guide.",

        recoveryTimeline: [
            {
                dayNumber: 0,
                phase: 'surgery',
                title: "Surgery day",
                normalExperiences: [
                    "Groin and scrotal discomfort—this is the most uncomfortable day",
                    "Swelling in the scrotum and groin area",
                    "You might notice bruising appearing",
                    "Feeling drowsy from the general anaesthetic"
                ],
                forecast: "Tonight and tomorrow will be the most uncomfortable period. Take your prescribed painkillers regularly and use ice packs to manage swelling.",
                activities: [
                    { label: "Rest at home", status: "allowed", icon: "Home" },
                    { label: "Gentle walking in the house", status: "allowed", icon: "Footprints" },
                    { label: "Ice packs (20 mins on/off)", status: "allowed", icon: "Snowflake" },
                    { label: "Driving", status: "avoid", icon: "Car" }
                ],
                redFlags: [
                    "Heavy bleeding from the incision",
                    "Severe pain not controlled by prescribed medication",
                    "Inability to pass urine",
                    "Fever above 38°C"
                ],
                nurseNote: "Wear your scrotal support continuously (except for showering). Apply ice packs for 20 minutes every few hours today and tomorrow—this really helps with swelling and pain.",
                whyThisHappens: "The scrotal area has an excellent blood supply, which means more swelling but also faster healing. The groin incision may cause discomfort because it's near abdominal muscles used for movement."
            },
            {
                dayNumber: 1,
                phase: 'early',
                title: "First full day of recovery",
                normalExperiences: [
                    "Swelling may look worse than yesterday—this peaks around days 2-3",
                    "Bruising may appear more prominent (yellow, purple, or blue)",
                    "Groin incision feels tender when moving",
                    "You might notice some hardness or tube-like structures above the testis (blood vessel clotting—normal)"
                ],
                forecast: "The next 48 hours are about managing swelling and discomfort. Take it easy, keep using ice, and wear your support.",
                activities: [
                    { label: "Shower (after 48hrs)", status: "caution", icon: "ShowerHead" },
                    { label: "Short walks", status: "allowed", icon: "Footprints" },
                    { label: "Light activities at home", status: "allowed", icon: "Home" },
                    { label: "Lifting anything over 10 lbs", status: "avoid", icon: "Dumbbell" }
                ],
                redFlags: [
                    "Increasing redness or warmth at incision",
                    "Green or foul-smelling discharge",
                    "Worsening pain despite medication"
                ],
                nurseNote: "Keep wearing that scrotal support! It makes a massive difference to comfort and reduces swelling. Continue ice packs regularly."
            },
            {
                dayNumber: 3,
                phase: 'early',
                title: "Turning the corner",
                normalExperiences: [
                    "Pain should be noticeably better",
                    "Swelling usually peaks today then starts improving",
                    "You might notice a hard ridge under the groin incision (normal healing)",
                    "Bruising may extend down the scrotum or penis"
                ],
                activities: [
                    { label: "Daily showers", status: "allowed", icon: "ShowerHead" },
                    { label: "Working from home (desk job)", status: "caution", icon: "Laptop" },
                    { label: "Walking outdoors", status: "allowed", icon: "Footprints" },
                    { label: "Driving short distances", status: "caution", icon: "Car" }
                ],
                nurseNote: "Most people feel significantly better by now. You're through the hardest part!"
            },
            {
                dayNumber: 5,
                phase: 'healing',
                title: "Steady improvement",
                normalExperiences: [
                    "Swelling reducing day by day",
                    "Pain minimal—may only need paracetamol occasionally",
                    "Incision starting to heal visibly",
                    "Energy levels improving"
                ],
                activities: [
                    { label: "Return to desk work", status: "allowed", icon: "Briefcase" },
                    { label: "Driving", status: "allowed", icon: "Car" },
                    { label: "Light household tasks", status: "allowed", icon: "Home" },
                    { label: "Heavy lifting", status: "avoid", icon: "Dumbbell" }
                ],
                nurseNote: "You can start reducing how much you wear the scrotal support, but it's still helpful for activities and walking."
            },
            {
                dayNumber: 7,
                phase: 'healing',
                title: "One week milestone",
                normalExperiences: [
                    "Significant reduction in swelling and bruising",
                    "Incision healing well",
                    "You can wear normal underwear comfortably",
                    "Feeling much more like yourself"
                ],
                forecast: "Over the next week, you'll continue to improve steadily. Most people feel ready to return to all normal activities by week 2-3.",
                activities: [
                    { label: "All normal daily activities", status: "allowed", icon: "Activity" },
                    { label: "Light walking only", status: "caution", icon: "Footprints" },
                    { label: "Return to physical work", status: "caution", icon: "Briefcase" }
                ],
                nurseNote: "Excellent progress! You can likely stop wearing scrotal support during the day, but it might still be helpful for longer walks or standing."
            },
            {
                dayNumber: 14,
                phase: 'strengthening',
                title: "Two weeks complete",
                normalExperiences: [
                    "Minimal to no swelling",
                    "Bruising faded significantly",
                    "Incision well-healed, just a thin scar line",
                    "The hard tube above the testis may still be present (normal, will dissolve over weeks)"
                ],
                forecast: "You're nearly at full recovery. Over the next week, you can gradually return to all activities including exercise and sexual activity.",
                activities: [
                    { label: "All regular work", status: "allowed", icon: "Briefcase" },
                    { label: "Moderate exercise", status: "caution", icon: "Dumbbell" },
                    { label: "Swimming", status: "allowed", icon: "Waves" },
                    { label: "Sexual activity", status: "caution", icon: "Heart" }
                ],
                nurseNote: "Many people feel ready to resume sexual activity from around 2 weeks if comfortable and pain-free. If unsure, wait longer or check at follow-up."
            },
            {
                dayNumber: 21,
                phase: 'final',
                title: "Three weeks—full recovery",
                normalExperiences: [
                    "Feeling completely back to normal",
                    "Scar maturing and fading",
                    "Any remaining hardness above testis gradually softening",
                    "No restrictions on activities"
                ],
                forecast: "You've completed your recovery! The varicocele should be resolved, and over the next 3-6 months, you may see improvements in fertility parameters if that was your goal.",
                activities: [
                    { label: "All activities unrestricted", status: "allowed", icon: "Activity" },
                    { label: "Strenuous exercise", status: "allowed", icon: "Dumbbell" },
                    { label: "Contact sports", status: "allowed", icon: "Trophy" },
                    { label: "Cycling", status: "allowed", icon: "Bike" }
                ],
                nurseNote: "Congratulations on completing your recovery! If fertility improvement was your goal, remember it takes 3-6 months for sperm parameters to improve. Schedule your follow-up semen analysis as recommended."
            }
        ],

        generalRedFlags: [
            "Increasing pain, redness, swelling, or warmth after the first few days",
            "Heavy bleeding from the incision",
            "Green, yellow, or foul-smelling discharge",
            "Fever above 38°C (100.4°F)",
            "Severe scrotal swelling that worsens rather than improves",
            "Hard, painful lump in the scrotum (could indicate haematoma)",
            "Difficulty passing urine"
        ],

        activityRestrictions: {
            driving: "Avoid for 24-48 hours after general anaesthetic. Resume when you can comfortably perform an emergency stop without pain (usually 3-5 days).",

            work: "Desk work: 3-5 days. Light physical work: 1 week. Heavy manual labor or jobs involving lifting: 2-3 weeks. Take it gradually and listen to your body.",

            exercise: "Walking: immediate (encouraged). Swimming: avoid for 2 weeks until incision fully healed. Light exercise (gym, gentle cardio): after 2 weeks if comfortable. Strenuous exercise, heavy lifting, contact sports: wait 3-4 weeks. Biking or activities with pressure on the groin: wait 3-4 weeks.",

            sexualActivity: "Wait at least 2 weeks before any sexual activity. Resuming too early can put pressure on the incision and delay healing. When you resume, start gently. Get clearance at your follow-up if you're uncertain."
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
                key: "ice_pack",
                text: "Apply ice pack for 20 minutes (first 48hrs)",
                category: "wound-care"
            },
            {
                key: "scrotal_support",
                text: "Wear scrotal support or tight underwear",
                category: "wound-care"
            },
            {
                key: "wound_check",
                text: "Check incision for signs of infection",
                category: "monitoring"
            },
            {
                key: "gentle_walking",
                text: "Walk gently each day to aid circulation",
                category: "activity"
            },
            {
                key: "avoid_lifting",
                text: "Avoid lifting anything over 10 lbs (4.5 kg)",
                category: "activity"
            },
            {
                key: "hydration",
                text: "Drink plenty of fluids",
                category: "activity"
            }
        ],

        progressMessages: {
            dayComplete: "Well done! Another day of healing complete.",
            weekComplete: "Fantastic! You've completed week {weekNumber} of recovery.",
            halfwayPoint: "You're halfway there—keep up the excellent work!",
            almostDone: "Nearly finished! Just a few more days to full recovery."
        },

        completionTitle: "Recovery complete—congratulations!",
        completionBody: "You've successfully completed your 3-week recovery programme. You should now be feeling back to normal and able to return to all activities. If fertility improvement was your goal, remember that sperm parameters typically improve over the next 3-6 months. Make sure to attend your follow-up appointment and any recommended semen analysis."
    }
};

export const varicoceleSingle = {
    [getVariationKey('friendly', 'you')]: varicoceleSingleFriendlyYou
};
