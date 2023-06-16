export function calculateTotal(objectsArray: Array<any>, key: string): string {
  const total = objectsArray.reduce((accumulator: number, obj: any) => {
    const value = obj[key];
    if (value !== null && !isNaN(value)) {
      return accumulator + value;
    }
    return accumulator;
  }, 0);

  if (!isNaN(total)) {
    return total.toLocaleString();
  }
  return "0";
}
