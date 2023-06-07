import { ETHUrl } from "@/constants/Url";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "./shared/Loader";
import { AppDispatch } from "./ReduxStore";
import {
  addEthAddress,
  addTransactions,
} from "./ReduxStore/EthTransaction/ethActions";
import {
  ADD_ETH_ADDRESS,
  ADD_TRANSACTION,
} from "./ReduxStore/EthTransaction/ethTypes";
import { addTotalBalance } from "./ReduxStore/TotalBalance/Actions";
import { ADD_TOTAL_BALANCE } from "./ReduxStore/TotalBalance/Types";
import { addNftTransactions } from "./ReduxStore/NftTranscation/Actions";
import { ADD_NFT_TRANSACTION } from "./ReduxStore/NftTranscation/Types";
import { addActualProfit } from "./ReduxStore/ActualProfit/Actions";
import { ADD_DATA } from "./ReduxStore/ActualProfit/Types";
import { addNftCollections } from "./ReduxStore/NftCollections/Actions";
import { ADD_COLLECTIONS } from "./ReduxStore/NftCollections/Types";
interface interfaceSearchBar {
  value: string;
  width?: string;
  handleChange: any;
}

const SearchBar = ({ handleChange, value, width }: interfaceSearchBar) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const generateAndNavigate = async () => {
    setLoading(true);
    if (value) {
      try {
        await fetchTransactions(value);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
        setLoading(false);
      }
    } else {
      toast.warning("Please enter ETH Address");
      setLoading(false);
    }
  };

  const fetchTransactions = async (ETHAddress: any) => {
    const url = ETHUrl(ETHAddress);
    const response = await fetch(url);
    const data = await response.json();
    if (data?.status === "1") {
      const sortedArray = data?.result?.sort(
        (a: any, b: any) => parseInt(b.timeStamp) - parseInt(a.timeStamp)
      );

      dispatch(addEthAddress(ETHAddress, ADD_ETH_ADDRESS));

      dispatch(addTransactions(sortedArray, ADD_TRANSACTION));
      await Promise.all([
        getTotalBalance(ETHAddress),
        getNftTransactions(ETHAddress),
        getActualProfit(),
        getNftCollections(ETHAddress),
      ]);
      setLoading(false);
      router.push(`/searchResult`);
    } else {
      setLoading(false);
      throw new Error("Invalid ETH Address");
    }
  };

  const getTotalBalance = async (value: string) => {
    const walletAddress = value;

    const response = await fetch(
      `/api/totalBalance?walletAddress=${walletAddress}`
    );
    if (response.status === 200) {
      const data = await response.json();
      dispatch(addTotalBalance(data, ADD_TOTAL_BALANCE));
    } else {
      const { error } = await response.json();
      throw new Error(error);
    }
  };

  const getNftTransactions = async (value: string) => {
    const walletAddress = value;
    const response = await fetch(
      `/api/nftTransactions?walletAddress=${walletAddress}`
    );
    if (response.status === 200) {
      const data = await response.json();
      dispatch(addNftTransactions(data, ADD_NFT_TRANSACTION));
    } else {
      const { error } = await response.json();
      throw new Error(error);
    }
  };

  const getNftCollections = async (value: string) => {
    const walletAddress = value;
    const response = await fetch(
      `/api/nftCollections?page=1&walletAddress=${walletAddress}`
    );
    if (response.status === 200) {
      const data = await response.json();
      dispatch(addNftCollections(data, ADD_COLLECTIONS));
    } else {
      const { error } = await response.json();
      throw new Error(error);
    }
  };

  const getActualProfit = async () => {
    const response = await fetch("/api/actualProfit?filter=3");
    if (response.status === 200) {
      const data = await response.json();
      dispatch(addActualProfit(data, ADD_DATA));
    } else {
      const { error } = await response.json();
      throw new Error(error);
    }
  };

  return (
    <div
      className={` flex flex-row items-center  ${
        width ? width : "sm:w-full md:w-3/4 lg:w-3/4 xl:w-3/4 2xl:w-1/2"
      } rounded-lg justify-between  border-2 border-gray-500 `}
    >
      <input
        value={value}
        className=' h-12 px-4 pr-12 grow bg-black ml-1 focus:outline-none text-white'
        type='text'
        placeholder='Type in ETH Address..'
        onChange={handleChange}
      />

      <button
        onClick={() => !loading && generateAndNavigate()}
        className='border-l-2 border-gray-500   w-28 mx-1 px-4 h-12  bg-black font-inter font-medium text-white text-base leading-6 flex items-center justify-center '
      >
        {loading ? (
          <Loader loading={loading} screenSize='h-full' />
        ) : (
          "Generate"
        )}
      </button>
    </div>
  );
};

export default SearchBar;
