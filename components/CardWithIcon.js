function CardWithIcon({ title, tags }) {
  return (
    <div className="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
      {/* <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-red-500 left-4 -top-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div> */}
      <div className="mt-8">
        <p className="text-xl font-semibold my-2">{title}</p>
        <div className="flex space-x-2 text-gray-400 text-sm my-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p>Dernière inspections :</p>
        </div>
        <div className="border-t-2"></div>

        <div className="flex flex-wrap justify-starts items-center mt-4">
          <div className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-red-100 rounded-2xl">
            #Car
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardWithIcon;
