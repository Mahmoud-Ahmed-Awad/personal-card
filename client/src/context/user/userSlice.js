import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../../api/user";

const getUser = async () => {
  const res = await userData();
  if (res.data.user) {
    return res.data;
  } else {
    return null;
  }
};

const user = await getUser();

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      user: user ? user.user : null,
      isLoggedIn: user ? true : false,
      isEmailVerified: user ? user.user.isEmailVerified : false,
    },
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload.user) {
        state.value.user = action.payload.user;
        state.value.isLoggedIn = true;
        state.value.isEmailVerified = action.payload.user.isEmailVerified;
      } else {
        state.value.user = null;
        state.value.isLoggedIn = false;
        state.value.isEmailVerified = false;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
