import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { FilterOptions, Transaction } from "./types";
import { filterTransactions } from "./util/service-util";

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "data/transactions.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    let data: Transaction[] = JSON.parse(jsonData);

    const { searchParams } = new URL(request.url);

    const filter: FilterOptions = {};

    filter.startDate = searchParams.get("startDate") || undefined;
    filter.endDate = searchParams.get("endDate") || undefined;
    filter.minAmount = searchParams.get("minAmount") || undefined;
    filter.maxAmount = searchParams.get("maxAmount") || undefined;
    filter.transactionType =
      (searchParams.get(
        "transactionType"
      ) as FilterOptions["transactionType"]) || undefined;

    // Parâmetros que são arrays
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

    data = filterTransactions(data, filter);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao ler os dados." },
      { status: 500 }
    );
  }
}
