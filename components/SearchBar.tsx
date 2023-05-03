import Link from "next/link";
interface interfaceSearchBar {
  value: string;
  handleChange: any;
}

const SearchBar = ({ handleChange, value }: interfaceSearchBar) => {
  return (
    <div className=' flex flex-row items-center w-3/4 rounded-lg justify-between  border-2 border-gray-500 '>
      <input
        value={value}
        className=' h-12 px-4 pr-12 grow bg-black ml-1 focus:outline-none text-white'
        type='text'
        placeholder='Type in ETH Address..'
        onChange={handleChange}
      />
      <Link
        href='/searchResult/[ETHAddress]'
        as={`/searchResult/${
          value || "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
        }`}
        className='border-l-2 border-gray-500 px-4 h-12  font-inter font-medium text-white text-base leading-6 flex items-center justify-center '
      >
        Generate
      </Link>
    </div>
  );
};

export default SearchBar;
