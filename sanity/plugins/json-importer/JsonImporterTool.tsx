import { Card, Stack, Text, Heading, Button, Code, Flex, Box } from '@sanity/ui';
import { useState } from 'react';
import { useClient } from 'sanity';

export function JsonImporterTool() {
    const [jsonInput, setJsonInput] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [importedCount, setImportedCount] = useState(0);

    const client = useClient({ apiVersion: '2024-01-01' });

    const handleImport = async () => {
        setStatus('loading');
        setMessage('');

        try {
            // Parse JSON
            const data = JSON.parse(jsonInput);
            const documents = Array.isArray(data) ? data : [data];

            // Validate documents
            const validDocs = documents.filter(doc => doc._type && doc._id);

            if (validDocs.length === 0) {
                throw new Error('No valid documents found. Each document must have _type and _id fields.');
            }

            // Create transaction
            const transaction = client.transaction();

            validDocs.forEach(doc => {
                transaction.createOrReplace(doc);
            });

            // Commit
            await transaction.commit();

            setStatus('success');
            setMessage(`Successfully imported ${validDocs.length} document(s)`);
            setImportedCount(validDocs.length);
            setJsonInput('');

        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Import failed');
        }
    };

    const handleClear = () => {
        setJsonInput('');
        setStatus('idle');
        setMessage('');
    };

    return (
        <Card padding={4} style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Stack space={4}>
                <Box>
                    <Heading size={3}>JSON Data Importer</Heading>
                    <Text muted size={1} style={{ marginTop: '8px' }}>
                        Paste your JSON data below. Accepts single objects or arrays of documents.
                    </Text>
                </Box>

                <Card border padding={3} radius={2}>
                    <Stack space={3}>
                        <Text weight="semibold" size={1}>Requirements:</Text>
                        <Code language="json" size={1}>
                            {`{
  "_id": "unique-id",
  "_type": "ggoProcedure",
  "name": "Procedure Name",
  ...
}`}
                        </Code>
                        <Text muted size={1}>
                            Each document must have <Code>_id</Code> and <Code>_type</Code> fields.
                        </Text>
                    </Stack>
                </Card>

                <Stack space={2}>
                    <Text weight="semibold">JSON Input:</Text>
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder='Paste JSON here...'
                        style={{
                            width: '100%',
                            minHeight: '400px',
                            fontFamily: 'monospace',
                            fontSize: '13px',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            resize: 'vertical'
                        }}
                    />
                </Stack>

                <Flex gap={2}>
                    <Button
                        text="Import Data"
                        tone="primary"
                        onClick={handleImport}
                        disabled={!jsonInput.trim() || status === 'loading'}
                        loading={status === 'loading'}
                    />
                    <Button
                        text="Clear"
                        tone="default"
                        onClick={handleClear}
                        disabled={status === 'loading'}
                    />
                </Flex>

                {message && (
                    <Card
                        padding={3}
                        radius={2}
                        tone={status === 'success' ? 'positive' : status === 'error' ? 'critical' : 'default'}
                    >
                        <Text size={1}>
                            {status === 'success' && '✅ '}
                            {status === 'error' && '❌ '}
                            {message}
                        </Text>
                    </Card>
                )}

                {status === 'success' && importedCount > 0 && (
                    <Card padding={3} radius={2} tone="positive" border>
                        <Stack space={2}>
                            <Text weight="semibold">Import Summary</Text>
                            <Text size={1}>
                                {importedCount} document{importedCount > 1 ? 's' : ''} successfully imported to Sanity.
                            </Text>
                            <Text muted size={1}>
                                You can now view them in the respective document types.
                            </Text>
                        </Stack>
                    </Card>
                )}
            </Stack>
        </Card>
    );
}
