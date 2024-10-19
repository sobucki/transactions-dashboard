import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Transaction } from "../../transactions/types";
import * as dfd from "danfojs-node";
import { buildFilterFromRequest } from "../../transactions/util/filter";
import { filterTransactions } from "../../transactions/util/service-util";

const validFields = [
  "account",
  "industry",
  "state",
  "transaction_type",
  "currency",
];
const validOperations = ["sum", "min", "max", "mean", "count"];

export async function GET(
  request: NextRequest,
  { params }: { params: { field: string[]; operation: string } }
) {
  const fields = params.field;
  const operation = params.operation;

  if (!validOperations.includes(operation)) {
    return NextResponse.json(
      { message: "Operação não encontrada." },
      { status: 404 }
    );
  }

  if (!fields.every((f) => validFields.includes(f))) {
    return NextResponse.json(
      { message: "Endpoint não encontrado." },
      { status: 404 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), "data/transactions.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    let data: Transaction[] = JSON.parse(jsonData);
    const { searchParams } = new URL(request.url);

    const filter = buildFilterFromRequest(searchParams);

    data = filterTransactions(data, filter);

    const df = new dfd.DataFrame(
      data.map((d) => ({ ...d, amount: Number(d.amount) }))
    );

    const groupedSum = df.groupby(fields).agg({ amount: operation });

    const result = dfd.toJSON(groupedSum);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao ler os dados." },
      { status: 500 }
    );
  }
}
