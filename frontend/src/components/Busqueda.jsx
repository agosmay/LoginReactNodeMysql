import React, { useState, useEffect } from "react";

const Busqueda = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const URL = "https://jsonplaceholder.typicode.com/users";

  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setUsers(data);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  /*let results = [];

  if (!search) {
    results = users;
  } else {
    results = users.filter((dato) =>
      dato.name.toLowerCase().includes(search.toLowerCase())
    );
  }*/
  
  let results = []
  
  !search ? results=users : results = users.filter((dato)=> dato.name.toLowerCase().includes(search.toLowerCase()));
  
  

  useEffect(() => {
    showData();
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          name="search"
          onChange={handleChange}
          value={search}
        />
      </div>

      <table className="table table-striped table-hover mt-5 shadow-lg">
        <thead>
          <tr className="bg-curso text-white">
            <th>NAME</th>
            <th>USER NAME</th>
          </tr>
        </thead>
        <tbody>
          {results.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Busqueda;