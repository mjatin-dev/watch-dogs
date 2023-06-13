import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";
interface IcollectionData {
  floorPrice: number;
  name: string;
  imageUrl: string;
  profit: number;
  total: number;
}
const alchemyapiKEY = "tWYHXoDUNVxAZowhiySbBhJdiPn6kwgZ";

async function getCollectionData(
  walletAddress: string,
  startPage: number
): Promise<any> {
  const collectionsQueryResult = await queryCollections(
    walletAddress,
    startPage
  );
  if (collectionsQueryResult?.length > 0) {
    const collectionData: Array<IcollectionData> = [];
    for (const collection of collectionsQueryResult) {
      {
        const floorPrice = await getFloorPrice(collection.contract_addr);
        const metaData: any = await getContractNFTname(
          collection.contract_addr
        );
        const { name, imageUrl } = metaData;
        collectionData.push({
          floorPrice,
          name,
          imageUrl,
          profit: collection?.profit,
          total: collection?.total,
        });
      }
      return collectionData;
    }
  } else return [];
}

async function queryCollections(
  walletAddress: string,
  startPage: number = 1
): Promise<any> {
  const client = new Client({
    host: "Db.sttqmikpyiioxxscogta.supabase.co",
    user: "postgres",
    password: "SteinerandRomainaregoingtotakeover2023",
    database: "postgres",
    port: 5432,
  });
  client.connect();
  try {
    const query = await client.query(`
  
WITH b1 AS (
  WITH A1 AS (
    SELECT
      t0.buyer_address,
      t0.taker,
      t0.t_date,
      t0.tx_hash,
      t0."seller fee amt",
      t0.marketplace,
      t0.tokenid,
      CASE
        WHEN t0.taker = 'SELLER' AND prev_signal IS NULL THEN 0
        WHEN t0.taker = 'SELLER' THEN (t0."seller fee amt" - prev_price)
      END AS profit,
      t0.contract_addr,
      t0.wallet_addr
    FROM (
      SELECT
        wallet_transactions.buyer_address,
        wallet_transactions.taker,
        TO_CHAR(wallet_transactions.trans_date, 'YYYY-MM') AS t_date,
        wallet_transactions.tx_hash,
        wallet_transactions."seller fee amt",
        wallet_transactions.marketplace,
        wallet_transactions.tokenid,
        contract_addr,
        wallet_addr,
        LAG(wallet_transactions.taker) OVER (PARTITION BY wallet_transactions.buyer_address, wallet_transactions.tokenid ORDER BY wallet_transactions.trans_date) AS prev_signal,
        LAG(wallet_transactions."seller fee amt") OVER (PARTITION BY wallet_transactions.buyer_address, wallet_transactions.tokenid ORDER BY wallet_transactions.trans_date) AS prev_price
      FROM wallet_transactions
    ) AS t0
  )
  SELECT
    A1.wallet_addr,
    A1.contract_addr,
    SUM(A1.profit) AS profit
  FROM A1
  WHERE A1.wallet_addr = '${walletAddress}'
  GROUP BY 1, 2
),
b2 AS (
  SELECT
    wallet_addr,
    contract_addr,
    COUNT(*)
 AS total
  FROM wallet_transactions
  WHERE wallet_addr = '${walletAddress}'
  GROUP BY 1, 2
)
SELECT *
FROM (
  SELECT
    b1.*,
    b2.total,
    row_number() OVER (ORDER BY b1.profit DESC) AS row
  FROM b1
  LEFT JOIN b2 ON b2.wallet_addr = b1.wallet_addr AND b2.contract_addr = b1.contract_addr
) AS subquery
WHERE subquery.row BETWEEN  ${startPage} AND ${startPage + 10}
  `);
    client.end();
    return query.rows;
  } catch (err: any) {
    return err;
  }
}
async function getFloorPrice(collectionAddress: string): Promise<number> {
  const response = await fetch(
    `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemyapiKEY}/getFloorPrice?contractAddress=${collectionAddress}`
  );
  const data = await response.json();
  return data?.openSea?.floorPrice;
}
async function getContractNFTname(contractAddress: string): Promise<number> {
  const response = await fetch(
    `https://eth-mainnet.g.alchemy.com/nft/v3/${alchemyapiKEY}/getContractMetadata?contractAddress=${contractAddress}`
  );
  const data = await response.json();
  const metaData: any = {
    name: data.name,
    imageUrl: data?.openSeaMetadata?.imageUrl,
  };
  return metaData;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { page }: any = req.query;
    const walletAddress = req.query.walletAddress as string;
    const collectionData = await getCollectionData(walletAddress, page);
    res.status(200).json(collectionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
