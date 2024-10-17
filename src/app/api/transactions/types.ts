export type Transaction = {
  date: number;
  amount: string;
  transaction_type: TransactionType;
  currency: string;
  account: string;
  industry: string;
  state: string;
};

export type TransactionType = "deposit" | "withdraw";

export type FilterOptions = {
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  transactionType?: TransactionType;
  account?: string;
  industry?: string;
  state?: string;
};

export type SortOptions = {
  sortBy: keyof Transaction;
  sortOrder: "asc" | "desc";
};