import { endOfDay, parseISO, startOfDay } from "date-fns";
import { FilterOptions, Transaction } from "./types";

export function filterTransactions(
  data: Transaction[],
  filter: FilterOptions
  // sortBy: SortOptions
): Transaction[] {
  let filteredData = data;

  if (filter.startDate) {
    const startDate = parseISO(filter.startDate);
    const startDateOfDay = startOfDay(startDate);

    filteredData = filteredData.filter(
      (transaction) =>
        filter.startDate && transaction.date >= startDateOfDay.getTime()
    );
  }

  if (filter.endDate) {
    const endDate = parseISO(filter.endDate);
    const endDateOfDay = endOfDay(endDate);

    filteredData = filteredData.filter(
      (transaction) =>
        filter.startDate && transaction.date <= endDateOfDay.getTime()
    );
  }

  if (filter.transactionType) {
    filteredData = filteredData.filter(
      (transaction) => transaction.transaction_type === filter.transactionType
    );
  }

  return filteredData;
}
