export type Action = {
  payload: Array<object> | string;
  type: string;
};

export const addNftCollections = (
  payload: Array<object>,
  type: string
): Action => ({
  type,
  payload,
});

export const removeNftCollections = (type: string) => ({
  type,
});
