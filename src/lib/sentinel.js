/**
 * Sentinel Agent - Quantitative Analysis Engine
 * 
 * Responsible for finding patterns, clusters, and correlations in congressional trade data.
 */

/**
 * Finds clusters of trades for the same ticker within a specific time window.
 * 
 * @param {Array} trades - Array of normalized trade objects.
 * @param {number} timeWindowDays - The maximum number of days between the first and last trade in a cluster.
 * @param {number} minMembers - The minimum number of UNIQUE members required to form a cluster.
 * @returns {Array} - Array of cluster objects containing the ticker, date range, involved members, and the trades.
 */
export function findTradeClusters(trades, timeWindowDays = 14, minMembers = 3) {
	// 1. Group trades by Ticker
	const tradesByTicker = {};

	trades.forEach(trade => {
		if (!tradesByTicker[trade.ticker]) {
			tradesByTicker[trade.ticker] = [];
		}
		// Only looking at Purchases for this specific "Accumulation Cluster" signal
		if (trade.type.includes('Purchase')) {
			tradesByTicker[trade.ticker].push({
				...trade,
				parsedDate: new Date(trade.transactionDate).getTime()
			});
		}
	});

	const clusters = [];
	const timeWindowMs = timeWindowDays * 24 * 60 * 60 * 1000;

	// 2. Analyze each ticker for clusters
	for (const ticker in tradesByTicker) {
		const tickerTrades = tradesByTicker[ticker];

		// Sort chronologically
		tickerTrades.sort((a, b) => a.parsedDate - b.parsedDate);

		for (let i = 0; i < tickerTrades.length; i++) {
			const windowStartTrade = tickerTrades[i];
			const windowEndMs = windowStartTrade.parsedDate + timeWindowMs;

			const clusterTrades = [windowStartTrade];
			const involvedMembers = new Set([windowStartTrade.name]);

			// Look ahead to see how many trades fit within the time window
			for (let j = i + 1; j < tickerTrades.length; j++) {
				const potentialTrade = tickerTrades[j];
				if (potentialTrade.parsedDate <= windowEndMs) {
					clusterTrades.push(potentialTrade);
					involvedMembers.add(potentialTrade.name);
				} else {
					// Since it's sorted, we can stop looking once we pass the window
					break;
				}
			}

			// Check if this window meets the minimum member threshold
			if (involvedMembers.size >= minMembers) {
				// To avoid overlapping identical clusters, check if we've already added a very similar one
				// (A simple heuristic: if the cluster has the same start date and ticker, skip)
				const isDuplicate = clusters.some(c =>
					c.ticker === ticker &&
					c.startDate === windowStartTrade.transactionDate
				);

				if (!isDuplicate) {
					clusters.push({
						id: `cluster-${ticker}-${windowStartTrade.transactionDate}`,
						ticker: ticker,
						startDate: windowStartTrade.transactionDate,
						endDate: clusterTrades[clusterTrades.length - 1].transactionDate,
						memberCount: involvedMembers.size,
						members: Array.from(involvedMembers),
						trades: clusterTrades,
						totalTrades: clusterTrades.length
					});
				}
			}
		}
	}

	// Sort clusters by most recent
	return clusters.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
}
