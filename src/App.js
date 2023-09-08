import React, {Component, createContext, useReducer,useEffect,useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode';
import { Route, Routes,useLocation,useNavigate  } from 'react-router-dom';
import { Protected } from './components/Protected';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Logout from './components/Logout';
import { initialState, reducer } from './components/reducer/UseReducer';
import PaymentPage from './components/PaymentPage';
import UserHomePage from './userpages/UserHomePage';
import InternalTransfer from '../src/UserSidebarPages/InternalTransfer';
import UserDetails from './UserModel/pages/UserDetails';
import ProfileVerification from './UserModel/pages/ProfileVerification';
import ChangePassword from './UserModel/pages/ChangePassword';
import ResetPassword from './UserModel/pages/ResetPassword';
import NewsLetter from './UserModel/pages/NewsLetter';
import BonusSetting from './UserModel/pages/BonusSetting';
import DepositeHistory from './UserSidebarPages/Operation history/DepositeHistory';
import WithdrawalHistory from './UserSidebarPages/Operation history/WithdrawalHistory';
import TransferHistory from './UserSidebarPages/Operation history/TransferHistory';
import AccountList from './UserSidebarPages/Trading accounts/AccountList';
import ManageBonuses from './UserSidebarPages/Trading accounts/ManageBonuses';
import Monitoring from './UserSidebarPages/Trading accounts/Monitoring';
import RealAccount from './UserSidebarPages/Trading accounts/RealAccount';
import DemoAccount from './UserSidebarPages/Trading accounts/DemoAccount';
import PageNotFound from './components/PageNotFound';
import NewDeposite from './UserSidebarPages/NewDeposite';
import Withdrawal from './UserSidebarPages/Withdrawal';
import UserRegistration from './components/UserRegistration';
import FullForexTicker from './components/FullForexTicker';
import MemberLogin from './components/MemberLogin';
import RefferalPayout from './UserSidebarPages/RefferalPayout';
import InviteFriend from './UserSidebarPages/InviteFriend';
import Dashboard from './UserSidebarPages/Dashboard'
import LiveChat from './UserSidebarPages/LiveChat';
import DisplayCard from './UserSidebarPages/DisplayCard';
import CryptocurrencyMarket from './UserSidebarPages/CryptocurrencyMarket';
import CrossRate from './UserSidebarPages/CrossRates';
import HeatMap from './UserSidebarPages/HeatMap';
import EconomicCelender from './UserSidebarPages/EconomicCelender';
import MarketData from './UserSidebarPages/MarketData';
import Screener from './UserSidebarPages/Screener';
import ReferraPayout from './components/ReferraPayout';
import AddBankDetails from './UserSidebarPages/AddBankDetails';





export const UserContext = createContext();


function App() {
  const islogin = localStorage.getItem('login');
  
  const [token, setToken] = useState(null);
  const [isTokenExpired, setIsTokenExpired] = useState(true);
  const [state, dispatch ] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  // -----------------------
  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (storedToken) {
      setToken(storedToken);
      setIsTokenExpired(isTokenExpired1(storedToken));

    }
  }, [location.pathname]);

  // =====================================
  const isTokenExpired1 = (token) => {
    if (!token) {
      // Token not available, consider it as expired
      return true;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
      if (decodedToken.exp < currentTime) {
        logoutUser();
      }
    } catch (error) {
      // Error occurred, consider token as expired
      logoutUser();
    }
  }

  const logoutUser = () => {
    // Clear token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('member');
    localStorage.removeItem('memberid');
    localStorage.removeItem('login');
    localStorage.removeItem('userType');
    localStorage.removeItem('refferal');
    localStorage.removeItem('fname');

    // Redirect to logout page
    navigate('/logout');
  };
  // ------------------------

  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar />
        
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/chart" element={<FullForexTicker/>}/>
            {/* <Route  path='/admindashboard' element={islogin === 'true'?<AdminDashboard/>:<Route path='/' element={<Home/>}/>}/> */}
            
            <Route path='/paymentpage' element={<PaymentPage/>}/>
            {/* <Route path='/admindashboard' element={<Protected Component = {AdminDashboard}/>}></Route> */}
            <Route path='/member-registration' element={<UserRegistration/>}></Route>
            <Route path='/member-login' element={<MemberLogin/>} ></Route>
            


            {/* <Route  path='/userdashboard' element={isloginUser === 'true'?<UserDashboard/>:<Home />}/> */}
            <Route path='/userdashboard' element={<Protected Component = {UserDashboard}/>}>

              {/* <Route path='dashboard' element={<UserHomePage/>} /> */}
              <Route path='trading-chart' element={<Dashboard/>} />
              <Route path='cryptocurrency-market' element={<CryptocurrencyMarket/>} />
              <Route path='cross-rates' element={<CrossRate/>} />
              <Route path='heat-map' element={<HeatMap/>} />
              <Route path='economic-celender' element={<EconomicCelender/>} />
              <Route path='market-data' element={<MarketData/>} />
              <Route path='screener' element={<Screener/>} />
              <Route path='dashboard' element={<DisplayCard/>} />
              <Route path='new-deposit' element={<NewDeposite/>}/>
              <Route path='withdraw' element={<Withdrawal/>} />
              <Route path='transfer' element={<InternalTransfer/>}/>
              <Route path='invite' element={<InviteFriend/>}/>
              <Route path='chat' element={<LiveChat/>} />
              <Route path="referral-payout" element={<ReferraPayout />} />
              <Route path='add-bank-details' element={<AddBankDetails/>}/>
              

              {/* Opertaion Hostory */}

              <Route path ='deposite' element={<DepositeHistory/>}/>
              <Route path='withdrawlhistory' element={<WithdrawalHistory/>}/>
              <Route path='transferhistory' element={<TransferHistory/>}/>

              {/* Trading accounts */}

              {/* <Route path='accountlist' element={<AccountList/>}/>
              <Route path='managebonuses' element={<ManageBonuses/>}/>
              <Route path='monitoring' element={<Monitoring/>}/>
              <Route path='real-account' element={<RealAccount/>}/>
              <Route path='demo-account' element={<DemoAccount/>}/> */}
              {/* user setting */}
              <Route path='setting/userdetails' element={<UserDetails/>}/>
              <Route path='setting/verify' element={<ProfileVerification/>}/>
              <Route path='setting/changepassword' element={<ChangePassword/>}/>
              <Route path='setting/resetpassword' element={<ResetPassword/>}/>
              <Route path='setting/newsletter' element={<NewsLetter/>}/>
              <Route path='setting/bonus' element={<BonusSetting/>}/>

              <Route path='/userdashboard/refferal-payout' element={<RefferalPayout/>} />
            </Route>
            <Route path='/logout' element={<Logout/>}/>
            
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
         
      </UserContext.Provider>

         
    </>
  );
}

export default App;
