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
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClose = () => {
    setShow(false);
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
              <img src='/logo.png' alt='Logo' className='w-auto h-12' />
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
        </nav>
      </header>
      <Login handleClose={handleClose} show={show} />
    </div>
  );
}
