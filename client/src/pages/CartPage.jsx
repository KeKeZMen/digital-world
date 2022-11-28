import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../store/slices/productSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

import Product from "../components/Product";
import cart from "../assets/images/empty-cart.svg";
import "../assets/styles/cartpage.scss";
import Modal from "../components/Modal";

export default function CartPage() {
  const { cartedProducts } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const [isOpenedModal, setIsOpenedModal] = useState(false);

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

              <button
                className="btn__ordering"
                onClick={() => setIsOpenedModal(true)}
              >
                Place an order
              </button>

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
        <Modal isOpened={isOpenedModal} setIsOpenedModal={setIsOpenedModal}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsOpenedModal(false);
              dispatch(resetCart())
              window.localStorage.clear()
            }}
            className="order__data"
          >
            <h2 className="order__title">Сheck your order</h2>
            <input type="text" placeholder="Your name" />
            <input type="text" placeholder="Your phone number" />
            <input type="email" placeholder="Your email" />
            <button type="submit">Order</button>
          </form>
        </Modal>
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
              Click{" "}
              <Link to="/" className="link__main">
                here
              </Link>{" "}
              to go to the main
            </p>
          </div>
        </div>
      </main>
    );
}
