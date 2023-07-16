import React, { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput.js";
import Graphs from "./components/Graphs.js"

const App = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
          <FormInput/>
          <Graphs/>
         
      </form>
     
    </div>
  );
};

export default App;

