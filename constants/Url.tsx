export const ETHUrl = (ETHAddress: string | undefined) => {
  const API_KEY = process.env.ETHERSCAN_API_KEY;
  const ADDRESS = ETHAddress ? ETHAddress : "";
  return `https://api.etherscan.io/api?module=account&action=txlist&address=${ADDRESS}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`;
};
