import { Routes, Route } from "react-router-dom";
import { fetchAllProducts } from "./store/functions/productFunctions";
import { useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { setCartedProductsFromLocalStorage } from "./store/slices/productSlice";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import StorePage from "./pages/StorePage";

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    fetchAllProducts(dispatch);
    if(window.localStorage.getItem('cartedProducts')) dispatch(setCartedProductsFromLocalStorage(JSON.parse(window.localStorage.getItem('cartedProducts'))))
  }, [dispatch]);

  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<MainPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/store/:type" element={<StorePage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
