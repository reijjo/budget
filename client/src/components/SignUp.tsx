const SignUp = () => {
  return (
    <div className="logo-inputs">
      <p>Register</p>
      <form id="form-register">
        <div className="login-inputs">
          <div className="label-input">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" />
          </div>
          <div className="label-input">
            <label htmlFor="passwd">Password</label>
            <input type="text" name="passwd" />
          </div>
          <div className="label-input">
            <label htmlFor="passwd2">Confirm password</label>
            <input type="text" name="passwd2" />
          </div>

          <button
            type="submit"
            className="my-btn filled-btn"
            style={{ marginTop: "16px" }}
          >
            Sign in
          </button>
          <div className="helper-text">
            Already got an account? Sign in{" "}
            <button
              className="my-btn text-btn"
              // onClick={() => setSignIn(!signIn)}
            >
              here!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
