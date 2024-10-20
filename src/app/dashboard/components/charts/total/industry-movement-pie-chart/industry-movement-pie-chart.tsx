"use client";

import { useEffect, useState } from "react";
import { ChartProps, TransactionAmountCount } from "../../type";
import { generateQueryString } from "@/app/api/transactions/util/filter";
import { Pie } from "react-chartjs-2";
import { getBorderColor, getColor } from "../../commons";
import { Grid, Paper, Typography } from "@mui/material";

function IndustryMovementPieChart({ filter }: ChartProps) {
  const [result, setResult] = useState<TransactionAmountCount[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const query = generateQueryString(filter);
        const response = await fetch(`/api/count/industry?${query}`);
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
  const totalMovements: number[] = [];

  industries.forEach((industry) => {
    const industryItem = result.find((item) => item.industry === industry);
    totalMovements.push(industryItem ? industryItem.amount_count : 0);
  });

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <Typography variant="h6">Movimentação por Indústria</Typography>
        <Pie
          data={{
            labels: industries,
            datasets: [
              {
                label: "Movimentações",
                data: totalMovements,
                backgroundColor: totalMovements.map((_value, index) =>
                  getColor(index)
                ),
                borderColor: totalMovements.map((_value, index) =>
                  getBorderColor(index)
                ),
                borderWidth: 1,
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

export default IndustryMovementPieChart;
