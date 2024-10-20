import { FilterOptions, Transaction } from "@/app/api/transactions/types";

export type ChartProps = {
  filter: FilterOptions;
};

export type TransactionAmountSum = Transaction & { amount_sum: number };
export type TransactionAmountCount = Transaction & { amount_count: number };
