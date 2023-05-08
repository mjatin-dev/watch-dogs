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
      const query = await client.query(`
      SELECT
        buyer_address,
        taker,
        trans_date,
        "txHash",
        'seller fee amt',
        marketplace,
        tokenID,
        CASE
          WHEN taker = 'SELLER' AND prev_signal IS NULL THEN 0
          WHEN taker = 'SELLER' THEN ROUND((('seller fee amt' - prev_price) * 100) / 'seller fee amt', 2)
        END AS profit

    `);
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
