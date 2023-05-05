import { combineReducers, createStore } from "redux";

import { ethTransactionReducer } from "./EthTransaction/ethReducer";
const rootReducer = combineReducers({
  ethTransaction: ethTransactionReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
