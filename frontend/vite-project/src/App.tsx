import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/registerComp/RegisterComp'
import Login from './components/loginComp/LoginComp'
import QA from './components/QA'
import DashboardAttack from './components/attackComp/AttackComp'

function App() {

  return (
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register/>} />
  <Route path="/attack" element={<DashboardAttack/>} />
  <Route path="/QA" element={<QA/>} />
 </Routes>
 
 </BrowserRouter>
  )
}

export default App
