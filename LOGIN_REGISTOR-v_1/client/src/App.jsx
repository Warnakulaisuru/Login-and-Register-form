import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Route from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup />} /> {/* Use Route instead of Routes */}
          <Route path='/login' element={<Login />} /> {/* Use Route instead of Routes */}
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

