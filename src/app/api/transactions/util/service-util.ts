import { endOfDay, format, parseISO, startOfDay } from "date-fns";
import { FilterOptions, SortOptions, Transaction } from "../types";

export function filterTransactions(
  data: Transaction[],
  filter: FilterOptions,
  sortOptions?: SortOptions
): Transaction[] {
  const defaultSortOptions: SortOptions = { sortBy: "date", sortOrder: "desc" };
  const finalSortOptions = sortOptions || defaultSortOptions;
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

  if (filter.currency && Array.isArray(filter.currency)) {
    filteredData = filteredData.filter((transaction) =>
      filter.currency?.includes(transaction.currency)
    );
  }

  if (filter.account && Array.isArray(filter.account)) {
    filteredData = filteredData.filter((transaction) =>
      filter.account?.includes(transaction.account)
    );
  }

  if (filter.industry && Array.isArray(filter.industry)) {
    filteredData = filteredData.filter((transaction) =>
      filter.industry?.includes(transaction.industry)
    );
  }

  if (filter.state && Array.isArray(filter.state)) {
    filteredData = filteredData.filter((transaction) =>
      filter.state?.includes(transaction.state)
    );
  }

  if (filter.maxAmount !== undefined) {
    filteredData = filteredData.filter(
      (transaction) =>
        filter.maxAmount &&
        parseFloat(transaction.amount) <= parseFloat(filter.maxAmount)
    );
  }

  if (filter.minAmount !== undefined) {
    filteredData = filteredData.filter(
      (transaction) =>
        filter.minAmount &&
        parseFloat(transaction.amount) >= parseFloat(filter.minAmount)
    );
  }
  if (finalSortOptions) {
    const { sortBy, sortOrder } = finalSortOptions;
    filteredData = filteredData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  filteredData = filteredData.map((transaction) => {
    return {
      ...transaction,
      formatted_date: format(
        new Date(transaction.date),
        filter.dateFormat || "yyyy-MM-dd"
      ),
    };
  });

  return filteredData;
}

export function getUniqueValues(data: Transaction[], key: keyof Transaction) {
  const values = data.map((transaction) => transaction[key]);
  const uniqueValues = Array.from(new Set(values));
  return uniqueValues.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}
