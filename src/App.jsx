import React from "react";
import "./app.css";
import FormInput from "./components/FormInput";
import Graphs from "./components/Graphs";
import ApexChart from "./components/Pi";

const App = () => {
  return (
    <div className="app">
      <form>
        <FormInput />
        <Graphs />
       
        <ApexChart />
    
      </form>
    </div>
  );
};

export default App;
