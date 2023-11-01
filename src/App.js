import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import SignupLogin from './Components/SignupLogin/SignupLogin';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignupLogin />}/>
      </Routes>
    </div>
  );
}

export default App;
