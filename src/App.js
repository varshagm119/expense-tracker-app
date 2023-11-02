import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import SignupLogin from './Components/SignupLogin/SignupLogin';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignupLogin />}/>
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
