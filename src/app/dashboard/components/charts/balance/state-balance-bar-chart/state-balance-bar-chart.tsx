"use client";

import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Transaction } from "@/app/api/transactions/types";
import { generateQueryString } from "@/app/api/transactions/util/filter";
import { useEffect, useState } from "react";
import { negativeColors, positiveColors } from "../../commons";
import { ChartProps } from "../../type";
import { Grid, Paper, Typography } from "@mui/material";

Chart.register(CategoryScale);

function IndustryBalanceBarChart({ filter }: ChartProps) {
  const [result, setResult] = useState<
    (Transaction & { amount_sum: number })[]
  >([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const query = generateQueryString(filter);
        const response = await fetch(
          `/api/sum/state/transaction_type?${query}`
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

  const states = [...new Set(result.map((item) => item.state))];

  const balanceData: number[] = [];

  states.forEach((state) => {
    const statesTransactions = result.filter((item) => item.state === state);

    const balance = statesTransactions.reduce((acc, item) => {
      if (item.transaction_type === "deposit") {
        return acc + item.amount_sum / 100;
      } else if (item.transaction_type === "withdraw") {
        return acc - item.amount_sum / 100;
      }
      return acc;
    }, 0);

    balanceData.push(balance);
  });

  const positiveBalanceData = balanceData.map((value) =>
    value >= 0 ? value : null
  );
  const negativeBalanceData = balanceData.map((value) =>
    value < 0 ? value : null
  );

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <Typography variant="h6">Saldo por Estados</Typography>
        <Bar
          data={{
            labels: states,
            datasets: [
              {
                label: "Saldo Positivo",
                data: positiveBalanceData,
                ...positiveColors,
              },
              {
                label: "Saldo Negativo",
                data: negativeBalanceData,
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
                  maxRotation: 45,
                  minRotation: 0,
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

export default IndustryBalanceBarChart;
