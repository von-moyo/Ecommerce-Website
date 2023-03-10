import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.scss"
//Pages
import { Home, Cart, Contact, Register, Reset, Login, OrderHistory } from "./pages/index"
//Components
import { Header, Footer } from "./components/index"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <>
      <BrowserRouter >
        <ToastContainer
        autoClose={1000}
        />
        <Header />
        <Routes>
          <Route
            path='/' element={<Home />}
          />
          <Route
            path='/contact' element={<Contact />}
          />
          <Route
            path='/cart' element={<Cart />}
          />
          <Route
            path='/login' element={<Login />}
          />
          <Route
            path='/reset' element={<Reset />}
          />
          <Route
            path='/register' element={<Register />} />
          <Route
            path='/order-history' element={<OrderHistory />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
