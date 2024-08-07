import React from "react";
import "./modul.scss";
import { IoMdClose } from "react-icons/io";

function Modul({ children, width, close, bg }) {
  return (
    <>
      <div
        style={{ backgroundColor: bg }}
        onClick={() => close(false)}
        className="overlay"
      ></div>
      <div style={{ width }} className="model">
        <button onClick={() => close(false)} className="model__btn">
          <IoMdClose />
        </button>
        {children}
      </div>
    </>
  );
}

export default Modul;
