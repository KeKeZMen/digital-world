import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../assets/styles/footer.scss";
import logo from "../assets/images/logo.svg";

export default function Footer() {
  const { types } = useSelector((state) => state.productReducer);

  return (
    <footer>
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt="" />

          <div className="logo__text">
            <h1>Digital World</h1>
            <p>The biggiest device`s store</p>
          </div>
        </Link>

        <ul className="products__types">
          {types.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>

        <div className="call">
          <h2>+8(985)546-48-68</h2>
          <a href="tel:+79855464868">Order a call</a>
        </div>
      </div>
    </footer>
  );
}
