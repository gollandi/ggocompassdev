import { ProcedureContent, getVariationKey } from '../types';
import { varicoceleSingleFriendlyYou } from './varicocele-single';

/**
 * MICROSURGICAL VARICOCELE CORRECTION - Bilateral
 * Based on single-sided content with adjusted recovery timeline and bilateral-specific notes
 */

const varicoceleBilateralBase: ProcedureContent = {
    ...varicoceleSingleFriendlyYou,
    procedureId: 'varicocele-bilateral',
    procedureName: 'Microsurgical Varicocele Correction (Bilateral)',
    totalRecoveryDays: 28, // Slightly longer for bilateral

    preOperative: {
        ...varicoceleSingleFriendlyYou.preOperative,
        welcomeTitle: "Welcome to your bilateral varicocele surgery recovery journey",
        procedureDescription: "Your bilateral microsurgical varicocele correction involves tying off enlarged veins in both sides of your scrotum through small groin incisions. The surgeon uses a high-powered operating microscope to ensure precision. This is typically performed under general anaesthetic and takes about 90-120 minutes. You may go home the same day or stay overnight."
    },

    postOperative: {
        ...varicoceleSingleFriendlyYou.postOperative,
        recoveryIntroTitle: "Your 4-week recovery plan",
        recoveryIntroBody: "Bilateral varicocele repair has a slightly longer recovery than single-sided surgery since both sides need to heal. The key is wearing scrotal support, managing swelling with ice, and gradually increasing your activity level. Most people feel back to normal within 3-4 weeks.",

        activityRestrictions: {
            ...varicoceleSingleFriendlyYou.postOperative.activityRestrictions,
            work: "Desk work: 5-7 days. Light physical work: 2 weeks. Heavy manual labor or jobs involving lifting: 3-4 weeks. Take it gradually—bilateral surgery needs more recovery time.",
            sexualActivity: "Wait at least 3-4 weeks before any sexual activity. Bilateral surgery requires slightly longer healing time than single-sided. When you resume, start gently."
        }
    },

    uiMicrocopy: {
        ...varicoceleSingleFriendlyYou.uiMicrocopy,
        completionTitle: "Recovery complete—excellent work!",
        completionBody: "You've successfully completed your 4-week bilateral recovery programme. You should now be feeling back to normal and able to return to all activities. If fertility improvement was your goal, remember that sperm parameters typically improve over the next 3-6 months. Make sure to attend your follow-up appointment."
    }
};

export const varicoceleBilateralFriendlyYou = varicoceleBilateralBase;

export const varicoceleBilateral = {
    [getVariationKey('friendly', 'you')]: varicoceleBilateralFriendlyYou
};
