
import { BrowserRouter, Navigate, Route, Routes, redirect } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home/Home"
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Message from './Pages/Message/Message';

function App() {
  const {user}=useContext(AuthContext)
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={user ? <Navigate to="/homepage"/>: <Login/>}></Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/homepage' element={user ? <Home/>: <Navigate to="/"/>}/>
      <Route path='/profilepage/:id' element={user ? <Profile/>: <Navigate to="/"/>} />
      <Route path='/message' element={user ? <Message/> : <Navigate to="/" />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
