import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Transaction } from "./types";

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "data/transactions.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    let data: Transaction[] = JSON.parse(jsonData);

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const minAmount = searchParams.get("minAmount");
    const maxAmount = searchParams.get("maxAmount");

    // escreva um codigi para filtrar os dados somente desse ano
    const date = new Date();
    const year = date.getFullYear() - 1;
    data = data.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getFullYear() === year;
    });

    return NextResponse.json(data);
    // // Filtrar os dados com base nos parâmetros
    // if (type) {
    //   data = data.filter((transaction) => transaction.type === type);
    // }

    // if (minAmount) {
    //   data = data.filter(
    //     (transaction) => transaction.amount >= Number(minAmount)
    //   );
    // }

    // if (maxAmount) {
    //   data = data.filter(
    //     (transaction) => transaction.amount <= Number(maxAmount)
    //   );
    // }

    // return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao ler os dados." },
      { status: 500 }
    );
  }
}
