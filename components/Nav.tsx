import { useRouter } from "next/router";
import Link from "next/link";
import Login from "./Login";
import { useEffect, useState } from "react";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [background, setBackground] = useState<string>("");
  const router = useRouter();
  const pathname = router.pathname;
  useEffect(() => {
    if (pathname === "/about") {
      setBackground(`bg-black h-20 w-full`);
    } else {
      setBackground(
        `bg-gradient-to-bl from-yellow-400 via-purple-800 to-black h-20 w-full`
      );
    }
  }, [pathname]);

  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };

  const handleClick = (path: string) => {
    router.push(path);
  };
  return (
    <div className='fixed w-full z-30 '>
      <header className={background}>
        <nav
          className='mx-1 flex items-center justify-between px-6 py-3 lg:px-8 h-full'
          aria-label='Global'
        >
          <div className='flex items-center space-x-20 '>
            <div className='cursor-pointer  ' onClick={() => handleClick("/")}>
              <img src='/logo.png' alt='Logo' className='w-55 h-61' />
            </div>
            <div className='flex items-center space-x-14'>
              <Link
                href='/'
                className='font-inter font-medium text-base leading-5 flex items-center text-white'
              >
                Search
              </Link>
              <Link
                href='/about'
                className='font-inter font-medium text-base leading-5 flex items-center text-white'
              >
                What is WatchDogs?
              </Link>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='relative group'>
              <Link href='#' className='text-white hover:text-gray-300'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <circle
                    cx='10'
                    cy='10'
                    r='1.5'
                    className='group-hover:text-gray-300'
                  />
                  <circle
                    cx='3'
                    cy='10'
                    r='1.5'
                    className='group-hover:text-gray-300'
                  />
                  <circle
                    cx='17'
                    cy='10'
                    r='1.5'
                    className='group-hover:text-gray-300'
                  />
                </svg>
              </Link>
            </div>
            {/* Account Link */}
            <div onClick={handleOpen} className='cursor-pointer  '>
              <img
                src='/avatar.png'
                alt='Avatar'
                className='inline-block h-12 w-12 rounded-full '
              />
            </div>
          </div>
        </nav>
      </header>
      <Login handleClose={handleClose} show={show} />
    </div>
  );
}
