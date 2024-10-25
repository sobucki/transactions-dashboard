import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Transaction } from "./types";
import { filterTransactions } from "./util/service-util";
import { buildFilterFromRequest } from "./util/filter";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "data/transactions.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    let data: Transaction[] = JSON.parse(jsonData);

    const { searchParams } = new URL(request.url);

    const filter = buildFilterFromRequest(searchParams);

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
