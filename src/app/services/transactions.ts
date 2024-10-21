import { TransactionAmountSum } from "../api/transactions/types";

export async function fetchAndCalculateBalance(): Promise<string> {
  const apiUrl = "/api/sum/transaction_type";

  try {
    const response = await fetch(apiUrl, { cache: "default" });
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const transactions: TransactionAmountSum[] = await response.json();

    const totalDeposit = transactions
      .filter((t) => t.transaction_type === "deposit")
      .reduce((sum, t) => sum + t.amount_sum, 0);

    const totalWithdraw = transactions
      .filter((t) => t.transaction_type === "withdraw")
      .reduce((sum, t) => sum + t.amount_sum, 0);

    const balance = totalDeposit - totalWithdraw;

    return (balance / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}

export async function fetchAndCalculateRevenue(): Promise<string> {
  const apiUrl = "/api/sum/transaction_type?transactionType=deposit";

  try {
    const response = await fetch(apiUrl, { cache: "default" });
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const transactions: TransactionAmountSum[] = await response.json();

    const totalDeposit = transactions.reduce((sum, t) => sum + t.amount_sum, 0);

    return (totalDeposit / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}

export async function fetchAndCalculateDrawn(): Promise<string> {
  const apiUrl = "/api/sum/transaction_type?transactionType=withdraw";

  try {
    const response = await fetch(apiUrl, { cache: "default" });
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const transactions: TransactionAmountSum[] = await response.json();

    const totalDrawn = transactions.reduce((sum, t) => sum + t.amount_sum, 0);

    return (totalDrawn / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}
