import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

async function fetchFloorPrice(collectionAddress: string): Promise<number> {
  const url = `https://api.alchemyapi.io/v2/tWYHXoDUNVxAZowhiySbBhJdiPn6kwgZ/collections/${collectionAddress}/floor`;
  const response = await fetch(url);
  const data = await response.json();
  return data.floor_price;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const { walletAddress } = req.query;
  const { method } = req;
  const walletAddress = process.env.WALLET_ADDRESS;
  const client = new Client({
    host: "Db.sttqmikpyiioxxscogta.supabase.co",
    user: "postgres",
    password: "SteinerandRomainaregoingtotakeover2023",
    database: "postgres",
    port: 5432,
  });
  client.connect();
  if (method === "GET") {
    try {
      // Fetch collections owned by the user from the database
      const collectionsQuery = `
      SELECT DISTINCT collection_address FROM wallet_transactions WHERE wallet_address = ${walletAddress}
    `;
      const collectionsResult = await client.query(collectionsQuery);
      const collections = collectionsResult.rows.map(
        (row) => row.collection_address
      );

      // Fetch floor price and calculate profit per collection
      const profitQuery = `
      WITH A1 AS (
        SELECT
          t0.buyer_address, t0.taker, t0.trans_date, t0.tx_hash, t0."seller fee amt", t0.marketplace, t0.tokenid,
          CASE
            WHEN t0.taker = 'SELLER' AND prev_signal IS NULL THEN 0
            WHEN t0.taker = 'SELLER' THEN (t0."seller fee amt" - prev_price)
          END AS profit, t0.contract_addr, t0.wallet_addr
        FROM (
          SELECT
            wallet_transactions.buyer_address, wallet_transactions.taker, wallet_transactions.trans_date,
            wallet_transactions.tx_hash, wallet_transactions."seller fee amt", wallet_transactions.marketplace,
            wallet_transactions.tokenid, contract_addr, wallet_addr,
            LAG(wallet_transactions.taker) OVER (PARTITION BY wallet_transactions.buyer_address, wallet_transactions.tokenid ORDER BY wallet_transactions.trans_date) AS prev_signal,
            LAG(wallet_transactions."seller fee amt") OVER (PARTITION BY wallet_transactions.buyer_address, wallet_transactions.tokenid ORDER BY wallet_transactions.trans_date) AS prev_price
          FROM wallet_transactions
        ) AS t0
      )
      SELECT A1.wallet_addr, A1.contract_addr, SUM(A1.profit)
      FROM A1
      WHERE A1.wallet_addr = ${walletAddress} AND A1.contract_addr = ANY(${collections})
      GROUP BY 1, 2
    `;
      const profitResult = await client.query(profitQuery);
      const profits = profitResult.rows;

      // Fetch floor prices for each collection using the Alchemy API
      const floorPrices = await Promise.all(
        collections.map((collectionAddress: any) =>
          fetchFloorPrice(collectionAddress)
        )
      );

      // Combine collections, floor prices, and profits into a single response object
      const responseData = collections.map(
        (collection: any, index: number) => ({
          collection,
          floorPrice: floorPrices[index],
          profit: profits.find((p) => p.contract_addr === collection)?.sum || 0,
        })
      );

      res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(404).json({ message: "Method Not Allowed" });
  }
  client.end();
};
export default handler;
