import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchProductsWithType,
  sortSearchedProducts,
} from "../store/functions/productFunctions";
import { resetFilterQuery } from "../store/slices/querySlice";

import Product from "../components/Product";
import Menu from "../components/Menu";
import "../assets/styles/storepage.scss";

export default function StorePage() {
  const { products, isLoading, error } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();
  const { type } = useParams();

  const [searchedTerm, setSearchedTerm] = useState("");

  useEffect(() => {
    dispatch(resetFilterQuery());
    dispatch(fetchProductsWithType(type));
  }, [type, dispatch]);

  return (
    <main className="storepage">
      <div className="container">
        <Menu
          setSearchedTerm={setSearchedTerm}
          searchedTerm={searchedTerm}
          type={type}
        />

        <div className="products__list">
          {error && <h2>{error}</h2>}
          {isLoading && <h2>Loading...</h2>}
          {products &&
            sortSearchedProducts(products, searchedTerm).map(
              (product, index) => <Product product={product} key={index} />
            )}
        </div>
      </div>
    </main>
  );
}
