function TextArea({onChange, label, value}) {
  return (
    <div>
      <label className="text-gray-700" for="name">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        id="comment"
        placeholder="Enter your comment"
        name="comment"
        rows="5 "
        cols="40"
      ></textarea>
    </div>
  );
}

export default TextArea;
