import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../store/slices/productSlice";
import { Link } from "react-router-dom";

import Product from "../components/Product";
import cart from "../assets/images/empty-cart.svg";
import "../assets/styles/cartpage.scss";

export default function CartPage() {
  const { cartedProducts } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const returnCartedProductsCost = (products) => {
    let sum = 0;

    products.forEach((product) => (sum += product.cost));

    return sum;
  };

  if (cartedProducts.length)
    return (
      <main className="cartpage">
        <div className="container">
          <aside>
            <div className="about__order">
              <p>Your goods({cartedProducts.length})</p>
              <p>{returnCartedProductsCost(cartedProducts)}$</p>
            </div>

            <div className="ordering">
              <div className="final__cost">
                <p>Total payable:</p>
                <p>{returnCartedProductsCost(cartedProducts)}$</p>
              </div>

              <button className="btn__ordering">Place an order</button>

              <p className="agreements">
                By clicking on the "Place an order" button, you agree to the
                terms of the offer and privacy policy
              </p>
            </div>
          </aside>

          <div className="products__list">
            {cartedProducts.map((product, index) => (
              <Product product={product} key={index} />
            ))}
          </div>
        </div>
      </main>
    );
  else
    return (
      <main className="empty__cartpage">
        <div className="container">
          <div className="empty__cart">
            <img src={cart} alt="" />
            <h3>There is nothing in the cart yet</h3>
            <p>
              click{" "}
              <Link to="/" className="link__main">
                here
              </Link>{" "}
              to go to the catalog
            </p>
          </div>
        </div>
      </main>
    );
}
