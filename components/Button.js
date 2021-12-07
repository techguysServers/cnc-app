function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="py-2 px-4  bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
    >
      {label}
    </button>
  );
}

export default Button
