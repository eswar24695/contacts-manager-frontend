import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Context, Provider } from './components/axios/axioscontext';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Header from './Header';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  const token=localStorage.getItem("token")
  console.log(token)
  return (
    <div>
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacts" element={token ? <Header /> : <Navigate replace to={"/"} />} />
          </Routes>
        </Provider>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
