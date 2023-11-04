import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import SignupLogin from './Components/SignupLogin/SignupLogin';
import Profile from './Components/Profile/Profile';
import Header from './Components/Header/Header';
import Expense from './Components/ExpenseTracker/Expense';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<SignupLogin />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/header' element={<Header />} />
        <Route path='/expense' element={<Expense />} />
      </Routes>
    </div>
  );
}

export default App;
