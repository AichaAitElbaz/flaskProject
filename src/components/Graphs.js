import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import './graphs.css'; // Import the CSS file

function Linechart() {
  const [product, setProduct] = useState([
    {
      name: "Tmax",
      data: [234, 45, 67, 987, 345, 456, 87, 321, 45, 569, 76, 890],
    },
    {
      name: "Tmin",
      data: [562, 145, 267, 97, 45, 156, 87, 321, 845, 969, 706, 20],
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

  return (
    <div className="line-chart-container">
      <h2>Line Chart </h2>
      <Chart
        type="line"
        width={400}
        height={300}
        series={product}
        options={option}
      />
    </div>
  );
}

export default Linechart;
