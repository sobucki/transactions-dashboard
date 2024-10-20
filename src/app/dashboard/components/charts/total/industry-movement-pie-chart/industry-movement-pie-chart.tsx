import { useEffect, useState } from "react";
import { ChartProps, TransactionAmountCount } from "../../type";
import { generateQueryString } from "@/app/api/transactions/util/filter";
import Card from "@/components/card";
import { Pie } from "react-chartjs-2";
import { getBorderColor, getColor } from "../../commons";

function IndustryMovementPieChart({ filter }: ChartProps) {
  const [result, setResult] = useState<TransactionAmountCount[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const query = generateQueryString(filter);
        const response = await fetch(`/api/count/industry?${query}`);
        if (response.ok) {
          const data = await response.json();
          setResult(data);
        } else {
          console.error("Falha ao buscar as transações:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar as transações:", error);
      }
    };

    fetchTransactions();
  }, [filter]);

  const industries = [...new Set(result.map((item) => item.industry))];
  const totalMovements: number[] = [];

  industries.forEach((industry) => {
    const industryItem = result.find((item) => item.industry === industry);
    totalMovements.push(industryItem ? industryItem.amount_count : 0);
  });

  return (
    <Card>
      <Pie
        data={{
          labels: industries,
          datasets: [
            {
              label: "Movimentações",
              data: totalMovements,
              backgroundColor: totalMovements.map((_value, index) =>
                getColor(index)
              ),
              borderColor: totalMovements.map((_value, index) =>
                getBorderColor(index)
              ),
              borderWidth: 1,
            },
          ],
        }}
      />
    </Card>
  );
}

export default IndustryMovementPieChart;
