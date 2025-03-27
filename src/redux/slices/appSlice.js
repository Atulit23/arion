import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chosen: {},
  level: 0,
  answers: {},
  currentData: {},
  userData: {}
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    choose: (state, action) => {
      state.chosen = action.payload;
    },
    chooseLevel: (state, action) => {
      state.level = action.payload
    },
    storeAnswers: (state, action) => {
      state.answers = action.payload
    },
    storeCurrentData: (state, action) => {
      state.currentData = action.payload
    },
    storeUser: (state, action) => {
      state.userData = action.payload
    }
  },
});

export const { choose, chooseLevel, storeAnswers, storeCurrentData, storeUser } = appSlice.actions;
export default appSlice.reducer;
