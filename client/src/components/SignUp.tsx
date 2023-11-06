import {
  SetStateAction,
  useState,
  FormEvent,
  ChangeEvent,
  Dispatch,
} from "react";
import { User, InputFocus, InfoMsg } from "../utils/types";
import userAPI from "../../api/users-api";
import InfoMessage from "./common/InfoMessage";
import { isAxiosError } from "axios";

interface Props {
  status: boolean;
  setSignIn: Dispatch<SetStateAction<boolean>>;
}

const SignUp = ({ status, setSignIn }: Props) => {
  const [newUser, setNewUser] = useState<User>({
    email: "",
    passwd: "",
    passwd2: "",
  });

  const [inputFocus, setInputFocus] = useState<InputFocus>({
    email: false,
    passwd: false,
    passwd2: false,
  });

  const [infoMessage, setInfoMessage] = useState<InfoMsg>({
    style: "",
    message: "",
  });

  // Handles the correct fields input

  const handleRegister = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle input focus / blur

  const handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setInputFocus((prevData) => ({
      ...prevData,
      [name]: true,
    }));
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setInputFocus((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };

  // Registers user

  const registerUser = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const regUser = await userAPI.createUser(newUser);
      setInfoMessage({ message: regUser.message, style: regUser.style });
    } catch (error: unknown) {
      console.log("error");
      if (isAxiosError(error)) {
        setInfoMessage({
          message: error.response?.data.message,
          style: "info-error",
        });
      } else {
        console.log("shady error", error);
      }
    }
    setTimeout(() => {
      setInfoMessage({ message: null });
    }, 6000);
  };

  console.log("inputfocus", inputFocus);

  // Return

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
              onChange={handleRegister}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              onChange={handleRegister}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              onChange={handleRegister}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <button
            type="submit"
            className="my-btn filled-btn"
            style={{ marginTop: "16px" }}
          >
            Sign up
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
