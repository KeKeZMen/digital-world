import {
  addProductToCart,
  createProductsBrands,
  createProductsCharcs,
  createProductsCount,
  createProductsTypes,
  fetchProductsError,
  fetchProductsSuccess,
  removeProductFromCart,
  startFetchProducts,
} from "../slices/productSlice";
import axios from "axios";

function sortProductsCharcs(products) {
  const charcs = {};

  products.forEach((product) => {
    for (const charcType in product.charcs) {
      charcs[charcType] = [];
    }
  });

  for (const charcType in charcs) {
    products.forEach((product) => {
      charcs[charcType].push(product.charcs[charcType]);
    });
  }

  for (const charcType in charcs) {
    charcs[charcType] = Array.from(
      new Set(charcs[charcType].filter((value) => value))
    );
  }

  return charcs;
}

export const fetchAllProducts = async (dispatch) => {
  try {
    dispatch(startFetchProducts());
    const response = await axios.get("http://localhost:3001/products");
    const types = Array.from(
      new Set(response.data.map((product) => product.type))
    );
    dispatch(createProductsCount(response.data.length))
    dispatch(createProductsTypes(types));
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsError(error.message));
  }
};

export const fetchProductsWithType = (type) => async (dispatch) => {
  try {
    dispatch(startFetchProducts());
    const response = await axios.get(
      `http://localhost:3001/products?type=${type}`
    );
    const brands = Array.from(
      new Set(response.data.map((product) => product.brand))
    );
    dispatch(createProductsCharcs(sortProductsCharcs(response.data)));
    dispatch(createProductsBrands(brands));
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsError(error.message));
  }
};

export const fetchProductsWithQuery = (type, query) => async (dispatch) => {
  try {
    dispatch(startFetchProducts());
    const response = await axios.get(
      `http://localhost:3001/products?type=${type}&${query.join("&")}`
    );
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsError(error.message));
  }
};

export const returnProductsCharcs = (obj) => {
  let stringedCharcs = [];

  for (const key in obj) {
    if(key === "RAM" || key === "Storage") stringedCharcs.push(`${key}: ${obj[key]} Gb`)
    else stringedCharcs.push(`${key}:${obj[key]}`);
  }

  return stringedCharcs;
};

export const sortSearchedProducts = (products, searchedTerm) => {
  if(!searchedTerm) return products

  return products.filter(product => 
    product.title.toLowerCase().trim().includes(searchedTerm.toLowerCase().trim()) || 
    product.brand.toLowerCase().trim().includes(searchedTerm.toLowerCase().trim())
  )
}

export const actionWithCart = (product, cartedProducts) => dispatch => {
  if(!cartedProducts.includes(product)) dispatch(addProductToCart(product))
  else dispatch(removeProductFromCart(product))
}