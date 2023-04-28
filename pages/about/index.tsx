import Nav from "@/components/Nav";
import React from "react";

function About() {
  return (
    <div className=' fixed inset-0  bg-gradient-to-tr from-yellow-400 via-purple-800 to-black h-screen '>
      <Nav bgColor='black' />
      <div className='w-full h-full  overflow-y-scroll'>
        <div className='flex flex-col items-center w-full h-auto mb-40'>
          <div className='w-658.31 h-146 flex items-center justify-center my-10 '>
            <h1 className='font-inter font-medium md:text-5xl text-3xl leading-10 text-white'>
              What is WatchDogs?
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
