import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/registerComp/RegisterComp'
import Login from './components/loginComp/LoginComp'

function App() {

  return (
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register/>} />
 </Routes>
 
 </BrowserRouter>
  )
}

export default App
