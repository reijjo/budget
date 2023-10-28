import { useEffect, useState } from "react";

const TryItOut = () => {
  const [saldo, setSaldo] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);

  useEffect(() => {
    setSaldo(income - expenses);
  }, [income, expenses]);

  const handleIncome = () => {
    console.log("lisaa massii");
    setIncome(income + 1);
  };

  const handleExpenses = () => {
    console.log("vahemman massii");
    setExpenses(expenses + 1);
  };

  return (
    <div id="try-it-out">
      <div className="balance">
        <div className="saldo">
          <h2>Saldo {saldo} €</h2>
          <div className="income-expenses">
            <h3>
              +{income} € | -{expenses} €
            </h3>
          </div>
        </div>
        <div className="money-buttons">
          <button onClick={handleIncome}>income</button>
          <button onClick={handleExpenses}>expenses</button>
        </div>
      </div>
    </div>
  );
};

export default TryItOut;
