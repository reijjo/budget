import { Dna } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="center-div">
      <Dna visible={true} height={100} width={100} ariaLabel="dna-loading" />
      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;
