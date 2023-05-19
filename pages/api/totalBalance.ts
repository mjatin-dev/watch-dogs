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
      var totalETH = 0;
      var totalNFT = 0;
      const ETHquery = `
      select * from wallet_balances where wallet_address = '${process.env.WALLET_ADDRESS}'
    `;
      const NFTquery = `
    select * from wallet_balances_nft where wallet_address = '${process.env.WALLET_ADDRESS}'
  `;
      const ETHresponse = await client.query(ETHquery);
      if (ETHresponse) {
        const temp = ETHresponse.rows;
        const sum = temp.reduce((accumulator, object) => {
          return accumulator + object.balance;
        }, 0);
        totalETH = sum;
      } else {
        totalETH = 0;
      }

      const NFTresponse = await client.query(NFTquery);
      if (NFTresponse) {
        const temp = NFTresponse.rows;
        const sum = temp.reduce((accumulator, object) => {
          return accumulator + object.balance;
        }, 0);
        totalNFT = sum;
      } else {
        totalNFT = 0;
      }
      res.status(200).json({
        totalNFT: totalNFT,
        totalETH: totalETH,
        totalBalance: totalNFT + totalETH,
      });
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
