import { getUsersByQuery } from "../../../api/serveses/search/search";
import { useState } from "react";
import { OneUser } from "../../../types/user/user";
import SearchModalItem from "./SearchModalItem";
import CircleLoader from "../../common/loaders/circleLoader/CircleLoader";

interface Props {
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<null | boolean>>;
  isSearchModalOpen: boolean;
}

const SearchModal = ({ setIsSearchModalOpen, isSearchModalOpen }: Props) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<OneUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsLoading(true);
    try {
      const data = await getUsersByQuery(query);
      setUsers(data);
    } catch (error) {
      console.error(error);
      setQuery("");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(users);
  const handleHideSearchModal = () => {
    setIsSearchModalOpen(false);
    setUsers([]);
  };

  return (
    <div
      className={`absolute bottom-0 left-[69px] right-0 top-0 h-full ${
        isSearchModalOpen ? "animate-showRight" : ""
      } `}
      onClick={handleHideSearchModal}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="fixed top-0 z-30 h-screen w-96 rounded-r-2xl bg-white shadow-right"
      >
        <div className="flex-column h-32 w-full border-b border-gray-base px-5">
          <div className="my-2 w-full">
            <h2 className="mb-8 mt-6 text-2xl font-medium">Search</h2>

            <form onSubmit={handleSearch}>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full rounded-lg border-gray-base bg-gray-100 px-3 py-2 outline-none placeholder:font-thin"
                type="text"
                placeholder="Search"
                onSubmit={handleSearch}
              />
            </form>
          </div>
        </div>
        <div className="my-2 w-full overflow-y-auto px-6">
          <h4 className="font-medium">Resent</h4>
          {users === null ? (
            <p></p>
          ) : isLoading && users.length === 0 ? (
            <div className="mt-32 flex h-full justify-center">
              <CircleLoader />
            </div>
          ) : users.length === 0 ? (
            <p className="mt-36 flex h-full justify-center text-sm text-gray-500">
              No users found.
            </p>
          ) : (
            users.map(user => (
              <SearchModalItem
                handleHideSearchModal={handleHideSearchModal}
                user={user}
                key={user._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
{
  /* <CircleLoader2 /> */
}
