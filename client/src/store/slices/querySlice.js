import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: [],
};

const querySlice = createSlice({
  name: "query",

  initialState,

  reducers: {
    addInFilterQuery(state, action) {
      state.query.push(action.payload);
    },
    removeFromFilterQuery(state, action) {
      state.query = state.query.filter(
        (query) => !query.includes(action.payload)
      );
    },
    resetFilterQuery(state){
      state.query = []
    }
  },
});

export default querySlice.reducer;
export const { addInFilterQuery, removeFromFilterQuery, resetFilterQuery } = querySlice.actions;
