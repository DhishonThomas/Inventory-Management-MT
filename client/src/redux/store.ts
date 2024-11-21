import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

export default store;
