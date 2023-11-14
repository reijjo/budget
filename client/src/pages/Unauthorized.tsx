const Unauthorized = () => {
  return (
    <div className="center-div">
      <h1 style={{ marginBottom: "24px" }}>403 - Just go back and sign in.</h1>
      <button
        onClick={() => window.location.replace("/")}
        className="my-btn outline-btn"
      >
        Back to homepage
      </button>
    </div>
  );
};

export default Unauthorized;
