const emailCheck = (email: string) => {
  if (!email.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
    return {
      message: "Shady email address.",
      style: "info-error",
    };
  }

  if (email.length > 60) {
    return {
      message: "Max 60 characters on email",
      style: "info-error",
    };
  }
};

const passwdCheck = (passwd: string) => {
  if (passwd.length < 8 || passwd.length > 30) {
    return {
      message: "Password length must be 8 - 30 characters.",
      style: "info-error",
    };
  }

  if (!/\d/.test(passwd)) {
    return {
      message: "Password must contain at least one number.",
      style: "info-error",
    };
  }

  if (!/[A-Z]/.test(passwd)) {
    return {
      message: "Password must contain at least one Uppercase letter.",
      style: "info-error",
    };
  }

  if (!/[!._\-@#*$]/.test(passwd)) {
    return {
      message:
        "Password must contain at least one special character (!._-@#*$).",
      style: "info-error",
    };
  }
};

const passwd12Check = (passwd: string, passwd2: string) => {
  if (passwd2 !== passwd) {
    return {
      message: "Passwords do not match!",
      style: "info-error",
    };
  }
};

const isValid = {
  emailCheck,
  passwdCheck,
  passwd12Check,
};

export default isValid;
