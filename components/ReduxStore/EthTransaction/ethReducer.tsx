import { Action } from "./ethActions";
import {
  ADD_TRANSACTION,
  REMOVE_TRANSACTION,
  ADD_ETH_ADDRESS,
} from "./ethTypes";

export interface EthTransactionState {
  transactions: Array<any>;
  ethAddress: string;
}

const ethTransactionState: EthTransactionState = {
  transactions: [],
  ethAddress: "",
};

export const ethTransactionReducer = (
  state: EthTransactionState = ethTransactionState,
  action: Action
) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: payload,
      };
    case ADD_ETH_ADDRESS:
      return {
        ...state,
        ethAddress: payload,
      };
    case REMOVE_TRANSACTION:
      return {
        ...state,
        transactions: [],
        ethAddress: "",
      };
    default:
      return state;
  }
};
