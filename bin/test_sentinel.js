import { findTradeClusters } from '../src/lib/sentinel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tradesData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/trades.json'), 'utf8'));

const clusters = findTradeClusters(tradesData);
console.log(`Found ${clusters.length} clusters.`);
if (clusters.length > 0) {
	console.log(JSON.stringify(clusters[0], null, 2));
}
