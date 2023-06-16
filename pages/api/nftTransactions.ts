import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Client({
    host: "Db.sttqmikpyiioxxscogta.supabase.co",
    user: "postgres",
    password: "SteinerandRomainaregoingtotakeover2023",
    database: "postgres",
    port: 5432,
  });
  client.connect();
  const { method } = req;
  if (method === "GET") {
    try {
      const { filter, walletAddress }: any = req.query;
      const query = await client.query(`WITH b1 AS (
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
    COUNT(*) AS total
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
 WHERE subquery.row BETWEEN 1 AND 5; 
    `);
      const monthsAgo = new Date();
      monthsAgo.setMonth(monthsAgo.getMonth() - filter);
      const filteredData = query.rows.filter((item) => {
        const itemDate = new Date(item.trans_date);
        return (
          moment(itemDate).format("DD/MM/YYYY") <
          moment(monthsAgo).format("DD/MM/YYYY")
        );
      });
      res.status(200).json(query.rows);
      client.end();
      return;
    } catch (err: any) {
      res.status(404).json({ message: "Error: " + err.message });
    }
  } else {
    res.status(404).json({ message: "Method Not Allowed" });
  }
  client.end();
};

export default handler;
