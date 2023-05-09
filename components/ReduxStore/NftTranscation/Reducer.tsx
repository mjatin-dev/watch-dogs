import { Action } from "./Actions";
import { REMOVE_NFT_TRANSACTION, ADD_NFT_TRANSACTION } from "./Types";

export interface NftTransactionState {
  transactions: Array<any>;
}

const NftTransactionState: NftTransactionState = {
  transactions: [],
};

export const NftTransactionReducer = (
  state: NftTransactionState = NftTransactionState,
  action: Action
) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_NFT_TRANSACTION:
      return {
        ...state,
        transactions: payload,
      };

    case REMOVE_NFT_TRANSACTION:
      return {
        ...state,
        transactions: [],
      };
    default:
      return state;
  }
};
