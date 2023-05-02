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
          <div className=' bg-black rounded-lg p-12 w-3/5 h-4/5  rounded-40'>
            <h2 className='text-white text-lg font-bold mb-4 font-inter font-medium leading-7 tracking-tighter text-white'>
              Transparency..
            </h2>
            <div className='font-inter text-md leading-8 font-medium tracking-tighter text-white'>
              DALL·E is an AI system developed by OpenAI that can create
              original, realistic images and art from a short text description.
              It can make realistic and context-aware edits, including
              inserting, removing, or retouching specific sections of an image
              from a natural language description. It can also take an image and
              make novel and creative variations of it inspired by the original.{" "}
              <br />
              How DALL·E Works
              <ul className='list-disc list-inside'>
                <li>
                  DALL·E was trained by learning the relationship between images
                  and the text used to describe them.
                </li>
                <li>
                  It uses a process called diffusion, which starts with a
                  pattern of random dots and gradually alters that pattern
                  towards a final output.
                </li>
              </ul>
              <br /> DALL·E Credits
              <ul className='list-disc list-inside'>
                <li>
                  A credit can be used for one DALL·E request: generating images
                  through a text prompt, an edit request, or a variation
                  request.
                </li>
                <li>
                  You get 50 free credits your first month, and 15 free credits
                  will refill every month after that. Free credits don’t roll
                  over, so they’ll expire a month after they were granted.
                </li>
                <li>
                  You can purchase additional credits through your account page.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
