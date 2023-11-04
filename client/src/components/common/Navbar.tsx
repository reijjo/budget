import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      {isOpen ? (
        <div className="nav-right">
          <ul>
            <li>Sign up</li>
            <li>Sign in</li>
          </ul>
        </div>
      ) : (
        <div className="nav-closed">
          <button onClick={() => setIsOpen(!isOpen)}>logo etc</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
