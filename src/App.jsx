import React from "react";
import "./App.css";
import FormInput from "./components/FormInput.js";
import Graphs from "./components/Graphs.js";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="app">
      <form >
          <FormInput/>
          </form>
          <Graphs/>
    </div>
  );
};
export default App;
