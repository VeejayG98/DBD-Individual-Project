import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import BasicTable from "./components/BasicTable";
import NavBar from "./components/Navbar";
import CheckoutModal from "./components/CheckoutModal";

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
      <TextField
        id="filled-basic"
        label="Search Books"
        variant="filled"
        onChange={handleSearch}
      />
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
