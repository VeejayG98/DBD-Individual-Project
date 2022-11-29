import { useEffect, useState } from "react";
import LoansTable from "./components/LoansTable";
import { Grid, TextField, Typography } from "@mui/material";
import NavBar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

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
      <Grid
        container
        direction="column"
        alignContent="center"
        justifyContent="center"
        margin={2}
      >
        <Grid item sx={{ mx: "auto" }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "medium", marginBottom: 5, marginTop: 2 }}
          >
            Check in a book
          </Typography>
        </Grid>
        <Grid item>
          <SearchBar placeholder="Search Book Loans" onChange={handleSearch} />
        </Grid>
      </Grid>
      <div style={{ margin: "20px" }}>
        <LoansTable loans={loans} getLoansSearch={getLoansSearch} />
      </div>
    </div>
  );
}
export default CheckIn;
