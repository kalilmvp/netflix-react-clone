import React, { useEffect, useState } from "react";

import "./styles.css";

const NavBar: React.FC = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    if (window.scrollY > 100) {
      setShowNavBar(true);
    } else {
      setShowNavBar(false);
    }
  }

  return (
    <div className={`nav ${showNavBar && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png"
        alt="Netflix Log"
      />
      <img
        className="nav__avatar"
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt="Netflix Avatar"
      />
    </div>
  );
};

export default NavBar;
