import { useEffect, useState } from "react";
import LoansTable from "./components/LoansTable";
import { TextField } from "@mui/material";
import NavBar from "./components/Navbar";

function CheckIn() {
  const [loans, setLoans] = useState([]);

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

  function handleSearch(event) {
    fetch(`http://127.0.0.1:5000/loans/search`, {
      method: "POST",
      body: JSON.stringify({
        search: event.target.value
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
  }

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
        <LoansTable loans={loans} />
      </div>
    </div>
  );
}
export default CheckIn;
