import { ChangeEvent, FormEvent, useState } from "react";
import { ErrorsEmail, InfoMsg } from "../utils/types";
import { isAxiosError } from "axios";
import InfoMessage from "../components/common/InfoMessage";
import userAPI from "../api/users-api";
import { Dna } from "react-loader-spinner";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [notValid, setNotValid] = useState<ErrorsEmail>({
    email: {
      len: null,
      valid: null,
    },
  });
  const [infoMessage, setInfoMessage] = useState<InfoMsg>({
    style: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const emailLenMsg =
      value.length > 60 ? "Max 60 characters on email." : null;
    const emailValidMsg = !emailRegex.test(value)
      ? "That is not a legit email."
      : null;

    setNotValid({ email: { len: emailLenMsg, valid: emailValidMsg } });
    setEmail(value);
  };

  const sendLink = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await userAPI.changePwLink(email);
      setInfoMessage({
        message: res.message,
        style: res.style,
      });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setInfoMessage({
          message: error.response?.data.message,
          style: "info-error",
        });
      } else {
        console.log("shady error", error);
      }
    } finally {
      setTimeout(() => {
        setInfoMessage({ message: null });
      }, 5000);
      setIsLoading(false);
    }
  };

  // Return
  return (
    <div className="landing-logo">
      <div className="logo-bg"></div>
      <div className="forgot-text">
        <h1 style={{ letterSpacing: "0", fontSize: "3rem" }}>
          Forgot password?
        </h1>
        <p>No worries.</p>
        {/* Form */}
        <div className="newpw-inputs">
          <p>Insert email for new password</p>
          <form id="form-newpw" onSubmit={sendLink}>
            <div className="login-inputs">
              {/* Password input */}

              <div className="label-input">
                <label htmlFor="forgot-input-email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="forgot-input-email"
                  value={email}
                  required
                  placeholder="Email..."
                  autoComplete="off"
                  onChange={handleEmail}
                  onFocus={() => setInputFocus(true)}
                  onBlur={() => setInputFocus(false)}
                />
              </div>
              {inputFocus && (notValid.email.len || notValid.email.valid) && (
                <ul>
                  {notValid.email.len && <li>{notValid.email.len}</li>}
                  {notValid.email.valid && <li>{notValid.email.valid}</li>}
                </ul>
              )}

              <div style={{ display: "flex", justifyContent: "center" }}>
                <InfoMessage
                  style={infoMessage.style}
                  message={infoMessage.message}
                />
              </div>

              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Dna
                    visible={true}
                    height={50}
                    width={50}
                    ariaLabel="dna-loading"
                  />
                  <h4>Loading...</h4>
                </div>
              ) : (
                <button
                  type="submit"
                  className="my-btn filled-btn"
                  style={{ marginTop: "16px" }}
                >
                  Send
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
