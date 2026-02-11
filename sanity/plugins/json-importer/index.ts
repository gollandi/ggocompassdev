import { definePlugin } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';
import { JsonImporterTool } from './JsonImporterTool';

export const jsonImporterPlugin = definePlugin({
    name: 'json-importer',
    tools: [
        {
            name: 'json-importer',
            title: 'JSON Importer',
            icon: DocumentTextIcon,
            component: JsonImporterTool,
        },
    ],
});
