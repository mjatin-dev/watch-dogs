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
      const { filter }: any = req.query;
      const query = await client.query(`
      select t0.buyer_address,t0.taker,t0.trans_date,t0.tx_hash,t0."seller fee amt",t0.marketplace,t0.tokenid,
      case
            when t0.taker = 'SELLER' and prev_signal is null then 0
            when t0.taker = 'SELLER' then (t0."seller fee amt"-prev_price)
        end as profit, t0.contract_addr,t0.wallet_addr
      from (
        select  wallet_transactions.buyer_address,wallet_transactions.taker,wallet_transactions.trans_date, wallet_transactions.tx_hash,wallet_transactions."seller fee amt",wallet_transactions.marketplace,wallet_transactions.tokenid,contract_addr,wallet_addr,
            lag(wallet_transactions.taker) OVER (PARTITION BY wallet_transactions.buyer_address, wallet_transactions.tokenid ORDER BY wallet_transactions.trans_date) as prev_signal,
            lag(wallet_transactions."seller fee amt") OVER (PARTITION BY wallet_transactions.buyer_address, wallet_transactions.tokenid ORDER BY wallet_transactions.trans_date) as prev_price
        from wallet_transactions
      ) as t0
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
