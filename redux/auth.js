import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/auth.service";
import { useSelector } from "react-redux";

// const user = useSelector((state) => state.auth.user);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, phone_num, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(email, phone_num, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage?.clear();
  await AuthService.logout();
});

const initialState = {
  isLoggedIn: false,
  user: null,
  userLocations: [],
  order: "",
  code: 0,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToLocations(state, { payload }) {
      state.userLocations?.unshift(payload);
    },
    createOrder(state, { payload }) {
      if (state.order !== "" || payload.customer_id !== null) {
        state.order = { ...payload, customer_id: payload.customer_id };
      } else {
        state.order = payload;
      }
    },
    logoutUser(state) {
      state = [];
    },
    addCode(state, { payload }) {
      state.code = payload;
    },
    clearOrder: (state, action) => {
      state.order = "";
    },
    setUserData: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { addToLocations, createOrder, addCode, clearOrder, setUserData } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
