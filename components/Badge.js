function Badge({label, onCancel}) {
  return (
    <span className="px-2 py-1 mx-2 text-sm rounded-full text-white  bg-gray-400 ">
      {label}
      <button onClick={onCancel} className="bg-transparent hover">
        <svg
          width="12"
          height="12"
          fill="currentColor"
          className="ml-2"
          viewBox="0 0 1792 1792"
        >
          <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
        </svg>
      </button>
    </span>
  );
}

export default Badge