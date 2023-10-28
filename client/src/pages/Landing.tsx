import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div id="landing">
      <h1 style={{ color: "var(--primary)" }}>MASSIT!</h1>
      <h1 style={{ color: "var(--primarymid)" }}>MASSIT!</h1>
      <h1 style={{ color: "var(--primarylight)" }}>MASSIT!</h1>
      <h1 style={{ color: "var(--secondary)" }}>MASSIT!</h1>
      <h1 style={{ color: "var(--secondary2)" }}>MASSIT!</h1>
      <h1 style={{ color: "var(--bg)" }}>MASSIT!</h1>
      <h1 style={{ color: "var(--text)" }}>MASSIT!</h1>

      <h1 style={{ color: "var(--primary)", textTransform: "lowercase" }}>
        MASSIT!
      </h1>
      <h1 style={{ color: "var(--primarymid)", textTransform: "lowercase" }}>
        MASSIT!
      </h1>
      <h1 style={{ color: "var(--primarylight)", textTransform: "lowercase" }}>
        MASSIT!
      </h1>
      <h1 style={{ color: "var(--secondary)", textTransform: "lowercase" }}>
        MASSIT!
      </h1>
      <h1 style={{ color: "var(--secondary2)", textTransform: "lowercase" }}>
        MASSIT!
      </h1>
      <h1 style={{ color: "var(--bg)", textTransform: "lowercase" }}>
        MASSIT!
      </h1>
      <h1 style={{ color: "var(--text)", textTransform: "lowercase" }}>
        MASSIT!
      </h1>
      <Link to="/test">Click here to try it out!</Link>
    </div>
  );
};

export default Landing;
