import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

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
      const { page, walletAddress }: any = req.query;
      console.log("walletAddress", walletAddress);
      const itemsPerPage = 10;
      const startIndex = (Number(page) - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const collectionsOwned: any = await queryCollectionsOwnedByUser(
        walletAddress
      );
      console.log("collectionsOwned", collectionsOwned);
      const floorPrices = await queryFloorPrices(collectionsOwned);

      const paginatedData = collectionsOwned
        .slice(startIndex, endIndex)
        .map((collection: any) => {
          const floorPrice = floorPrices[collection.contractAddress] || 0;
          return {
            walletAddress: collection.walletAddress,
            contractAddress: collection.contractAddress,
            floorPrice,
          };
        });
      const totalPages = Math.ceil(collectionsOwned?.length / itemsPerPage);
      res.status(200).json({ data: paginatedData, totalPages: totalPages });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(404).json({ message: "Method Not Allowed" });
  }
  client.end();
};
export default handler;

const alchemyApiKey: any = process.env.ALCHEMY_API_KEY;

async function queryCollectionsOwnedByUser(walletAddress: string) {
  const client = new Client({
    host: "Db.sttqmikpyiioxxscogta.supabase.co",
    user: "postgres",
    password: "SteinerandRomainaregoingtotakeover2023",
    database: "postgres",
    port: 5432,
  });
  client.connect();
  const collectionsOwned = await client.query<{
    wallet_addr: string;
    contract_addr: string;
  }>(
    `WITH A1 as (select t0.buyer_address,t0.taker,t0.trans_date,t0.tx_hash,t0."seller fee amt",t0.marketplace,t0.tokenid,
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
    )
    select A1.wallet_addr,A1.contract_addr, sum(A1.profit)
    from A1
    where A1.wallet_addr = '${walletAddress}'
    group by 1,2`
  );
  return collectionsOwned;
}

async function queryFloorPrices(collectionsOwned: any) {
  const floorPrices: { [key: string]: number } = {};
  collectionsOwned?.map(async (collection: any) => {
    const contractMetadata = await fetchContractMetadata(
      collection.contract_addr
    );
    const floorPrice = await fetchFloorPrice(contractMetadata.contractName);
    floorPrices[collection.contract_addr] = floorPrice;
  });

  return floorPrices;
}
async function fetchContractMetadata(contractAddress: string) {
  const url = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getContractMetadata  https://api.alchemy.com/v2/contract/${contractAddress}/metadata`;
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("x-api-key", alchemyApiKey);

  const response = await fetch(url, {
    headers,
  });

  const data = await response.json();
  return data;
}

// Helper function to fetch floor price from Alchemy API
async function fetchFloorPrice(contractName: string) {
  const url = `https://api.alchemy.com/v2/floor/price/${contractName}`;
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("x-api-key", alchemyApiKey);

  const response = await fetch(url, {
    headers,
  });

  const data = await response.json();
  return data.floor_price;
}
