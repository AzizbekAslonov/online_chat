import { createSlice } from "@reduxjs/toolkit";

function checkUser() {
  try {
    const result = JSON.parse(localStorage.getItem("user"));
    return result;
  } catch (error) {
    localStorage.removeItem("user");
    return null;
  }
}

const initialState = {
  user: checkUser(),
  users: [],
};

export const appSlices = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    setUsers: (state, actions) => {
      state.users = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setUsers } = appSlices.actions;

export default appSlices.reducer;
