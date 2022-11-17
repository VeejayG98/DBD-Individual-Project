import { useEffect, useState } from "react";
import LoansTable from "./components/LoansTable";
import { TextField } from "@mui/material";
import NavBar from "./components/Navbar";

function CheckIn() {
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/loans/all", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setLoans(data));
  }, []);

  useEffect(() => {
    console.log(loans);
  }, [loans]);

  const getLoansSearch = () => {
    fetch(`http://127.0.0.1:5000/loans/search`, {
      method: "POST",
      body: JSON.stringify({
        search: search,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoans(data);
      });
  };

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    getLoansSearch();
  }, [search]);

  return (
    <div>
      <NavBar />
      <TextField
        id="filled-basic"
        label="Search Books Loans"
        variant="filled"
        onChange={handleSearch}
      />
      <div style={{ margin: "20px" }}>
        <LoansTable loans={loans} getLoansSearch={getLoansSearch} />
      </div>
    </div>
  );
}
export default CheckIn;
