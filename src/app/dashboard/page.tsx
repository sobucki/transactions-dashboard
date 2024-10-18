"use client";

import BarChart from "./components/bar-chart";
import Filter from "./components/filter";
import LineChart from "./components/line-chart";
import { Container, Sidebar, Content } from "./styles";

const DashboardPage = () => {
  return (
    <Container>
      <Sidebar>
        <button>Home</button>
        <button>Logout</button>
      </Sidebar>
      <Content>
        <Filter />
        <BarChart />
        <LineChart />
      </Content>
    </Container>
  );
};

export default DashboardPage;
