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
interface interfaceSearchBar {
  value: string;
  handleChange: any;
}

const SearchBar = ({ handleChange, value }: interfaceSearchBar) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const fetchTransactions = async (ETHAddress: string) => {
    setLoading(true);
    const url = ETHUrl(ETHAddress);
    const response = await fetch(url);
    const data = await response.json();
    if (data?.status === "1") {
      router.push(`/searchResult`);
      dispatch(addEthAddress(ETHAddress, ADD_ETH_ADDRESS));
      dispatch(addTransactions(data?.result, ADD_TRANSACTION));
    } else {
      toast.error(data?.result || "Invalid ETH Address");
    }
    setLoading(false);
  };
  return (
    <div className=' flex flex-row items-center w-3/4 rounded-lg justify-between  border-2 border-gray-500 '>
      <Loader loading={loading} />
      <input
        value={value}
        className=' h-12 px-4 pr-12 grow bg-black ml-1 focus:outline-none text-white'
        type='text'
        placeholder='Type in ETH Address..'
        onChange={handleChange}
      />
      <button
        onClick={() => fetchTransactions(value)}
        className='border-l-2 border-gray-500 px-4 h-12  font-inter font-medium text-white text-base leading-6 flex items-center justify-center '
      >
        Generate
      </button>
    </div>
  );
};

export default SearchBar;
