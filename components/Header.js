import MainHeading from "./headings/MainHeading";

function Header({ userButton, heading }) {
  return (
    <div>
      <nav class="bg-white dark:bg-gray-800 shadow-lg border-b-2">
        <div class="max-w-7xl mx-auto px-8">
          <div class="flex items-center h-[7vh] w-full">
            <div class="w-1/2">
              <MainHeading text={heading}/>
            </div>
            <div class="ml-4 flex w-1/2 justify-end md:ml-6">
              <div class="ml-3 relative">
                <div class="relative inline-block text-left">
                  <div>{userButton}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
