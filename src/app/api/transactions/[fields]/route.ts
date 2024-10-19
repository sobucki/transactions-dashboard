import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Transaction } from "../../transactions/types";
import { getUniqueValues } from "../util/service-util";

const validFields = ["account", "industry", "state", "currency"];

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const field = url.pathname.split("/").pop();

  if (!validFields.includes(field as string)) {
    return NextResponse.json(
      { message: "Endpoint não encontrado." },
      { status: 404 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), "data/transactions.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data: Transaction[] = JSON.parse(jsonData);

    return NextResponse.json(getUniqueValues(data, field as keyof Transaction));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao ler os dados." },
      { status: 500 }
    );
  }
}
