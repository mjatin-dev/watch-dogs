export type Action = {
  payload: Array<object> | string;
  type: string;
};

export const addNftTransactions = (
  payload: Array<object>,
  type: string
): Action => ({
  type,
  payload,
});
export const removeNftTransactions = (type: string) => ({
  type,
});
