const BASE_URL = 'https://api.polygon.io';
const API_KEY = import.meta.env.VITE_POLYGON_API_KEY;

export const fetchTickerDetails = async (symbol) => {
  try {
    const response = await fetch(`${BASE_URL}/v3/reference/tickers/${symbol}?apiKey=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch polygon ticker details');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching Polygon data for ${symbol}:`, error);
    throw error;
  }
};
