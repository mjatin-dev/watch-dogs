export const getBalanceQuery = (walletAddress: string) => `
  SELECT SUM(balance) as total_balance
  FROM (
    SELECT balance
    FROM eth_balance
    WHERE wallet_address ='${walletAddress}'
    
    UNION ALL
    
    SELECT balance
    FROM erc20_balance
    WHERE wallet_address ='${walletAddress}'
  ) as balance_sum
`;

export const actualProfitQuery = (walletAddress: string) => `  SELECT 
buyer_address,
taker,
trans_date,
txHash,
'seller fee amt',
marketplace,
tokenID,
CASE
  WHEN taker = 'SELLER' AND prev_signal IS NULL THEN 0
  WHEN taker = 'SELLER' THEN ROUND((('seller fee amt' - prev_price) * 100) / 'seller fee amt', 2)
END AS profit
FROM 
trades
WHERE
buyer_address = '${walletAddress}' OR taker = '${walletAddress}'
`;

export const collectionsQuery = (walletAddress: string) => `
  SELECT DISTINCT collection_address
  FROM wallet_transactions
  WHERE buyer_address = '${walletAddress}'
`;

export const tradesQuery = (
  walletAddress: string,
  collection_address: string
) => `
SELECT
  buyer_address,
  taker,
  trans_date,
  txHash,
  'seller fee amt',
  marketplace,
  tokenID,
  CASE
    WHEN taker = 'SELLER' AND prev_signal IS NULL THEN 0
    WHEN taker = 'SELLER' THEN ROUND((('seller fee amt' - prev_price) * 100) / 'seller fee amt', 2)
  END AS profit
FROM (
  SELECT
    buyer_address,
    taker,
    trans_date,
    txHash,
    'seller fee amt',
    marketplace,
    tokenID,
    lag(taker) OVER (PARTITION BY buyer_address, tokenID ORDER BY trans_date) AS prev_signal,
    lag('seller fee amt') OVER (PARTITION BY buyer_address, tokenID ORDER BY trans_date) AS prev_price
  FROM 
    wallet_transactions
  WHERE 
    (buyer_address = '${walletAddress}' OR taker = '${walletAddress}')
    AND collection_address = '${collection_address}'
) AS t0
`;

export const NFTTransactionQuery = `
  SELECT 
    buyer_address,
    taker,
    trans_date,
    txHash,
    'seller fee amt',
    marketplace,
    tokenID,
    CASE
      WHEN taker = 'SELLER' AND prev_signal IS NULL THEN 0
      WHEN taker = 'SELLER' THEN ROUND((('seller fee amt' - prev_price) * 100) / 'seller fee amt', 2)
    END AS profit
  FROM (
    SELECT 
      buyer_address,
      taker,
      trans_date,
      txHash,
      'seller fee amt',
      marketplace,
      tokenID,
      LAG(taker) OVER (PARTITION BY buyer_address, tokenID ORDER BY trans_date) AS prev_signal,
      LAG('seller fee amt') OVER (PARTITION BY buyer_address, tokenID ORDER BY trans_date) AS prev_price
    FROM wallet_transactions
  ) AS t0
`;
