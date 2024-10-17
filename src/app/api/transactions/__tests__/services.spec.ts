import { filterTransactions } from "../services";
import { Transaction } from "../types";
import transactionsData from "./mock.json";

describe("services tests", () => {
  describe("filters", () => {
    it("should filter transactions by start and end date", () => {
      const result = filterTransactions(transactionsData as Transaction[], {
        startDate: "2024-01-01",
        endDate: "2024-10-17",
      });

      expect(result).toEqual([
        {
          account: "Mondelez International",
          amount: "3462",
          currency: "brl",
          date: 1729195017000,
          industry: "Food Consumer Products",
          state: "IL",
          transaction_type: "deposit",
        },
      ]);

      const result2 = filterTransactions(transactionsData as Transaction[], {
        startDate: "2025-01-01",
        endDate: "2024-01-01",
      });

      expect(result2).toEqual([]);
    });

    it("should filter transactions by transaction type deposit", () => {
      const result = filterTransactions(transactionsData as Transaction[], {
        transactionType: "deposit",
      });

      expect(result).toEqual([
        {
          date: 1729195017000,
          amount: "3462",
          transaction_type: "deposit",
          currency: "brl",
          account: "Mondelez International",
          industry: "Food Consumer Products",
          state: "IL",
        },
        {
          date: 1637751477490,
          amount: "3462",
          transaction_type: "deposit",
          currency: "brl",
          account: "Mondelez International",
          industry: "Food Consumer Products",
          state: "IL",
        },

        {
          date: 1637751477490,
          amount: "2000",
          transaction_type: "deposit",
          currency: "eur",
          account: "Tesla Inc",
          industry: "Automotive",
          state: "CA",
        },

        {
          date: 1609459200000,
          amount: "3000",
          transaction_type: "deposit",
          currency: "usd",
          account: "Google",
          industry: "Technology",
          state: "CA",
        },

        {
          date: 1637751477490,
          amount: "1000",
          transaction_type: "deposit",
          currency: "usd",
          account: "Facebook",
          industry: "Social Media",
          state: "CA",
        },

        {
          date: 1609459200000,
          amount: "1200",
          transaction_type: "deposit",
          currency: "usd",
          account: "Twitter",
          industry: "Social Media",
          state: "CA",
        },
      ]);
    });

    it("should filter transactions by transaction type withdraw", () => {
      const result = filterTransactions(transactionsData as Transaction[], {
        transactionType: "withdraw",
      });

      expect(result).toEqual([
        {
          account: "Apple Inc",
          amount: "1500",
          currency: "usd",
          date: 1637751477490,
          industry: "Technology",
          state: "CA",
          transaction_type: "withdraw",
        },
        {
          account: "Amazon",
          amount: "500",
          currency: "usd",
          date: 1609459200000,
          industry: "E-commerce",
          state: "WA",
          transaction_type: "withdraw",
        },
        {
          account: "Microsoft",
          amount: "2500",
          currency: "usd",
          date: 1609459200000,
          industry: "Technology",
          state: "WA",
          transaction_type: "withdraw",
        },
        {
          account: "Netflix",
          amount: "750",
          currency: "usd",
          date: 1637751477490,
          industry: "Entertainment",
          state: "CA",
          transaction_type: "withdraw",
        },
        {
          account: "Uber",
          amount: "1800",
          currency: "usd",
          date: 1609459200000,
          industry: "Transportation",
          state: "CA",
          transaction_type: "withdraw",
        },
      ]);
    });
  });
});
