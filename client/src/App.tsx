import React from 'react';
import PageRouters from './routers/PageRouters';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Outlet } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import SearchModel from './components/SearchModel';

import './App.scss';

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
