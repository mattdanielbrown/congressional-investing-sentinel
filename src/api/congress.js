const BASE_URL = 'https://api.congress.gov/v3';
const API_KEY = import.meta.env.VITE_CONGRESS_API_KEY;

export const fetchMembers = async (congressNum = '118') => {
  try {
    const response = await fetch(`${BASE_URL}/member/congress/${congressNum}?api_key=${API_KEY}&format=json`);
    if (!response.ok) throw new Error('Failed to fetch members');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Congress members:', error);
    throw error;
  }
};
