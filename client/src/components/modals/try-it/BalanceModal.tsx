import { Dispatch, SetStateAction } from "react";

type Props = {
  setBalanceModalOpen: Dispatch<SetStateAction<boolean>>;
};

const BalanceModal = ({ setBalanceModalOpen }: Props) => {
  return (
    <div className="inside-balancemodal">
      <a
        className="link-nostyle nav-close-button"
        style={{ color: "var(--secondary2)" }}
        title="close nav"
        onClick={() => setBalanceModalOpen(false)}
      >
        x
      </a>
      <div className="inside-income">
        <h3>Incomes</h3>
        <h4 style={{ textAlign: "center" }}>Nothing here in test version.</h4>

        {/* <div className="inside-grid">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div> */}
      </div>
      <div className="inside-expenses">
        <h3>Expenses</h3>
        <h4 style={{ textAlign: "center" }}>Nothing here in test version.</h4>
        {/* <div className="inside-grid">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div> */}
      </div>
    </div>
  );
};

export default BalanceModal;
