import { InfoMsg } from "../../utils/types";

const infoStyles = {
  container: {
    border: "2px solid",
    borderRadius: "4px",
    width: "max-content",
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    marginTop: "8px",
  },
};

const InfoMessage = (info: InfoMsg) => {
  if (!info.message || !info) {
    return null;
  }
  return (
    <div style={infoStyles.container} className={info.style}>
      {info.message}
    </div>
  );
};

export default InfoMessage;
