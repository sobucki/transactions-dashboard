import { Transaction } from "../../types";
import { filterTransactions } from "../service-util";
import transactionsData from "./mock.json";

describe("services tests", () => {
  describe("filters transactions", () => {
    describe("dates", () => {
      it("should filter by start and end date", () => {
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
    });

    describe("type", () => {
      it("should filter by transaction type deposit", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          transactionType: "deposit",
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
          {
            account: "Mondelez International",
            amount: "3462",
            currency: "brl",
            date: 1637751477490,
            industry: "Food Consumer Products",
            state: "IL",
            transaction_type: "deposit",
          },
          {
            account: "Tesla Inc",
            amount: "2000",
            currency: "eur",
            date: 1637751477490,
            industry: "Automotive",
            state: "CA",
            transaction_type: "deposit",
          },
          {
            account: "Facebook",
            amount: "1000",
            currency: "usd",
            date: 1637751477490,
            industry: "Social Media",
            state: "CA",
            transaction_type: "deposit",
          },
          {
            account: "Google",
            amount: "3000",
            currency: "usd",
            date: 1609459200000,
            industry: "Technology",
            state: "CA",
            transaction_type: "deposit",
          },
          {
            account: "Twitter",
            amount: "1200",
            currency: "usd",
            date: 1609459200000,
            industry: "Social Media",
            state: "CA",
            transaction_type: "deposit",
          },
        ]);
      });

      it("should filter by transaction type withdraw", () => {
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
            account: "Netflix",
            amount: "750",
            currency: "usd",
            date: 1637751477490,
            industry: "Entertainment",
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

    describe("currency", () => {
      it("should filter by currency brl", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          currency: ["brl"],
          transactionType: "deposit",
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
          {
            account: "Mondelez International",
            amount: "3462",
            currency: "brl",
            date: 1637751477490,
            industry: "Food Consumer Products",
            state: "IL",
            transaction_type: "deposit",
          },
        ]);
      });

      it("should filter by currency euro", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          currency: ["eur"],
        });

        expect(result).toEqual([
          {
            account: "Tesla Inc",
            amount: "2000",
            currency: "eur",
            date: 1637751477490,
            industry: "Automotive",
            state: "CA",
            transaction_type: "deposit",
          },
        ]);
      });

      it("should filter by currency euro and dollar", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          currency: ["eur", "usd"],
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
            account: "Tesla Inc",
            amount: "2000",
            currency: "eur",
            date: 1637751477490,
            industry: "Automotive",
            state: "CA",
            transaction_type: "deposit",
          },
          {
            account: "Facebook",
            amount: "1000",
            currency: "usd",
            date: 1637751477490,
            industry: "Social Media",
            state: "CA",
            transaction_type: "deposit",
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
            account: "Amazon",
            amount: "500",
            currency: "usd",
            date: 1609459200000,
            industry: "E-commerce",
            state: "WA",
            transaction_type: "withdraw",
          },
          {
            account: "Google",
            amount: "3000",
            currency: "usd",
            date: 1609459200000,
            industry: "Technology",
            state: "CA",
            transaction_type: "deposit",
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
            account: "Twitter",
            amount: "1200",
            currency: "usd",
            date: 1609459200000,
            industry: "Social Media",
            state: "CA",
            transaction_type: "deposit",
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

    describe("account", () => {
      it("should filter by account name", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          account: ["Apple Inc"],
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
        ]);
      });

      it("should filter by accounts name", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          account: ["Apple Inc", "Amazon"],
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
        ]);
      });
    });

    describe("industry", () => {
      it("should filter by industry name", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          industry: ["Technology"],
        });

        expect(result).toEqual([
          {
            date: 1637751477490,
            amount: "1500",
            transaction_type: "withdraw",
            currency: "usd",
            account: "Apple Inc",
            industry: "Technology",
            state: "CA",
          },
          {
            account: "Google",
            amount: "3000",
            currency: "usd",
            date: 1609459200000,
            industry: "Technology",
            state: "CA",
            transaction_type: "deposit",
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
        ]);
      });

      it("should filter by industries names", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          industry: ["Technology", "Automotive"],
        });

        expect(result).toEqual([
          {
            date: 1637751477490,
            amount: "1500",
            transaction_type: "withdraw",
            currency: "usd",
            account: "Apple Inc",
            industry: "Technology",
            state: "CA",
          },
          {
            account: "Tesla Inc",
            amount: "2000",
            currency: "eur",
            date: 1637751477490,
            industry: "Automotive",
            state: "CA",
            transaction_type: "deposit",
          },
          {
            account: "Google",
            amount: "3000",
            currency: "usd",
            date: 1609459200000,
            industry: "Technology",
            state: "CA",
            transaction_type: "deposit",
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
        ]);
      });
    });

    describe("state", () => {
      it("should filter by state name", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          state: ["IL"],
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
          {
            account: "Mondelez International",
            amount: "3462",
            currency: "brl",
            date: 1637751477490,
            industry: "Food Consumer Products",
            state: "IL",
            transaction_type: "deposit",
          },
        ]);
      });

      it("should filter by states names", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          state: ["IL", "WA"],
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
          {
            account: "Mondelez International",
            amount: "3462",
            currency: "brl",
            date: 1637751477490,
            industry: "Food Consumer Products",
            state: "IL",
            transaction_type: "deposit",
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
        ]);
      });
    });

    describe("amount", () => {
      it("should filter by max amount", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          maxAmount: "1000",
        });

        expect(result).toEqual([
          {
            account: "Facebook",
            amount: "1000",
            currency: "usd",
            date: 1637751477490,
            industry: "Social Media",
            state: "CA",
            transaction_type: "deposit",
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
            account: "Amazon",
            amount: "500",
            currency: "usd",
            date: 1609459200000,
            industry: "E-commerce",
            state: "WA",
            transaction_type: "withdraw",
          },
        ]);
      });

      it("should filter by min amount", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          minAmount: "3000",
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
          {
            account: "Mondelez International",
            amount: "3462",
            currency: "brl",
            date: 1637751477490,
            industry: "Food Consumer Products",
            state: "IL",
            transaction_type: "deposit",
          },
          {
            account: "Google",
            amount: "3000",
            currency: "usd",
            date: 1609459200000,
            industry: "Technology",
            state: "CA",
            transaction_type: "deposit",
          },
        ]);
      });

      it("should filter by min and max amount", () => {
        const result = filterTransactions(transactionsData as Transaction[], {
          minAmount: "1000",
          maxAmount: "1500",
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
            account: "Facebook",
            amount: "1000",
            currency: "usd",
            date: 1637751477490,
            industry: "Social Media",
            state: "CA",
            transaction_type: "deposit",
          },
          {
            account: "Twitter",
            amount: "1200",
            currency: "usd",
            date: 1609459200000,
            industry: "Social Media",
            state: "CA",
            transaction_type: "deposit",
          },
        ]);
      });
    });
  });
  describe("sort transactions", () => {
    it("should sort by date in descending order by default", () => {
      const result = filterTransactions(transactionsData as Transaction[], {
        industry: ["Technology", "Automotive"],
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
          account: "Tesla Inc",
          amount: "2000",
          currency: "eur",
          date: 1637751477490,
          industry: "Automotive",
          state: "CA",
          transaction_type: "deposit",
        },
        {
          account: "Google",
          amount: "3000",
          currency: "usd",
          date: 1609459200000,
          industry: "Technology",
          state: "CA",
          transaction_type: "deposit",
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
      ]);
    });

    it("should sort by date in ascending order", () => {
      const result = filterTransactions(
        transactionsData as Transaction[],
        {
          industry: ["Technology", "Automotive"],
        },
        { sortBy: "date", sortOrder: "asc" }
      );

      expect(result).toEqual([
        {
          account: "Google",
          amount: "3000",
          currency: "usd",
          date: 1609459200000,
          industry: "Technology",
          state: "CA",
          transaction_type: "deposit",
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
          account: "Apple Inc",
          amount: "1500",
          currency: "usd",
          date: 1637751477490,
          industry: "Technology",
          state: "CA",
          transaction_type: "withdraw",
        },
        {
          account: "Tesla Inc",
          amount: "2000",
          currency: "eur",
          date: 1637751477490,
          industry: "Automotive",
          state: "CA",
          transaction_type: "deposit",
        },
      ]);
    });

    it("should sort by amount in ascending order", () => {
      const result = filterTransactions(
        transactionsData as Transaction[],
        {
          industry: ["Technology", "Automotive"],
        },
        { sortBy: "amount", sortOrder: "asc" }
      );

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
          account: "Tesla Inc",
          amount: "2000",
          currency: "eur",
          date: 1637751477490,
          industry: "Automotive",
          state: "CA",
          transaction_type: "deposit",
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
          account: "Google",
          amount: "3000",
          currency: "usd",
          date: 1609459200000,
          industry: "Technology",
          state: "CA",
          transaction_type: "deposit",
        },
      ]);
    });

    it("should sort by amount in descending order", () => {
      const result = filterTransactions(
        transactionsData as Transaction[],
        {
          industry: ["Technology", "Automotive"],
        },
        { sortBy: "amount", sortOrder: "desc" }
      );

      expect(result).toEqual([
        {
          account: "Google",
          amount: "3000",
          currency: "usd",
          date: 1609459200000,
          industry: "Technology",
          state: "CA",
          transaction_type: "deposit",
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
          account: "Tesla Inc",
          amount: "2000",
          currency: "eur",
          date: 1637751477490,
          industry: "Automotive",
          state: "CA",
          transaction_type: "deposit",
        },
        {
          account: "Apple Inc",
          amount: "1500",
          currency: "usd",
          date: 1637751477490,
          industry: "Technology",
          state: "CA",
          transaction_type: "withdraw",
        },
      ]);
    });
  });
});
