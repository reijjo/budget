import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { isAxiosError } from "axios";
import { ChangePw, EmailErrors, EmailFocus, InfoMsg } from "../utils/types";
import Loading from "../components/common/Loading";
import InfoMessage from "../components/common/InfoMessage";
import userAPI from "../api/users-api";
import { useParams } from "react-router-dom";

const NewPw = () => {
  const [newPw, setNewPw] = useState<ChangePw>({
    passwd: "",
    passwd2: "",
  });
  const [inputFocus, setInputFocus] = useState<EmailFocus>({
    passwd: false,
    passwd2: false,
  });
  const [notValid, setNotValid] = useState<EmailErrors>({
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
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Get the code from the address
  const theCode = useParams();

  // Fetch user with the code
  useEffect(() => {
    const codeFunc = async (code: string) => {
      try {
        const codeUser = await userAPI.getCode(code);

        console.log("codeUSer", codeUser);

        if (codeUser.user !== null) {
          setUserEmail(codeUser.user.email);
        } else {
          setUserEmail("");
          window.location.replace("/fake");
        }
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
          setIsLoading(false);
        }, 1000);
      }
    };
    if (theCode && theCode.code) {
      codeFunc(theCode.code);
    }
    // console.log("CODE", theCode.code);
  }, [theCode]);

  const handleNewPasswd = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewPw((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "passwd") {
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
      const pw2Msg = value !== newPw.passwd ? "Passwords doesn't match." : null;

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

  // Changes the password
  const changePassword = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const passwords = {
        passwd: newPw.passwd,
        passwd2: newPw.passwd2,
      };
      const changePw = await userAPI.newPw(String(theCode.code), passwords);
      console.log("Change password api response", changePw);
      setInfoMessage({
        message: changePw.message,
        style: changePw.style,
      });

      console.log("code", theCode);
    } catch (error: unknown) {
      console.log("error", error);
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
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="forgot">
      <button
        className="my-btn outline-btn landing-top-button"
        onClick={() => window.location.replace("/")}
      >
        Sign in
      </button>

      <div className="landing-logo">
        <div className="logo-bg"></div>
        <div className="forgot-text">
          <h1 style={{ letterSpacing: "0", fontSize: "3rem" }}>
            Change password
          </h1>
          {/* <p>No worries, change it here.</p> */}
          {/* Form */}
          <div className="newpw-inputs">
            <p>New password for '{userEmail}'</p>
            <form id="form-newpw" onSubmit={changePassword}>
              <div className="login-inputs">
                {/* Password input */}

                <div className="label-input">
                  <label htmlFor="reg-input-passwd">Password</label>
                  <input
                    type="password"
                    name="passwd"
                    id="reg-input-passwd"
                    value={newPw.passwd}
                    required
                    placeholder="Password..."
                    autoComplete="off"
                    onChange={handleNewPasswd}
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
                      {notValid.passwd.capital && (
                        <li>{notValid.passwd.capital}</li>
                      )}
                      {notValid.passwd.len && <li>{notValid.passwd.len}</li>}
                      {notValid.passwd.num && <li>{notValid.passwd.num}</li>}
                      {notValid.passwd.special && (
                        <li>{notValid.passwd.special}</li>
                      )}
                    </ul>
                  )}

                {/* Confirm password input */}

                <div className="label-input">
                  <label htmlFor="reg-input-passwd2">Confirm password</label>
                  <input
                    type="password"
                    name="passwd2"
                    id="reg-input-passwd2"
                    value={newPw.passwd2}
                    required
                    placeholder="Confirm password..."
                    autoComplete="off"
                    onChange={handleNewPasswd}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                {inputFocus.passwd2 && notValid.passwd2.match && (
                  <ul>
                    {notValid.passwd2.match && (
                      <li>{notValid.passwd2.match}</li>
                    )}
                  </ul>
                )}

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <InfoMessage
                    style={infoMessage.style}
                    message={infoMessage.message}
                  />
                </div>

                <button
                  type="submit"
                  className="my-btn filled-btn"
                  style={{ marginTop: "16px" }}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPw;
