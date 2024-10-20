"use client";

import {
  fetchAndCalculateBalance,
  fetchAndCalculateDrawn,
  fetchAndCalculateRevenue,
} from "@/app/services/transactions";
import { Grid, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Summary() {
  const [totalBalance, setTotalBalance] = useState<string>("");
  const [totalRevenue, setTotalRevenue] = useState<string>("");
  const [totalDrawn, setTotalDrawn] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        setLoading(true);
        const balanceResult = await fetchAndCalculateBalance();
        const revenueResult = await fetchAndCalculateRevenue();
        const drawnResult = await fetchAndCalculateDrawn();

        setTotalBalance(balanceResult);
        setTotalRevenue(revenueResult);
        setTotalDrawn(drawnResult);
      } catch (error) {
        console.error("Erro ao buscar as transações:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTransactions();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Saldo total</Typography>
          <Typography variant="h4">
            {loading ? <Skeleton /> : totalBalance}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Total depositado</Typography>
          <Typography variant="h4">
            {loading ? <Skeleton /> : totalRevenue}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Total sacado</Typography>
          <Typography variant="h4">
            {" "}
            {loading ? <Skeleton /> : totalDrawn}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Summary;
