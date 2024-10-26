import React from "react";

const Card = ({ children, className = "", hoverable = false }) => (
  <div
    className={`bg-white rounded-lg shadow-md p-6 ${
      hoverable ? "hover:shadow-xl transition-shadow" : ""
    } ${className}`}
  >
    {children}
  </div>
);

export default Card;
