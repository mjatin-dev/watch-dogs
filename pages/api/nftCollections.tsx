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
    with c1 as (with b1 as (WITH A1 as (select t0.buyer_address,t0.taker,t0.t_date,t0.tx_hash,t0."seller fee amt",t0.marketplace,t0.tokenid,
    case
         when t0.taker = 'SELLER' and prev_signal is null then 0
         when t0.taker = 'SELLER' then (t0."seller fee amt"-prev_price)
     end as profit, t0.contract_addr,t0.wallet_addr
    from (
     select  wallet_transactions.buyer_address,wallet_transactions.taker,to_char(wallet_transactions.trans_date,'YYYY-MM') as t_date, wallet_transactions.tx_hash,wallet_transactions."seller fee amt",wallet_transactions.marketplace,wallet_transactions.tokenid,contract_addr,wallet_addr,
         lag(wallet_transactions.taker) OVER (PARTITION BY wallet_transactions.buyer_address, wallet_transactions.tokenid ORDER BY wallet_transactions.trans_date) as prev_signal,
         lag(wallet_transactions."seller fee amt") OVER (PARTITION BY wallet_transactions.buyer_address, wallet_transactions.tokenid ORDER BY wallet_transactions.trans_date) as prev_price
     from wallet_transactions
    ) as t0
    )
    select A1.wallet_addr,A1.contract_addr, sum(A1.profit) as profit
    from A1
    where A1.wallet_addr = '${walletAddress}'
    group by 1,2)
    ,
    b2 as (select wallet_addr, contract_addr, count(*) AS TOTAL
    from wallet_transactions
    where wallet_addr = '${walletAddress}'
    group by 1,2)
    select b1.*,B2.TOTAL, ROW_NUMBER() OVER(ORDER BY b1.profit desc) AS row
    from b1
    LEFT JOIN b2 on b2.wallet_addr = b1.wallet_addr
    AND
    b2.contract_addr = b1.contract_addr
    where profit is not null)
    
    
    select * from c1
    where c1.row between ${startPage} and ${startPage + 10}
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
