export type Action = {
  payload: Array<object> | string;
  type: string;
};

export const addTransactions = (
  payload: Array<object>,
  type: string
): Action => ({
  type,
  payload,
});
export const addEthAddress = (payload: string, type: string): Action => ({
  type,
  payload,
});
export const removeTransactions = (type: string) => ({
  type,
});
