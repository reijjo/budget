import { Dispatch, SetStateAction, useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { Logged } from "../utils/types";

type Props = {
  setUser: Dispatch<SetStateAction<Logged | null>>;
};

const Landing = ({ setUser }: Props) => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div id="landing">
      {signIn ? (
        <button
          className="my-btn outline-btn landing-top-button"
          onClick={() => setSignIn(!signIn)}
        >
          Register
        </button>
      ) : (
        <button
          className="my-btn outline-btn landing-top-button"
          onClick={() => setSignIn(!signIn)}
        >
          Sign in
        </button>
      )}

      <div className="landing-logo">
        <div className="logo-bg"></div>
        <div className="logo-text">
          <h1>BAG</h1>
          <p>Track your budget like a pro.</p>
          {signIn ? (
            <SignIn status={signIn} setSignIn={setSignIn} setUser={setUser} />
          ) : (
            <SignUp status={signIn} setSignIn={setSignIn} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
