import { addInFilterQuery, removeFromFilterQuery } from "../slices/querySlice";

export const actionsWithFilterQuery =
  (newQuery, stateQuery) =>
  (dispatch) => {
    if (!stateQuery.includes(newQuery.toLowerCase())) dispatch(addInFilterQuery(newQuery.toLowerCase()));
    else dispatch(removeFromFilterQuery(newQuery.toLowerCase()));
  };
