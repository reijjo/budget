import { Doughnut } from "react-chartjs-2";
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
import { useEffect } from "react";

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

const Donitsi = ({
  expenseValues,
  expensePercent,
  income,
  expenses,
}: Props) => {
  useEffect(() => {
    // console.log("expenseValues USEEFFECT", expenseValues);
  }, [expenses, expenseValues]);

  const donitsidata = {
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
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(128, 0, 128, 1)",
          "rgba(0, 128, 0, 1)",
          "rgba(0, 0, 128, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // console.log("donitsi expenses", expenseValues);

  return (
    <div className="donitsi">
      <Doughnut data={donitsidata} />

      <div className="donitsi-label">
        <h3 style={{ color: "var(--primarylight)" }}>+{income.toFixed(2)} €</h3>
        <h3 style={{ color: "var(--secondary)" }}>-{expenses.toFixed(2)} €</h3>
      </div>
    </div>
  );
};

export default Donitsi;
