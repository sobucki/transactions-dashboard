import { Color } from "chart.js";

type ChartColors = {
  backgroundColor: Color;
  borderColor: Color;
  borderWidth: number;
  hoverBackgroundColor: Color;
  borderRadius: number;
};

export const positiveColors: ChartColors = {
  backgroundColor: "rgba(54, 162, 235, 0.2)",
  borderColor: "rgba(54, 162, 235, 1)",
  borderWidth: 1,
  hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
  borderRadius: 5,
};

export const negativeColors: ChartColors = {
  backgroundColor: "rgba(255, 99, 132, 0.2)",
  borderColor: "rgba(255, 99, 132, 1)",
  borderWidth: 1,
  borderRadius: 5,
  hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
};

export const pieColors = {
  backgroundColor: [
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(199, 199, 199, 0.2)",
    "rgba(83, 102, 255, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(201, 203, 207, 0.2)",
  ],
  borderColor: [
    "rgba(54, 162, 235, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(199, 199, 199, 1)",
    "rgba(83, 102, 255, 1)",
    "rgba(255, 205, 86, 1)",
    "rgba(201, 203, 207, 1)",
  ],
  borderWidth: 1,
};

export function getColor(index: number) {
  const colors = [
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(199, 199, 199, 0.2)",
    "rgba(83, 102, 255, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(201, 203, 207, 0.2)",
  ];
  return colors[index % colors.length];
}

export function getBorderColor(index: number) {
  const borderColors = [
    "rgba(54, 162, 235, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(199, 199, 199, 1)",
    "rgba(83, 102, 255, 1)",
    "rgba(255, 205, 86, 1)",
    "rgba(201, 203, 207, 1)",
  ];
  return borderColors[index % borderColors.length];
}
