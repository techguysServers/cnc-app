function Badge({label}) {
  return (
    <span className="px-4 py-2  text-base rounded-full text-white  bg-indigo-500 ">
      {label}
      <button className="bg-transparent hover">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          className="ml-4"
          viewBox="0 0 1792 1792"
        >
          <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
        </svg>
      </button>
    </span>
  );
}

export default Badge