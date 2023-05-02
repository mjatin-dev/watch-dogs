import Card from "@/components/Card";
import Charts from "@/components/Charts";
import Nav from "@/components/Nav";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";

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
  const NFTTransaction: any = [
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 5,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 56,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 26,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
    {
      txnHash: "0x123Hei0001223dju...",
      date: "15 days 4 hrs ago",
      from: "Null Address: 0x00...00",
      to: "0x45ty7632skjdbcbu...",
      tokenId: 260,
      profitOrLoss: "+2.53 ETH",
      type: "ERC-721",
    },
  ];

  const [ETHAddress, setETHAddress] = useState("");
  const [profitabilityRows, setProfitabilityRows] = useState<Array<any>>([]);
  const [NFTCollectionRows, setNFTCollectionRows] = useState<Array<any>>([]);
  const [NFTTransactionRows, setNFTTransactionRows] = useState<Array<any>>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    setProfitabilityRows(dummyData);
    setNFTCollectionRows(NFTCollection);
    setNFTTransactionRows(NFTTransaction);
  }, []);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChange = (event: any) => {
    setETHAddress(event.target.value);
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

    //   chart: {
    //     height: 350,
    //     type: "scatter",
    //     zoom: {
    //       enabled: true,
    //       type: "xy",
    //     },
    //   },
    //   xaxis: {
    //     tickAmount: 10,
    //   },
    //   yaxis: {
    //     tickAmount: 7,
    //   },
    // },
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
    <div className='flex min-h-screen flex-col items-center bg-#0A0909'>
      <Nav />
      <div className='flex mb-20 flex-col items-center w-full'>
        <div
          className='w-956 h-146 mb-10 mt-20 font-inter font-medium text-white text-5xl leading-11 flex items-center 
         justify-center'
        >
          WatchDogs
        </div>
        <SearchBar value={ETHAddress} handleChange={handleChange} />
      </div>
      <div className='flex flex-row items-center self-start ml-10 '>
        <div className='font-DM+Sans mr-2 font-medium text-3xl  text-white '>
          Address:
        </div>
        <p className='font-DM+Sans font-medium text-3xl leading-34 tracking-wide text-gray-500'>
          0x123Hdedhei0001223332dju
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
              <tbody>
                {profitabilityRows?.length > 0 ? (
                  profitabilityRows?.map((row: any) => (
                    <tr className='w-full hover:bg-fade hover:rounded-lg h-24'>
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
                  ))
                ) : (
                  <div className='font-DM+Sans font-bold text-7  text-white'>
                    No data found
                  </div>
                )}
              </tbody>
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
                <tbody>
                  {NFTCollectionRows?.length > 0 ? (
                    NFTCollectionRows?.map((row: any, index: number) => (
                      <tr
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
                    ))
                  ) : (
                    <div className='font-DM+Sans font-bold text-7  text-white'>
                      No data found
                    </div>
                  )}
                </tbody>
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
                        ).map((row: any, index: number) => (
                          <tr
                            className={`w-full hover:bg-fade 
                        border-b-2 border-fade
                        hover:rounded-lg h-24`}
                          >
                            <td className='px-6 py-4 '>
                              <div className='bg-gradient-to-r from-orange-400 via-red-400 to-purple-500 bg-clip-text text-transparent font-medium text-xl'>
                                {row?.txnHash ?? "-"}
                              </div>
                            </td>
                            <td className='px-6 py-4 text-center '>
                              <div className='font-DM+Sans mr-6 font-bold text-xl  text-white'>
                                {row?.date ?? "-"}
                              </div>
                            </td>
                            <td className='px-6 py-4  text-center'>
                              <div className='font-DM+Sans mr-6 font-medium text-xl  text-white'>
                                {row?.from ?? "-"}
                              </div>
                            </td>
                            <td className='px-6 py-4  text-center'>
                              <div className='font-DM+Sans mr-6 font-medium text-xl  text-white'>
                                {row?.to ?? "-"}
                              </div>
                            </td>
                            <td className='px-6 py-4  text-center'>
                              <div className='bg-gradient-to-r from-orange-400 via-red-400 to-purple-500 bg-clip-text text-transparent font-medium text-xl'>
                                {row?.tokenId ?? "-"}
                              </div>
                            </td>
                            <td className='px-6 py-4  text-center'>
                              <div className='font-DM+Sans mr-6 font-medium text-xl  text-neonGreen'>
                                {row?.profitOrLoss ?? "-"}
                              </div>
                            </td>
                            <td className='px-6 py-4  text-center'>
                              <div className='font-DM+Sans mr-6 font-medium text-xl  text-white'>
                                {row?.type ?? "-"}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div className='font-DM+Sans font-bold text-7  text-white'>
                          No data found
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
