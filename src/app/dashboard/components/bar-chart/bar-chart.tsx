import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import Card from "@/components/card";
import { Transaction } from "@/app/api/transactions/types";

Chart.register(CategoryScale);

type BarCardProps = {
  data: Transaction[];
};

function BarCard({ data }: BarCardProps) {
  const dataChart = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    // labels: getUniqueValues(data, "account"),
    datasets: [
      {
        label: "Vendas",
        data: [50, 100, 150, 200, 250],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card>
      <Bar
        data={dataChart}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Vendas Mensais",
            },
          },
        }}
      />
    </Card>
  );
}

export default BarCard;
