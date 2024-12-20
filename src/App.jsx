import React from 'react';

import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom'
import { StoreProvider } from './stores/pages/StoreContext';

import IntroPage from './users/pages/intro-page'
import SignIn from './users/pages/auth/sign-in';
import VerifyForm from './users/pages/auth/verify-form';
// import VerifyLoginForm from './users/pages/auth/verify-login-form';
import HomePage from './users/pages/home/home-page';

import Eatery from './users/pages/eatery/eatery';
import EateryDetails from './users/pages/eatery/eatery-details';
import ListEatery from './users/pages/eatery/list-eatery';

import Cart from './users/pages/cart/cart';
import CallbackPage from './users/pages/home/CallbackPage';


import ProductDetail from './users/components/listproduct/product-detail';
import Product from './users/components/listproduct/product';

import Payment from './users/pages/payment/payment';
import OrderInfo from './users/pages/order/order-info';


import Order from './users/pages/order/order';
import UserAccount from './users/pages/account/user-account';

import SignUp from './users/pages/auth/sign-up';

// ------------------------------------------------------- //

///Flow Store

import SignInStore from './stores/pages/auth/signin-store'
import HomeStore from './stores/pages/home/home-store';
import ToppingStore from './stores/pages/home/topping-store';
import OrderStore from './stores/pages/home/order-store';
import RevenueStore from './stores/pages/home/revenue-store';
import InforStore from './stores/pages/home/infor-store';
import DetailProduct from './stores/components/product/detail-product';
import DetailTopping from './stores/components/topping/detai-topping';

import SignUpStore from './stores/pages/auth/signup-store'
import InforNewStore from './stores/pages/auth/infor-newstore'
import VerifyStoreLogin from './stores/pages/auth/verify-store-login';
import VerifyStoreRegister from './stores/pages/auth/verify-store-res';
import PaymentStatus from './users/pages/payment/paymentStatus';
import SearchResults from './users/components/listproduct/SearchResults';

import DoanhThu from './stores/pages/home/doanhthu';
import TransactionHistory from './stores/pages/home/transaction-history';
import PointerWallet from './stores/pages/home/pointer-wallet';



// ------------------------------------------------------- //
//////Flow Driver

import OrderDriver from './driver/pages/oder';
import ProfileDriver from './driver/pages/profile';
import LoginDriver from './driver/pages/sign-in-driver';
import CallbackPageDriver from './driver/pages/CallbackPageDriver';
import InforDriver from './driver/pages/register-driver';
import CallbackPageStore from './stores/components/form/CallbackPageStore';

// ------------------------------------------------------- //
//////Flow Admin

import Home from './admin/pages/dashboard/home';
import Store from './admin/pages/dashboard/store';
import Driver from './admin/pages/dashboard/driver';
import Revenue from './admin/pages/dashboard/revenue';
import PointerWalletUser from './users/connect-wallet/pointer-wallet';
import Hihi from './users/pages/detailOfOrder';






// ------------------------------------------------------- //

function App() {

  return (
    <div>
      <StoreProvider>
        <Router>
          <Routes>


            ////Flow User
            < Route path='/' element={<IntroPage/>} />
            < Route path='sign-in' element={<SignIn/>} />
            < Route path='verify-form' element={<VerifyForm/>} />
            < Route path='home-page' element={<HomePage/>} />
            < Route path="/auth/callback" element={<CallbackPage />} />
            < Route path='eatery' element={<Eatery/>} />
            < Route path='eatery-details' element={<EateryDetails/>} />
            < Route path='list-eatery' element={<ListEatery/>} />

            < Route path='cart' element={<Cart/>} />


            < Route path='order-info' element={<OrderInfo/>} />
            < Route path='order' element={<Order/>} />
            < Route path='user-account' element={<UserAccount/>} />



            < Route path='product' element={<Product/>} />
            < Route path='product-detail' element={<ProductDetail/>} />
            < Route path='payment' element={<Payment/>} />
            < Route path='payment-status/:storeId' element={<PaymentStatus/>} />

            < Route path='sign-up' element={<SignUp/>} />
            < Route path='verify-form' element={<VerifyForm/>} />
            < Route path='verify-form' element={<VerifyForm/>} />
            < Route path='pointer-wallet-user' element={<PointerWalletUser/>} />
            < Route path='detail-order' element={<Hihi/>} />

            

            ---------------------------------------------------------------------------------
            ////Flow Store
            
            < Route path='signin-store' element={<SignInStore/>} />
            < Route path='verify-store' element={<VerifyStoreLogin/>} />
            < Route path='verify-store-res' element={<VerifyStoreRegister/>} />

            < Route path='home-store' element={<HomeStore/>} />
            <Route path="/auth-store/callback" element={<CallbackPageStore />} />
            < Route path='topping-store' element={<ToppingStore/>} />
            < Route path='detail-topping' element={<DetailTopping/>} />

            < Route path='order-store' element={<OrderStore/>} />
            < Route path='revenue-store' element={<RevenueStore/>} />
            < Route path='infor-store' element={<InforStore/>} />
            < Route path='detail-product' element={<DetailProduct/>} />
            <Route path="search-results" element={<SearchResults />} />

            < Route path='signup-store' element={<SignUpStore/>} />
            {/* < Route path='verify-store' element={<VerifyStore/>} /> */}
            < Route path='infor-newstore' element={<InforNewStore/>} />

            < Route path='pointer-wallet' element={<PointerWallet/>} />
            < Route path='transaction-history' element={<TransactionHistory/>} />
            < Route path='doanhthu' element={<DoanhThu/>} />


            ---------------------------------------------------------------------------------
            ////Flow Driver
            <Route path="order-driver" element={<OrderDriver></OrderDriver>}/>
            <Route path="profile-driver" element={<ProfileDriver></ProfileDriver>}/>
            <Route path="signin-driver" element={<LoginDriver></LoginDriver>}/>
            <Route path="/auth-driver/callback" element={<CallbackPageDriver />} />
            <Route path="/register-driver" element={<InforDriver />} />

            ---------------------------------------------------------------------------------
            ////Flow Admin

            <Route path="/admin" element={<Home />}>
              <Route path="store" element={<Store />} />
              <Route path="driver" element={<Driver />} />
              <Route path="revenue" element={<Revenue />} />
            </Route>


          </Routes>
        </Router>
      </StoreProvider>
    </div>
  );
}


export default App;
