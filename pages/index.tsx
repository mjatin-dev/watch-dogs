import SearchBar from "@/components/SearchBar";
import React, { useState } from "react";
function Home() {
  const [ETHAddress, setETHAddress] = useState<string>("");
  const handleChange = (event: any) => {
    setETHAddress(event.target.value);
  };

  return (
    <div className='flex min-h-full flex-1 flex-col items-center bg-black'>
      <div className='flex flex-col items-center mb-20 mt-40 '>
        <img
          src='/Watchdogs.png'
          alt='Watchdogs'
          className='w-auto lg:h-24 md:h-20 sm:h-16 mx-auto mb-4'
        />
        <div className='font-inter font-light text-2xl leading-10 flex items-center text-center text-white'>
          We know what you do in the dark..
        </div>
      </div>
      <div className='relative flex flex-col items-center w-full h-72'>
        <div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 justify-self-center h-72 inset-0 bg-cover bg-center'
          style={{ backgroundImage: "url('/homeBG.png')" }}
        />
        <div className='absolute w-full top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center'>
          <SearchBar value={ETHAddress} handleChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default Home;
