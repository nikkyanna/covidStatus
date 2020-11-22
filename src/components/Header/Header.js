import "./Header.css";

import React from "react";

// Functional Component : to display the header.
const Header = () => {
  return (
    <div className="header">
      <div
        style={{
          color: "var(--color-primary)",
          fontWeight: "bold",
          position: "absolute",
          top: 10,
          marginLeft:20
        }}
      >
        Covid 19 OverView
      </div>
    </div>
  );
};

export default Header;
