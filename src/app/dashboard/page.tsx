"use client";

import { useState } from "react";
import BarChart from "./components/bar-chart";
import Filter from "./components/filter";
import LineChart from "./components/line-chart";
import { Container, Sidebar, Content } from "./styles";
import { FilterOptions } from "../api/transactions/types";

const DashboardPage = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});

  const handleFilterChange = (filters: FilterOptions) => {
    setFilterOptions(filters);
  };

  return (
    <Container>
      <Sidebar>
        <button>Home</button>
        <button>Logout</button>
      </Sidebar>
      <Content>
        <Filter
          initialFilter={filterOptions}
          onFilterChange={handleFilterChange}
        />
        <BarChart filter={filterOptions} />
        <LineChart />
      </Content>
    </Container>
  );
};

export default DashboardPage;
