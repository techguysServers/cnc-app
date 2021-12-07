function ButtonOutlined({ label, onClick }) {
  return (
    <button
      className="px-4 py-2 transition ease-in duration-200 rounded-lg hover:bg-red-500 hover:text-white border-2 border-red-500 focus:outline-none text-red-500"
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

export default ButtonOutlined;
