import { SetStateAction, useState, FormEvent, ChangeEvent } from "react";
import { InfoMsg, User } from "../utils/types";
import userAPI from "../../api/users-api";
import InfoMessage from "./common/InfoMessage";
import { isAxiosError } from "axios";

interface Props {
  // onClick?: () => void | null;
  status: boolean;
  setSignIn: React.Dispatch<SetStateAction<boolean>>;
}

const SignUp = ({ status, setSignIn }: Props) => {
  const [newUser, setNewUser] = useState<User>({
    email: "",
    passwd: "",
    passwd2: "",
  });
  const [infoMessage, setInfomessage] = useState<InfoMsg>({
    style: "",
    message: "",
  });

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerUser = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const regUser = await userAPI.createUser(newUser);
      setInfomessage({ message: regUser.message, style: regUser.style });
    } catch (error: unknown) {
      console.log("error");
      if (isAxiosError(error)) {
        setInfomessage({
          message: error.response?.data.message,
          style: "info-error",
        });
      } else {
        console.log("shady error", error);
      }
    }
    setTimeout(() => {
      setInfomessage({ message: null });
    }, 6000);
  };

  return (
    <div className="logo-inputs">
      <p>Register</p>
      <form id="form-register" onSubmit={registerUser}>
        <div className="login-inputs">
          {/* Email input */}

          <div className="label-input">
            <label htmlFor="reg-input-email">Email</label>
            <input
              type="text"
              name="email"
              id="reg-input-email"
              value={newUser.email}
              required
              placeholder="Email..."
              autoComplete="off"
              onChange={handleInput}
            />
          </div>

          {/* Password input */}

          <div className="label-input">
            <label htmlFor="reg-input-passwd">Password</label>
            <input
              type="password"
              name="passwd"
              id="reg-input-passwd"
              value={newUser.passwd}
              required
              placeholder="Password..."
              autoComplete="off"
              onChange={handleInput}
            />
          </div>

          {/* Confirm password input */}

          <div className="label-input">
            <label htmlFor="reg-input-passwd2">Confirm password</label>
            <input
              type="password"
              name="passwd2"
              id="reg-input-passwd2"
              value={newUser.passwd2}
              required
              placeholder="Confirm password..."
              autoComplete="off"
              onChange={handleInput}
            />
          </div>

          <button
            type="submit"
            className="my-btn filled-btn"
            style={{ marginTop: "16px" }}
          >
            Sign in
          </button>
        </div>
      </form>

      <InfoMessage style={infoMessage.style} message={infoMessage.message} />

      <div className="helper-text" style={{ textAlign: "center" }}>
        Already got an account? Sign in{" "}
        <button className="my-btn text-btn" onClick={() => setSignIn(!status)}>
          here!
        </button>
      </div>
    </div>
  );
};

export default SignUp;
