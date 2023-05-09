import { Action } from "./Actions";
import { ADD_DATA, REMOVE_DATA } from "./Types";

export interface actualProfitState {
  data: Array<any>;
}

const actualProfitState: actualProfitState = {
  data: [],
};

export const actualProfitReducer = (
  state: actualProfitState = actualProfitState,
  action: Action
) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        data: payload,
      };

    case REMOVE_DATA:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};
