"use client";

import { FilterOptions } from "@/app/api/transactions/types";
import { Box, Toolbar, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import IndustryBalanceBarChart from "../charts/balance/industry-balance-bar-chart";
import IndustryAmountBarChart from "../charts/sum/industry-amount-bar-chart";
import StateBalanceBarChart from "../charts/balance/state-balance-bar-chart";
import IndustryMovementPieChart from "../charts/total/industry-movement-pie-chart";
import Summary from "../summary";
import Filter from "../filter";
import Cookies from "js-cookie";

function Content() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );

  useEffect(() => {
    const savedFilter = Cookies.get("filter");
    const initialFilter = savedFilter ? JSON.parse(savedFilter) : {};
    setFilterOptions(initialFilter);
  }, []);

  const handleFilterChange = (filters: FilterOptions) => {
    Cookies.set("filter", JSON.stringify(filters));
    setFilterOptions(filters);
  };

  if (filterOptions === null) {
    return null;
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Summary />
      <Filter
        onFilterChange={handleFilterChange}
        initialFilter={filterOptions}
      />

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <IndustryAmountBarChart filter={filterOptions} />
          <IndustryBalanceBarChart filter={filterOptions} />
          <StateBalanceBarChart filter={filterOptions} />
          <IndustryMovementPieChart filter={filterOptions} />
        </Grid>
      </Box>
    </Box>
  );
}

export default Content;
