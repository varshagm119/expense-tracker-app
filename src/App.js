import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import SignupLogin from './Components/SignupLogin/SignupLogin';
import Profile from './Components/Profile/Profile';
import Header from './Components/Header/Header';
import Expense from './Components/ExpenseTracker/Expense';
import { authActions } from './store/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import RootLayout from './Components/Layout/Root';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<SignupLogin />}/>
        {isLoggedIn && <Route path='/profile' element={<Profile />} />}
        {/* <Route path='/header' element={<Header />} />
        <Route path='/expense' element={<Expense />} /> */}
        {isLoggedIn && <Route path='/profile/expense-tracker' element={<RootLayout />}>
          <Route index element={<Expense />} />
          </Route>}
      </Routes>
    </div>
  );
}

export default App;
