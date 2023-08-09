import React from "react";
import "./App.css";
import FormInput from "./components/FormInput.js";
import Graphs from "./components/Graphs.js";
import Table from "./components/Table.js";
import {
  BrowserRouter as Router,
  Route,
  Navigate ,
  Routes 
} from 'react-router-dom';

import About from './components/pages/About/About.js';
import Home from './components/pages/Home/Home.js';
import Services from './components/pages/Service/Services.js';
import Navbar from './components/Navbar/Navbar.js';

const App = () => {
  return (
    <Router>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormInput />} />
        <Route path="/charts" element={<Graphs />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  </Router>
  );
};
export default App;
