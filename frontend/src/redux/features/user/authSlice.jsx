import { createSlice } from "@reduxjs/toolkit";
import { getItemWithExpiration } from "../../../services/LocalStorage";
const loadState = async () => {
  try {
    const serializedState = await getItemWithExpiration("token");
    if (!serializedState || serializedState === false) {
      return {
        isLoggedIn: false,
        role: null,
        list_permission: null,
        token: null,
      };
    }

    return {
      isLoggedIn: true,
      role: serializedState[1],
      list_permission: serializedState[2],
    };
  } catch (err) {
    return undefined;
  }
};

const loadPersistedState = async () => {
  return await loadState();
};

const persistedState = await loadPersistedState();

const initialState = {
  isLoggedIn: false,
  list_permission: [],
  role: null,
  token: null,
  loading: false,
  error: [],
};

export const userSlice = createSlice({
  name: "auth",
  initialState: persistedState || initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.list_permission = action.payload.list_permission;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.role = null;
      state.list_permission = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
