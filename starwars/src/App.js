import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  let [page, setPage] = useState('planets');

  return (
    <>
      <div className="App">
      <h1>Star Wars Info</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          <QueryClientProvider client={queryClient}>
            { page === 'planets' ? <Planets /> : <People /> }
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </div>
      </div>
    </>
  );
}

export default App;
