import React, { useEffect, useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput.js";
// import Graphs from "./components/Graphs.js";


const App = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const [responseMessage, setResponseMessage] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here if needed
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
        <FormInput />
       {/* <Graphs /> */}
    </div>
  );
};

export default App;
