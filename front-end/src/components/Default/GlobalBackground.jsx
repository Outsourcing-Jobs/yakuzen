import React from "react";
import "./GlobalBackground.css";

const GlobalBackground = () => {
  return (
    <>
      <div className="hp-noise" aria-hidden="true" />

      <div className="hp-studs" aria-hidden="true">
        {Array.from({ length: 48 }).map((_, i) => (
          <span key={i} className="stud" />
        ))}
      </div>
    </>
  );
};

export default GlobalBackground;
