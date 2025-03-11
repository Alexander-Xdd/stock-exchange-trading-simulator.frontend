import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './routes/auth/Register';
import Login from './routes/auth/Login';
import Home from './Home';
import Username from "./helpers/Username";
import Currencies from "./routes/instruments_lists/Currencies";
import Shares from "./routes/instruments_lists/Shares";
import Etfs from "./routes/instruments_lists/Etfs";
import ShareDetails from "./routes/instrument_details/ShareDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<Username />} />
        <Route path="/currencies" element={<Currencies />} />
        <Route path="/shares" element={<Shares />} />
        <Route path="/etfs" element={<Etfs />} />

        <Route path="/shares/:figi" element={<ShareDetails />} />
      </Routes>
    </Router>
  );
}

export default App;