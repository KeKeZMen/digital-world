import { Routes, Route } from "react-router-dom";
import { fetchAllProducts } from "./store/functions/productFunctions";
import { useDispatch } from "react-redux";
import { useLayoutEffect } from "react";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import StorePage from "./pages/StorePage";

function App() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    fetchAllProducts(dispatch);
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
