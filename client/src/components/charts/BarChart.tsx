import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  CategoryScale,
  LinearScale,
  BarElement,
  // ChartConfiguration,
} from "chart.js";
import { ExpenseValues } from "../../utils/types";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  CategoryScale,
  LinearScale,
  BarElement
);

type Props = {
  expenseValues: ExpenseValues;
  expensePercent: number[];
  income: number;
  expenses: number;
};

const BarChart = ({
  expenseValues,
  expensePercent,
  income,
  expenses,
}: Props) => {
  const barOptions = {
    // responsive: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 0,
        },
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
        padding: 0,
        margin: 0,
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        padding: 0,
        margin: 0,
      },
    },
  };

  const barData = {
    labels: Object.keys(expenseValues),
    datasets: [
      {
        label: "% of expenses",
        data: expensePercent,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(128, 0, 128, 0.5)",
          "rgba(0, 128, 0, 0.5)",
          "rgba(0, 0, 128, 0.5)",
        ],
        barThickness: 12,
        // maxBarThickness: 10,
        // categoryPercentage: 0.9,
      },
    ],
  };
  return (
    <div className="bar">
      <Bar options={barOptions} data={barData} />

      <div className="bar-label">
        <h3 style={{ color: "var(--primarylight)" }}>+{income.toFixed(2)} €</h3>
        <h3 style={{ color: "var(--secondary)" }}>-{expenses.toFixed(2)} €</h3>
      </div>
    </div>
  );
};

export default BarChart;
