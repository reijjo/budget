import {
  SetStateAction,
  useState,
  FormEvent,
  ChangeEvent,
  Dispatch,
} from "react";
import { RegisterInfo, InputFocus, InfoMsg, FormErrors } from "../utils/types";
import userAPI from "../api/users-api";
import InfoMessage from "./common/InfoMessage";
import { isAxiosError } from "axios";

interface Props {
  status: boolean;
  setSignIn: Dispatch<SetStateAction<boolean>>;
}

const SignUp = ({ status, setSignIn }: Props) => {
  const [newUser, setNewUser] = useState<RegisterInfo>({
    email: "",
    passwd: "",
    passwd2: "",
  });

  const [inputFocus, setInputFocus] = useState<InputFocus>({
    email: false,
    passwd: false,
    passwd2: false,
  });

  const [notValid, setNotValid] = useState<FormErrors>({
    email: {
      len: null,
      valid: null,
    },
    passwd: {
      len: null,
      special: null,
      capital: null,
      num: null,
    },
    passwd2: {
      match: null,
    },
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

    // Checks if input is valid

    if (name === "email") {
      const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const emailLenMsg =
        value.length > 60 ? "Max 60 characters on email." : null;
      const emailValidMsg = !emailRegex.test(value)
        ? "That is not a legit email."
        : null;

      setNotValid((prevErrors) => ({
        ...prevErrors,
        email: { len: emailLenMsg, valid: emailValidMsg },
      }));
    } else if (name === "passwd") {
      const pwLenMsg =
        value.length < 8 || value.length > 30 ? "8-30 characters." : null;
      const pwNumMsg = !/\d/.test(value) ? "At least one number." : null;
      const pwCapitalMsg = !/[A-Z]/.test(value)
        ? "At least one Uppercase letter."
        : null;
      const pwSpecialMsg = !/[!._\-@#*$]/.test(value)
        ? "At least one special character !._-@#*$"
        : null;

      setNotValid((prevErrors) => ({
        ...prevErrors,
        passwd: {
          len: pwLenMsg,
          num: pwNumMsg,
          capital: pwCapitalMsg,
          special: pwSpecialMsg,
        },
      }));
    } else if (name === "passwd2") {
      const pw2Msg =
        value !== newUser.passwd ? "Passwords doesn't match." : null;

      setNotValid((prevErrors) => ({
        ...prevErrors,
        passwd2: {
          match: pw2Msg,
        },
      }));
    }
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
          {inputFocus.email && (notValid.email.len || notValid.email.valid) && (
            <ul>
              {notValid.email.len && <li>{notValid.email.len}</li>}
              {notValid.email.valid && <li>{notValid.email.valid}</li>}
            </ul>
          )}

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
          {inputFocus.passwd &&
            (notValid.passwd.capital ||
              notValid.passwd.len ||
              notValid.passwd.num ||
              notValid.passwd.special) && (
              <ul>
                {notValid.passwd.capital && <li>{notValid.passwd.capital}</li>}
                {notValid.passwd.len && <li>{notValid.passwd.len}</li>}
                {notValid.passwd.num && <li>{notValid.passwd.num}</li>}
                {notValid.passwd.special && <li>{notValid.passwd.special}</li>}
              </ul>
            )}

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
          {inputFocus.passwd2 && notValid.passwd2.match && (
            <ul>
              {notValid.passwd2.match && <li>{notValid.passwd2.match}</li>}
            </ul>
          )}

          <button
            type="submit"
            className="my-btn filled-btn"
            style={{ marginTop: "16px" }}
          >
            Register
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
