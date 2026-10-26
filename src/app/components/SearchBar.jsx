
import { LuSearch } from "react-icons/lu";

const SearchBar = ({ search = "" }) => {
  return (
    <form
      action="/"
      method="GET"
      className="flex w-full gap-4 p-4"
    >
      {/* Coral cirkel bag søgeikonet */}
      <button
        type="submit"
        aria-label="Søg efter hunderace"
        className="flex h-15 w-15 shrink-0 items-center justify-center rounded-full bg-coral"
      >
        <LuSearch
          size={30}
          className="scale-x-[-1] text-white"
        />
      </button>

      <input
        type="search"
        name="search"
        defaultValue={search}
        placeholder="Search Breeds"
        className="w-full rounded-full border-2 border-gray-500 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
      />
    </form>
  );
};

export default SearchBar;
