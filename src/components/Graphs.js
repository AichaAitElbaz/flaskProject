import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import * as XLSX from 'xlsx';
import axios from 'axios'; // Import axios for HTTP requests

import './graphs.css'; // Import the CSS file
import { saveAs } from 'file-saver';

// ... Your component code ...



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

  const downloadCSV = () => {
    const csvData = prepareCSVData(); // Implement this function to format your data as CSV
  
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'table-data.csv');
  };
  const prepareCSVData = () => {
    const header = [
      'Latitude', 'Longitude', 'P', 'T', 'Tmax', 'Tmin', 'PET',
      'qm', 'SPI3', 'SPI6', 'SPI9', 'SPI12', 'SPI8', 'SP24', 'SP32',
      'SPEI3', 'SPEI6', 'SPEI9', 'SPEI12', 'SPEI8', 'SPEI24', 'SPEI32', 'SDAT'
    ].join(',');

    const rows = tableData.map((item) => {
      const rowData = [
        item.latitude, item.longitude, item.P, item.T, item.Tmax, item.Tmin,
        item.PET, item.qm, item.SPI3, item.SPI6, item.SPI9, item.SPI12,
        item.SPI8, item.SP24, item.SP32, item.SPEI3, item.SPEI6, item.SPEI9,
        item.SPEI12, item.SPEI8, item.SPEI24, item.SPEI32, item.SDAT
      ];

      return rowData.slice(0, 2).concat(rowData.slice(2)).join(','); // Exclude Year and Month columns
    });

    const csvData = [header, ...rows].join('\n');
    return csvData;
  };
  
  return (
    <div className="wrapper">
      <br/><br/>

    {/* <h3><u>Courbes de prédictions annuelles</u></h3> */}
    <br/><br/>
    <div className="form-group">
    <form className="form-group custom-form" onSubmit={handleFileSubmit}>
  <div className="form-row align-items-center">
  <div className="col-md-6" >
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
        <button type="submit"  className="btn btn-primary smaller-text-button">Confirmer</button>

      </div>

    </div>

  </div>
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
     <div  style={{ marginLeft: '4cm' }}>
  <Chart
    type="line"
    width={400}
    height={300}
    series={series}
    options={option2}
  />
</div>
      <div id='pie_chart'>
   {predictionClasses.length > 0 && (
          <Chart
          options={{
            ...preparePieChartData().options,
            chart: {
              height: 800, // Adjust the height as needed
              ...preparePieChartData().options.chart,
            },
          }}
          series={preparePieChartData().series}
          type="pie"
          height={500}
        />
        
      )}
      
      </div>
  </div>
  
 
  <button onClick={downloadCSV} style={{
    width: '10cm',
    height: '0.5cm',
    textAlign: 'center',
    fontSize: '12px', // Adjust the font size as needed
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:"0.2cm",
  }} >Télécharger un fichier CSV</button>

      
      <table className="table" >
        <thead>
          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>P</th>
            <th>T</th>
            <th>Tmax</th>
            <th>Tmin</th>
            <th>PET</th>
            <th>qm</th>
            <th>SPI3</th>
            <th>SPI6</th>
            <th>SPI9</th>
            <th>SPI12</th>
            <th>SPI8</th>
            <th>SP24</th>
            <th>SP32</th>
            <th>SPEI3</th>
            <th>SPEI6</th>
            <th>SPEI9</th>
            <th>SPEI12</th>
            <th>SPEI8</th>
            <th>SPEI24</th>
            <th>SPEI32</th>
            <th id='rep'>SDAT</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.latitude}</td>
              <td>{item.longitude}</td>
              <td>{item.P}</td>
              <td>{item.T}</td>
              <td>{item.Tmax}</td>
              <td>{item.Tmin}</td>
              <td>{item.PET}</td>
              <td>{item.qm}</td>
              <td>{item.SPI3}</td>
              <td>{item.SPI6}</td>
              <td>{item.SPI9}</td>
              <td>{item.SPI12}</td>
              <td>{item.SPI8}</td>
              <td>{item.SP24}</td>
              <td>{item.SP32}</td>
              <td>{item.SPEI3}</td>
              <td>{item.SPEI6}</td>
              <td>{item.SPEI9}</td>
              <td>{item.SPEI12}</td>
              <td>{item.SPEI8}</td>
              <td>{item.SPEI24}</td>
              <td>{item.SPEI32}</td>
              <td id='rep'>{tableResponses[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}

export default Linechart;
