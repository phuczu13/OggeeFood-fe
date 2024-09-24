import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react';

import IntroPage from "./users/pages/intro-page";
import SignIn from "./users/pages/sign-in";
import SignUp from "./users/pages/sign-up";
import HomePage from './users/pages/home-page';


import SignInStore from "./stores/pages/signin-store";
import SignUpStore from "./stores/pages/signup-store";
import HomeStore from "./stores/pages/home-store";




function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      children:[
        {
          path:'',
          element:<IntroPage></IntroPage>
        },
        {
          path:'sign-in',
          element:<SignIn></SignIn>
        },
        {
          path:'sign-up',
          element:<SignUp></SignUp>
        },
        {
          path:'home-page',
          element:<HomePage></HomePage>
        },
        

        {
          path:'signin-store',
          element:<SignInStore></SignInStore>
        },
        {
          path:'signup-store',
          element:<SignUpStore></SignUpStore>
        },
        {
          path:'home-store',
          element:<HomeStore></HomeStore>
        },

      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
