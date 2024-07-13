import logo from './logo.svg';
import './App.css';
import {Routes, Route, Navigate, Link } from "react-router-dom";
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import { Feed } from './Components/Feed';

const ProtectedRoute=(props) =>{
  const token =localStorage.getItem('SHOPPING_TOKEN');
  if(token)
   return props.children;
  return <Navigate to='/Login' />

}

const publicRoute = (props) =>{
  const token= localStorage.getItem('SHOPPING_TOKEN');
  if(token) return <Navigate to ='/feed'/>
  return props.children
}


function App() {

  return (
    <div className="App">
      <h1>Shopping App</h1>
      <Routes>
          <Route path="/login" element={<publicRoute><Login/></publicRoute>} />
          <Route path="/signup" element={<publicRoute><Signup/></publicRoute>} />
          <Route path="/feed" element={<ProtectedRoute><Feed/></ProtectedRoute>} />
          <Route path="/" element={<publicRoute><Login/></publicRoute>}/>
        </Routes>
    </div>
  );
}

export default App;
