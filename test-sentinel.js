import fs from 'fs';
import { findTradeClusters } from './src/lib/sentinel.js';

const tradesData = JSON.parse(fs.readFileSync('./data/trades.json', 'utf-8'));

console.log('tradesData isArray?', Array.isArray(tradesData));
console.log('trades count:', tradesData.length);

console.log('Starting findTradeClusters...');
const start = Date.now();
const clusters = findTradeClusters(tradesData);
const end = Date.now();
console.log(`Finished in ${end - start}ms. Clusters found: ${clusters.length}`);
