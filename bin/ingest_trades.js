import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');

// Realistic mock data generation
const TICKERS = ['AAPL', 'MSFT', 'NVDA', 'LMT', 'RTX', 'TSLA', 'AMZN', 'JPM', 'XOM', 'PFE'];
const MEMBERS = [
  { name: 'Pelosi, Nancy', chamber: 'House' },
  { name: 'McCaul, Michael', chamber: 'House' },
  { name: 'Khanna, Ro', chamber: 'House' },
  { name: 'Scott, Rick', chamber: 'Senate' },
  { name: 'Tuberville, Tommy', chamber: 'Senate' },
  { name: 'Gottheimer, Josh', chamber: 'House' },
  { name: 'Higgins, Brian', chamber: 'House' },
  { name: 'Peters, Gary', chamber: 'Senate' }
];

const AMOUNTS = ['$1,001 - $15,000', '$15,001 - $50,000', '$50,001 - $100,000', '$100,001 - $250,000'];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateMockTrades(count) {
  const trades = [];
  const start = new Date(2023, 0, 1);
  const end = new Date();

  // Generate background noise trades
  for (let i = 0; i < count; i++) {
    const member = MEMBERS[Math.floor(Math.random() * MEMBERS.length)];
    const tDate = randomDate(start, end);
    const dDate = new Date(tDate.getTime() + (Math.random() * 30 * 24 * 60 * 60 * 1000)); // Disclosed up to 30 days later
    
    trades.push({
      name: member.name,
      chamber: member.chamber,
      ticker: TICKERS[Math.floor(Math.random() * TICKERS.length)],
      transactionDate: tDate.toISOString().split('T')[0],
      disclosureDate: dDate.toISOString().split('T')[0],
      type: Math.random() > 0.4 ? 'Purchase' : 'Sale (Full)',
      amountRange: AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)]
    });
  }

  // Inject a massive "Cluster" signal for the Sentinel to find!
  // E.g., 4 members buying LMT (Lockheed Martin) within 3 days in Oct 2023
  const clusterDate = new Date(2023, 9, 15); // Oct 15, 2023
  for (let i = 0; i < 4; i++) {
    const tDate = new Date(clusterDate.getTime() + (i * 24 * 60 * 60 * 1000)); // slightly staggered
    trades.push({
      name: MEMBERS[i].name,
      chamber: MEMBERS[i].chamber,
      ticker: 'LMT',
      transactionDate: tDate.toISOString().split('T')[0],
      disclosureDate: new Date(tDate.getTime() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      type: 'Purchase',
      amountRange: '$100,001 - $250,000',
      isClusterSeed: true // Just a hint for us
    });
  }

  return trades.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
}

function ingestTrades() {
  console.log('Generating Mock Trade Disclosures (S3 APIs are currently restricted)...');
  try {
    const allTrades = generateMockTrades(800); // 800 background trades + 1 cluster
    
    const outputPath = path.join(DATA_DIR, 'trades.json');
    if (!fs.existsSync(DATA_DIR)){
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(allTrades, null, 2));
    
    console.log(`Successfully generated ${allTrades.length} mock trades.`);
    console.log(`Saved to ${outputPath}`);
    console.log('Note: Contains an injected "Cluster" signal for LMT in Oct 2023 for Sentinel testing.');

  } catch (error) {
    console.error('Error during trade generation:', error);
    process.exit(1);
  }
}

ingestTrades();
