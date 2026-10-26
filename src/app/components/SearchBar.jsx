
import { LuSearch } from "react-icons/lu";

const SearchBar = ({ query = "" }) => {
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
  name="query"
  defaultValue={query}
  placeholder="Search Breeds"
/>
    </form>
  );
};

export default SearchBar;
