import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import * as XLSX from 'xlsx';
import axios from 'axios'; // Import axios for HTTP requests

import './graphs.css'; // Import the CSS file
  
function Linechart() {
 
  const [predictionValues, setPredictionValues] = useState([]);

  const startYear = 1980;
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );
   
  const [selectedYear, setSelectedYear] = useState(0);
  const handleYearChange = (event) => {
    setUserYear(event.target.value);
  };

  // Uncomment and declare the product state
  const [product, setProduct] = useState([
    {
      name: "Tmax",
      data: [],
    },
    {
      name: "Tmin",
      data: [],
    },
        
 
  ]);

  const [option, setOption] = useState({
    title: { text: "Temperature of years" },
    xaxis: {
      title: { text: "Months" },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      title: { text: "Temperature" },
    },
  });

  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // onchange event
  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
    let selectedFile = e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileTypes.includes(selectedFile.type)){
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFile(e.target.result);
        }
      }
      else{
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('Please select your file');
    }
  };
  const series = [{
    name: "Prediction Value",
    data: predictionValues,
  }];
  // submit event
  const handleFileSubmit = (e) => {
    
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type: 'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
   // Convert the "Month" column values to Date objects
   data.forEach((item) => {
    const year = parseInt(item.annee, 10);
    const month = parseInt(item.mois, 10);
    item.Month = new Date(year, month - 1, 1);
   
  });

  // Sort the data based on the "Month" column
  data.sort((a, b) => a.Month - b.Month);
  
      setExcelData(data);
           // Request prediction for the filteredData
     // Loop through each row of data and make individual predictions
     data.forEach((rowData) => {
      const payload = {
        latitude:rowData.latitude,
        longitude: rowData.longitude,
        annee: rowData.annee,
        mois: rowData.mois,
        P: rowData.P,
        T: rowData.T,
        Tmax: rowData.Tmax,
        Tmin: rowData.Tmin,
        PET: rowData.PET,
        qm:rowData.qm,
        SPI3:rowData.SPI3,
        SPI6:rowData.SPI6,
        SPI9:rowData.SPI9,
        SPI12:rowData.SPI12,
        SPI8:rowData.SPI8,
        SP24:rowData.SP24,
        SP32:rowData.SP32,
        SPEI3:rowData.SPEI3,
        SPEI6:rowData.SPEI6,
        SPEI9:rowData.SPEI9,
        SPEI12:rowData.SPEI12,
        SPEI8:rowData.SPEI8,
        SPEI24:rowData.SPEI24,
        SPEI32:rowData.SPEI32,
        SDAT:rowData.SDAT,       
      };
      // Send the POST request to the server for prediction
      axios
      .post('http://localhost:3000/regr', payload)
      .then((response) => {
        const prediction_value = response.data;
        console.log("prediction_value",prediction_value);

        if (rowData.annee === Number(userYear)) {
          setPredictionValues((prevValues) => [...prevValues, prediction_value]);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error cases
      });
    });
  }
    };

  const [userYear, setUserYear] = useState('');

  // Use useEffect to update the product state when excelData changes
  useEffect(() => {
    // Filter the excelData based on the selected year

    // Extract Tmax and Tmin data from filtered data
    const tmaxData = filteredData.map(item => item.Tmax);
    const tminData = filteredData.map(item => item.Tmin);
    
    // Update the product state with filtered Tmax and Tmin data
    setProduct([
      {
        name: "Tmax",
        data: tmaxData,
      },
      {
        name: "Tmin",
        data: tminData,
      },
    ]);
  }, [excelData, userYear]);
  const filteredData = excelData ? excelData.filter((item) => item.annee === Number(userYear)) : [];
    // Sort the filteredData based on the "Month" column
    filteredData.sort((a, b) => a.Month - b.Month);
  const option2 = {
    title: { text: "Prediction Values" },
    xaxis: {
      title: { text: "Months" },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      title: { text: "Prediction Value" },
    },
  };


  return (
    <div className="wrapper">

    <h3>Upload & View Excel Sheets</h3>

    <form className="form-group custom-form" onSubmit={handleFileSubmit}>
      <input type="file" className="form-control" required onChange={handleFile} />
      <div className="form-group">
        <label>Enter the year:</label>
        <input
          type="number"
          className="form-control"
          value={userYear}
          onChange={handleYearChange}
        />
      </div>
      <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
      {typeError&&(
        <div className="alert alert-danger" role="alert">{typeError}</div>
      )}
    </form>


      <Chart
        type="line"
        width={400}
        height={300}
        series={product}
        options={option}
      />
       <Chart
      type="line"
      width={400}
      height={300}
      series={series}
      options={option2}
    />
  
    </div>
  );
}

export default Linechart;
