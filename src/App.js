import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;  // Show 5 users per page
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/scraped-data");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(search.toLowerCase())
  );

  const displayUsers = filteredData
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item, index) => (
      <tr key={index}>
        <td>{item.username}</td>
        <td>{item.followers}</td>
        <td>{item.likes}</td>
        <td>{item.comments}</td>
        <td>{item.hashtags}</td>
      </tr>
    ));

  const pageCount = Math.ceil(filteredData.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container">
      <h1>Instagram Scraper Data</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by username..."
        value={search}
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Followers</th>
            <th>Likes</th>
            <th>Comments</th>
            <th>Hashtags</th>
          </tr>
        </thead>
        <tbody>{displayUsers}</tbody>
      </table>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default App;
