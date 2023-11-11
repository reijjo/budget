const Unauthorized = () => {
  return (
    <>
      <h1>403</h1>
      <button onClick={() => window.location.replace("/")}>homepage</button>
    </>
  );
};

export default Unauthorized;
