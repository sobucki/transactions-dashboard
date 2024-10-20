"use client";

import { Container } from "./styles";
import Sidebar from "./components/sidebar";
import Content from "./components/content";

const DashboardPage = () => {
  return (
    <Container>
      <Sidebar />
      <Content />
    </Container>
  );
};

export default DashboardPage;
