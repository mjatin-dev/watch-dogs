import Card from "@/components/shared/Card";
import Charts from "@/components/shared/Charts";
import { CSVLink } from "react-csv";
import Pagination from "@/components/shared/Pagination";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getTimeDiffFromNow } from "@/components/shared/formatDate";
import { toast } from "react-toastify";
import { addNftTransactions } from "@/components/ReduxStore/NftTranscation/Actions";
import { ADD_NFT_TRANSACTION } from "@/components/ReduxStore/NftTranscation/Types";
import NoData from "@/components/shared/NoData";
import { addActualProfit } from "@/components/ReduxStore/ActualProfit/Actions";
import { ADD_DATA } from "@/components/ReduxStore/ActualProfit/Types";
import { convertTimestampToDate } from "@/constants/dateFormat";
import { calculateTotal } from "@/constants/calc";
import { createScatterChartData } from "@/constants/chartData";
import moment from "moment";

function SearchResult() {
  const [searchETH, setSearchETH] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<Array<any>>([]);
  const [profitabilityRows, setProfitabilityRows] = useState<Array<any>>([]);
  const [NFTCollectionRows, setNFTCollectionRows] = useState<Array<any>>([]);
  const [NFTTransactionRows, setNFTTransactionRows] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(20);
  const [filters, setFilters] = useState({
    actualProfit: "All",
    nftTransaction: "All",
  });
  const [nftCollectionPage, setNftCollectionPage] = useState<number>(0);
  const dispatch = useDispatch();
  const ethTransactions = useSelector(
    (state: any) => state?.ethTransaction?.transactions
  );
  const ethAddress = useSelector(
    (state: any) => state?.ethTransaction?.ethAddress
  );
  const state = useSelector((state: any) => state);
  const { totalBalance, totalETH, totalNFT } = state?.totalBalance?.data;
  useEffect(() => {
    setLoading(true);
    if (ethAddress || ethTransactions) {
      if (ethTransactions) setNFTTransactionRows(ethTransactions);
      setActualProfit();
      setNFTCollectionRows(state?.NftCollections?.collections);
    } else toast.error("Something went wrong");
    setLoading(false);
  }, [state, ethAddress]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const walletAddress = ethAddress;
      const response = await fetch(
        `/api/nftTransactions?page=${
          nftCollectionPage === 0 ? 1 : nftCollectionPage
        }&walletAddress=${walletAddress}`
      );

      if (response.status === 200) {
        const data = await response.json();
        dispatch(addNftTransactions(data?.data, ADD_NFT_TRANSACTION));
        setNFTCollectionRows(state?.NftCollections?.collections);
        setLoading(false);
      } else {
        const error = await response.json();
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [nftCollectionPage]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const walletAddress = ethAddress;
      const response = await fetch(
        `/api/actualProfit?filter=${filters?.actualProfit}&walletAddress=${walletAddress}`
      );
      if (response.status === 200) {
        const data = await response.json();
        dispatch(addActualProfit(data, ADD_DATA));
        setActualProfit();
        setLoading(false);
      } else {
        const error = await response.json();
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [filters?.actualProfit]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const walletAddress = ethAddress;
      const response = await fetch(
        `/api/nftTransactions?filter=${filters?.nftTransaction}&walletAddress=${walletAddress}`
      );
      if (response.status === 200) {
        const data = await response.json();
        dispatch(addNftTransactions(data, ADD_NFT_TRANSACTION));
        setLoading(false);
      } else {
        const error = await response.json();
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [filters?.nftTransaction]);

  const setActualProfit = () => {
    const actualProfit = state?.actualProfit?.data;
    const temp = actualProfit?.map((item: any) => {
      return {
        image: "/sample1.png",
        col2: {
          code: `${item?.marketplace ?? "-"} #${item?.tokenid}`,
          time: getTimeDiffFromNow(item?.t_date),
        },
        col3: item["seller fee amt"]?.toFixed(1) + "ETH",
      };
    });
    setProfitabilityRows(temp);
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
        type: "datetime",
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
          color: "#333639",
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          return `
            <div style="background-color: #000000; color: #ffffff; padding: 10px;">
              <ul style="list-style: none;">
              <li><b>Date</b>: ${
                data.x ? moment(data.x).format("MMM DD, YYYY") : "-"
              }</li>
              <li><b>Profit</b>: ${data.y ? data.y : "-"}</li>
                <li><b>Buyer Address</b>: ${
                  data.buyer_address ? data.buyer_address : "-"
                }</li>
                <li><b>Transaction Hash</b>: ${
                  data.tx_hash ? data.tx_hash : "-"
                }</li>
                <li><b>Seller Fee Amount</b>: ${
                  data.seller_fee_amt ? data.seller_fee_amt : "-"
                }</li>
                <li><b>Marketplace</b>: ${
                  data.marketplace ? data.marketplace : "-"
                }</li>
                <li><b>Token ID</b>: ${data.tokenid ? data.tokenid : "-"}</li>
                <li><b>Contract Address</b>: ${
                  data.contract_addr ? data.contract_addr : "-"
                }</li>
              </ul>
            </div>
          `;
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
    series: createScatterChartData(
      state?.nftTransaction?.transactions,
      "marketplace"
    ),
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

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
              height: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      stroke: {
        show: false,
      },
      legend: {
        position: "bottom",
        markers: {
          radius: 0,
        },
        labels: {
          colors: "#FFFFFF",
        },
        itemMargin: {
          horizontal: 16,
          vertical: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
    },

    series: [
      totalETH ? totalETH : 0,
      totalBalance ? totalBalance : 0,
      totalNFT ? totalNFT : 0,
    ],
    type: "donut",
  };

  const generateCsvData = () => {
    const headers = [
      "Hash",
      "From",
      "To",
      "Value",
      "Gas Price",
      "Gas",
      "Block Number",
      "Timestamp",
    ];
    const selectedKeys = [
      "hash",
      "from",
      "to",
      "value",
      "gasPrice",
      "gas",
      "blockNumber",
      "timestamp",
    ];
    const formattedData = NFTTransactionRows.map((obj) => {
      return selectedKeys.map((key) => obj[key]);
    });

    setCsvData([headers, ...formattedData]);
  };
  const buttonStyles =
    "bg-fade px-6 py-3 text-medium rounded-md text-bold  font-DM+Sans mr-2 cursor-pointer ";
  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center bg-black`}
    >
      <Loader loading={loading} />
      <div className='lg:px-44 xl:px-60 md:px-24 px-16 w-full h-full mb-10 '>
        <div className='flex my-20 flex-col items-center w-full'>
          <div
            className='w-956 h-146 mb-10 mt-20 font-inter font-medium text-white text-4xl leading-11 flex items-center 
         justify-center'
          >
            WatchDogs
          </div>
          <SearchBar
            value={searchETH}
            handleChange={handleChange}
            width='w-full'
          />
        </div>
        <div className='flex flex-row items-center self-start  '>
          <div className='font-DM+Sans mr-2 font-medium text-large  text-white '>
            Address:
          </div>
          <p className='font-DM+Sans font-medium w-64  md:w-96 lg:w-auto  truncate text-large leading-34 tracking-wide text-gray-500'>
            {ethAddress ?? "-"}
          </p>
        </div>
        <div className='grid grid-cols-2  grid-rows-4 gap-4 w-full mt-10 mb-20 '>
          <div className='col-span-2 md:col-span-1 h-auto'>
            <Card>
              <p className='font-DM+Sans  mb-2 font-medium text-3xl leading-14 tracking-tighter text-white'>
                Total Balance
              </p>
              <p className='font-DM+Sans font-bold text-4xl text-white leading-56 tracking-tight shadow-text'>
                {(totalBalance !== 0 && "$" + totalBalance.toLocaleString()) ??
                  "-"}
              </p>
              {totalBalance !== 0 ? (
                <div className=' w-full flex items-center justify-center'>
                  <div className='h-96 w-96 flex items-center justify-center'>
                    <Charts data={donutChartData} />
                  </div>
                </div>
              ) : (
                <div className='flex  my-24  items-center justify-center '>
                  <NoData />
                </div>
              )}
            </Card>
          </div>

          <div className=' h-auto col-span-2 md:col-span-1'>
            <Card>
              <div className='flex flex-row justify-between items-start'>
                <div>
                  <p className='font-DM+Sans mb-2 font-medium text-3xl leading-14 tracking-tighter text-white'>
                    Actual Profitability
                  </p>
                  {profitabilityRows?.length > 0 && (
                    <p className='font-DM+Sans font-bold text-large text-neonGreen leading-56 tracking-tight shadow-text'>
                      + ${calculateTotal(profitabilityRows, "profit") ?? "-"}
                    </p>
                  )}
                </div>
                <div className='font-medium text-xs flex items-center tracking-wider text-white'>
                  <div
                    onClick={() =>
                      setFilters({ ...filters, actualProfit: "3M" })
                    }
                    className={
                      filters?.actualProfit === "3M"
                        ? "text-white mr-2"
                        : "text-neutral-400" + ` mr-2 cursor-pointer`
                    }
                  >
                    3M
                  </div>
                  /
                  <div
                    onClick={() =>
                      setFilters({ ...filters, actualProfit: "6M" })
                    }
                    className={
                      filters?.actualProfit === "6M"
                        ? "text-white mx-2"
                        : "text-neutral-400" + ` mx-2 cursor-pointer`
                    }
                  >
                    6M
                  </div>
                  /
                  <div
                    onClick={() =>
                      setFilters({ ...filters, actualProfit: "12M" })
                    }
                    className={
                      filters?.actualProfit === "12M"
                        ? "text-white mx-2"
                        : "text-neutral-400" + ` mx-2 cursor-pointer`
                    }
                  >
                    12M
                  </div>
                  /
                  <div
                    onClick={() =>
                      setFilters({ ...filters, actualProfit: "All" })
                    }
                    className={
                      filters?.actualProfit === "All"
                        ? "text-white ml-2"
                        : "text-neutral-400" + ` ml-2 cursor-pointer`
                    }
                  >
                    All
                  </div>
                </div>
              </div>
              <div className='h-96 overflow-auto my-2'>
                {profitabilityRows?.length > 0 ? (
                  <table className='w-full	'>
                    <tbody>
                      {profitabilityRows?.map((row: any, index: number) => (
                        <tr
                          key={index}
                          className='w-full hover:bg-fade hover:rounded-lg h-24'
                        >
                          <td className='px-6 py-4 flex items-center '>
                            <div className='mr-10'>
                              <img
                                src={row?.image}
                                className='w-16 h-16 rounded-lg bg-center bg-cover'
                              />
                            </div>

                            <div>
                              <div className='font-DM+Sans truncate w-24 font-bold text-7 leading-56 flex items-center tracking-wide text-white'>
                                {row?.col2?.code ?? "-"}
                              </div>
                              <p className='font-medium text-5 leading-56 flex items-center text-orange-500'>
                                {row?.col2?.time ?? "-"}
                              </p>
                            </div>
                          </td>
                          <td className='px-6 py-4 '>
                            <div className='font-DM+Sans font-bold text-7  text-white'>
                              {row?.col3 ?? "-"}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className='flex  my-24  items-center justify-center '>
                    <NoData />
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className='h-auto col-span-2'>
            <Card>
              <div className='flex flex-col w-full '>
                <div className='flex flex-row justify-between items-start'>
                  <p className='font-DM+Sans mb-2 font-medium text-3xl leading-14 tracking-tighter text-white'>
                    NFT Collections
                  </p>

                  <div className='font-medium text-xs flex items-center tracking-wider truncate w-56 text-white'>
                    OWNED BY WALLET: {ethAddress ?? "-"}
                  </div>
                </div>
                <div className='h-96 overflow-auto my-2'>
                  {NFTCollectionRows?.length > 0 ? (
                    <table className='w-full min-w-max	'>
                      <thead className='text-left text-gray-400 text-sm uppercase'>
                        <tr>
                          <th className='px-6 py-3 font-DM+Sans font-bold text-medium text-white '>
                            COLLECTION
                          </th>
                          <th className='px-6 py-3 text-right	 font-DM+Sans font-bold text-medium text-white '>
                            FLOOR PRICE
                          </th>
                          <th className='px-6 py-3 font-DM+Sans font-bold text-medium text-white '>
                            PROFIT
                          </th>

                          <th className='px-6 py-3 font-DM+Sans font-bold text-medium text-white '>
                            TOTAL
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {NFTCollectionRows?.map((row: any, index: number) => (
                          <tr
                            key={index}
                            className={`w-full ${
                              index % 2 && "bg-fade "
                            }hover:rounded-lg h-24`}
                          >
                            <td className='px-6 py-4 flex flex-row items-center'>
                              <div className='font-DM+Sans mr-6 font-bold text-medium  text-white'>
                                {index + 1}
                              </div>

                              <img
                                src={row?.imageUrl}
                                className='w-16 h-16 mr-6 rounded-lg bg-center bg-cover'
                              />
                              <div className='font-DM+Sans mr-2  font-bold text-medium leading-56 flex items-center tracking-wide text-white'>
                                {row?.name ?? "-"}
                              </div>

                              <img src='/tick.png' className='h-5 w-5' />
                            </td>
                            <td className='px-6 py-4 '>
                              <div className='flex flex-col items-end '>
                                <div className='font-DM+Sans font-bold text-medium leading-56 tracking-wide text-white'>
                                  {row?.floorPrice + "ETH" ?? "-"}
                                </div>
                                {/* <div
                                  className={` ${
                                    row?.floorPrice?.positive
                                      ? "text-neonGreen"
                                      : "text-red-600"
                                  } font-DM+Sans font-bold h-4  text-base  leading-56 tracking-wide `}
                                >
                                  {row?.floorPrice?.offer
                                    ? row?.floorPrice?.positive
                                      ? "+" + row?.floorPrice?.offer + "%"
                                      : "-" + row?.floorPrice?.offer + "%"
                                    : "-"}
                                </div> */}
                                <div className={` h-4 `}>{""}</div>
                              </div>
                            </td>
                            <td className='px-6 py-4 '>
                              <div className='font-DM+Sans text-medium font-bold text-7  text-white'>
                                {row?.profit ? row?.profit + "ETH" : "-"}
                              </div>
                              <div className={` h-4 `}>{""}</div>
                            </td>

                            <td className='px-6 py-4 text-medium'>
                              <div className='font-DM+Sans font-bold text-7  text-white'>
                                {row?.total ?? "-"}
                              </div>
                              <div className={` h-4 `}>{""}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className='flex  my-24  items-center justify-center '>
                      <NoData />
                    </div>
                  )}
                </div>
                <div className='self-end'>
                  <div className='flex  items-center mt-4'>
                    <div
                      className={
                        nftCollectionPage <= 1
                          ? ` ${buttonStyles} text-neutral-400	cursor-not-allowed`
                          : buttonStyles + "text-white"
                      }
                      onClick={() => {
                        if (nftCollectionPage > 0) {
                          setNftCollectionPage(nftCollectionPage - 10);
                        }
                      }}
                    >
                      {"<"}
                    </div>
                    <div className={buttonStyles}>
                      Rows {nftCollectionPage} to {nftCollectionPage + 10}
                    </div>
                    <div
                      className={
                        NFTCollectionRows?.length > nftCollectionPage + 10
                          ? buttonStyles + "text-white"
                          : buttonStyles + "text-neutral-400"
                      }
                      onClick={() => {
                        if (
                          NFTCollectionRows?.length >
                          nftCollectionPage + 10
                        ) {
                          setNftCollectionPage(nftCollectionPage + 10);
                        }
                      }}
                    >
                      {">"}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className='h-auto col-span-2'>
            <Card>
              <div className='flex flex-row justify-between items-start'>
                <div>
                  <p className='font-DM+Sans mb-2 font-medium text-3xl leading-14 tracking-tighter text-white'>
                    NFT Transactions (Profit / Loss)
                  </p>
                  <p
                    className='font-DM+Sans font-medium NFT Transactions (Profit / Loss)

text-white leading-56 tracking-tight shadow-text'
                  >
                    Sales
                  </p>
                </div>
                <div className='font-medium text-xs flex items-center tracking-wider text-white'>
                  <div
                    onClick={() =>
                      setFilters({ ...filters, nftTransaction: "3M" })
                    }
                    className={
                      filters?.nftTransaction === "3M"
                        ? "text-white mr-2"
                        : "text-neutral-400" + ` mr-2 cursor-pointer`
                    }
                  >
                    3M
                  </div>
                  /
                  <div
                    onClick={() =>
                      setFilters({ ...filters, nftTransaction: "6M" })
                    }
                    className={
                      filters?.nftTransaction === "6M"
                        ? "text-white mx-2"
                        : "text-neutral-400" + ` mx-2 cursor-pointer`
                    }
                  >
                    6M
                  </div>
                  /
                  <div
                    onClick={() =>
                      setFilters({ ...filters, nftTransaction: "12M" })
                    }
                    className={
                      filters?.nftTransaction === "12M"
                        ? "text-white mx-2"
                        : "text-neutral-400" + ` mx-2 cursor-pointer`
                    }
                  >
                    12M
                  </div>
                  /
                  <div
                    onClick={() =>
                      setFilters({ ...filters, nftTransaction: "All" })
                    }
                    className={
                      filters?.nftTransaction === "All"
                        ? "text-white ml-2"
                        : "text-neutral-400" + ` ml-2 cursor-pointer`
                    }
                  >
                    All
                  </div>
                </div>
              </div>
              <div className='h-96  my-2'>
                <Charts data={NFTTransactionsChartData} />
              </div>
            </Card>
          </div>
          <div className='h-96 row-auto col-span-2 mb-10'>
            <Card height='h-auto'>
              <div className='flex flex-col w-full '>
                <div>
                  <p className='font-DM+Sans mb-2 font-medium text-3xl leading-14 tracking-tighter text-white'>
                    NFT Transactions
                  </p>
                  <div className='max-h-screen overflow-auto my-2'>
                    {NFTTransactionRows?.length > 0 ? (
                      <table className='w-full md:min-w-max mt-6	'>
                        <thead className='text-left bg-fade h-10 text-gray-400 text-sm uppercase'>
                          <tr>
                            <th className='px-6 py-3 font-DM+Sans font-bold text-md text-white '>
                              Txn Hash
                            </th>
                            <th className='px-6 py-3 font-DM+Sans text-center font-bold text-md text-white '>
                              Date
                            </th>
                            <th className='px-6 py-3 font-DM+Sans text-center marker:font-bold text-md text-white '>
                              From
                            </th>
                            <th className='px-6 py-3 font-DM+Sans text-center font-bold text-md text-white '>
                              to
                            </th>
                            <th className='px-6 py-3 font-DM+Sans text-center font-bold text-md text-white '>
                              Token ID
                            </th>
                            <th className='px-6 py-3 font-DM+Sans text-center font-bold text-md text-white '>
                              Profit / Loss
                            </th>
                            <th className='px-6 py-3 font-DM+Sans font-bold text-center text-md text-white '>
                              Type
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(rowsPerPage > 0
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
                                <div className='bg-gradient-to-r w-60 truncate from-orange-400 via-red-400 to-purple-500 bg-clip-text text-transparent font-medium text-medium'>
                                  {row?.hash ?? "-"}
                                </div>
                              </td>
                              <td className='px-6 py-4 text-center '>
                                <div className='font-DM+Sans  w-60 truncate  font-bold text-medium  text-white'>
                                  {row?.timeStamp
                                    ? convertTimestampToDate(row?.timeStamp)
                                    : "-"}
                                </div>
                              </td>
                              <td className='px-6 py-4  text-center'>
                                <div className='font-DM+Sans    w-60 truncate font-medium text-medium  text-white'>
                                  {row?.from ?? "-"}
                                </div>
                              </td>
                              <td className='px-6 py-4  text-center'>
                                <div className='font-DM+Sans   w-60 truncate font-medium text-medium  text-white'>
                                  {row?.to ?? "-"}
                                </div>
                              </td>
                              <td className='px-6 py-4  text-center'>
                                <div className='bg-gradient-to-r  w-60 truncate from-orange-400 via-red-400 to-purple-500 bg-clip-text text-transparent font-medium text-medium'>
                                  {row?.transactionIndex ?? "-"}
                                </div>
                              </td>
                              <td className='px-6 py-4  text-center'>
                                <div className='font-DM+Sans   w-60 truncate font-medium text-medium  text-neonGreen'>
                                  +2.53 ETH
                                </div>
                              </td>
                              <td className='px-6 py-4  text-center'>
                                <div className='font-DM+Sans   w-60 truncate font-medium text-medium  text-white'>
                                  ERC-721
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className='flex  my-24  items-center justify-center '>
                        <NoData />
                      </div>
                    )}
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
                  <div
                    onClick={generateCsvData}
                    className='font-DM+sans font-bold text-white text-15 leading-56 flex items-center'
                  >
                    {"{ Download "}
                    <CSVLink data={csvData} filename={"transactions.csv"}>
                      <span className='font-bold text-purple-500 mx-2 cursor-pointer text-15 leading-56 flex items-center'>
                        CSV Export
                      </span>
                    </CSVLink>
                    {" }"}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
