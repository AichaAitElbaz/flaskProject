import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import * as XLSX from 'xlsx';
import axios from 'axios'; // Import axios for HTTP requests

import './graphs.css'; // Import the CSS file
  
function Linechart() {
  // Add a new state to store the predicted classes
  const [predictedClasses, setPredictedClasses] = useState([]);
    // Function to send data to the server for prediction
    const predictData = async () => {
      try {
        const response = await axios.post('/predict', filteredData);
        const predictedClasses = response.data.predicted_class;
        setPredictedClasses(predictedClasses);
      } catch (error) {
        console.error('Prediction failed:', error);
      }
    };

    const series = [
    
      {
        name: 'Predicted',
        data: predictedClasses, // Use the predictedClasses state
      },
    ];
  
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
       predictData();
       console.log(predictedClasses)
    }};

  const [userYear, setUserYear] = useState('');

  // Use useEffect to update the product state when excelData changes
  useEffect(() => {
    // Filter the excelData based on the selected year
    const filteredData = excelData ? excelData.filter((item) => item.annee === Number(userYear)) : [];

    // Extract Tmax and Tmin data from filtered data
    const tmaxData = filteredData.map(item => item.Tmax);
    const tminData = filteredData.map(item => item.Tmin);
    const series = [
 
      {
        name: 'Predicted',
        data: predictedClasses, // Use the predictedClasses state
      },
    ];
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

    {/* view data */}
    {/* view data */}
    <div className="viewer">
        {filteredData.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Tmax</th>
                <th>Tmin</th>
                {/* Add more columns for other temperature data if needed */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Tmax}</td>
                  <td>{item.Tmin}</td>
                  {/* Add more cells for other temperature data if needed */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data to display. Please upload an Excel file and select a year.</p>
        )}
      </div>

      <Chart
        type="line"
        width={400}
        height={300}
        series={product}
        options={option}
      />
        <Chart type="line" width={400} height={300} series={series} options={option} />
    </div>
  );
}

export default Linechart;
