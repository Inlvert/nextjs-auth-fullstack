import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../axios/axios";

interface LoginDto {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
};

const login = createAsyncThunk<
  LoginResponse,
  LoginDto,
  { rejectValue: string[] }
>("auth/login", async (userData) => {
  const { data } = await API.login(userData);
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
  },
});

const { reducer: authReducer, actions } = authSlice;

const { logout } = actions;

export { login, logout };

export default authReducer;
