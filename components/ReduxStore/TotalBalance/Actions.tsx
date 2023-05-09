export type Action = {
  payload: Array<object> | string;
  type: string;
};

export const addTotalBalance = (
  payload: Array<object>,
  type: string
): Action => ({
  type,
  payload,
});

export const removeTotalBalance = (type: string) => ({
  type,
});
