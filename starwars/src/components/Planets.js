import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (page) => {
  const res = await fetch(`http://swapi.dev/api/planets?page=${page}`);
  return res.json();
}

const Planets = () => {
  const [ page, setPage ] = useState(1);

  const { data, status, isPreviousData } = useQuery({
    queryKey: ['planets', page],
    queryFn: () => fetchPlanets(page),
  });

  return (
    <div>
      <h2>Planets</h2>

      {/* <button onClick={() => setPage(1)}>page 1</button>
      <button onClick={() => setPage(2)}>page 2</button>
      <button onClick={() => setPage(3)}>page 3</button> */}

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <>
          <button
            onClick={() => setPage(old => Math.max(old - 1, 1))}
            disabled={page === 1}>Previous Page</button>
          <span>{page}</span>
          <button
            onClick={() => {
              if (!isPreviousData && data.next) {
                setPage(old => old + 1)
              }
            }}
            // Disable the Next Page button until we know a next page is available
            disabled={isPreviousData || !data?.next}
          >
            Next Page
          </button>
          <div>
            {data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
          </div>
        </>
      )} 
    </div>
  );
}
 
export default Planets;