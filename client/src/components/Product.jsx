import { actionWithCart, returnProductsCharcs } from "../store/functions/productFunctions";
import { useSelector, useDispatch } from "react-redux"

import "../assets/styles/product.scss";

export default function Product({ product }) {
  const {cartedProducts} = useSelector(state => state.productReducer)
  const dispatch = useDispatch()

  return (
    <div className="product__card">
      <img src={product.img} alt="" />

      <h4>{product.brand}</h4>

      <h3 className="product__title">{product.title}</h3>

      <ul className="charcs">
        {returnProductsCharcs(product.charcs).map((charc, index) => (
          <li key={index}>{charc}</li>
        ))}
      </ul>

      <div className="buy">
        <p>{product.cost}$</p>

        <button className="buy__btn" onClick={() => {
          dispatch(actionWithCart(product, cartedProducts))
        }}>
          To cart
        </button>
      </div>
    </div>
  );
}
