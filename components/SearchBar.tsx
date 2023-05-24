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
  handleChange: any;
}

const SearchBar = ({ handleChange, value }: interfaceSearchBar) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const generateAndNavigate = async () => {
    setLoading(true);
    if (value) {
      try {
        getTotalBalance(value);
        getNftTransactions();
        getActualProfit();
        getNftCollections(value);
        fetchTransactions(value);
        setLoading(false);
        router.push(`/searchResult`);
      } catch (error: any) {
        toast.error(error || "Something went wrong");
        setLoading(false);
      }
    } else {
      toast.warning("Please enter ETH Address");
      setLoading(false);
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
  const getNftTransactions = async () => {
    const response = await fetch(`/api/nftTransactions`);
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

  const fetchTransactions = async (ETHAddress: string) => {
    const url = ETHUrl(ETHAddress);
    const response = await fetch(url);
    const data = await response.json();
    if (data?.status === "1") {
      dispatch(addEthAddress(ETHAddress, ADD_ETH_ADDRESS));
      dispatch(addTransactions(data?.result, ADD_TRANSACTION));
    } else {
      throw new Error(data?.result);
    }
  };
  return (
    <div className=' flex flex-row items-center w-3/4 rounded-lg justify-between  border-2 border-gray-500 '>
      <input
        value={value}
        className=' h-12 px-4 pr-12 grow bg-black ml-1 focus:outline-none text-white'
        type='text'
        placeholder='Type in ETH Address..'
        onChange={handleChange}
      />

      <button
        onClick={() => !loading && generateAndNavigate()}
        className='border-l-2 border-gray-500  w-28 px-4 h-12  font-inter font-medium text-white text-base leading-6 flex items-center justify-center '
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
