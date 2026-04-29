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
    let allMembers = [];
    let nextUrl = `${BASE_URL}/member?api_key=${API_KEY}&format=json&limit=250`;

    while (nextUrl) {
      console.log(`Fetching: ${nextUrl.split('?')[0]}...`);
      const response = await fetch(nextUrl);
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

      allMembers = allMembers.concat(normalizedMembers);

      // Check for pagination
      if (data.pagination && data.pagination.next) {
        // The next URL might already contain the API key, or we might need to append it
        // The Congress API usually returns absolute URLs in 'next'
        let next = data.pagination.next;
        if (!next.includes('api_key=')) {
          next += `&api_key=${API_KEY}`;
        }
        nextUrl = next;
      } else {
        nextUrl = null;
      }
    }

    const outputPath = path.join(DATA_DIR, 'members.json');
    
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)){
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(allMembers, null, 2));
    
    console.log(`Successfully ingested and normalized ${allMembers.length} members.`);
    console.log(`Saved to ${outputPath}`);
  } catch (error) {
    console.error('Error during ingestion:', error);
    process.exit(1);
  }
}

ingestRoster();
