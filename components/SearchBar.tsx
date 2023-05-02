import { useRouter } from "next/router";
interface interfaceSearchBar {
  value: string;
  handleChange: any;
}

const SearchBar = ({ handleChange, value }: interfaceSearchBar) => {
  const router = useRouter();
  return (
    <div className=' flex flex-row items-center w-3/4 rounded-lg justify-between  border-2 border-gray-500 '>
      <input
        value={value}
        className=' h-12 px-4 pr-12 grow bg-black ml-1 focus:outline-none text-white focus:outline-none '
        type='text'
        placeholder='Type in ETH Address..'
        onChange={handleChange}
      />
      <button
        onClick={() => router.push("/searchResult")}
        className='border-l-2 border-gray-500 px-4 h-12  font-inter font-medium text-white text-base leading-6 flex items-center justify-center '
      >
        Generate
      </button>
    </div>
  );
};

export default SearchBar;
