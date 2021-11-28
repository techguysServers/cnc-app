function BlocList({ data }) {
  // Change the style of the row for even and odd index
  const setStyle = (index) => {
    if (index % 2 == 0) {
      return "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6";
    } else {
      return "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6";
    }
  };

  return (
    <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200">
        <dl>
          {data.map((row, index) => (
            <div className={setStyle(index)}>
              <dt className="text-sm font-medium text-gray-500">{row.metakey}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {row.metavalue}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default BlocList;
