// App.jsx
import React, { useState } from "react";
import axios from "axios";
import "./formInput.css";

const FormInput = () => {
  const startYear = 1980;
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [inputs, setInputs] = useState(Array(22).fill(""));
  const [predictedClass, setPredictedClass] = useState("");
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
    "qm",
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

 const handlePredict = () => {
  const data = {
    latitude: parseFloat(inputs[0]),
    longitude: parseFloat(inputs[1]),
    P: parseFloat(inputs[2]),
    T: parseFloat(inputs[3]),
    Tmax: parseFloat(inputs[4]),
    Tmin: parseFloat(inputs[5]),
    PET: parseFloat(inputs[6]),
    qm: parseFloat(inputs[7]),
    SPI3: parseFloat(inputs[8]),
    SPI6: parseFloat(inputs[9]),
    SPI9: parseFloat(inputs[10]),
    SPI12: parseFloat(inputs[11]),
    SPI8: parseFloat(inputs[12]),
    SP24: parseFloat(inputs[13]),
    SP32: parseFloat(inputs[14]),
    SPEI3: parseFloat(inputs[15]),
    SPEI6: parseFloat(inputs[16]),
    SPEI9: parseFloat(inputs[17]),
    SPEI12: parseFloat(inputs[18]),
    SPEI8: parseFloat(inputs[19]),
    SPEI24: parseFloat(inputs[20]),
    SPEI32: parseFloat(inputs[21]),
    annee: parseFloat(selectedYear),
    mois: parseFloat(selectedMonth),
  };

  axios
    .post("http://localhost:3000/predict", data)
    .then((response) => {
      const predictedClass = response.data.predicted_class;
      setPredictedClass(predictedClass);
    })
    .catch((error) => {
      console.error(error);
      // Handle error cases
    });
};

  

  const renderInputs = () => {
    return (
      <>

        <h3><u>Faites une Prédiction - Type de Puits</u></h3>
        <br/>
        <div className="resultContainer">

        <div className="inputContainer">

          <div className="selectField">
            
            <select
              id="monthSelect"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value={0}>Mois</option>
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
            <select
              id="yearSelect"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value={0}>Année</option>
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
              placeholder={inputNames[index]}
            />
          ))}
        </div>
        <br/>
        
        <div className="resultRow">

        <button type="button" id="btn" onClick={handlePredict}>Predict</button>
         <h3 id="result">Resultat: {predictedClass}</h3> {/* Display the predicted class */}
  </div>
</div>
       </>
    );
  };

  return <div className="formInput">{renderInputs()}</div>;
};

export default FormInput;