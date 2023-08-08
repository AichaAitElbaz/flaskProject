import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import * as XLSX from 'xlsx';
import axios from 'axios'; // Import axios for HTTP requests

import './graphs.css'; // Import the CSS file
  
function Linechart() {

  const [predictionValues, setPredictionValues] = useState([]);
  const [predictionClasses, setPredictionClasses] = useState([]);


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
    title: { text: "Température annuelle" },
    xaxis: {
      title: { text: "Mois" },
      categories: ['Jan', 'Fév', 'Mar', 'Arv', 'Mai', 'Jui', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],

    
    },
    yaxis: {
      title: { text: "Températures" },
    },
    colors: customColors,

  });


  const [tableData, setTableData] = useState([]);
  const [tableResponses, setTableResponses] = useState([]);
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
    generateTable();
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
      };
      // Send the POST request to the server for prediction
      axios
      .post('http://localhost:3000/regr', payload)
      .then((response) => {
        const prediction_value = response.data;
        console.log("prediction_value",prediction_value)

        if (rowData.annee === Number(userYear)) {
          setPredictionValues((prevValues) => [...prevValues, prediction_value]);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error cases
      });
      // Send the POST request to the server for prediction
      axios
      .post('http://localhost:3000/predict', payload)
      .then((response) => {
        const prediction_class = response.data;
        console.log("prediction_class",prediction_class);


        if (rowData.annee === Number(userYear)) {
          setPredictionClasses((prevClasses) => [...prevClasses, prediction_class]);

        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error cases
      });

    });

  }
    };
    const generateTable = () => {
   
      const dataRows = [];
      const responseRows = [];
      if (excelFile !== null) {
        const workbook = XLSX.read(excelFile, { type: 'buffer' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
    
        Promise.all(
          data.map((rowData) => {
            const payload = {
              latitude: rowData.latitude,
              longitude: rowData.longitude,
              annee: rowData.annee,
              mois: rowData.mois,
              P: rowData.P,
              T: rowData.T,
              Tmax: rowData.Tmax,
              Tmin: rowData.Tmin,
              PET: rowData.PET,
              qm: rowData.qm,
              SPI3: rowData.SPI3,
              SPI6: rowData.SPI6,
              SPI9: rowData.SPI9,
              SPI12: rowData.SPI12,
              SPI8: rowData.SPI8,
              SP24: rowData.SP24,
              SP32: rowData.SP32,
              SPEI3: rowData.SPEI3,
              SPEI6: rowData.SPEI6,
              SPEI9: rowData.SPEI9,
              SPEI12: rowData.SPEI12,
              SPEI8: rowData.SPEI8,
              SPEI24: rowData.SPEI24,
              SPEI32: rowData.SPEI32,
            };
    
            // Send the POST request to the server for prediction
            return axios.post('http://localhost:3000/regr', payload)
              .then((response) => {
                console.log(response.data);
                responseRows.push(response.data); // Store the response in the responseRows array
              })
              .catch((error) => {
                console.error(error);
                // Handle error cases
              });
          })
        ).then(() => {
          // All POST requests have completed, update the state
          setTableData(data); // Update the state with dataRows
          setTableResponses(responseRows); // Update the state with responseRows
          console.log('responseRows', responseRows);
          console.log('dataRows', data);
        });
      }
    };
    
    const preparePieChartData = () => {
      const customColors = [
        'rgba(255, 99, 132, 0.6)', // First slice color
        'rgba(54, 162, 235, 0.6)', // Second slice color
        'rgba(255, 206, 86, 0.6)', // Third slice color
        // Add more colors as needed for other slices
      ];
      const classCounts = {};
      predictionClasses.forEach((predictionObj) => {
        const prediction = predictionObj.predicted_class;
        classCounts[prediction] = (classCounts[prediction] || 0) + 1;
      });
    
      const labels = Object.keys(classCounts);
      const data = Object.values(classCounts);
    
      return {
        series: data,
        options: {
          labels: labels,

        },
      };
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
    setPredictionClasses(predictionClasses);

  }, [excelData, userYear]
  
  );
  const filteredData = excelData ? excelData.filter((item) => item.annee === Number(userYear)) : [];
    // Sort the filteredData based on the "Month" column
    filteredData.sort((a, b) => a.Month - b.Month);
    const customColors = ['#E29414','#231483','#528314 '];

  const option2 = {
    title: { text: "Valeurs de SDAT prédites" },
    xaxis: {
      title: { text: "Mois" },
      categories: ['Jan', 'Fév', 'Mar', 'Arv', 'Mai', 'Jui', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
    },
    yaxis: {
      title: {text: "valeurs prédites"},
    },

  };

// Function to prepare data for the pie chart

  return (
    <div className="wrapper">
      <br/>

    <h3><u>Courbes de prédictions annuelles</u></h3>
    <br/>
    <div className="form-group">
    <form className="form-group custom-form" onSubmit={handleFileSubmit}>
  <div className="form-row align-items-center">
  <div className="col-md-6">
      <input id='choose_file' type="file" className="form-control" required onChange={handleFile} />
    </div>
    <div className="col-md-6">
      <div className="selectField">
      <label id='label'>Année:</label>

        <select
          id="year"
          value={userYear}
          onChange={handleYearChange}
          className="form-control"
        >
          <option value={0}></option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  
  </div>
  <button type="submit"  className="btn btn-primary smaller-text-button">Confirmer</button>
</form>

</div>
    <div className="charts-container">
      
      <Chart
        type="line"
        width={400}
        height={300}
        series={product}
        options={option}
      />
      <div id='pie_chart'>
   {predictionClasses.length > 0 && (
        <Chart
          options={preparePieChartData().options}
          series={preparePieChartData().series}
          type="pie"
          height={350}
        />
      )}
      </div>
  </div>
  
  <Chart
       type="line"
        width={400}
      height={300}
      series={series}
      options={option2}
    />
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Response</th>
        </tr>
      </thead>
      <tbody>
        {/* Render table rows for data and responses */}
        {tableData.map((rowData, index) => (
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
                Response: {tableResponses[index]}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Linechart;
