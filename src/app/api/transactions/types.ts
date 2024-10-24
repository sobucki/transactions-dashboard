export type Transaction = {
  date: number;
  amount: string;
  transaction_type: TransactionType;
  currency: string;
  account: string;
  industry: string;
  state: string;
  formatted_date: string;
};

export type TransactionType = "deposit" | "withdraw";

export type FilterOptions = {
  startDate?: string;
  endDate?: string;
  minAmount?: string;
  maxAmount?: string;
  transactionType?: TransactionType;
  currency?: string[];
  account?: string[];
  industry?: string[];
  state?: string[];
  dateFormat?: string;
};

export type SortOptions = {
  sortBy: keyof Transaction;
  sortOrder: "asc" | "desc";
};

export type TransactionAmountSum = Transaction & { amount_sum: number };
export type TransactionAmountCount = Transaction & { amount_count: number };
