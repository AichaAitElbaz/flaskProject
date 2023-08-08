import React from "react";
import "./App.css";
import FormInput from "./components/FormInput.js";
import Graphs from "./components/Graphs.js";
import Table from "./components/Table.js";

const App = () => {
  return (
    <div className="app">
      <form >
          <FormInput/>
          </form>
          <Graphs/>
          <Table/>
    </div>
  );
};
export default App;
