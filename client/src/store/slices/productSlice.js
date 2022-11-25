import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProductsCount: 0,
  products: [],
  cartedProducts: [],
  isLoading: false,
  error: null,
  types: [],
  brands: [],
  charcs: {},
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    startFetchProducts(state) {
      state.isLoading = true;
    },
    fetchProductsSuccess(state, action) {
      state.products = action.payload;
      state.isLoading = false;
    },
    fetchProductsError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.products = []
    },
    createProductsTypes(state, action) {
      state.types = action.payload;
    },
    createProductsBrands(state, action) {
      state.brands = action.payload;
    },
    createProductsCharcs(state, action) {
      state.charcs = action.payload;
    },
    createProductsCount(state, action){
      state.allProductsCount = action.payload
    },
    addProductToCart(state, action) {
      state.cartedProducts.push(action.payload);
    },
    removeProductFromCart(state, action) {
      state.cartedProducts = state.cartedProducts.filter(cartedProduct => cartedProduct.id !== action.payload)
    },
    resetCart(state){
      state.cartedProducts = []
    },
    setCartedProductsFromLocalStorage(state, action){
      state.cartedProducts = action.payload
    }
  },
});

export default productSlice.reducer;
export const {
  startFetchProducts,
  fetchProductsSuccess,
  fetchProductsError,
  createProductsBrands,
  createProductsTypes,
  addProductToCart,
  removeProductFromCart,
  createProductsCharcs,
  createProductsCount,
  resetCart,
  setCartedProductsFromLocalStorage
} = productSlice.actions;
