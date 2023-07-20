// import React, { useState } from "react";
// import "./formInput.css";
// import axios from 'axios';

// const input={

// }
// const FormInput = () => {
//   const [quote, setQuote] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState(0);
//   const [selectedYear, setSelectedYear] = useState(0);
//   const [latitudeValue, setLatitudeValue] = useState('');
//   const [longitudeValue, setLongitudeValue] = useState('');
//   const [inputs, setInputs] = useState(Array(22).fill(""));
//   const startYear = 1980;
//   const currentYear = new Date().getFullYear();
//   const yearOptions = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

//   const handleMonthChange = (event) => {
//     setSelectedMonth(Number(event.target.value));
//   };

//   const handleYearChange = (event) => {
//     setSelectedYear(Number(event.target.value));
  
//   };

//   const handleInputChange = (index, event) => {
//     const inputValue = event.target.value;
//     if (/^\d*$/.test(inputValue)) {
//       const newInputs = [...inputs];
//       newInputs[index] = inputValue;
//       setInputs(newInputs);
//     }

//   };

//   const inputNames = [
//     "latitude",
//     "longitude",
//     "P",
//     "T",
//     "Tmax",
//     "Tmin",
//     "PET",
//     "qm 2089/53 m3/s",
//     "SPI3",
//     "SPI6",
//     "SPI9",
//     "SPI12",
//     "SPI8",
//     "SP24",
//     "SP32",
//     "SPEI3",
//     "SPEI6",
//     "SPEI9",
//     "SPEI12",
//     "SPEI8",
//     "SPEI24",
//     "SPEI32",
//   ];
//   const handleFormSubmit =  () => {
//     console.log("heloooo")
//     axios.get('http://localhost:5000/api/submit')
//     .then(res => {
//       console.log(inputs.value)
     
//     }).catch(err =>{
//        console.log(err)
//     })
    
//   };
//   const handlePrediction = () => {
//     console.log(latitudeValue)
//     // Assuming you have the remaining input fields (latitude, longitude, etc.) stored in state as well
//     const input = {
//       latitude: latitudeValue,
//       longitude: longitudeValue,
//       annee: selectedYear,
//       mois: selectedMonth,

//       // Add other input fields here
//     };
//    fetch('/predict', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(input),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the prediction result
//         console.log('Prediction:', data.prediction);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   const renderInputs = () => {
//     return (
//       <>
//         <h1>Prediction</h1>
//           <div className="inputContainer">
//             <div className="selectField">
//               <label htmlFor="monthSelect">Month:</label>
//               <select
//                 id="monthSelect"
//                 value={selectedMonth}
//                 onChange={handleMonthChange}
//                 name="selectedMonth"
//               >
//                 <option value={0}>-- Select Month --</option>
//                 {Array.from({ length: 12 }, (_, index) => (
//                   <option key={index} value={index + 1}>
//                     {new Date(0, index).toLocaleString("default", {
//                       month: "long",
//                     })}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="selectField">
//               <label htmlFor="yearSelect">Year:</label>
//               <select
//                 id="yearSelect"
//                 value={selectedYear}
//                 onChange={handleYearChange}
//                 name="selectedYear"
//               >
//                 <option value={0}>-- Select Year --</option>
//                 {yearOptions.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {inputs.map((input, index) => (
//               <input
//                 key={index}
//                 value={input}
//                 onChange={(event) => handleInputChange(index, event)}
//                 className="inputField"
//                 type="number"
//                 name={inputNames[index]} // Add name attribute for each input
//                 placeholder={inputNames[index]}
//               />
//             ))}
//           </div>
//       <button onClick={handlePrediction}>Predict</button>
        
//         <h3>Resultat...</h3>
        
//       </>
//     );
//   };

//   return <div className="formInput">{renderInputs()}</div>;
// };

// export default FormInput;
import React, { useState } from 'react';
import axios from 'axios';

