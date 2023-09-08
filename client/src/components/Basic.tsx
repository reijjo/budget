import { useState } from "react";

const Basic = () => {
  const [balanceOpen, setBalanceOpen] = useState(false);

  const handleBalanceOpen = () => {
    setBalanceOpen(!balanceOpen);
  };

  console.log("Balance Open?", balanceOpen);
  return (
    <div className="main">
      <nav>
        <div>navbar</div>
      </nav>
      <section className="budget">
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
          eligendi nostrum ut rem aliquam autem quae molestiae aspernatur
          officia expedita, accusamus tempore natus exercitationem, suscipit
          numquam delectus nisi eveniet? Praesentium?
        </div>
      </section>
      <section className="buttons">
        {balanceOpen ? (
          <div className="balanceContainer" data-testid="balanceContainer">
            <div
              className="balance balanceOpen"
              datatest-id="balance"
              onClick={handleBalanceOpen}
            >
              <div className="eurosign">€€€ AUKII</div>
              <div className="moneys">Balance 2323€</div>
              <div className="eurosign">€€ AUKIII</div>
            </div>
            <div className="income-outcome">
              <div>HOHOOH</div>
            </div>
          </div>
        ) : (
          <div
            className="balance"
            onClick={handleBalanceOpen}
            data-testid="balance"
          >
            <div className="eurosign">€€€</div>
            <div className="moneys" data-testid="moneys">
              Balance 2323€
            </div>
            <div className="eurosign">€€€</div>
          </div>
        )}

        {!balanceOpen && (
          <div className="bigbuttons" data-testid="bigbuttons">
            <button
              className="expense"
              type="button"
              onClick={() => console.log("expense")}
            >
              <p>-</p>
            </button>
            <button
              className="income"
              type="button"
              onClick={() => console.log("income")}
            >
              <p>+</p>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Basic;
