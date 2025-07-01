import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  name: string;
  email: string;
  photoURL: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
};

type TUserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  accessToken?: string;
};

const initialState: TUserState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: TUserState, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setAccessToken: (state: TUserState, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = undefined;
    },
  },
});

export const { setUser, setAccessToken, setLogout } = authSlice.actions;
export default authSlice.reducer;
