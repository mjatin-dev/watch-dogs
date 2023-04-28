import React, { useState } from "react";
import Modal from "../Modal";
interface InterfaceLogin {
  handleClose: () => void;
  show: boolean;
}
function Login({ handleClose, show }: InterfaceLogin) {
  const [email, setEmail] = useState<string>("");
  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };
  return (
    <div>
      <Modal handleClose={handleClose} show={show}>
        <div className='bg-white rounded-3xl shadow-md overflow-hidden'>
          <img
            src='/DALL·E.png'
            alt='Card Image'
            className=' h-56 rounded-3xl w-full object-center object-cover'
          />

          <div className='p-4 flex flex-col items-center '>
            <div className='font-inter font-medium mb-6 text-2xl leading-7 text-center text-gray-700'>
              Get a full breakdown of the top weekly NFT trades every Sunday!
            </div>

            <input
              type='text'
              value={email}
              onChange={handleChange}
              placeholder='Enter your email..'
              className='w-80 h-14 p-3 focus:outline-none text-black flex items-center mb-3 bg-white border border-gray-400 rounded-lg'
            />

            <div className='w-80 h-14 bg-gradient-to-l mb-6 from-purple-900 flex justify-center items-center via-pink-600 to-yellow-500 cursor-pointer bg-blend-darken rounded-md'>
              <p className='font-medium text-white text-sm leading-5 mx-auto'>
                Continue
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Login;
