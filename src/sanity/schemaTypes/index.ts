import type { SchemaTypeDefinition } from 'sanity'

import procedure from '../../../sanity/schemas/procedure'
import recoveryDay from '../../../sanity/schemas/recoveryDay'
import timelineStep from '../../../sanity/schemas/timelineStep'
import microcopy from '../../../sanity/schemas/microcopy'
import location from '../../../sanity/schemas/location'
import faqEntry from '../../../sanity/schemas/faqEntry'
import accordionBlock from '../../../sanity/schemas/objects/accordionBlock'
import cardBlock from '../../../sanity/schemas/objects/cardBlock'
import videoResourceBlock from '../../../sanity/schemas/objects/videoResourceBlock'
import { medicalCode } from '../../../sanity/schemas/objects/medicalCode'
import { medicalInterventionEntity } from '../../../sanity/schemas/medicalEntityData'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
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
  ],
}
