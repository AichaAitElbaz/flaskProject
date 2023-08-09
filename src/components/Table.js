import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import * as XLSX from 'xlsx';
import axios from 'axios'; // Import axios for HTTP requests

  
function Table() {

  const [predictionValues, setPredictionValues] = useState([]);
  const [dataValues, setDataValues] = useState([]);




  
  
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
      };
      // Send the POST request to the server for prediction
      axios
      .post('http://localhost:3000/regr', payload)
      .then((response) => {
        const prediction_value = response.data;
         console.log("prediction_value",prediction_value)
        setPredictionValues((prevValues) => [...prevValues, prediction_value]);
        setDataValues(data); 
      })
      .catch((error) => {
        console.error(error);
        // Handle error cases
      });
      // Send the POST request to the server for prediction

   });

  }

    };
    
    
    

  // Use useEffect to update the product state when excelData changes

    // Update the product state with filtered Tmax and Tmin data
 
    useEffect(() => {
        console.log("predictionValues", predictionValues);
      }, [predictionValues]);

// Function to prepare data for the pie chart

  return (
    <div className="wrapper">
  <div className="form-group">
    <form className="form-group custom-form" onSubmit={handleFileSubmit}>
  <div className="form-row align-items-center">
  <div className="col-md-6">
      <input id='choose_file' type="file" className="form-control" required onChange={handleFile} />
    </div></div>  
  <button type="submit"  className="btn btn-primary smaller-text-button">Confirmer</button>
</form>
<table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Response</th>
        </tr>
      </thead>
      <tbody>
        {/* Render table rows for data and responses */}
        {dataValues.map((rowData, index) => (
          <tr key={index}>
            <td>
              {/* Render the data for each row */}
              <div>
                Latitude: {rowData.latitude}
                Longitude: {rowData.longitude}
                Annee:{rowData.annee}
                Mois:{rowData.mois}
                {/* Add more data fields as needed */}
              </div>
            </td>
            <td>
              {/* Render the response for each row */}
              <div>
                Response: {predictionValues[index]}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div></div>
  );
}

export default Table;
