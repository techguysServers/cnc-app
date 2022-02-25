function Select({ options, label, value, onChange }) {
  return (
    <label className="text-gray-700 text-left" for="animals">
      {label}
      <select
        value={value}
        onChange={onChange}
        id="animals"
        className="block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        name="animals"
      >
        <option selected value="" disabled>-- Choisir --</option>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

export default Select;
