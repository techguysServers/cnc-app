import { useState } from "react";
import Button from "./Button";

function Collapsable({ header, content, onClick }) {
  const [showContent, setShowContent] = useState(false);
  return (
    <div>
      <article className="border-b rounded-lg shadow-lg bg-gray-100">
        <div className="bg-grey-lightest border-indigo">
          <header
            onClick={() => setShowContent(!showContent)}
            className="flex justify-between items-center p-4 cursor-pointer select-none"
          >
            <span className="text-indigo font-thin text-xl">{header}</span>
            {showContent ? (
              <div
                onClick={() => setShowContent(!showContent)}
                className="rounded-full bg-red-400 border border border-indigo w-7 h-7 flex items-center justify-center bg-indigo"
              >
                <svg
                  aria-hidden="true"
                  data-reactid="281"
                  fill="none"
                  height="24"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </div>
            ) : (
              <div
                onClick={() => setShowContent(!showContent)}
                class="rounded-full border border-grey w-7 h-7 flex items-center justify-center"
              >
                <svg
                  aria-hidden="true"
                  class=""
                  data-reactid="266"
                  fill="none"
                  height="24"
                  stroke="#606F7B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            )}
          </header>
          {showContent && (
            <div>
              <div className="pb-5 text-grey-darkest">
                <ul className="pl-4 pr-4">
                  <div className="flex flex-col text-left">{content}</div>
                </ul>
              </div>
              <div className="pb-2 pl-4">
                <Button
                  onClick={onClick}
                  label="Supprimer"
                />
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default Collapsable;
