// import axios from "axios";
// import { useState, useEffect } from "react";

// import Table from "./Table";
// import "./App.css";

// function App() {
//   // data state to store the TV Maze API data. Its initial value is an empty array
//   const [data, setData] = useState([]);

//   // Using useEffect to call the API once mounted and set the data
//   useEffect(() => {
//     (async () => {
//       const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
//       setData(result.data);
//     })();
//   }, []);

//   return <div className="App"></div>;
// }
// export default App;

import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";

import Table from "./Table";
import "./App.css";

const Genres = ({ values }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {values.map((genre, idx) => {
        return (
          <span key={idx} className="badge">
            {genre}
          </span>
        );
      })}
    </>
  );
};

function App() {
  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "TV Show",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "show.name",
          },
          {
            Header: "Type",
            accessor: "show.type",
          },
        ],
      },
      {
        // Second group - Details
        Header: "Details",
        // Second group columns
        columns: [
          {
            Header: "Language",
            accessor: "show.language",
          },
          {
            Header: "Genre(s)",
            accessor: "show.genres",

            Cell: ({ cell: { value } }) => <Genres values={value} />
          },
          {
            Header: "Runtime",
            accessor: "show.runtime",

            Cell: ({ cell: { value } }) => {

              const hour = Math.floor(value/60);
              const min = Math.floor(value%60);
            }
          },
          {
            Header: "Status",
            accessor: "show.status",
          },
        ],
      },
    ],
    []
  );

  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios.get("https://api.tvmaze.com/search/shows?q=hello");
      setData(result.data);
      //console.log("rendered?")
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}
export default App;