import Card from "@/components/Card";
import Nav from "@/components/Nav";
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
  const NFTdata: any = [
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
  const [ETHAddress, setETHAddress] = useState("");
  const [profitabilityRows, setProfitabilityRows] = useState<Array<any>>([]);
  const [NFTRows, setNFTRows] = useState<Array<any>>([]);
  useEffect(() => {
    setProfitabilityRows(dummyData);
    setNFTRows(NFTdata);
  }, []);

  const handleChange = (event: any) => {
    setETHAddress(event.target.value);
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
        <div className='font-dm-sans mr-2 font-medium text-3xl  text-white '>
          Address:
        </div>
        <p className='font-dm-sans font-medium text-3xl leading-34 tracking-wide text-gray-500'>
          0x123Hdedhei0001223332dju
        </p>
      </div>
      <div className='grid grid-cols-2 gap-4 w-full p-10 '>
        <Card>
          <p className='font-dmsans  mb-2 font-medium text-4xl leading-14 tracking-tighter text-white'>
            Total Balance
          </p>
          <p className='font-dm-sans font-bold text-5xl text-white leading-56 tracking-tight shadow-text'>
            $101,230
          </p>
          <div className=' w-full flex items-center justify-center'>
            <div className='h-96 w-96 flex items-center justify-center'>
              {/* <DoughnutChart data={data} /> */}
            </div>
          </div>
        </Card>

        <Card>
          <div className='flex flex-row justify-between items-start'>
            <div>
              <p className='font-dmsans mb-2 font-medium text-4xl leading-14 tracking-tighter text-white'>
                Actual Profitability
              </p>
              <p className='font-dm-sans font-bold text-5xl text-neonGreen leading-56 tracking-tight shadow-text'>
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
                        <div className='font-dm-sans font-bold text-7 leading-56 flex items-center tracking-wide text-white'>
                          {row?.col2?.code ?? "-"}
                        </div>
                        <p className='font-medium text-5 leading-56 flex items-center text-orange-500'>
                          {row?.col2?.time ?? "-"}
                        </p>
                      </td>
                      <td className='px-6 py-4 '>
                        <div className='font-dm-sans font-bold text-7  text-white'>
                          {row?.col3 ?? "-"}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className='font-dm-sans font-bold text-7  text-white'>
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
              <p className='font-dmsans mb-2 font-medium text-4xl leading-14 tracking-tighter text-white'>
                NFT Collections
              </p>

              <div className='font-medium text-xs flex items-center tracking-wider text-white'>
                OWNED BY WALLET: 0x123Hdedhei00012htg...
              </div>
            </div>
            <div className='h-96 overflow-auto my-2'>
              <table className='w-full	'>
                <thead className='text-left text-gray-400 text-sm uppercase'>
                  <tr>
                    <th className='px-6 py-3 font-dm-sans font-bold text-xl text-white '>
                      COLLECTION
                    </th>
                    <th className='px-6 py-3 font-dm-sans font-bold text-xl text-white '>
                      FLOOR PRICE
                    </th>
                    <th className='px-6 py-3 font-dm-sans font-bold text-xl text-white '>
                      PROFIT
                    </th>
                    <th className='px-6 py-3 font-dm-sans font-bold text-xl text-white '>
                      MINTED
                    </th>
                    <th className='px-6 py-3 font-dm-sans font-bold text-xl text-white '>
                      TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {NFTRows?.length > 0 ? (
                    NFTRows?.map((row: any, index: number) => (
                      <tr
                        className={`w-full ${
                          index % 2 && "bg-fade "
                        }hover:rounded-lg h-24`}
                      >
                        <td className='px-6 py-4 flex flex-row items-center'>
                          <div className='font-dm-sans mr-6 font-bold text-3xl  text-white'>
                            {index + 1}
                          </div>

                          <img
                            src={row?.collection?.image}
                            className='w-16 h-16 mr-6 rounded-lg bg-center bg-cover'
                          />
                          <div className='font-dm-sans mr-2  font-bold text-3xl leading-56 flex items-center tracking-wide text-white'>
                            {row?.collection?.name ?? "-"}
                          </div>
                          {row?.collection?.verified && (
                            <img src='/tick.png' className='h-7 w-7' />
                          )}
                        </td>
                        <td className='px-6 py-4 '>
                          <div className='flex flex-col justify-end '>
                            <div className='font-dm-sans font-bold text-3xl leading-56 flex items-center tracking-wide text-white'>
                              {row?.floorPrice?.price ?? "-"}
                            </div>
                            <div
                              className={` ${
                                row?.floorPrice?.positive
                                  ? "text-neonGreen"
                                  : "text-red-600"
                              } font-dm-sans font-bold text-base self-end leading-56 flex items-center tracking-wide `}
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
                          <div className='font-dm-sans text-3xl font-bold text-7  text-white'>
                            {row?.profit ?? "-"}
                          </div>
                        </td>
                        <td className='px-6 py-4 text-3xl '>
                          <div className='font-dm-sans font-bold text-7  text-white'>
                            {row?.minted ?? "-"}
                          </div>
                        </td>
                        <td className='px-6 py-4 text-3xl'>
                          <div className='font-dm-sans font-bold text-7  text-white'>
                            {row?.total ?? "-"}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className='font-dm-sans font-bold text-7  text-white'>
                      No data found
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
