import { ProcedureContent, getVariationKey } from '../types';

/**
 * CIRCUMCISION - Adult Male Circumcision
 * 
 * Clinical Data Sources:
 * - NHS Trust guidelines (UCLH, Leeds, Royal Berkshire)
 * - BAUS (British Association of Urological Surgeons) patient information
 * - Recovery timeline: 2-6 weeks for complete healing
 * - Day case procedure under local or general anaesthetic
 * 
 * Key recovery milestones:
 * - Days 0-3: Most discomfort, swelling, bruising
 * - Week 1: Gradually improving, return to light activities
 * - Weeks 2-3: Stitches dissolving, reduced swelling
 * - Weeks 4-6: Complete healing, resume all activities
 */

// BASE CONTENT: Friendly tone, "you" pronouns
export const circumcisionFriendlyYou: ProcedureContent = {
    procedureId: 'circumcision',
    procedureName: 'Circumcision',
    recoveryType: 'day-case',
    totalRecoveryDays: 14,

    preOperative: {
        welcomeTitle: "Welcome to your circumcision recovery journey",
        welcomeBody: "We're here to support you through every step of your recovery. Most people complete initial healing in around 2 weeks, while full healing and scar maturation can take several more weeks. We'll guide you day by day to ensure the best possible outcome.",

        procedureDescription: "Your circumcision involves the surgical removal of the foreskin. This is typically performed under local or general anaesthetic and takes about 30-45 minutes. You'll go home the same day with dissolvable stitches that will naturally fall out over 2-3 weeks.",

        preparationInstructions: [
            "Fast for 6 hours before your procedure if having general anaesthetic",
            "Shower on the morning of your operation",
            "Wear loose, comfortable underwear and trousers",
            "Arrange for someone to drive you home",
            "Have paracetamol and ibuprofen at home for pain relief"
        ],

        faqs: [
            {
                question: "Will it hurt?",
                answer: "You'll have local anaesthetic during the procedure, so you won't feel pain. Afterwards, most people describe mild to moderate discomfort rather than severe pain. Simple painkillers like paracetamol and ibuprofen work well for most patients."
            },
            {
                question: "When can I shower?",
                answer: "You can shower from 24 hours after your procedure. In fact, daily showers help keep the wound clean and promote healing. Just let warm water run over the area—no need for soap directly on the wound initially."
            },
            {
                question: "How long off work?",
                answer: "Most people take about one week off work. If you have a desk job, you might manage with 3-5 days. For physical work or heavy lifting, plan for 2-3 weeks. Your surgeon's advice should guide you."
            },
            {
                question: "What about the stitches?",
                answer: "Your stitches are dissolvable and will fall out naturally over 2-3 weeks, though some can persist a bit longer. You don't need to do anything—just let them do their job. If any stitches are still present after 4-6 weeks and causing discomfort, contact your GP."
            },
            {
                question: "When can I have sex again?",
                answer: "Wait at least 4 weeks before any sexual activity, including masturbation. This gives the wound time to heal and the stitches time to dissolve. Your surgeon will confirm when it's safe during your follow-up."
            }
        ]
    },

    postOperative: {
        recoveryIntroTitle: "Your 14-day recovery plan",
        recoveryIntroBody: "We've designed a day-by-day recovery plan based on what most people experience. Remember, everyone heals at their own pace—these are guidelines, not strict rules. Listen to your body and don't hesitate to contact us if you have concerns.",

        recoveryTimeline: [
            {
                dayNumber: 0,
                phase: 'surgery',
                title: "Surgery day",
                normalExperiences: [
                    "You'll likely feel drowsy if you had general anaesthetic",
                    "The area will be numb for a few hours from the local anaesthetic",
                    "You might notice some minor bleeding or oozing—this is normal",
                    "The penis may look swollen and bruised"
                ],
                forecast: "Tonight and tomorrow morning you might experience some discomfort, especially during spontaneous erections. This is completely normal.",
                activities: [
                    { label: "Rest at home", status: "allowed", icon: "Home" },
                    { label: "Light walking", status: "allowed", icon: "Footprints" },
                    { label: "Driving", status: "avoid", icon: "Car" },
                    { label: "Shower", status: "avoid", icon: "ShowerHead" }
                ],
                redFlags: [
                    "Heavy bleeding that doesn't stop with gentle pressure",
                    "Difficulty passing urine",
                    "Severe pain not relieved by prescribed painkillers"
                ],
                nurseNote: "Take your painkillers regularly today—don't wait until the pain gets bad. Keeping on top of pain is easier than catching up with it later.",
                whyThisHappens: "Your body is responding to the surgical trauma. Swelling and bruising are your immune system's way of protecting the area and starting the healing process. The numbness from local anaesthetic typically lasts 2-4 hours."
            },
            {
                dayNumber: 1,
                phase: 'early',
                title: "The morning after",
                normalExperiences: [
                    "Morning erections might be uncomfortable or painful—this is the most common complaint",
                    "Swelling may look worse than yesterday—this peaks around days 2-3",
                    "The glans (head) might appear yellowish or patchy—this is normal healing",
                    "You might see some dried blood on your underwear"
                ],
                forecast: "Over the next few days, you'll start to feel a bit better each day. The worst discomfort is usually in these first 48-72 hours.",
                activities: [
                    { label: "Daily shower (gentle)", status: "allowed", icon: "ShowerHead" },
                    { label: "Working from home (desk job)", status: "caution", icon: "Laptop" },
                    { label: "Short walks", status: "allowed", icon: "Footprints" },
                    { label: "Cooking light meals", status: "allowed", icon: "ChefHat" },
                    { label: "Lifting anything heavy", status: "avoid", icon: "Dumbbell" }
                ],
                redFlags: [
                    "Increasing redness spreading beyond the wound",
                    "Fever or feeling generally unwell",
                    "Discharge that's green, yellow, or foul-smelling"
                ],
                nurseNote: "If nighttime erections are painful, try emptying your bladder before bed and once during the night. Sleeping on your side with your knees bent can also help.",
                whyThisHappens: "Nocturnal erections are a normal part of sleep and help maintain penile health. They're more noticeable now because of the swelling and stitches. The yellowish appearance you might see is fibrin—a normal part of wound healing, not infection."
            },
            {
                dayNumber: 3,
                phase: 'early',
                title: "Turning the corner",
                normalExperiences: [
                    "Pain should be noticeably better than day 1",
                    "You might still need regular paracetamol, but perhaps not ibuprofen",
                    "Swelling usually peaks today or tomorrow, then starts to improve",
                    "The glans might still feel very sensitive to touch"
                ],
                activities: [
                    { label: "Working from home", status: "allowed", icon: "Laptop" },
                    { label: "Light household tasks", status: "allowed", icon: "Home" },
                    { label: "Driving short distances", status: "caution", icon: "Car" },
                    { label: "Going out for walks", status: "allowed", icon: "Footprints" }
                ],
                nurseNote: "This is typically when people start to feel more like themselves. You've got through the hardest part!"
            },
            {
                dayNumber: 7,
                phase: 'healing',
                title: "One week milestone",
                normalExperiences: [
                    "Swelling is significantly reduced",
                    "The wound is starting to look less angry",
                    "You might notice the stitches beginning to loosen or fall out",
                    "Sensitivity of the glans is improving"
                ],
                forecast: "Over the next week, you'll continue to improve steadily. Most people feel ready to return to normal activities soon.",
                activities: [
                    { label: "Return to work (most jobs)", status: "allowed", icon: "Briefcase" },
                    { label: "Driving", status: "allowed", icon: "Car" },
                    { label: "Light exercise (walking)", status: "caution", icon: "Activity" },
                    { label: "Gym or contact sports", status: "avoid", icon: "Dumbbell" }
                ],
                nurseNote: "You're doing brilliantly! Remember to keep cleaning the area daily, even though it's looking much better."
            },
            {
                dayNumber: 10,
                phase: 'healing',
                title: "Approaching two weeks",
                normalExperiences: [
                    "Most stitches are loosening or have fallen out by now",
                    "Swelling is usually minimal",
                    "You can wear normal underwear comfortably",
                    "The scar line is visible but improving"
                ],
                activities: [
                    { label: "All normal daily activities", status: "allowed", icon: "Activity" },
                    { label: "Moderate exercise", status: "caution", icon: "Dumbbell" },
                    { label: "Swimming (if wound fully sealed)", status: "caution", icon: "Waves" }
                ],
                nurseNote: "Some people feel ready to increase their activity level now. Listen to your body—if something causes discomfort, wait a bit longer."
            },
            {
                dayNumber: 14,
                phase: 'strengthening',
                title: "Two weeks complete",
                normalExperiences: [
                    "You should be feeling close to normal",
                    "Stitches should be mostly dissolved (a few may remain)",
                    "The scar is maturing and fading",
                    "Sensitivity has improved significantly"
                ],
                forecast: "You're nearly there! Over the next 2-4 weeks, the cosmetic appearance will continue to improve, and you can gradually return to all activities including sexual activity (after medical clearance).",
                activities: [
                    { label: "All regular exercise", status: "allowed", icon: "Activity" },
                    { label: "Swimming", status: "allowed", icon: "Waves" },
                    { label: "Contact sports", status: "caution", icon: "Dumbbell" }
                ],
                nurseNote: "Congratulations on reaching the two-week mark! Full healing continues over the next few weeks. If you haven't already, consider scheduling your follow-up appointment to get the all-clear."
            }
        ],

        generalRedFlags: [
            "Increasing pain, redness, or swelling after the first few days",
            "Green, yellow, or foul-smelling discharge from the wound",
            "Fever (temperature above 38°C/100.4°F)",
            "Heavy bleeding that doesn't stop with gentle pressure",
            "Inability to pass urine",
            "Black or very dark tissue at the wound site",
            "Stitches that are still present and causing problems after 6 weeks"
        ],

        activityRestrictions: {
            driving: "Avoid for 24-48 hours after general anaesthetic. Resume when you can comfortably perform an emergency stop (usually 3-5 days). Remember, it's your responsibility to ensure you're fit to drive.",

            work: "Most people take 1 week off work. Desk jobs: return after 3-5 days if comfortable. Physical jobs: plan for 7-10 days. Listen to your body and don't rush back if you're still uncomfortable.",

            exercise: "Light walking: immediate. Moderate exercise (gym, jogging): wait 10-14 days if comfortable. Strenuous exercise, contact sports, or cycling: wait 3-4 weeks. Swimming: wait until the wound is fully closed and stitches have dissolved (usually 2-3 weeks).",

            sexualActivity: "Wait at least 4 weeks before any sexual activity, including masturbation. This allows healing and gives stitches time to dissolve. Get clearance from your surgeon at your follow-up appointment before resuming."
        }
    },

    uiMicrocopy: {
        checklistItems: [
            {
                key: "pain_relief",
                text: "Take your prescribed painkillers",
                category: "medication"
            },
            {
                key: "daily_shower",
                text: "Have a daily shower to keep the area clean",
                category: "wound-care"
            },
            {
                key: "petroleum_jelly",
                text: "Apply petroleum jelly to prevent sticking",
                category: "wound-care"
            },
            {
                key: "loose_clothing",
                text: "Wear loose, comfortable underwear",
                category: "activity"
            },
            {
                key: "wound_check",
                text: "Check for any signs of infection",
                category: "monitoring"
            },
            {
                key: "hydration",
                text: "Drink plenty of fluids",
                category: "activity"
            },
            {
                key: "avoid_straining",
                text: "Avoid heavy lifting or strenuous activity",
                category: "activity"
            }
        ],

        progressMessages: {
            dayComplete: "Well done! You've completed another day of your recovery.",
            weekComplete: "Fantastic progress! You've completed week {weekNumber} of your recovery.",
            halfwayPoint: "You're halfway there! Keep up the excellent work.",
            almostDone: "Nearly finished! Just a few more days of careful recovery."
        },

        completionTitle: "Recovery complete—well done!",
        completionBody: "You've successfully completed your 14-day guided recovery programme. You should now be feeling much better and able to return to most normal activities. Remember to attend your follow-up appointment, and don't hesitate to contact us if you have any concerns."
    }
};

// Export as the default variation
export const circumcision = {
    [getVariationKey('friendly', 'you')]: circumcisionFriendlyYou
};
