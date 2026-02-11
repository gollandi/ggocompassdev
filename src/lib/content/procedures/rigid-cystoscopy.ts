import { ProcedureContent, getVariationKey } from '../types';
import { flexibleCystoscopyFriendlyYou } from './flexible-cystoscopy';

/**
 * RIGID CYSTOSCOPY AND BLADDER BIOPSY
 * Based on flexible cystoscopy but with longer recovery due to anaesthetic and biopsy
 */

export const rigidCystoscopyFriendlyYou: ProcedureContent = {
    ...flexibleCystoscopyFriendlyYou,
    procedureId: 'rigid-cystoscopy-biopsy',
    procedureName: 'Rigid Cystoscopy and Bladder Biopsy',
    totalRecoveryDays: 5,
    recoveryType: 'day-case',

    preOperative: {
        ...flexibleCystoscopyFriendlyYou.preOperative,
        welcomeTitle: "Welcome to your cystoscopy and biopsy recovery",
        procedureDescription: "Your rigid cystoscopy and bladder biopsy involves examining your bladder and taking small tissue samples using a rigid camera inserted through your urethra. This is performed under general or spinal anaesthetic. The procedure takes about 15-30 minutes. You'll go home the same day once the anaesthetic wears off, but you cannot drive.",

        preparationInstructions: [
            "Fast for 6 hours before your procedure (general/spinal anaesthetic)",
            "Arrange for someone to drive you home and stay with you for 24 hours",
            "Wear comfortable clothing",
            "Have paracetamol at home for discomfort",
            "Plan to drink plenty of water after the procedure"
        ],

        faqs: [
            ...flexibleCystoscopyFriendlyYou.preOperative.faqs.slice(1), // Keep all except "Will it hurt" 
            {
                question: "Will it hurt?",
                answer: "You'll have general or spinal anaesthetic, so you won't feel anything during the procedure. Afterwards, burning when urinating and bladder discomfort are common for 2-5 days due to the biopsy. Simple painkillers work well for most people."
            }
        ]
    },

    postOperative: {
        ...flexibleCystoscopyFriendlyYou.postOperative,
        recoveryIntroTitle: "Your 5-day recovery plan",
        recoveryIntroBody: "Rigid cystoscopy with biopsy has slightly more recovery than flexible cystoscopy because of the anaesthetic and tissue samples taken. The key is drinking plenty of fluids. Most people are back to normal within 3-5 days.",
        recoveryTimeline: [
            {
                dayNumber: 0,
                phase: 'surgery',
                title: "Procedure day",
                normalExperiences: [
                    "Burning or stinging when passing urine",
                    "Light bleeding or pink urine",
                    "Needing to pass urine more often",
                    "Grogginess from anaesthetic or sedation"
                ],
                forecast: "The burning sensation and frequency are the main complaints for the first 24-48 hours. Light bleeding is expected after biopsy.",
                activities: [
                    { label: "Rest at home", status: "allowed", icon: "Home" },
                    { label: "Driving", status: "avoid", icon: "Car" },
                    { label: "Short walk", status: "allowed", icon: "Footprints" },
                    { label: "Strenuous exercise", status: "avoid", icon: "Dumbbell" }
                ],
                redFlags: [
                    "Unable to pass urine",
                    "Heavy bleeding or blood clots",
                    "Severe pain not relieved by paracetamol",
                    "Fever above 38°C"
                ],
                nurseNote: "Drink plenty of fluids to flush the bladder. Avoid alcohol for 24 hours after anaesthetic."
            },
            {
                dayNumber: 1,
                phase: 'early',
                title: "The day after",
                normalExperiences: [
                    "Burning and frequency improving but still present",
                    "Urine should be clearer, though it may still be pink",
                    "Feeling a bit tired or washed out"
                ],
                forecast: "Most people feel noticeably better by day 2-3. Bleeding should gradually settle.",
                activities: [
                    { label: "Light activities", status: "allowed", icon: "Activity" },
                    { label: "Driving", status: "caution", icon: "Car" },
                    { label: "Heavy lifting", status: "avoid", icon: "Dumbbell" }
                ],
                nurseNote: "Keep drinking fluids and avoid heavy lifting. If bleeding increases after activity, rest and hydrate."
            },
            {
                dayNumber: 3,
                phase: 'healing',
                title: "Settling phase",
                normalExperiences: [
                    "Minimal burning when urinating",
                    "Urine mostly clear",
                    "Frequency nearly back to normal"
                ],
                forecast: "You're close to full recovery. A small amount of blood may still appear, especially after activity.",
                activities: [
                    { label: "All normal activities", status: "allowed", icon: "Activity" },
                    { label: "Strenuous exercise", status: "caution", icon: "Dumbbell" }
                ],
                nurseNote: "Avoid strenuous exercise or heavy lifting for about a week to protect the biopsy sites."
            },
            {
                dayNumber: 5,
                phase: 'final',
                title: "Recovery complete",
                normalExperiences: [
                    "Urinary symptoms settled",
                    "Feeling back to normal"
                ],
                forecast: "If you notice blood again around 7-10 days, this can happen as biopsy sites heal. It should be light and short-lived.",
                activities: [
                    { label: "All activities (except heavy lifting)", status: "allowed", icon: "Activity" },
                    { label: "Heavy lifting", status: "caution", icon: "Dumbbell" }
                ],
                nurseNote: "Call your care team if bleeding becomes heavy, clots appear, or you cannot pass urine."
            }
        ],
        generalRedFlags: [
            "Unable to pass urine",
            "Heavy bleeding that doesn't stop",
            "Significant blood clots",
            "High temperature or fever (above 38°C)",
            "Persistent or worsening pain when urinating after 3-5 days",
            "Cloudy urine with unpleasant smell (possible infection)",
            "Feeling generally unwell or experiencing chills"
        ],

        activityRestrictions: {
            ...flexibleCystoscopyFriendlyYou.postOperative.activityRestrictions,
            driving: "Avoid driving and alcohol for 24 hours after general or spinal anaesthetic. Someone should stay with you during this time.",
            work: "Take 1-2 days off work. Return when you feel comfortable, usually after 24-48 hours.",
            exercise: "Light activity: after 24 hours. Moderate exercise: after 2-3 days. Strenuous exercise or heavy lifting: wait about 1 week. Swimming: wait until bleeding has completely stopped (usually 3-5 days).",
            sexualActivity: "No specific restrictions after 3-5 days, but you may prefer to wait until bleeding stops and you feel comfortable."
        }
    }
};

export const rigidCystoscopy = {
    [getVariationKey('friendly', 'you')]: rigidCystoscopyFriendlyYou
};
