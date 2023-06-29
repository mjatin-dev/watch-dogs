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
    const { filter, walletAddress }: any = req.query;
    if (walletAddress) {
      try {
        const months =
          filter === "3M" ? 3 : filter === "6M" ? 6 : filter === "12M" ? 12 : 0;
        const currentDate = moment().format("YYYY-MM");
        const previousDate =
          filter === "All"
            ? "2000-01"
            : moment().subtract(months, "months").format("YYYY-MM").toString();
        const query = await client.query(`
        WITH B AS (
            WITH a AS (
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
                        WHEN t0.taker = 'BUYER' THEN (t0."seller fee amt" - prev_price)
                    END AS profit,
                    t0.contract_addr,
                    t0.wallet_addr
                FROM
                    (
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
                        FROM
                            wallet_transactions
                    ) AS t0
            )
            SELECT
                a.*
            FROM
                a
            WHERE
                a.t_date BETWEEN '${previousDate}' AND '${currentDate}'
        )
        SELECT
            finalT.*
        FROM
            (
                SELECT
                    B.*,
                    ROW_NUMBER() OVER (PARTITION BY B.wallet_addr ORDER BY B.profit DESC) AS "Pagination"
                FROM
                    B
            ) AS finalT
        WHERE
            finalT.wallet_addr = '${walletAddress}'
            AND finalT."Pagination" BETWEEN 1 AND 5000;
        `);

        res.status(200).json(query.rows);
        client.end();
        return;
      } catch (err: any) {
        res.status(404).json({ message: "Error: " + err.message });
      }
    } else {
      res.status(404).json({ message: "Error: Invalid Wallet Address" });
    }
  } else {
    res.status(404).json({ message: "Method Not Allowed" });
  }
  client.end();
};

export default handler;
