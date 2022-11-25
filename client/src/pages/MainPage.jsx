import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../store/functions/productFunctions";

import "../assets/styles/mainpage.scss"
import Slider from "../components/Slider";
import Product from "../components/Product";
import vr from "../assets/images/vr.png";
import iphone from "../assets/images/slider-iphone.png"

export default function MainPage() {
  const { types, products, allProductsCount } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllProducts(dispatch);
  }, [dispatch]);

  return (
    <main className="mainpage">
      <section className="add">
        <div className="container">
          <div className="add__text">
            <h2>The future is coming!</h2>
            <p>Try out the latest devices from most famous brands</p>
            <a href="#catalog" className="to__catalog">Catalog</a>
          </div>

          <div className="add__slider">
            <Slider elWidth={570}>
              <img src={vr} alt="" />
              <img src={iphone} alt="" />
            </Slider>
          </div>
        </div>
      </section>

      <section className="novelty">
        <div className="container">
          <div className="novelty__text">
            <h2>Our novelty</h2>

            <ul className="links">
              {types.map((type, index) => (
                <Link key={index} className="link__type" to={`/store/${type}`}>
                  {type}
                </Link>
              ))}
            </ul>
          </div>

          <div className="novelty__slider">
            <Slider elWidth={300} elCount={4}>
              {products.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section className="imgs">
        <div className="container">
          <div className="apples">
            <h2>Hot Apples!</h2>
          </div>

          <div className="vr__man">
            <h2>Try the world of virtual reality</h2>
          </div>
        </div>
      </section>

      <section className="catalog">
        <div className="container">
          <h2 id="catalog">Catalog</h2>

          <div className="products__list">
            {products.map((product, index) => (
              <Product product={product} key={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="statistics">
        <div className="container">
          <h2>Some statistics</h2>

          <ul className="statistics__digits">
            <li><span>1000</span> Happy clients</li>
            <li><span>{allProductsCount}</span> Products</li>
            <li><span>7</span> Years of rich experience</li>
            <li><span>10</span> Hours delivery to another cities</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
