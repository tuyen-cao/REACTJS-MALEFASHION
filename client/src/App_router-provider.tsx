import React from 'react';
import PageRouters from './routers/PageRouters';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.scss';
/* <!-- Css Styles --> */

import "./css/font-awesome.min.css"
import "./css/elegant-icons.css"
import "./css/magnific-popup.css"
import "./css/nice-select.css"
import "./css/owl.carousel.min.css"
import "./css/slicknav.min.css"

import './sass/style.scss'

import { RouterProvider } from 'react-router-dom'
import router from './routers/router'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
}

export default App;
