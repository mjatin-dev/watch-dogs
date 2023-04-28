import Login from "@/components/Login";
import Nav from "@/components/Nav";
import SearchBar from "@/components/SearchBar";
import React, { useState } from "react";

function Dashboard() {
  const [ETHAddress, setETHAddress] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };

  const handleChange = (event: any) => {
    setETHAddress(event.target.value);
  };
  return (
    <div className='flex min-h-screen flex-col items-center bg-#0A0909'>
      <Nav handleOpen={handleOpen} />
      <Login handleClose={handleClose} show={show} />
      <div className='flex flex-col items-center my-20 '>
        <img
          src='/Watchdogs.png'
          alt='Watchdogs'
          className='w-auto lg:h-24 md:h-20 sm:h-16 mx-auto mb-4'
        />
        <div className='font-inter font-normal font-light text-2xl leading-10 flex items-center text-center text-white'>
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

export default Dashboard;