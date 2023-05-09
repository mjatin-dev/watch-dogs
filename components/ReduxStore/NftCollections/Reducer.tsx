import { Action } from "./Actions";
import { REMOVE_COLLECTIONS, ADD_COLLECTIONS } from "./Types";

export interface NftCollectionsState {
  collections: Array<any>;
}

const NftCollectionsState: NftCollectionsState = {
  collections: [],
};

export const NftCollectionsReducer = (
  state: NftCollectionsState = NftCollectionsState,
  action: Action
) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_COLLECTIONS:
      return {
        ...state,
        collections: payload,
      };

    case REMOVE_COLLECTIONS:
      return {
        ...state,
        collections: [],
      };
    default:
      return state;
  }
};
