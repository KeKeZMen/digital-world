import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "../assets/styles/nav.scss";
import logo from "../assets/images/logo.svg";

export default function Nav() {
  const { types, cartedProducts } = useSelector(
    (state) => state.productReducer
  );

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="" />

          <Link to="/" className="logo__text">
            <h1>Digital world</h1>
            <p>The biggiest device`s store</p>
          </Link>
        </div>

        <ul className="links">
          {types.map((type, index) => (
            <Link key={index} className="link__type" to={`/store/${type}`}>
              {type}
            </Link>
          ))}
        </ul>

        <Link className="link__cart" to="/cart">
          Cart {cartedProducts.length}
        </Link>
      </div>
    </nav>
  );
}
