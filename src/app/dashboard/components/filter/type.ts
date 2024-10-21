import { FilterOptions } from "@/app/api/transactions/types";

export type FilterProps = {
  initialFilter: FilterOptions;
  onFilterChange: (filter: FilterOptions) => void;
  open: boolean;
  onClose: () => void;
};
