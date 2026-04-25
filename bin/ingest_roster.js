import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars since we are not using Vite here
import { config } from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, '../.env') });

const API_KEY = process.env.VITE_CONGRESS_API_KEY;
const BASE_URL = 'https://api.congress.gov/v3';

const DATA_DIR = path.resolve(__dirname, '../data');

async function ingestRoster() {
  console.log('Starting ingestion of Congress roster...');
  try {
    const response = await fetch(`${BASE_URL}/member?api_key=${API_KEY}&format=json&limit=250`);
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Normalization based on MemberSchema
    const normalizedMembers = data.members.map((m) => {
      // The API structure varies, adapting to typical response
      const member = m.member || m;
      return {
        id: member.bioguideId,
        firstName: member.firstName,
        lastName: member.lastName,
        party: member.partyName,
        state: member.state,
        chamber: member.terms && member.terms.length > 0 ? member.terms[0].chamber : 'Unknown',
        lastUpdated: new Date().toISOString()
      };
    });

    const outputPath = path.join(DATA_DIR, 'members.json');
    fs.writeFileSync(outputPath, JSON.stringify(normalizedMembers, null, 2));
    
    console.log(`Successfully ingested and normalized ${normalizedMembers.length} members.`);
    console.log(`Saved to ${outputPath}`);
  } catch (error) {
    console.error('Error during ingestion:', error);
    process.exit(1);
  }
}

ingestRoster();
