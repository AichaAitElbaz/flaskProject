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
  const [selectedQmMonth, setSelectedQmMonth] = useState(0);
  const [selectedQmYear, setSelectedQmYear] = useState(0);
  const [inputs, setInputs] = useState(Array(21).fill(""));
  const [qmInputs, setqmInputs] = useState(Array(23).fill(""));

  const [predictedClass, setPredictedClass] = useState("");
  const [predictedQm, setPredictedQm] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
  };
  const handleQmMonthChange = (event) => {
    setSelectedQmMonth(Number(event.target.value));
  };
  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };
  const handleQmYearChange = (event) => {
    setSelectedQmYear(Number(event.target.value));
  };
  const handleInputChange = (index, event) => {
    const inputValue = event.target.value;
    if (/^-?\d*\.?\d*$/.test(inputValue)) {
      const newInputs = [...inputs];
      newInputs[index] = inputValue;
      setInputs(newInputs);
    
    }
  };
  const handleQmInputChange = (index, event) => {
    const inputValue = event.target.value;
    if (/^-?\d*\.?\d*$/.test(inputValue)) {
      const newInputs = [...qmInputs];
      newInputs[index] = inputValue;
      setqmInputs(newInputs);
    
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


  const qm_inputNames = [
    "latitude",
    "longitude",
    "P",
    "T",
    "Tmax",
    "Tmin",
    "PET",
    "P766i",
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
    "P766_SDAT",
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
   qm: predictedQm,
    SPI3: parseFloat(inputs[7]),
    SPI6: parseFloat(inputs[8]),
    SPI9: parseFloat(inputs[9]),
    SPI12: parseFloat(inputs[10]),
    SPI8: parseFloat(inputs[11]),
    SP24: parseFloat(inputs[12]),
    SP32: parseFloat(inputs[13]),
    SPEI3: parseFloat(inputs[14]),
    SPEI6: parseFloat(inputs[15]),
    SPEI9: parseFloat(inputs[16]),
    SPEI12: parseFloat(inputs[17]),
    SPEI8: parseFloat(inputs[18]),
    SPEI24: parseFloat(inputs[19]),
    SPEI32: parseFloat(inputs[20]),
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


const handleQmPredict = () => {
  const data = {

    latitude: parseFloat(qmInputs[0]),
    longitude: parseFloat(qmInputs[1]),
    P: parseFloat(qmInputs[2]),
    T: parseFloat(qmInputs[3]),
    Tmax: parseFloat(qmInputs[4]),
    Tmin: parseFloat(qmInputs[5]),
    PET: parseFloat(qmInputs[6]),
    P766i: parseFloat(qmInputs[7]),
    SPI3: parseFloat(qmInputs[8]),
    SPI6: parseFloat(qmInputs[9]),
    SPI9: parseFloat(qmInputs[10]),
    SPI12: parseFloat(qmInputs[11]),
    SPI8: parseFloat(qmInputs[12]),
    SP24: parseFloat(qmInputs[13]),
    SP32: parseFloat(qmInputs[14]),
    SPEI3: parseFloat(qmInputs[15]),
    SPEI6: parseFloat(qmInputs[16]),
    SPEI9: parseFloat(qmInputs[17]),
    SPEI12: parseFloat(qmInputs[18]),
    SPEI8: parseFloat(qmInputs[19]),
    SPEI24: parseFloat(qmInputs[20]),
    SPEI32: parseFloat(qmInputs[21]),
    P766_SDAT:parseFloat(qmInputs[22]),
    annee: parseFloat(selectedQmYear),
    mois: parseFloat(selectedQmMonth),
  };

  axios
    .post("http://localhost:3000/qm", data)
    .then((response) => {
      console.log(response)
      const predictedQm = response.data;
      setPredictedQm(predictedQm)
    })
    .catch((error) => {
      console.error(error);
      // Handle error cases
    });
};


  const renderInputs = () => {
    return (
      <>
      <div className="resultContainer">

<div className="inputContainer">

  <div className="selectField">
    
    <select
      id="monthSelect"
      value={selectedQmMonth}
      onChange={handleQmMonthChange}
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
      value={selectedQmYear}
      onChange={handleQmYearChange}
    >
      <option value={0}>Année</option>
      {yearOptions.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>

  {qmInputs.map((input, index) => (
    <input
      key={index}
      value={input}
      onChange={(event) => handleQmInputChange(index, event)}
      className="inputField"
      type="number"
      placeholder={qm_inputNames[index]}
    />
  ))}
</div>
<br/>

<div className="resultRow">

<button type="button" id="btn" onClick={handleQmPredict}>Predict</button>
 <h3 id="result">Resultat: {predictedQm}</h3> {/* Display the predicted class */}
</div>
</div>

        {/* <h3><u>Faites une Prédiction - Type de Puits</u></h3> */}
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