import { useDispatch, useSelector } from "react-redux";
import { actionsWithFilterQuery } from "../store/functions/queryFunctions";
import { resetFilterQuery } from "../store/slices/querySlice";
import { fetchProductsWithQuery } from "../store/functions/productFunctions";

import "../assets/styles/menu.scss";
import Dropdown from "./Dropdown";

export default function Menu({ setSearchedTerm, searchedTerm, type }) {
  const { brands, charcs } = useSelector((state) => state.productReducer);
  const { query } = useSelector((state) => state.queryReducer);
  const dispatch = useDispatch();

  return (
    <aside>
      <input
        type="text"
        className="search"
        placeholder="SEARCH HERE"
        value={searchedTerm}
        onChange={(e) => setSearchedTerm(e.target.value)}
      />

      <Dropdown title={"brand"}>
        <ul>
          {brands.map((brand, index) => (
            <li key={index} className="to__filter">
              <label
                htmlFor={brand}
                onChange={(e) => {
                  dispatch(actionsWithFilterQuery(`brand=${brand}`, query));
                  e.target
                    .closest("li")
                    .querySelector(".filter__checkbox")
                    .classList.toggle("active");
                }}
              >
                <input type="checkbox" id={brand} className="filter__input" />
                <span className="filter__checkbox"></span>
                <span>{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </Dropdown>
      {Object.keys(charcs).map((charcType, index) => (
        <Dropdown key={index} title={charcType}>
          <ul>
            {charcs[charcType].map((charc, index) => (
              <li key={index} className="to__filter">
                <label
                  htmlFor={charc}
                  onChange={(e) => {
                    dispatch(
                      actionsWithFilterQuery(`${charcType}=${charc}`, query)
                    );
                    e.target
                      .closest("li")
                      .querySelector(".filter__checkbox")
                      .classList.toggle("active");
                  }}
                >
                  <input type="checkbox" id={charc} className="filter__input" />
                  <span className="filter__checkbox"></span>
                  <span>{charc}</span>
                </label>
              </li>
            ))}
          </ul>
        </Dropdown>
      ))}

      <div className="filter__actions">
        <button
          className="filters__select"
          onClick={() => dispatch(fetchProductsWithQuery(type, query))}
        >
          Choose
        </button>
        <button
          className="filters__reset"
          onClick={() => {
            document.querySelectorAll(".filter__checkbox").forEach((input) => {
              input.classList.remove("active");
            });
            dispatch(resetFilterQuery());
          }}
        >
          Reset filters
        </button>
      </div>
    </aside>
  );
}
