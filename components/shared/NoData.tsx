import React from "react";

function NoData() {
  return (
    <div className='grid place-items-center h-full'>
      <div className='font-bold text-4xl leading-tight text-noData text-shadow-lg flex items-center tracking-tight'>
        No data yet...
      </div>
      <p className='font-bold text-lg whitespace-normal mx-14 text-center leading-9 text-white flex items-center justify-center tracking-tight'>
        This wallet has not bought or sold any NFTs yet. Try another wallet
        address!
      </p>
    </div>
  );
}

export default NoData;
