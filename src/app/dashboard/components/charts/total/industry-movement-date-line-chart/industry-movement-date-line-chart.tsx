"use client";

import { Grid, Paper, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { ChartProps, TransactionAmountCount } from "../../type";
import { useEffect, useState } from "react";
import { generateQueryString } from "@/app/api/transactions/util/filter";
import { negativeColors, positiveColors } from "../../commons";

function IndustryMovementDateLine({ filter }: ChartProps) {
  const [result, setResult] = useState<TransactionAmountCount[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const query = generateQueryString(filter);
        const response = await fetch(
          `/api/count/transaction_type/formatted_date?dateFormat=yyyy-MM&${query}`
        );
        console.log("response", response);

        if (response.ok) {
          const data = await response.json();
          setResult(data);
        } else {
          console.error("Falha ao buscar as transações:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar as transações:", error);
      }
    };

    fetchTransactions();
  }, [filter]);

  const years = [...new Set(result.map((item) => item.formatted_date))].sort();

  const depositData: number[] = [];
  const withdrawData: number[] = [];

  years.forEach((year) => {
    const depositItem = result.find(
      (item) =>
        item.formatted_date === year && item.transaction_type === "deposit"
    );
    const withdrawItem = result.find(
      (item) =>
        item.formatted_date === year && item.transaction_type === "withdraw"
    );

    depositData.push(depositItem ? depositItem.amount_count : 0);
    withdrawData.push(withdrawItem ? withdrawItem.amount_count : 0);
  });
  // const transactionTypes = [
  //   ...new Set(result.map((item) => item.transaction_type)),
  // ];

  // const datasets = transactionTypes.map((transactionType, index) => {
  //   const dataPoints = years.map((year) => {
  //     const entries = result.filter(
  //       (item) =>
  //         item.formatted_date === year &&
  //         item.transaction_type === transactionType
  //     );
  //     const totalAmount = entries.reduce(
  //       (sum, entry) => sum + entry.amount_count,
  //       0
  //     );
  //     return totalAmount;
  //   });

  //   const colors = ["#007bff", "#dc3545", "#28a745", "#ffc107"];
  //   return {
  //     label: transactionType.charAt(0).toUpperCase() + transactionType.slice(1),
  //     data: dataPoints,
  //     fill: false,
  //     borderColor: colors[index % colors.length],
  //     tension: 0.1,
  //   };
  // });

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <Typography variant="h6">Quantidade de transações por mês</Typography>
        <Line
          data={{
            labels: years,
            datasets: [
              {
                label: "Depósito",
                data: depositData,
                ...positiveColors,
              },
              {
                label: "Saque",
                data: withdrawData,
                ...negativeColors,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
            aspectRatio: 1.5,
          }}
        />
      </Paper>
    </Grid>
  );
}

export default IndustryMovementDateLine;
