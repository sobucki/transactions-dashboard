import { FilterOptions } from "../types";

export function buildFilterFromRequest(
  searchParams: URLSearchParams
): FilterOptions {
  const filter: FilterOptions = {};

  filter.startDate = searchParams.get("startDate") || undefined;
  filter.endDate = searchParams.get("endDate") || undefined;
  filter.minAmount = searchParams.get("minAmount") || undefined;
  filter.maxAmount = searchParams.get("maxAmount") || undefined;
  filter.transactionType =
    (searchParams.get("transactionType") as FilterOptions["transactionType"]) ||
    undefined;

  // Parameters that are arrays
  const accounts = searchParams.getAll("account");
  if (accounts.length > 0) {
    filter.account = accounts;
  }

  const industries = searchParams.getAll("industry");
  if (industries.length > 0) {
    filter.industry = industries;
  }

  const states = searchParams.getAll("state");
  if (states.length > 0) {
    filter.state = states;
  }

  const currencies = searchParams.getAll("currency");
  if (currencies.length > 0) {
    filter.currency = currencies;
  }

  return filter;
}
