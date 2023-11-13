import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/moneybag2-removebg.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavi = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav>
      {isOpen ? (
        <div className="nav-open">
          <a
            className="link-nostyle nav-close-button"
            style={{ color: "var(--secondary2)" }}
            title="close nav"
            onClick={() => setIsOpen(!isOpen)}
          >
            x
          </a>
          <div className="menu-links">
            <a className="link-nostyle" onClick={() => handleNavi("/")}>
              Home
            </a>
            <a className="link-nostyle" onClick={() => handleNavi("/budget")}>
              My Budget
            </a>
            <hr
              style={{
                width: "80%",
                margin: "8px 2px 16px",
                borderTop: "1px solid var(--primary)",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "1px solid var(--primary)",
              }}
            />
            <a
              className="link-logout"
              onClick={() => {
                window.localStorage.clear(), window.location.replace("/");
              }}
            >
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="nav-closed">
          <a className="link-nostyle" onClick={() => setIsOpen(!isOpen)}>
            <img src={logo} alt="logo" title="open nav" />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
