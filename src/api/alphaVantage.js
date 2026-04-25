const BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;

export const fetchStockData = async (symbol) => {
  try {
    const response = await fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch stock data');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching Alpha Vantage data for ${symbol}:`, error);
    throw error;
  }
};
