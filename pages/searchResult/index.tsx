import Nav from "@/components/Nav";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";

function SearchResult() {
  const [ETHAddress, setETHAddress] = useState("");

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
    </div>
  );
}

export default SearchResult;
