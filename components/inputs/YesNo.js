function YesNo({ label, onChange, name }) {
  return (
    <div className=" relative ">
      <label for="name-with-label" class="text-gray-700">
        {label}
      </label>
      <div class="flex items-center gap-8">
        <label class="inline-flex items-center">
          <input
            onChange={onChange}
            type="radio"
            name={name}
            class="h-5 w-5 text-red-600"
            value="yes"
          />
          <span class="ml-2 text-gray-700">Yes</span>
        </label>
        <label class="inline-flex items-center">
          <input
            onChange={onChange}
            type="radio"
            name={name}
            class="h-5 w-5 text-red-600"
            value="no"
          />
          <span class="ml-2 text-gray-700">No</span>
        </label>
      </div>
    </div>
  );
}

export default YesNo;
