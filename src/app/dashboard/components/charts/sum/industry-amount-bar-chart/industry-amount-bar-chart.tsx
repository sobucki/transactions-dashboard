"use client";

import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { generateQueryString } from "@/app/api/transactions/util/filter";
import { negativeColors, positiveColors } from "../../commons";
import { ChartProps, TransactionAmountSum } from "../../type";
import { Grid, Paper, Typography } from "@mui/material";

Chart.register(CategoryScale);

function IndustryAmountBarChart({ filter }: ChartProps) {
  const [result, setResult] = useState<TransactionAmountSum[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const query = generateQueryString(filter);
        const response = await fetch(
          `/api/sum/industry/transaction_type?${query}`
        );
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

  const industries = [...new Set(result.map((item) => item.industry))];

  const depositData: number[] = [];
  const withdrawData: number[] = [];

  industries.forEach((industry) => {
    const depositItem = result.find(
      (item) =>
        item.industry === industry && item.transaction_type === "deposit"
    );
    const withdrawItem = result.find(
      (item) =>
        item.industry === industry && item.transaction_type === "withdraw"
    );

    depositData.push(depositItem ? depositItem.amount_sum / 100 : 0);
    withdrawData.push(withdrawItem ? withdrawItem.amount_sum / 100 : 0);
  });

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <Typography variant="h6">Movimentação por Indústria</Typography>

        <Bar
          data={{
            labels: industries,
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
                position: "top",
              },

              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += ": ";
                    }
                    if (context.parsed.y !== null) {
                      label +=
                        "R$ " +
                        new Intl.NumberFormat("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(context.parsed.y);
                    }
                    return label;
                  },
                },
              },
            },

            scales: {
              x: {
                stacked: false,
                ticks: {
                  autoSkip: false,
                },
              },
              y: {
                stacked: false,
                beginAtZero: true,
              },
            },
          }}
        />
      </Paper>
    </Grid>
  );
}

export default IndustryAmountBarChart;
