import React from "react";

const QuerySelect = ({ selectedOptions, setSelectedOptions, optionList }) => {
  const handleCheckboxChange = (event) => {
    const optionName = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedOptions((prevOptions) => [...prevOptions, optionName]);
    } else {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== optionName)
      );
    }
  };

  return (
    <div className="flex flex-col text-white">
      {optionList.map((option, index) => (
        <label className="p-2 bg-[#3e4d91]" key={index}>
          <input
            className="mr-2"
            type="checkbox"
            name={option.name}
            checked={selectedOptions.includes(option.name)}
            onChange={handleCheckboxChange}
          />
          {option.name}
        </label>
      ))}
    </div>
  );
};

export default QuerySelect;
