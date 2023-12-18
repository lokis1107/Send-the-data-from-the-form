import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [age, setAges] = useState("");
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  console.log(data);

  const coloum = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "EMail",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
  ];

  const handleFilter = (event) => {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const collectData = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:4000/", {
      method: "post",
      body: JSON.stringify({ name, email, age }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json;
    localStorage.setItem("users", JSON.stringify(result));
  };

  return (
    <>
      <div className="flex-1 items-center justify-center">
        <form className="p-5" onSubmit={collectData}>
          <div>
            <h2 className="p-2 text-2xl font-bold ml-10">User Form</h2>
          </div>
          <div>
            <h3 className="text-xl font-bold">Name</h3>
            <input
              type="text"
              placeholder="Enter your name"
              className="p-2 border border-black rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-bold">Email</h3>
            <input
              type="email"
              placeholder="Enter your mail"
              className="p-2 border border-black rounded-xl"
              value={email}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-bold">Age</h3>
            <input
              type="text"
              placeholder="Enter your Age"
              className="p-2 border border-black rounded-xl"
              value={age}
              onChange={(e) => setAges(e.target.value)}
            />
          </div>
          <button type="submit" className="p-2 border mt-5">
            Submit
          </button>
        </form>
      </div>

      {/* Table Part */}

      <div>
        <div className="mx-80 mt-10">
          <div className=" text-end">
            <input placeholder="Search" type="text" onChange={handleFilter} />
          </div>
          <DataTable
            columns={coloum}
            data={records}
            selectableRows
            fixedHeader
            pagination
            noContextMenu
          ></DataTable>
        </div>
      </div>
    </>
  );
};

export default App;
