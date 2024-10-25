"use client";

import { FilterOptions } from "@/app/api/transactions/types";
import { Box, Toolbar, Grid, Fab } from "@mui/material";
import { useState } from "react";
import IndustryBalanceBarChart from "../charts/balance/industry-balance-bar-chart";
import IndustryAmountBarChart from "../charts/sum/industry-amount-bar-chart";
import StateBalanceBarChart from "../charts/balance/state-balance-bar-chart";
import IndustryMovementPieChart from "../charts/total/industry-movement-pie-chart";
import Summary from "../summary";
import Filter from "../filter";
import FilterListIcon from "@mui/icons-material/FilterList";
import IndustryMovementDateLineChart from "../charts/total/industry-movement-date-line-chart";
import { useRouter, useSearchParams } from "next/navigation";
import {
  buildFilterFromRequest,
  generateQueryString,
} from "@/app/api/transactions/util/filter";

function Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterOptions = buildFilterFromRequest(searchParams);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const handleFilterChange = (filters: FilterOptions) => {
    router.push("/dashboard?" + generateQueryString(filters));
  };

  if (filterOptions === null) {
    return null;
  }

  const handleOpenFilterDialog = () => {
    setFilterDialogOpen(true);
  };

  const handleCloseFilterDialog = () => {
    setFilterDialogOpen(false);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Fab
        color="primary"
        aria-label="filter"
        onClick={handleOpenFilterDialog}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <FilterListIcon />
      </Fab>

      <Summary />
      <Filter
        onFilterChange={handleFilterChange}
        initialFilter={filterOptions}
        onClose={handleCloseFilterDialog}
        open={filterDialogOpen}
      />

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <IndustryAmountBarChart filter={filterOptions} />
          <IndustryBalanceBarChart filter={filterOptions} />
          <StateBalanceBarChart filter={filterOptions} />
          <IndustryMovementPieChart filter={filterOptions} />
          <IndustryMovementDateLineChart filter={filterOptions} />
        </Grid>
      </Box>
    </Box>
  );
}

export default Content;
