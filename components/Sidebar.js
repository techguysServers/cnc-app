function Sidebar() {
  return (
    <div className="w-64 absolute sm:relative shadow md:h-full flex-col justify-between hidden sm:flex">
      <div className="relative bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="w-72 h-screen">
            <nav className="mt-10 px-6 ">
              <a
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                href="/"
              >
                <span className="mx-4 text-lg font-normal">Mes équipements</span>
                <span className="flex-grow text-right"></span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar