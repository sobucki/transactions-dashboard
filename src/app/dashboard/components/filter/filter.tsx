"use client";

import {
  TextField,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";

import stateOptions from "./data/states.json";
import industryOptions from "./data/industries.json";
import accountNameOptions from "./data/accounts.json";
import { FilterProps } from "./type";
import { FilterOptions, TransactionType } from "@/app/api/transactions/types";

function Filter({ initialFilter, onFilterChange, onClose, open }: FilterProps) {
  const [startDate, setStartDate] = useState(initialFilter?.startDate || "");
  const [endDate, setEndDate] = useState(initialFilter?.endDate || "");
  const [minAmount, setMinAmount] = useState(initialFilter?.minAmount || "");
  const [maxAmount, setMaxAmount] = useState(initialFilter?.maxAmount || "");
  const [transactionType, setTransactionType] = useState<TransactionType | "">(
    initialFilter?.transactionType || ""
  );
  const [accountNames, setAccountNames] = useState<string[]>(
    initialFilter?.account || []
  );
  const [industries, setIndustries] = useState<string[]>(
    initialFilter?.industry || []
  );
  const [states, setStates] = useState<string[]>(initialFilter?.state || []);

  useEffect(() => {
    setStartDate(initialFilter?.startDate || "");
    setEndDate(initialFilter?.endDate || "");
    setMinAmount(initialFilter?.minAmount || "");
    setMaxAmount(initialFilter?.maxAmount || "");
    setTransactionType(initialFilter?.transactionType || "");
    setAccountNames(initialFilter?.account || []);
    setIndustries(initialFilter?.industry || []);
    setStates(initialFilter?.state || []);
  }, [initialFilter]);

  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    setMinAmount("");
    setMaxAmount("");
    setTransactionType("");
    setAccountNames([]);
    setIndustries([]);
    setStates([]);

    onFilterChange({});
    onClose();
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const applyFilters = () => {
    const filters: FilterOptions = {
      startDate,
      endDate,
      minAmount,
      maxAmount,
      transactionType: transactionType as TransactionType,
      account: accountNames,
      industry: industries,
      state: states,
    };

    onFilterChange(filters);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Filtros</DialogTitle>
      <DialogContent dividers>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <TextField
            label="Data de Início"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Data de Fim"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Valor Mínimo"
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />
          <TextField
            label="Valor Máximo"
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
          />
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel id="transaction-type-label">
              Tipo de Transação
            </InputLabel>
            <Select
              labelId="transaction-type-label"
              value={transactionType}
              label="Tipo de Transação"
              onChange={(e) =>
                setTransactionType(e.target.value as TransactionType)
              }
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              <MenuItem value="deposit">Depósito</MenuItem>
              <MenuItem value="withdraw">Saque</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel id="account-name-label">Nome da Conta</InputLabel>
            <Select
              labelId="account-name-label"
              multiple
              value={accountNames}
              onChange={(e) => setAccountNames(e.target.value as string[])}
              input={<OutlinedInput label="Nome da Conta" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {accountNameOptions.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={accountNames.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel id="industry-label">Indústria</InputLabel>
            <Select
              labelId="industry-label"
              multiple
              value={industries}
              onChange={(e) => setIndustries(e.target.value as string[])}
              input={<OutlinedInput label="Indústria" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {industryOptions.map((industry) => (
                <MenuItem key={industry} value={industry}>
                  <Checkbox checked={industries.indexOf(industry) > -1} />
                  <ListItemText primary={industry} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel id="state-label">Estado</InputLabel>
            <Select
              labelId="state-label"
              multiple
              value={states}
              onChange={(e) => setStates(e.target.value as string[])}
              input={<OutlinedInput label="Estado" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {stateOptions.map((state) => (
                <MenuItem key={state.abbreviation} value={state.abbreviation}>
                  <Checkbox checked={states.indexOf(state.abbreviation) > -1} />
                  <ListItemText primary={state.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearFilters}
        >
          Limpar
        </Button>
        <Button variant="contained" color="primary" onClick={applyFilters}>
          Buscar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Filter;
