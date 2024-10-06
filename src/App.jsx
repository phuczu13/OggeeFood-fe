import React from 'react';

import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom'
import { StoreProvider } from './stores/pages/StoreContext';

import IntroPage from './users/pages/intro-page'
import SignIn from './users/pages/sign-in';
import HomePage from './users/pages/home-page';

import SignUp from './users/pages/sign-up';


import SignInStore from './stores/pages/auth/signin-store'
import HomeStore from './stores/pages/home/home-store';
import ToppingStore from './stores/pages/home/topping-store';
import OrderStore from './stores/pages/home/order-store';
import RevenueStore from './stores/pages/home/revenue-store';
import InforStore from './stores/pages/home/infor-store';


import SignUpStore from './stores/pages/auth/signup-store'
import InforNewForm from './stores/pages/auth/infor-newstore';




function App() {
  
  return (
    <div>
      <StoreProvider>
        <Router>
          <Routes>
            < Route path='/' element={<IntroPage/>} />
            < Route path='sign-in' element={<SignIn/>} />
            < Route path='home-page' element={<HomePage/>} />

            < Route path='sign-up' element={<SignUp/>} />

            < Route path='signin-store' element={<SignInStore/>} />
            < Route path='home-store' element={<HomeStore/>} />
            < Route path='topping-store' element={<ToppingStore/>} />
            < Route path='order-store' element={<OrderStore/>} />
            < Route path='revenue-store' element={<RevenueStore/>} />
            < Route path='infor-store' element={<InforStore/>} />

            < Route path='signup-store' element={<SignUpStore/>} />
            < Route path='infor-newform' element={<InforNewForm/>} />

          </Routes>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
