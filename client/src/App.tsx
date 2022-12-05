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

import { BrowserRouter, Outlet } from 'react-router-dom'
import router from './routers/router'
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';
import SearchModel from './components/SearchModel';

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        
          <Header />
         
          <PageRouters />
          <Outlet />
          <Footer />
          <SearchModel />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
}

export default App;
