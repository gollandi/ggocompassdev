
import { createClient } from "next-sanity";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN; // Needed for write access

if (!projectId || !dataset || !token) {
    console.error("Missing Sanity configuration in .env");
    console.error("Make sure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN are set.");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: "2024-01-01",
});

async function main() {
    const dataPath = path.join(__dirname, "data/prostatectomy-full.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const documents = JSON.parse(rawData);

    console.log(`Found ${documents.length} documents to import...`);

    const transaction = client.transaction();

    documents.forEach((doc: any) => {
        console.log(`Queueing ${doc._type}: ${doc.name || doc.title}`);
        transaction.createOrReplace(doc);
    });

    try {
        const result = await transaction.commit();
        console.log("Import successful!", result);
    } catch (err) {
        console.error("Import failed:", err);
    }
}

main();
