import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import Card from "@/components/card";
import { Transaction } from "@/app/api/transactions/types";
import { useEffect, useState } from "react";

Chart.register(CategoryScale);

type BarCardProps = {
  data: Transaction[];
};

function BarCard({}: BarCardProps) {
  const [result, setResult] = useState<
    (Transaction & { amount_sum: number })[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response: Response = await fetch(
          "/api/sum/industry/transaction_type"
        );
        if (response.ok) {
          const data: (Transaction & { amount_sum: number })[] =
            await response.json();
          setResult(data);
        } else {
          console.error("Falha ao buscar as transações:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar as transações:", error);
      }
    };

    loadData();
  }, []);

  const industries = [...new Set(result.map((item) => item.industry))];

  const depositData: number[] = [];
  const withdrawData: number[] = [];

  industries.forEach((industry) => {
    const depositItem = result.find(
      (item) =>
        item.industry === industry && item.transaction_type === "deposit"
    );
    const withdrawItem = result.find(
      (item) =>
        item.industry === industry && item.transaction_type === "withdraw"
    );

    depositData.push(depositItem ? depositItem.amount_sum / 100 : 0);
    withdrawData.push(withdrawItem ? withdrawItem.amount_sum / 100 : 0);
  });

  return (
    <Card>
      <Bar
        data={{
          labels: industries,
          datasets: [
            {
              label: "Depósito",
              data: depositData,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Saque",
              data: withdrawData,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Movimentação por Indústria",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label +=
                      "R$ " +
                      new Intl.NumberFormat("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(context.parsed.y);
                  }
                  return label;
                },
              },
            },
          },

          scales: {
            x: {
              stacked: false,
              ticks: {
                autoSkip: false,
              },
            },
            y: {
              stacked: false,
              beginAtZero: true,
            },
          },
        }}
      />
    </Card>
  );
}

export default BarCard;
