import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './routes/auth/Register';
import Login from './routes/auth/Login';
import Home from './Home';
import Username from "./helpers/Username";
import Currencies from "./routes/instruments_lists/Currencies";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<Username />} />
        <Route path="/currencies" element={<Currencies />} />
      </Routes>
    </Router>
  );
}

export default App;