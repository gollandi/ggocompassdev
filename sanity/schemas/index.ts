import procedure from './procedure';
import recoveryDay from './recoveryDay';
import timelineStep from './timelineStep';
import microcopy from './microcopy';
import location from './location';
import faqEntry from './faqEntry';
import accordionBlock from './objects/accordionBlock';
import cardBlock from './objects/cardBlock';
import videoResourceBlock from './objects/videoResourceBlock';
import { medicalCode } from './objects/medicalCode';
import { medicalInterventionEntity } from './medicalEntityData';

export const schemaTypes = [
    procedure,
    recoveryDay,
    timelineStep,
    microcopy,
    location,
    faqEntry,
    accordionBlock,
    cardBlock,
    videoResourceBlock,
    medicalCode,
    medicalInterventionEntity,
];
