import Search from "../Search";
import { useState } from "react";

function SelectFancy({ data, placeholder, onChange, label, handleClick }) {
  const [isFocused, setIsFocused] = useState(false);

  const isClicked = (element) => {
      handleClick(element)
  }

  return (
    <div className="w-64">
      <div className="mt-1 relative">
        <label htmlFor="" className="text-gray-700">
          {label}
        </label>
        <Search
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isFocused && (
          <div className="absolute mt-1 w-full z-10 rounded-md bg-white shadow-lg">
            <ul
              tabindex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              {data.map((element) => (
                <li
                  key={element.name}
                  onMouseDown={() => isClicked(element)}
                  id="listbox-item-0"
                  role="option"
                  className="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9"
                >
                  <div className="flex items-center">
                    <img
                      src={element.image_link}
                      alt="person"
                      className="flex-shrink-0 h-6 w-6 rounded-full"
                    />
                    <span className="ml-3 block font-normal truncate">
                      {element.name}
                    </span>
                  </div>
                  {/* <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectFancy;
