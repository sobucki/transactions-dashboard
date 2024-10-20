"use client";

import { useState } from "react";
import Filter from "./components/filter";
import { Container, Sidebar, Content } from "./styles";
import { FilterOptions } from "../api/transactions/types";
import IndustryBalanceBarChart from "./components/charts/balance/industry-balance-bar-chart";
import IndustryAmountBarChart from "./components/charts/sum/industry-amount-bar-chart";
import StateBalanceBarChart from "./components/charts/balance/state-balance-bar-chart";
import IndustryMovementPieChart from "./components/charts/total/industry-movement-pie-chart";

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
        <IndustryAmountBarChart filter={filterOptions} />
        <IndustryBalanceBarChart filter={filterOptions} />
        <StateBalanceBarChart filter={filterOptions} />
        <IndustryMovementPieChart filter={filterOptions} />
      </Content>
    </Container>
  );
};

export default DashboardPage;
