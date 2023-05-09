import { Action } from "./Actions";
import { ADD_TOTAL_BALANCE, REMOVE_TOTAL_BALANCE } from "./Types";

export interface TotalBalanceState {
  data: { totalNFT: number; totalETH: number; totalBalance: number };
}

const TotalBalanceState: TotalBalanceState = {
  data: {
    totalNFT: 0,
    totalETH: 0,
    totalBalance: 0,
  },
};

export const totalBalanceReducer = (
  state: TotalBalanceState = TotalBalanceState,
  action: Action
) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_TOTAL_BALANCE:
      return {
        ...state,
        data: payload,
      };

    case REMOVE_TOTAL_BALANCE:
      return {
        ...state,
        data: { totalNFT: 0, totalETH: 0, totalBalance: 0 },
      };
    default:
      return state;
  }
};
