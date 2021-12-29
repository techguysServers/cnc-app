import Button from "./Button";
import Search from "./Search";

function HeaderRound({ userButton }) {
  return (
    <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-40">
      <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="container relative left-0 z-50 flex w-3/4 h-auto h-full">
            <Search />
          </div>
          <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
            {userButton}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderRound;
