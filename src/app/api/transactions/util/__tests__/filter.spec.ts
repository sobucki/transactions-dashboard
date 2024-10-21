import { FilterOptions } from "../../types";
import { buildFilterFromRequest, generateQueryString } from "../filter";

describe("filter utils tests", () => {
  describe("buildFilterFromRequest", () => {
    it("should return a empty filter when there are not params", () => {
      const searchParams = new URLSearchParams();
      const result = buildFilterFromRequest(searchParams);
      expect(result).toEqual({});
    });

    it("should set startDate and endDate when provided", () => {
      const searchParams = new URLSearchParams({
        startDate: "2021-01-01",
        endDate: "2021-12-31",
      });

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({
        startDate: "2021-01-01",
        endDate: "2021-12-31",
      });
    });

    it("should set minAmount and maxAmount when provided", () => {
      const searchParams = new URLSearchParams({
        minAmount: "100",
        maxAmount: "1000",
      });

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({
        minAmount: "100",
        maxAmount: "1000",
      });
    });

    it("should set transactionType when provided", () => {
      const searchParams = new URLSearchParams({
        transactionType: "deposit",
      });

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({
        transactionType: "deposit",
      });
    });

    it("should set dateFormat when provided", () => {
      const searchParams = new URLSearchParams({
        dateFormat: "MM-DD-YYYY",
      });

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({
        dateFormat: "MM-DD-YYYY",
      });
    });

    it("should define account with multiple values", () => {
      const searchParams = new URLSearchParams();
      searchParams.append("account", "account1");
      searchParams.append("account", "account2");

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({
        account: ["account1", "account2"],
      });
    });

    it("should define industry with multiple values", () => {
      const searchParams = new URLSearchParams();
      searchParams.append("industry", "industry1");
      searchParams.append("industry", "industry2");

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({
        industry: ["industry1", "industry2"],
      });
    });

    it("should define state with multiple values", () => {
      const searchParams = new URLSearchParams();
      searchParams.append("state", "state1");
      searchParams.append("state", "state2");

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({
        state: ["state1", "state2"],
      });
    });

    it("should set currency with multiple values", () => {
      const searchParams = new URLSearchParams();
      searchParams.append("currency", "USD");
      searchParams.append("currency", "EUR");

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({
        currency: ["USD", "EUR"],
      });
    });

    it("should handle with all parameters", () => {
      const searchParams = new URLSearchParams({
        startDate: "2021-01-01",
        endDate: "2021-12-31",
        minAmount: "100",
        maxAmount: "1000",
        transactionType: "withdraw",
        dateFormat: "MM-DD-YYYY",
      });
      searchParams.append("currency", "USD");
      searchParams.append("currency", "EUR");
      searchParams.append("account", "account1");
      searchParams.append("account", "account2");
      searchParams.append("industry", "industry1");
      searchParams.append("state", "state1");

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({
        startDate: "2021-01-01",
        endDate: "2021-12-31",
        minAmount: "100",
        maxAmount: "1000",
        transactionType: "withdraw",
        currency: ["USD", "EUR"],
        account: ["account1", "account2"],
        industry: ["industry1"],
        state: ["state1"],
        dateFormat: "MM-DD-YYYY",
      });
    });

    it("should ignore unknown parameters", () => {
      const searchParams = new URLSearchParams({
        unknownParam: "value",
      });

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({});
    });

    it("should handle parameters with empty strings", () => {
      const searchParams = new URLSearchParams({
        startDate: "",
      });

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({
        startDate: undefined,
      });
    });

    it("should handle duplicate parameter names", () => {
      const searchParams = new URLSearchParams();
      searchParams.append("state", "state1");
      searchParams.append("state", "state2");
      searchParams.append("state", "state3");

      const result = buildFilterFromRequest(searchParams);

      expect(result).toEqual({
        state: ["state1", "state2", "state3"],
      });
    });
  });

  describe("generateQueryString", () => {
    it("should return an empty string when no filter options are provided", () => {
      const filterOptions: FilterOptions = {};
      const result = generateQueryString(filterOptions);
      expect(result).toBe("");
    });

    it("should include startDate and endDate when provided", () => {
      const filterOptions: FilterOptions = {
        startDate: "2021-01-01",
        endDate: "2021-12-31",
      };
      const result = generateQueryString(filterOptions);
      expect(result).toBe("startDate=2021-01-01&endDate=2021-12-31");
    });

    it("should include minAmount and maxAmount when provided", () => {
      const filterOptions: FilterOptions = {
        minAmount: "100",
        maxAmount: "1000",
      };
      const result = generateQueryString(filterOptions);
      expect(result).toBe("minAmount=100&maxAmount=1000");
    });

    it("should include transactionType when provided", () => {
      const filterOptions: FilterOptions = {
        transactionType: "withdraw",
      };
      const result = generateQueryString(filterOptions);
      expect(result).toBe("transactionType=withdraw");
    });

    it("should include multiple currencies when provided", () => {
      const filterOptions: FilterOptions = {
        currency: ["USD", "EUR"],
      };
      const result = generateQueryString(filterOptions);
      expect(result).toBe("currency=USD&currency=EUR");
    });

    it("should include multiple accounts when provided", () => {
      const filterOptions: FilterOptions = {
        account: ["account1", "account2"],
      };
      const result = generateQueryString(filterOptions);
      expect(result).toBe("account=account1&account=account2");
    });

    it("should include multiple industries when provided", () => {
      const filterOptions: FilterOptions = {
        industry: ["tech", "finance"],
      };
      const result = generateQueryString(filterOptions);
      expect(result).toBe("industry=tech&industry=finance");
    });

    it("should include multiple states when provided", () => {
      const filterOptions: FilterOptions = {
        state: ["NY", "CA"],
      };
      const result = generateQueryString(filterOptions);
      expect(result).toBe("state=NY&state=CA");
    });

    it("should handle all parameters together", () => {
      const filterOptions: FilterOptions = {
        startDate: "2021-01-01",
        endDate: "2021-12-31",
        minAmount: "100",
        maxAmount: "1000",
        transactionType: "deposit",
        currency: ["USD", "EUR"],
        account: ["account1", "account2"],
        industry: ["tech", "finance"],
        state: ["NY", "CA"],
      };
      const result = generateQueryString(filterOptions);
      expect(result).toBe(
        "startDate=2021-01-01&endDate=2021-12-31&minAmount=100&maxAmount=1000&transactionType=deposit&currency=USD&currency=EUR&account=account1&account=account2&industry=tech&industry=finance&state=NY&state=CA"
      );
    });

    it("should ignore fields that are not present in the filter options", () => {
      const filterOptions: FilterOptions = {
        startDate: "2021-01-01",
        endDate: "2021-12-31",
      };
      const result = generateQueryString(filterOptions);
      expect(result).toBe("startDate=2021-01-01&endDate=2021-12-31");
    });

    it("should handle empty arrays and omit them from the query string", () => {
      const filterOptions: FilterOptions = {
        startDate: "2021-01-01",
        currency: [],
      };
      const result = generateQueryString(filterOptions);
      expect(result).toBe("startDate=2021-01-01");
    });
  });
});
