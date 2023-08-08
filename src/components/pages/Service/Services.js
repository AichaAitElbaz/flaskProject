import React from 'react';
import './Services.css';

const Services = () => {
  // Example data
  const data = [
    {
      latitude: 40.7128,
      longitude: -74.0060,
      P: 200,
      T: 25,
      Tmax: 30,
      Tmin: 20,
      PET: 180,
      qm: 0.5,
      SPI3: -0.2,
      SPI6: -0.5,
      SPI9: -0.8,
      SPI12: -1.0,
      SPI8: -0.7,
      SP24: -1.5,
      SP32: -1.7,
      SPEI3: -0.3,
      SPEI6: -0.6,
      SPEI9: -0.9,
      SPEI12: -1.2,
      SPEI8: -0.8,
      SPEI24: -1.3,
      SPEI32: -1.6,
      RESPONSE: 0,
    },
    {
      latitude: 40.7128,
      longitude: -74.0060,
      P: 200,
      T: 25,
      Tmax: 30,
      Tmin: 20,
      PET: 180,
      qm: 0.5,
      SPI3: -0.2,
      SPI6: -0.5,
      SPI9: -0.8,
      SPI12: -1.0,
      SPI8: -0.7,
      SP24: -1.5,
      SP32: -1.7,
      SPEI3: -0.3,
      SPEI6: -0.6,
      SPEI9: -0.9,
      SPEI12: -1.2,
      SPEI8: -0.8,
      SPEI24: -1.3,
      SPEI32: -1.6,
      RESPONSE: 0,
    },
    {
      latitude: 40.7128,
      longitude: -74.0060,
      P: 200,
      T: 25,
      Tmax: 30,
      Tmin: 20,
      PET: 180,
      qm: 0.5,
      SPI3: -0.2,
      SPI6: -0.5,
      SPI9: -0.8,
      SPI12: -1.0,
      SPI8: -0.7,
      SP24: -1.5,
      SP32: -1.7,
      SPEI3: -0.3,
      SPEI6: -0.6,
      SPEI9: -0.9,
      SPEI12: -1.2,
      SPEI8: -0.8,
      SPEI24: -1.3,
      SPEI32: -1.6,
      RESPONSE: 0,
    },
    {
      latitude: 40.7128,
      longitude: -74.0060,
      P: 200,
      T: 25,
      Tmax: 30,
      Tmin: 20,
      PET: 180,
      qm: 0.5,
      SPI3: -0.2,
      SPI6: -0.5,
      SPI9: -0.8,
      SPI12: -1.0,
      SPI8: -0.7,
      SP24: -1.5,
      SP32: -1.7,
      SPEI3: -0.3,
      SPEI6: -0.6,
      SPEI9: -0.9,
      SPEI12: -1.2,
      SPEI8: -0.8,
      SPEI24: -1.3,
      SPEI32: -1.6,
      RESPONSE: 0,
    },
    // Add more data here...
  ];

  return (
    <div className="container">
      
      <table className="table">
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
            <th>RESPONSE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
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
              <td>{item.RESPONSE}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Services;
