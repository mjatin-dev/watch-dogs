import { combineReducers, createStore } from "redux";

import { ethTransactionReducer } from "./EthTransaction/ethReducer";
import { totalBalanceReducer } from "./TotalBalance/Reducer";
import { NftTransactionReducer } from "./NftTranscation/Reducer";
import { NftCollectionsReducer } from "./NftCollections/Reducer";
import { actualProfitReducer } from "./ActualProfit/Reducer";
const rootReducer = combineReducers({
  totalBalance: totalBalanceReducer,
  actualProfit: actualProfitReducer,
  NftCollections: NftCollectionsReducer,
  nftTransaction: NftTransactionReducer,
  ethTransaction: ethTransactionReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
