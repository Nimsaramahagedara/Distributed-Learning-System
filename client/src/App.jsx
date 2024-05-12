import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
