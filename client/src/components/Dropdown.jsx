import { useState } from "react";

import "../assets/styles/dropdown.scss";
import vector from "../assets/images/vector.svg";

export default function Dropdown({ title, children }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className={isOpened ? "dropdown" : "dropdown hidden"}>
      <button
        className="dropdown__btn"
        onClick={(e) => {
          setIsOpened(!isOpened);
          e.target.classList.toggle("active");
        }}
      >
        {title} <img src={vector} alt="" />{" "}
      </button>
      <div className="dropdown__content">{children}</div>
    </div>
  );
}
