import Card from "@/components/shared/Card";
import Charts from "@/components/shared/Charts";
import { toast } from "react-toastify";
import Nav from "@/components/Nav";
import Pagination from "@/components/shared/Pagination";
import SearchBar from "@/components/SearchBar";
import { supabase } from "@/config/supabase";
import React, { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";
import { ETHUrl } from "@/constants/Url";
import {
  NFTTransactionQuery,
  actualProfitQuery,
  collectionsQuery,
  getBalanceQuery,
  tradesQuery,
} from "@/constants/supabseQueries";
import { useSelector } from "react-redux";
import { RootState } from "@/components/ReduxStore";

function SearchResult() {
  const dummyData: any = [
    {
      image: "/sample1.png",
      col2: {
        code: "Clone X  #10098",
        time: "12 hours ago",
      },
      col3: "6.9 ETH",
    },
    {
      image: "/sample2.png",
      col2: {
        code: "BAYC  #14563",
        time: "10 days ago",
      },
      col3: "6.9 ETH",
    },
    {
      image: "/sample3.png",
      col2: {
        code: "CryptoPunks  #124",
        time: "78 days ago",
      },
      col3: "6.9 ETH",
    },
    {
      image: "/sample1.png",
      col2: {
        code: "Clone X  #10098",
        time: "90 days ago",
      },
      col3: "6.9 ETH",
    },
    {
      image: "/sample2.png",
      col2: {
        code: "CryptoPunks  #124",
        time: "12 hours ago",
      },
      col3: "6.9 ETH",
    },
  ];
  const NFTCollection: any = [
    {
      collection: {
        image: "/sample1.png",
        name: "Clone X",
        verified: true,
      },
      floorPrice: {
        price: "10.3 ETH",
        offer: 34,
        positive: false,
      },
      profit: "10ETH",
      minted: 3,
      total: 12,
    },
    {
      collection: {
        image: "/sample3.png",
        name: "TOSHIES",
        verified: true,
      },
      floorPrice: {
        price: "10.3 ETH",
        offer: 34,
        positive: true,
      },
      profit: "10ETH",
      minted: 3,
      total: 12,
    },
    {
      collection: {
        image: "/sample2.png",
        name: "Sewer Pass",
        verified: true,
      },
      floorPrice: {
        price: "10.3 ETH",
        offer: 34,
        positive: false,
      },
      profit: "10ETH",
      minted: 3,
      total: 12,
    },
    {
      collection: {
        image: "/sample1.png",
        name: "Bored Ape Yacht Club",
        verified: true,
      },
      floorPrice: {
        price: "10.3 ETH",
        offer: 34,
        positive: true,
      },
      profit: "10ETH",
      minted: 3,
      total: 12,
    },
    {
      collection: {
        image: "/sample3.png",
        name: "CryptoPunks",
        verified: true,
      },
      floorPrice: {
        price: "10.3 ETH",
        offer: 34,
        positive: true,
      },
      profit: "10ETH",
      minted: 3,
      total: 12,
    },
  ];

  const [searchETH, setSearchETH] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [profitabilityRows, setProfitabilityRows] = useState<Array<any>>([]);
  const [NFTCollectionRows, setNFTCollectionRows] = useState<Array<any>>([]);
  const [NFTTransactionRows, setNFTTransactionRows] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(20);
  const ethTransactions = useSelector(
    (state: any) => state?.ethTransaction?.transactions
  );
  const ethAddress = useSelector(
    (state: any) => state?.ethTransaction?.ethAddress
  );
  useEffect(() => {
    setNFTTransactionRows(ethTransactions);
    setProfitabilityRows(dummyData);
    setNFTCollectionRows(NFTCollection);
    fetchData();
  }, []);

  const fetchData = async () => {
    // fetchTotalBalance();
    // fetchActualProfitability();
    // fetchNFTCollections();
    // fetchNFTTransaction();
  };

  fetchData();
  const fetchTotalBalance = async () => {
    const walletAddress = "WALLET_ADDRESS";
    const { data, error }: any = await supabase
      .from("erc20_balances")
      .select(getBalanceQuery(walletAddress));
    if (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } else {
      const totalBalance = data[0].total_balance;
      console.log(`Total balance: ${totalBalance}`);
    }
  };
  const fetchActualProfitability = async () => {
    const walletAddress = "WALLET_ADDRESS";
    const { data, error } = await supabase
      .from("wallet_transactions")
      .select(actualProfitQuery(walletAddress));
    if (error) {
      console.error(error);
    } else {
      console.log("Top 5 best closed trades:");
      console.table(data.slice(0, 5));
      console.log("Top 5 worst closed trades:");
      console.table(data.slice(-5));
    }
  };

  // const fetchNFTCollections = async () => {
  //   const walletAddress = "WALLET_ADDRESS";
  //   const { data: collectionsData, error: collectionsError } = await supabase
  //     .from("wallet_transactions")
  //     .select(collectionsQuery(walletAddress));
  //   if (collectionsError) {
  //     console.error(collectionsError);
  //   } else {
  //     // Loop through each collection and query the floor price
  //     collectionsData.forEach(async (collection: any) => {
  //       const { collection_address } = collection;

  //       // Query the Alchemy API for the floor price
  //       const floorPriceResponse = await axios.get(
  //         `https://api.opensea.io/api/v1/assets?owner=${walletAddress}&asset_contract_address=${collection_address}&order_direction=asc&limit=1`
  //       );

  //       // Extract the floor price from the API response
  //       const floorPrice =
  //         floorPriceResponse.data?.assets?.[0]?.sell_orders?.[0]?.current_price;

  //       const { data: tradesData, error: tradesError } = await supabase
  //         .from("wallet_transactions")
  //         .select(tradesQuery(walletAddress, collection_address));

  //       // Handle the trades response
  //       if (tradesError) {
  //         console.error(tradesError);
  //       } else {
  //         // Calculate the total profit for the collection
  //         const totalProfit = tradesData.reduce(
  //           (acc: number, trade: any) => acc + trade.profit,
  //           0
  //         );
  //         const totalTrades = tradesData.length;

  //         // Output the results for the collection
  //         console.log(`Collection: ${collection_address}`);
  //         console.log(`Floor Price: ${floorPrice}`);
  //         console.log(`Total Profit: ${totalProfit}`);
  //         console.log(`Total Trades: ${totalTrades}`);
  //         console.log("-----------------------");
  //       }
  //     });
  //   }
  // };

  const fetchNFTTransaction = async () => {
    // NFTTransactionQuery
    const { data: walletTransactions, error } = await supabase
      .from("wallet_transactions")
      .select(NFTTransactionQuery);
    if (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } else {
      console.log(`walletTransactions: ${walletTransactions}`);
    }
  };
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const handleChange = (event: any) => {
    setSearchETH(event.target.value);
  };
  const NFTTransactionsChartData: any = {
    options: {
      dataLabels: {
        enabled: false,
        style: {
          colors: ["#FCFAF4"],
        },
      },
      legend: {
        show: true,
        position: "bottom",
        labels: {
          colors: "#ffffff",
        },
      },
      chart: {
        height: 350,
        type: "scatter",
        zoom: {
          enabled: true,
          type: "xy",
        },
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    },
    series: [
      {
        name: "PORSCHE 911",
        data: [
          [14.2, 215.4],
          [15.5, 245.8],
          [16.9, 276.4],
          [19.6, 299.2],
          [22.2, 351.5],
        ],
      },
      {
        name: "PORSCHE 926",
        data: [
          [10.0, 200.0],
          [12.5, 240.8],
          [16.0, 300.6],
          [21.0, 380.7],
          [25.0, 450.5],
        ],
      },
    ],
    type: "scatter",
  };
  const donutChartData: any = {
    options: {
      chart: {
        type: "donut",
        width: "100%",
        height: "100%",
      },
      labels: ["ETH  Balance", "Token Balance", "NFT Balance"],

      colors: ["#A510FF", "#D946AA", "#F19C44"],
      noData: {
        text: "Loading...",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          colors: "#FFFFFF",
        },
      },
      dataLabels: {
        enabled: false,
      },
    },

    series: [44, 55, 26],
    type: "donut",
  };
  return (
    <div className={`flex min-h-screen flex-col items-center bg-black`}>
      <Nav />
      <Loader loading={loading} />

      <div className='flex mb-20 flex-col items-center w-full'>
        <div
          className='w-956 h-146 mb-10 mt-20 font-inter font-medium text-white text-5xl leading-11 flex items-center 
         justify-center'
        >
          WatchDogs
        </div>
        <SearchBar value={searchETH} handleChange={handleChange} />
      </div>
      <div className='flex flex-row items-center self-start ml-10 '>
        <div className='font-DM+Sans mr-2 font-medium text-3xl  text-white '>
          Address:
        </div>
        <p className='font-DM+Sans font-medium  w-full truncate text-3xl leading-34 tracking-wide text-gray-500'>
          {ethAddress ?? "-"}
        </p>
      </div>
      <div className='grid grid-cols-2 grid-rows-4 gap-4 w-full p-10 mb-20 '>
        <Card>
          <p className='font-DM+Sans  mb-2 font-medium text-4xl leading-14 tracking-tighter text-white'>
            Total Balance
          </p>
          <p className='font-DM+Sans font-bold text-5xl text-white leading-56 tracking-tight shadow-text'>
            $101,230
          </p>
          <div className=' w-full flex items-center justify-center'>
            <div className='h-96 w-96 flex items-center justify-center'>
              <Charts data={donutChartData} />
            </div>
          </div>
        </Card>

        <Card>
          <div className='flex flex-row justify-between items-start'>
            <div>
              <p className='font-DM+Sans mb-2 font-medium text-4xl leading-14 tracking-tighter text-white'>
                Actual Profitability
              </p>
              <p className='font-DM+Sans font-bold text-5xl text-neonGreen leading-56 tracking-tight shadow-text'>
                + $20,457
              </p>
            </div>
            <div className='font-medium text-xs flex items-center tracking-wider text-white'>
              3M / 6 M / 12M
            </div>
          </div>
          <div className='h-96 overflow-auto my-2'>
            <table className='w-full	'>
              {profitabilityRows?.length > 0 ? (
                <tbody>
                  {profitabilityRows?.map((row: any, index: number) => (
                    <tr
                      key={index}
                      className='w-full hover:bg-fade hover:rounded-lg h-24'
                    >
                      <td className='px-6 py-4'>
                        <img
                          src={row?.image}
                          className='w-16 h-16 rounded-lg bg-center bg-cover'
                        />
                      </td>
                      <td className='px-6 py-4 '>
                        <div className='font-DM+Sans font-bold text-7 leading-56 flex items-center tracking-wide text-white'>
                          {row?.col2?.code ?? "-"}
                        </div>
                        <p className='font-medium text-5 leading-56 flex items-center text-orange-500'>
                          {row?.col2?.time ?? "-"}
                        </p>
                      </td>
                      <td className='px-6 py-4 '>
                        <div className='font-DM+Sans font-bold text-7  text-white'>
                          {row?.col3 ?? "-"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <div className='flex w-screen my-24  items-center justify-center '>
                  <div className='font-DM+Sans  font-bold text-7  text-white'>
                    No data found
                  </div>
                </div>
              )}
            </table>
          </div>
        </Card>
        <div className='h-20 col-span-2'>
          <Card>
            <div className='flex flex-row justify-between items-start'>
              <p className='font-DM+Sans mb-2 font-medium text-4xl leading-14 tracking-tighter text-white'>
                NFT Collections
              </p>

              <div className='font-medium text-xs flex items-center tracking-wider text-white'>
                OWNED BY WALLET: 0x123Hdedhei00012htg...
              </div>
            </div>
            <div className='h-96 overflow-auto my-2'>
              <table className='w-full min-w-max	'>
                <thead className='text-left text-gray-400 text-sm uppercase'>
                  <tr>
                    <th className='px-6 py-3 font-DM+Sans font-bold text-xl text-white '>
                      COLLECTION
                    </th>
                    <th className='px-6 py-3 text-right	 font-DM+Sans font-bold text-xl text-white '>
                      FLOOR PRICE
                    </th>
                    <th className='px-6 py-3 font-DM+Sans font-bold text-xl text-white '>
                      PROFIT
                    </th>
                    <th className='px-6 py-3 font-DM+Sans font-bold text-xl text-white '>
                      MINTED
                    </th>
                    <th className='px-6 py-3 font-DM+Sans font-bold text-xl text-white '>
                      TOTAL
                    </th>
                  </tr>
                </thead>
                {NFTCollectionRows?.length > 0 ? (
                  <tbody>
                    {NFTCollectionRows?.map((row: any, index: number) => (
                      <tr
                        key={index}
                        className={`w-full ${
                          index % 2 && "bg-fade "
                        }hover:rounded-lg h-24`}
                      >
                        <td className='px-6 py-4 flex flex-row items-center'>
                          <div className='font-DM+Sans mr-6 font-bold text-3xl  text-white'>
                            {index + 1}
                          </div>

                          <img
                            src={row?.collection?.image}
                            className='w-16 h-16 mr-6 rounded-lg bg-center bg-cover'
                          />
                          <div className='font-DM+Sans mr-2  font-bold text-3xl leading-56 flex items-center tracking-wide text-white'>
                            {row?.collection?.name ?? "-"}
                          </div>
                          {row?.collection?.verified && (
                            <img src='/tick.png' className='h-7 w-7' />
                          )}
                        </td>
                        <td className='px-6 py-4 '>
                          <div className='flex flex-col items-end '>
                            <div className='font-DM+Sans font-bold text-3xl leading-56 tracking-wide text-white'>
                              {row?.floorPrice?.price ?? "-"}
                            </div>
                            <div
                              className={` ${
                                row?.floorPrice?.positive
                                  ? "text-neonGreen"
                                  : "text-red-600"
                              } font-DM+Sans font-bold text-base  leading-56 tracking-wide `}
                            >
                              {row?.floorPrice?.offer
                                ? row?.floorPrice?.positive
                                  ? "+" + row?.floorPrice?.offer + "%"
                                  : "-" + row?.floorPrice?.offer + "%"
                                : "-"}
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 '>
                          <div className='font-DM+Sans text-3xl font-bold text-7  text-white'>
                            {row?.profit ?? "-"}
                          </div>
                        </td>
                        <td className='px-6 py-4 text-3xl '>
                          <div className='font-DM+Sans font-bold text-7  text-white'>
                            {row?.minted ?? "-"}
                          </div>
                        </td>
                        <td className='px-6 py-4 text-3xl'>
                          <div className='font-DM+Sans font-bold text-7  text-white'>
                            {row?.total ?? "-"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <div className='flex w-screen my-24  items-center justify-center '>
                    <div className='font-DM+Sans  font-bold text-7  text-white'>
                      No data found
                    </div>
                  </div>
                )}
              </table>
            </div>
          </Card>
        </div>
        <div className='h-20 col-span-2'>
          <Card>
            <div className='flex flex-row justify-between items-start'>
              <div>
                <p className='font-DM+Sans mb-2 font-medium text-4xl leading-14 tracking-tighter text-white'>
                  NFT Transactions (Profit / Loss)
                </p>
                <p className='font-DM+Sans font-medium text-xl text-white leading-56 tracking-tight shadow-text'>
                  Sales
                </p>
              </div>
              <div className='font-medium text-xs flex items-center tracking-wider text-white'>
                3M / 6 M / 12M
              </div>
            </div>
            <div className='h-96  my-2'>
              <Charts data={NFTTransactionsChartData} />
            </div>
          </Card>
        </div>
        <div className='h-96 row-auto col-span-2 mb-10'>
          <Card>
            <div className='flex flex-col w-full '>
              <div>
                <p className='font-DM+Sans mb-2 font-medium text-4xl leading-14 tracking-tighter text-white'>
                  NFT Transactions
                </p>
                <div className='max-h-screen overflow-auto my-2'>
                  <table className='w-full md:min-w-max mt-6	'>
                    <thead className='text-left bg-fade h-20 text-gray-400 text-sm uppercase'>
                      <tr>
                        <th className='px-6 py-3 font-DM+Sans font-bold text-3xl text-white '>
                          Txn Hash
                        </th>
                        <th className='px-6 py-3 font-DM+Sans font-bold text-3xl text-white '>
                          Date
                        </th>
                        <th className='px-6 py-3 font-DM+Sans font-bold text-3xl text-white '>
                          From
                        </th>
                        <th className='px-6 py-3 font-DM+Sans font-bold text-3xl text-white '>
                          to
                        </th>
                        <th className='px-6 py-3 font-DM+Sans font-bold text-3xl text-white '>
                          Token ID
                        </th>
                        <th className='px-6 py-3 font-DM+Sans font-bold text-3xl text-white '>
                          Profit / Loss
                        </th>
                        <th className='px-6 py-3 font-DM+Sans font-bold text-3xl text-white '>
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {NFTTransactionRows?.length > 0 ? (
                        (rowsPerPage > 0
                          ? NFTTransactionRows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : NFTTransactionRows
                        ).map((row: any) => (
                          <tr
                            key={row?.hash}
                            className={`w-full hover:bg-fade 
                        border-b-2 border-fade
                        hover:rounded-lg h-24`}
                          >
                            <td className='px-6 py-4 '>
                              <div className='bg-gradient-to-r w-60 truncate from-orange-400 via-red-400 to-purple-500 bg-clip-text text-transparent font-medium text-xl'>
                                {row?.hash ?? "-"}
                              </div>
                            </td>
                            <td className='px-6 py-4 text-center '>
                              <div className='font-DM+Sans  w-60 truncate mr-6 font-bold text-xl  text-white'>
                                {row?.timeStamp ?? "-"}
                              </div>
                            </td>
                            <td className='px-6 py-4  text-center'>
                              <div className='font-DM+Sans mr-6   w-60 truncate font-medium text-xl  text-white'>
                                {row?.from ?? "-"}
                              </div>
                            </td>
                            <td className='px-6 py-4  text-center'>
                              <div className='font-DM+Sans mr-6  w-60 truncate font-medium text-xl  text-white'>
                                {row?.to ?? "-"}
                              </div>
                            </td>
                            <td className='px-6 py-4  text-center'>
                              <div className='bg-gradient-to-r  w-60 truncate from-orange-400 via-red-400 to-purple-500 bg-clip-text text-transparent font-medium text-xl'>
                                {row?.transactionIndex ?? "-"}
                              </div>
                            </td>
                            <td className='px-6 py-4  text-center'>
                              <div className='font-DM+Sans mr-6  w-60 truncate font-medium text-xl  text-neonGreen'>
                                +2.53 ETH
                              </div>
                            </td>
                            <td className='px-6 py-4  text-center'>
                              <div className='font-DM+Sans mr-6  w-60 truncate font-medium text-xl  text-white'>
                                ERC-721
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div className='flex w-screen my-24  items-center justify-center '>
                          <div className='font-DM+Sans  font-bold text-7  text-white'>
                            No data found
                          </div>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='self-end'>
                <Pagination
                  totalRows={NFTTransactionRows?.length}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                />
              </div>
              <div className='self-end mt-4'>
                <div className='font-DM+sans font-bold text-white text-15 leading-56 flex items-center'>
                  {"{ Download "}
                  <span className='font-bold text-purple-500 mx-2 cursor-pointer text-15 leading-56 flex items-center'>
                    CSV Export
                  </span>
                  {" }"}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
