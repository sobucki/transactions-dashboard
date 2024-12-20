import { FilterOptions } from "../types";

export function buildFilterFromRequest(
  searchParams: URLSearchParams
): FilterOptions {
  const filter: FilterOptions = {};

  if (searchParams.get("startDate") !== null)
    filter.startDate = searchParams.get("startDate") || undefined;

  if (searchParams.get("endDate") !== null)
    filter.endDate = searchParams.get("endDate") || undefined;

  if (searchParams.get("maxAmount") !== null)
    filter.maxAmount = searchParams.get("maxAmount") || undefined;

  if (searchParams.get("minAmount") !== null)
    filter.minAmount = searchParams.get("minAmount") || undefined;

  if (searchParams.get("transactionType") !== null)
    filter.transactionType =
      (searchParams.get(
        "transactionType"
      ) as FilterOptions["transactionType"]) || undefined;

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
  const dateFormat = searchParams.get("dateFormat");
  if (dateFormat) {
    filter.dateFormat = dateFormat;
  }

  return filter;
}

export function generateQueryString(filterOptions: FilterOptions): string {
  const params = new URLSearchParams();

  if (filterOptions.startDate)
    params.append("startDate", filterOptions.startDate);
  if (filterOptions.endDate) params.append("endDate", filterOptions.endDate);
  if (filterOptions.minAmount)
    params.append("minAmount", filterOptions.minAmount);
  if (filterOptions.maxAmount)
    params.append("maxAmount", filterOptions.maxAmount);
  if (filterOptions.transactionType)
    params.append("transactionType", filterOptions.transactionType);
  if (filterOptions.currency)
    filterOptions.currency.forEach((currency) =>
      params.append("currency", currency)
    );
  if (filterOptions.account)
    filterOptions.account.forEach((account) =>
      params.append("account", account)
    );
  if (filterOptions.industry)
    filterOptions.industry.forEach((industry) =>
      params.append("industry", industry)
    );
  if (filterOptions.state)
    filterOptions.state.forEach((state) => params.append("state", state));

  return params.toString();
}
