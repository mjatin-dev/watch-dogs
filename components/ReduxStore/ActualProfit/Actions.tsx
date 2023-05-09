export type Action = {
  payload: Array<object> | string;
  type: string;
};

export const addActualProfit = (
  payload: Array<object>,
  type: string
): Action => ({
  type,
  payload,
});
export const removeActualProfit = (type: string) => ({
  type,
});
