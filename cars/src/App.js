import logo from './logo.svg';
import './App.css';
import Login from './components/pages/Login/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/pages/Home/Home';
import UserCars from './components/UserCars';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/admin" element={<Home/>} />
      <Route path="/user" element={<UserCars/>}/>
      </Routes>
     
    </Router>
    
    
   
    
  );
}

export default App;
