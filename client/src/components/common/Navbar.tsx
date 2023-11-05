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
