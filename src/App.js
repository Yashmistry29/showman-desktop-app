import React from "react";
import {
  HashRouter as Router,
  Route,
  // Navigate,
  Routes
} from "react-router-dom";
import 'tachyons';
import './App.css';
import Price from "./pages/Price";
import Print from "./pages/Print";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Measurement from "./pages/Measurement";
import Customer from "./pages/Customer";
import BackupRestore from "./pages/BackupRestore";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={
            <>
              <Login />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/measurement" element={<Measurement />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/price" element={<Price />} />
          <Route path="/print" element={<Print />} />
          <Route path="/backupandrestore" element={<BackupRestore />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
