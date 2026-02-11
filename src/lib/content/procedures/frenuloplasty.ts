import { ProcedureContent, getVariationKey } from '../types';

/**
 * FRENULOPLASTY - Frenulum Repair
 * 
 * Clinical Data Sources:
 * - NHS Trust guidelines (Plymouth, Cambridge, Dorset)
 * - BAUS (British Association of Urological Surgeons) patient information
 * - Recovery timeline: 10 days initial healing, 4 weeks complete
 * - Day case procedure under local anaesthetic
 * 
 * Key recovery milestones:
 * - Days 0-3: Most swelling and discomfort
 * - Days 4-7: Significant improvement, stitches starting to dissolve
 * - Days 8-10: Initial healing complete
 * - Weeks 2-4: Complete healing, can resume sexual activity after week 4
 */

export const frenuloplastyFriendlyYou: ProcedureContent = {
    procedureId: 'frenuloplasty',
    procedureName: 'Frenuloplasty',
    recoveryType: 'day-case',
    totalRecoveryDays: 10,

    preOperative: {
        welcomeTitle: "Welcome to your frenuloplasty recovery journey",
        welcomeBody: "This quick procedure usually has excellent outcomes with minimal downtime. Most people complete initial healing within about 10-14 days, while full healing continues over several weeks. We'll guide you through every step of your recovery.",

        procedureDescription: "Your frenuloplasty involves surgically correcting a tight or short frenulum (the band of tissue on the underside of your penis). This is typically performed under local anaesthetic and takes about 15-30 minutes. You'll go home the same day with dissolvable stitches that will naturally fall out over 1-3 weeks.",

        preparationInstructions: [
            "Fast for 6 hours only if having general anaesthetic (local anaesthetic doesn't require fasting)",
            "Shower on the morning of your procedure",
            "Wear loose, comfortable underwear and trousers",
            "Arrange for someone to accompany you home",
            "Have paracetamol and ibuprofen at home for pain relief",
            "Stock up on petroleum jelly (Vaseline) for wound care"
        ],

        faqs: [
            {
                question: "Will it hurt?",
                answer: "With local anaesthetic, you won't feel pain during the procedure. Afterwards, most people describe mild discomfort rather than severe pain. Erections may be uncomfortable initially, but simple painkillers work well for most patients."
            },
            {
                question: "Will the stitches need removing?",
                answer: "No, we use dissolvable stitches that fall out naturally within 2-3 weeks. You don't need to do anything—just let them dissolve on their own. It's normal to see some white healing tissue as the stitches dissolve."
            },
            {
                question: "How soon can I shower?",
                answer: "You can shower from 24-48 hours after your procedure. Let warm water run over the area gently—avoid vigorous washing. Pat dry carefully afterwards. Avoid baths for at least 72 hours (3 days)."
            },
            {
                question: "When can I resume sexual activity?",
                answer: "Wait at least 4 weeks before any sexual activity, including masturbation. The most important factor is that the wound should be completely healed and pain-free. Your surgeon will confirm when it's safe at your follow-up."
            },
            {
                question: "Will this completely fix the problem?",
                answer: "Most people experience improved comfort during erection and sexual activity once fully healed. The scar will soften and fade over several months."
            }
        ]
    },

    postOperative: {
        recoveryIntroTitle: "Your 10-day recovery plan",
        recoveryIntroBody: "Frenuloplasty has one of the quickest recovery times of all penile procedures. Most people feel back to normal within 1-2 weeks, though you'll need to wait longer before resuming sexual activity. Here's what to expect day by day.",

        recoveryTimeline: [
            {
                dayNumber: 0,
                phase: 'surgery',
                title: "Surgery day",
                normalExperiences: [
                    "The area will be numb for a few hours from the local anaesthetic",
                    "You might notice minor bleeding or oozing—completely normal",
                    "Some swelling is expected, which may look more dramatic than it feels",
                    "The frenulum area may look different than expected initially"
                ],
                forecast: "Tonight you might experience some discomfort, especially if you get an erection. This is the most common complaint in the first 24-48 hours.",
                activities: [
                    { label: "Rest at home", status: "allowed", icon: "Home" },
                    { label: "Gentle walking", status: "allowed", icon: "Footprints" },
                    { label: "Shower", status: "avoid", icon: "ShowerHead" },
                    { label: "Driving (after local anaesthetic)", status: "caution", icon: "Car" }
                ],
                redFlags: [
                    "Heavy bleeding that doesn't stop with gentle pressure",
                    "Severe pain not relieved by prescribed painkillers",
                    "Difficulty passing urine"
                ],
                nurseNote: "Take your painkillers regularly today. If nighttime erections are painful, try emptying your bladder before bed and sleeping on your side with your knees bent.",
                whyThisHappens: "Swelling is your body's natural response to surgical trauma. The area might look more swollen than expected because the frenulum has a rich blood supply. This is normal and will settle quickly."
            },
            {
                dayNumber: 1,
                phase: 'early',
                title: "The day after",
                normalExperiences: [
                    "Swelling typically peaks today or tomorrow",
                    "Morning erections might be uncomfortable—this is very common",
                    "You might see some dried blood on your underwear",
                    "The area may feel tender to touch"
                ],
                forecast: "Over the next 24 hours, you should start to feel more comfortable. Swelling often peaks by day 2-3, then improves steadily.",
                activities: [
                    { label: "Daily shower (gentle, after 24hrs)", status: "allowed", icon: "ShowerHead" },
                    { label: "Light activities at home", status: "allowed", icon: "Home" },
                    { label: "Short walks", status: "allowed", icon: "Footprints" },
                    { label: "Driving", status: "allowed", icon: "Car" },
                    { label: "Bath", status: "avoid", icon: "Bath" }
                ],
                redFlags: [
                    "Increasing redness spreading beyond the wound",
                    "Green, yellow, or foul-smelling discharge",
                    "Fever or feeling generally unwell"
                ],
                nurseNote: "Remember to apply petroleum jelly to the stitched area and the tip of your penis to prevent sticking to underwear. This makes a huge difference to comfort!",
                whyThisHappens: "The rich blood supply to the genital area means swelling can be dramatic initially, but it also means you heal very quickly. What looks worrying today will look much better in 2-3 days."
            },
            {
                dayNumber: 3,
                phase: 'early',
                title: "Swelling peak",
                normalExperiences: [
                    "Swelling may be at its peak and should start to reduce soon",
                    "Pain should be noticeably better than day 1",
                    "You might see the stitches more clearly as swelling goes down",
                    "Some white healing tissue around the stitches is normal"
                ],
                activities: [
                    { label: "Normal daily activities", status: "allowed", icon: "Activity" },
                    { label: "Return to work (desk job)", status: "caution", icon: "Briefcase" },
                    { label: "Light exercise (walking)", status: "allowed", icon: "Footprints" },
                    { label: "Bathing", status: "allowed", icon: "Bath" }
                ],
                nurseNote: "Most people turn a corner around now. The worst is behind you! Keep up with the petroleum jelly applications and daily showers."
            },
            {
                dayNumber: 5,
                phase: 'healing',
                title: "Rapid improvement",
                normalExperiences: [
                    "Swelling significantly reduced",
                    "Stitches may be starting to loosen or fall out",
                    "The area should feel much more comfortable",
                    "You can probably wear normal underwear now"
                ],
                forecast: "Over the next few days, you'll continue to improve rapidly. The worst is definitely over.",
                activities: [
                    { label: "All normal daily activities", status: "allowed", icon: "Activity" },
                    { label: "Return to work (all jobs)", status: "allowed", icon: "Briefcase" },
                    { label: "Light exercise", status: "caution", icon: "Dumbbell" }
                ],
                nurseNote: "You might be tempted to do more, but remember—no sexual activity yet! Give your body the full 4 weeks to heal completely."
            },
            {
                dayNumber: 7,
                phase: 'healing',
                title: "One week milestone",
                normalExperiences: [
                    "Most stitches have fallen out or are very loose",
                    "Minimal swelling remaining",
                    "The scar line is visible but healing well",
                    "You should be feeling almost back to normal"
                ],
                forecast: "Over the next week, the stitches will completely dissolve, and the scar will continue to mature and fade.",
                activities: [
                    { label: "All normal activities", status: "allowed", icon: "Activity" },
                    { label: "Moderate exercise", status: "caution", icon: "Dumbbell" },
                    { label: "Cycling", status: "caution", icon: "Bike" }
                ],
                nurseNote: "Excellent progress! If you're uncircumcised and your surgeon advised it, gently retract the foreskin daily to prevent scarring—pull back only as far as comfortable."
            },
            {
                dayNumber: 10,
                phase: 'strengthening',
                title: "Initial healing complete",
                normalExperiences: [
                    "Stitches should be mostly dissolved",
                    "The wound looks well-healed",
                    "Minimal to no discomfort",
                    "The area should feel comfortable during normal activities"
                ],
                forecast: "Over the next 2-3 weeks, the scar will continue to mature and fade. You're nearly ready to resume all activities, but remember to wait the full 4 weeks before sexual activity.",
                activities: [
                    { label: "All regular activities", status: "allowed", icon: "Activity" },
                    { label: "Exercise (cycling with caution)", status: "caution", icon: "Bike" }
                ],
                nurseNote: "Congratulations on completing the initial healing phase! The scar will continue to improve cosmetically over the next 6-9 months. If you haven't already, schedule your follow-up appointment."
            }
        ],

        generalRedFlags: [
            "Increasing pain, redness, swelling, or warmth after the first few days",
            "Green, yellow, or foul-smelling discharge from the wound",
            "Fever (temperature above 38°C/100.4°F)",
            "Heavy bleeding that doesn't stop within minutes",
            "Black or very dark tissue at the wound site",
            "Stitches causing significant discomfort after 4 weeks (very rare)",
            "Unable to pass urine"
        ],

        activityRestrictions: {
            driving: "Avoid for 24 hours after general anaesthetic only. With local anaesthetic, you can drive home the same day as long as you feel comfortable and able to perform an emergency stop.",

            work: "Most people return to work when they feel comfortable, typically 2-5 days. Desk jobs: can return after 2-3 days if comfortable. Physical jobs: may need 5-7 days. Let comfort be your guide.",

            exercise: "Light walking: immediate. Moderate exercise (gym, jogging): wait 7-10 days. Cycling and contact sports: wait 2-3 weeks. Swimming: wait until stitches have dissolved and the wound is fully closed (typically 2-3 weeks). Vigorous exercise: resume gradually from week 2.",

            sexualActivity: "Wait at least 4 weeks before any sexual activity, including masturbation. The most important factor is that the wound should be completely healed and pain-free. Get clearance from your surgeon at your follow-up appointment before resuming."
        }
    },

    uiMicrocopy: {
        checklistItems: [
            {
                key: "pain_relief",
                text: "Take painkillers if needed (paracetamol or ibuprofen)",
                category: "medication"
            },
            {
                key: "salt_bath",
                text: "If advised, rinse with warm saline after day 3",
                category: "wound-care"
            },
            {
                key: "petroleum_jelly",
                text: "Apply petroleum jelly to prevent sticking",
                category: "wound-care"
            },
            {
                key: "gentle_retraction",
                text: "Gently retract foreskin daily",
                category: "wound-care"
            },
            {
                key: "loose_clothing",
                text: "Wear loose, comfortable clothing",
                category: "activity"
            },
            {
                key: "wound_check",
                text: "Check for signs of infection",
                category: "monitoring"
            },
            {
                key: "avoid_stimulation",
                text: "Avoid sexual stimulation",
                category: "activity"
            }
        ],

        progressMessages: {
            dayComplete: "Well done! Another day closer to full recovery.",
            weekComplete: "Excellent progress! You've completed week {weekNumber}.",
            halfwayPoint: "You're halfway through your initial recovery period!",
            almostDone: "Nearly there! Just a few more days of careful care needed."
        },

        completionTitle: "Initial healing complete—excellent work!",
        completionBody: "You've successfully completed your 10-day recovery programme. The initial healing is complete, and you should be feeling much more comfortable. Remember to wait the full 4 weeks before resuming sexual activity, and attend your follow-up appointment for final clearance."
    }
};

export const frenuloplasty = {
    [getVariationKey('friendly', 'you')]: frenuloplastyFriendlyYou
};