const FormInput = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [annee, setAnnee] = useState('');
  const [mois, setMois] = useState('');
  const [P, setP] = useState('');
  const [T, setT] = useState('');
  const [Tmax, setTmax] = useState('');
  const [Tmin, setTmin] = useState('');
  const [PET, setPET] = useState('');
  const [qm, setQm] = useState('');
  const [SPI3, setSPI3] = useState('');
  const [SPI6, setSPI6] = useState('');
  const [SPI9, setSPI9] = useState('');
  const [SPI12, setSPI12] = useState('');
  const [SPI8, setSPI8] = useState('');
  const [SP24, setSP24] = useState('');
  const [SP32, setSP32] = useState('');
  const [SPEI3, setSPEI3] = useState('');
  const [SPEI6, setSPEI6] = useState('');
  const [SPEI9, setSPEI9] = useState('');
  const [SPEI12, setSPEI12] = useState('');
  const [SPEI8, setSPEI8] = useState('');
  const [SPEI24, setSPEI24] = useState('');
  const [SPEI32, setSPEI32] = useState('');
  const [SDAT, setSDAT] = useState('');
  const [predictionResult, setPredictionResult] = useState('');

  const predict = () => {
    const data = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      annee: parseInt(annee),
      mois: parseInt(mois),
      P: parseFloat(P),
      T: parseFloat(T),
      Tmax: parseFloat(Tmax),
      Tmin: parseFloat(Tmin),
      PET: parseFloat(PET),
      qm: parseFloat(qm),
      SPI3: parseFloat(SPI3),
      SPI6: parseFloat(SPI6),
      SPI9: parseFloat(SPI9),
      SPI12: parseFloat(SPI12),
      SPI8: parseFloat(SPI8),
      SP24: parseFloat(SP24),
      SP32: parseFloat(SP32),
      SPEI3: parseFloat(SPEI3),
      SPEI6: parseFloat(SPEI6),
      SPEI9: parseFloat(SPEI9),
      SPEI12: parseFloat(SPEI12),
      SPEI8: parseFloat(SPEI8),
      SPEI24: parseFloat(SPEI24),
      SPEI32: parseFloat(SPEI32),
      SDAT: parseFloat(SDAT),
      // Include the rest of the parameters here
    };

    axios
      .post('http://localhost:5000/predict', data)
      .then(response => {
        setPredictionResult(response.data.prediction);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Model Predictions</h1>
      <form>
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="number"
          id="latitude"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="number"
          id="longitude"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="annee">Year:</label>
        <input
          type="number"
          id="annee"
          value={annee}
          onChange={e => setAnnee(e.target.value)}
          required
        />
        {/* Add the rest of the input fields here */}
        <br />
        <label htmlFor="mois">Mois:</label>
        <input
          type="number"
          id="mois"
          value={mois}
          onChange={e => setMois(e.target.value)}
          required
        />
        {/* Add the rest of the input fields here */}
        <br />
        <label htmlFor="P">P:</label>
        <input
          type="number"
          id="P"
          value={P}
          onChange={e => setP(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="T">T:</label>
        <input
          type="number"
          id="T"
          value={T}
          onChange={e => setT(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="Tmax">Tmax:</label>
        <input
          type="number"
          id="Tmax"
          value={Tmax}
          onChange={e => setTmax(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="Tmin">Tmin:</label>
        <input
          type="number"
          id="Tmin"
          value={ Tmin}
          onChange={e => setTmin(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="PET">PET:</label>
        <input
          type="number"
          id="PET"
          value={PET}
          onChange={e => setPET(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="qm">qm:</label>
        <input
          type="number"
          id="qm"
          value={qm}
          onChange={e => setQm(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="SPI3">SPI3:</label>
        <input
          type="number"
          id="SPI3"
          value={SPI3}
          onChange={e => setSPI3(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="SPI6">SPI6:</label>
        <input
          type="number"
          id="SPI6"
          value={SPI6}
          onChange={e => setSPI6(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="SPI9">SPI9:</label>
        <input
          type="number"
          id="SPI9"
          value={SPI9}
          onChange={e => setSPI9(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="SPI12">SPI12:</label>
        <input
          type="number"
          id="SPI12"
          value={SPI12}
          onChange={e => setSPI12(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="SPI8">SPI8:</label>
        <input
          type="number"
          id="SPI8"
          value={SPI8}
          onChange={e => setSPI8(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="SP24">SP24:</label>
        <input
          type="number"
          id="SP24"
          value={SP24}
          onChange={e => setSP24(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="SP32">SP32:</label>
        <input
          type="number"
          id="SP32"
          value={SP32}
          onChange={e => setSP32(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="SPEI3">SPEI3:</label>
        <input
          type="number"
          id="SPEI3"
          value={SPEI3}
          onChange={e => setSPEI3(e.target.value)}
          required
          step="any"
        />
        <label htmlFor="SPEI6">SPEI6:</label>
        <input
          type="number"
          id="SPEI6"
          value={SPEI6}
          onChange={e => setSPEI6(e.target.value)}
          required
          step="any"
        />
        <label htmlFor="SPEI9">SPEI9:</label>
        <input
          type="number"
          id="SPEI9"
          value={SPEI9}
          onChange={e => setSPEI9(e.target.value)}
          required
          step="any"
        />
        <label htmlFor="SPEI12">SPEI12:</label>
        <input
          type="number"
          id="SPEI12"
          value={SPEI12}
          onChange={e => setSPEI12(e.target.value)}
          required
          step="any"
        />
        <label htmlFor="SPEI8">SPEI8:</label>
        <input
          type="number"
          id="SPEI8"
          value={SPEI8}
          onChange={e => setSPEI8(e.target.value)}
          required
          step="any"
        />
        <br />
      
        <label htmlFor="SPEI24">SPEI24:</label>
        <input
          type="number"
          id="SPEI24"
          value={SPEI24}
          onChange={e => setSPEI24(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="SPEI32">SPEI32:</label>
        <input
          type="number"
          id="SPEI32"
          value={SPEI32}
          onChange={e => setSPEI32(e.target.value)}
          required
          step="any"
        />
        <br />
        <label htmlFor="SDAT">SDAT:</label>
        <input
          type="number"
          id="SDAT"
          value={SDAT}
          onChange={e => setSDAT(e.target.value)}
          required
          step="any"
        />
        <br />

        {/* Add more input fields for other parameters */}
        {/* Example for 'annee': */}
    
        <button type="button" onClick={predict}>
          Predict
        </button>
      </form>
      <div>
        {predictionResult !== '' && <p>Prediction: {predictionResult}</p>}
      </div>
    </div>
  );
};

export default FormInput;
