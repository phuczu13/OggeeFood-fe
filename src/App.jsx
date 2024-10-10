import React from 'react';

import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom'
import { StoreProvider } from './stores/pages/StoreContext';

import IntroPage from './users/pages/intro-page'
import SignIn from './users/pages/auth/sign-in';
import VerifyForm from './users/pages/auth/verify-form';
import HomePage from './users/pages/home/home-page';
import DetailStore from './users/pages/home/detail-store';


import SignUp from './users/pages/auth/sign-up';


import SignInStore from './stores/pages/auth/signin-store'
import HomeStore from './stores/pages/home/home-store';
import ToppingStore from './stores/pages/home/topping-store';
import OrderStore from './stores/pages/home/order-store';
import RevenueStore from './stores/pages/home/revenue-store';
import InforStore from './stores/pages/home/infor-store';


import SignUpStore from './stores/pages/auth/signup-store'
import InforNewStore from './stores/pages/auth/infor-newstore'
import VerifyStore from './stores/pages/auth/verify-store';





function App() {
  
  return (
    <div>
      <StoreProvider>
        <Router>
          <Routes>
            < Route path='/' element={<IntroPage/>} />
            < Route path='sign-in' element={<SignIn/>} />
            < Route path='verify-form' element={<VerifyForm/>} />
            < Route path='home-page' element={<HomePage/>} />
            < Route path='detail-store' element={<DetailStore/>} />

            < Route path='sign-up' element={<SignUp/>} />
            < Route path='verify-form' element={<VerifyForm/>} />

            < Route path='signin-store' element={<SignInStore/>} />
            < Route path='verify-store' element={<VerifyStore/>} />
            < Route path='home-store' element={<HomeStore/>} />
            < Route path='topping-store' element={<ToppingStore/>} />
            < Route path='order-store' element={<OrderStore/>} />
            < Route path='revenue-store' element={<RevenueStore/>} />
            < Route path='infor-store' element={<InforStore/>} />

            < Route path='signup-store' element={<SignUpStore/>} />
            < Route path='verify-store' element={<VerifyStore/>} />
            < Route path='infor-newstore' element={<InforNewStore/>} />

          </Routes>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
