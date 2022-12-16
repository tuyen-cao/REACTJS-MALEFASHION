import React from 'react';
import PageRouters from './routers/PageRouters';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.scss';
/* <!-- Css Styles --> */

import "./assets/css/font-awesome.min.css"
import './assets/css/elegant-icons.css'
import "./assets/css/magnific-popup.css"
import "./assets/css/nice-select.css"
import "./assets/css/owl.carousel.min.css"
import "./assets/css/slicknav.min.css"

import './sass/style.scss'

import {  Outlet } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import SearchModel from './components/SearchModel';

const queryClient = new QueryClient()

const App: React.FC = () => {
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
