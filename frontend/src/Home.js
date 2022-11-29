import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import BasicTable from "./components/BasicTable";
import NavBar from "./components/Navbar";
import CheckoutModal from "./components/CheckoutModal";
import SearchBar from "./components/SearchBar";

function Home() {
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ISBN13, setISBN] = useState("");
  const [search, setSearch] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const handleOpen = (event) => {
    setModalOpen(true);
    setISBN(event.target.id);
  };
  const handleClose = () => {
    setModalOpen(false);
    setISBN("");
  };

  const getBookSearch = () => {
    console.log("Searching...");
    fetch(`http://127.0.0.1:5000/books/search?search=${search}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.splice(0, 50));
      });
  };

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    getBookSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books/all", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.splice(0, 50));
      });
  }, []);

  useEffect(() => {
    console.log(books.slice(0, 10));
  }, [books]);

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
            Check out a book
          </Typography>
        </Grid>
        <Grid item>
          <SearchBar placeholder="Search for Books" onChange={handleSearch} />
        </Grid>
      </Grid>
      <div style={{ margin: "20px" }}>
        <BasicTable
          books={books}
          handleOpen={handleOpen}
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
          checkoutMessage={checkoutMessage}
        />
        <CheckoutModal
          modalOpen={modalOpen}
          handleClose={handleClose}
          getBookSearch={getBookSearch}
          setOpenSnackBar={setOpenSnackBar}
          setCheckoutMessage={setCheckoutMessage}
          ISBN13={ISBN13}
        />
      </div>
    </div>
  );
}

export default Home;
