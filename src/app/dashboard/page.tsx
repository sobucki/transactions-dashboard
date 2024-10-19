"use client";

import { useEffect, useState } from "react";
import BarChart from "./components/bar-chart";
import Filter from "./components/filter";
import LineChart from "./components/line-chart";
import { Container, Sidebar, Content } from "./styles";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "/api/http://localhost:3000/api/transactions?industry=Oil%20and%20Gas%20Equipment&startDate=2021-12-01&endDate=2021-12-30&minAmount=8044&maxAmount=8436"
        );
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error("Falha ao buscar as transações:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar as transações:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Container>
      <Sidebar>
        <button>Home</button>
        <button>Logout</button>
      </Sidebar>
      <Content>
        <Filter />
        <BarChart data={transactions} />
        <LineChart />
      </Content>
    </Container>
  );
};

export default DashboardPage;
