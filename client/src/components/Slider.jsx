import { useState, useEffect } from "react";

import vector from "../assets/images/vector.svg"
import "../assets/styles/slider.scss";

export default function Slider({ children, elWidth, elCount = 1 }) {
  const [trackPosition, setTrackPosition] = useState(0);

  useEffect(() => {
    if (trackPosition < children.length * -elWidth + (elWidth * elCount)) setTrackPosition(0);
    if (trackPosition > 0) setTrackPosition(children.length * -elWidth + (elWidth * elCount));
  }, [trackPosition, children, elWidth, elCount]);

  return (
    <div className="carousel-container">
      <button className="prev" onClick={() => setTrackPosition(trackPosition + elWidth)}>
        <img src={vector} alt="" />
      </button>

      <div className="carousel-block" style={{width: `${elWidth * elCount}px`}}>
        <div
          style={{ transform: `translateX(${trackPosition}px)`}}
          className="carousel-line"
        >
          {children}
        </div>
      </div>

      <button className="next" onClick={() => setTrackPosition(trackPosition - elWidth)}>
        <img src={vector} alt="" />
      </button>
    </div>
  );
}
