import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import * as XLSX from 'xlsx';
import axios from 'axios'; // Import axios for HTTP requests
import Papa from 'papaparse';

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
  const [tableQmData, setTableQmData] = useState([]);

  const [tableResponses, setTableResponses] = useState([]);
  const [tableQmResponses, setTableQmResponses] = useState([]);

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
  const handleQmFile = (e) => {
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
  const handleQmFileSubmit = (e) => {
    generateQmTable();
    // generateTable();
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
        P766i:rowData.P766i,
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
        P766_SDAT:rowData.P766_SDAT,
      };
      // Send the POST request to the server for prediction
      axios
      .post('http://localhost:3000/qm', payload)
      .then((response) => {
        const prediction_value = response.data;
        console.log("prediction_value",prediction_value)

       
      })
      .catch((error) => {
        console.error(error);
        // Handle error cases
      });
      // Send the POST request to the server for prediction
     

    });

  }
    };
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
     data.forEach((rowData,index) => {
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
        qm:tableQmResponses[index],
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
          data.map((rowData,index) => {
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
              qm: tableQmResponses[index],
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
                console.log("response.dataaaaaaaaaaaaaaaaaaaaaaaaaaa");
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
    const generateQmTable = () => {
   
      const dataRows = [];
      const responseRows = [];
      const qmResponseRows = [];

      if (excelFile !== null) {
        const workbook = XLSX.read(excelFile, { type: 'buffer' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        Promise.all(
     
          data.map((rowData) => {
            const qmPayload = {
              latitude: rowData.latitude,
              longitude: rowData.longitude,
              annee: rowData.annee,
              mois: rowData.mois,
              P: rowData.P,
              T: rowData.T,
              Tmax: rowData.Tmax,
              Tmin: rowData.Tmin,
              PET: rowData.PET,
              P766i: rowData.P766i,
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
              P766_SDAT: rowData.P766_SDAT,

            };
          
            // Send the POST request to the server for prediction
            return axios.post('http://localhost:3000/qm', qmPayload)
              .then((response) => {
                qmResponseRows.push(response.data); // Store the response in the responseRows array
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
                  qm: response.data,
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
                return axios.post('http://localhost:3000/regr', payload)
                
                .then((response) => {
                  const prediction_value = response.data;
                  responseRows.push(response.data); 
                  if (rowData.annee === Number(userYear)) {
                    setPredictionValues((prevValues) => [...prevValues, prediction_value]);
                  }
                })
                .catch((error) => {
                  console.error(error);
                  // Handle error cases
                });
                               
                       
              })
              
              .catch((error) => {
                console.error(error);
                // Handle error cases
              });
              
            })
          ).then(() => {
          // All POST requests have completed, update the state
          setTableQmData(data); // Update the state with dataRows
          setTableQmResponses(qmResponseRows);
          setTableResponses(responseRows); // U
      
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



  const handleDownload = () => {
    const csvData = Papa.unparse(
      tableQmData.map((item, index) => ({
        Latitude: item.latitude,
        Longitude: item.longitude,
        Année: item.annee,
        Mois: item.mois,
        P: item.P,
        T: item.T,
        Tmax: item.Tmax,
        Tmin: item.Tmin,
        PET: item.PET,
        P766i: item.P766i,
        SPI3: item.SPI3,
        SPI6: item.SPI6,
        SPI9: item.SPI9,
        SPI12: item.SPI12,
        SPI8: item.SPI8,
        SP24: item.SP24,
        SP32: item.SP32,
        SPEI3: item.SPEI3,
        SPEI6: item.SPEI6,
        SPEI9: item.SPEI9,
        SPEI12: item.SPEI12,
        SPEI8: item.SPEI8,
        SPEI24: item.SPEI24,
        SPEI32: item.SPEI32,
        P766_SDAT: item.P766_SDAT,
        Qm: tableQmResponses[index],
        SDAT: tableResponses[index],
      })),
      {
        delimiter: ';', // Set the delimiter to semicolon
  header: true,
  quotes: true,
  newline: '\r\n',
      }
    );

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="wrapper">

      <br/><br/>

    {/* <h3><u>Courbes de prédictions annuelles</u></h3> */}
    <br/><br/>
    <div className="form-group">
  <form className="form-group custom-form" onSubmit={handleQmFileSubmit}>
  <div className="form-row align-items-center">
  <div className="col-md-6" >
      <input id='choose_file' type="file" className="form-control" required onChange={handleQmFile} />
    </div>
    
    <div className="col-md-6">
      <div className="selectField">
 
        <button type="submit"  className="btn btn-primary smaller-text-button">Confirmer</button>

      </div>

    </div>

  </div>
</form>

</div>

<table className="table" >
        <thead>
          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Année</th>
            <th>Mois</th>
            <th>P</th>
            <th>T</th>
            <th>Tmax</th>
            <th>Tmin</th>
            <th>PET</th>
            <th>P766i</th>
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
            <th>P766_SDAT</th>
            <th id='rep'>Qm</th>
            <th id='rep'>SDAT</th>

          </tr>
        </thead>
        <tbody>
          {tableQmData.map((item, index) => (
            <tr key={index}>
              <td>{item.latitude}</td>
              <td>{item.longitude}</td>
              <td>{item.annee}</td>
              <td>{item.mois}</td>
              <td>{item.P}</td>
              <td>{item.T}</td>
              <td>{item.Tmax}</td>
              <td>{item.Tmin}</td>
              <td>{item.PET}</td>
              <td>{item.P766i}</td>
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
              <td>{item.P766_SDAT}</td>
              <td id='rep'>{tableQmResponses[index]}</td>
              <td id='rep'>{tableResponses[index]}</td>

            </tr>
          ))}
        </tbody>
      </table>

      <br/><br/>

      <button
  onClick={handleDownload}
  style={{
    width: "10cm",
    height: "26px",
    border: "none",
    borderRadius: "5px", // Changed from "border-radius"
    fontWeight: "bold",
    fontSize: "12px",
    cursor: "pointer",
    textAlign: "center", // Center the text horizontally
marginLeft:"18cm"
  }}
>
  Download CSV
</button>

   
      <br/><br/>
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
  
 

    
    </div>
    
  );
}

export default Linechart;
