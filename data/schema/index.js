// This file serves as documentation and validation schemas for the normalized data.

export const MemberSchema = {
  id: "string (Bioguide ID)",
  firstName: "string",
  lastName: "string",
  party: "string (D, R, I)",
  state: "string (2-letter code)",
  chamber: "string (Senate, House)",
  lastUpdated: "ISO 8601 string"
};

export const TradeDisclosureSchema = {
  transactionId: "string",
  memberId: "string (Bioguide ID)",
  ticker: "string",
  transactionDate: "YYYY-MM-DD",
  disclosureDate: "YYYY-MM-DD",
  transactionType: "string (Purchase, Sale, Exchange)",
  amountRange: "string (e.g., $1,001 - $15,000)",
  assetType: "string (Stock, Option, Bond)",
  conflictScore: "number (calculated Cs score)"
};
