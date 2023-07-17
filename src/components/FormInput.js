import React, { useState } from "react";
import "./formInput.css";

const FormInput = () => {
  const startYear = 1980;
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [inputs, setInputs] = useState(Array(22).fill(""));

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleInputChange = (index, event) => {
    const inputValue = event.target.value;
    if (/^-?\d*\.?\d*$/.test(inputValue)) {
      const newInputs = [...inputs];
      newInputs[index] = inputValue;
      setInputs(newInputs);
    }
  };

  const inputNames = [
    "latitude",
    "longitude",
    "P",
    "T",
    "Tmax",
    "Tmin",
    "PET",
    "qm 2089/53 m3/s",
    "SPI3",
    "SPI6",
    "SPI9",
    "SPI12",
    "SPI8",
    "SP24",
    "SP32",
    "SPEI3",
    "SPEI6",
    "SPEI9",
    "SPEI12",
    "SPEI8",
    "SPEI24",
    "SPEI32",
  ];

  const renderInputs = () => {
    
    return (
          <>
           <h1>Prediction</h1>
            <div className="inputContainer">
        <div className="selectField">
          <label htmlFor="monthSelect">Month:</label>
          <select
            id="monthSelect"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value={0}>-- Select Month --</option>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index} value={index + 1}>
                {new Date(0, index).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>

        <div className="selectField">
  <label htmlFor="yearSelect">Year:</label>
  <select
    id="yearSelect"
    value={selectedYear}
    onChange={handleYearChange}
  >
    <option value={0}>-- Select Year --</option>
    {yearOptions.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </select>
</div>


        {inputs.map((input, index) => (
          <input
            key={index}
            value={input}
            onChange={(event) => handleInputChange(index, event)}
            className="inputField"
            type="number"
            placeholder={inputNames[index]} />
        ))}
      </div></>
      
    );
    
  };

  return <div className="formInput">{renderInputs()}
  <button>Predict</button>

<h3>Resultat...</h3>

  </div>;
 
};

export default FormInput;
