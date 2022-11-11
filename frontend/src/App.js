import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import BasicTable from "./components/BasicTable";
import NavBar from "./components/Navbar";


function App() {
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ISBN13, setISBN] = useState("");
  const [cardID, setCardID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = (event) => {
    setModalOpen(true);
    setISBN(event.target.id);
  };
  const handleClose = () => {
    setErrorMessage("");
    setModalOpen(false);
  };

  function handleSearch(event) {
    fetch(`http://127.0.0.1:5000/books/search?search=${event.target.value}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.splice(0, 50));
      });
  }

  const handleCheckout = () => {
    fetch(`http://127.0.0.1:5000/books/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        isbn13: ISBN13,
        card_id: cardID,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200)
          res.json().then((data) => setErrorMessage(data['error']));
      })
      .catch((error) => {

        console.log(error.message);
        setErrorMessage(error.message);
      });
  }

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
      <NavBar/>
      <TextField
        id="filled-basic"
        label="Search Books"
        variant="filled"
        onChange={handleSearch}
      />
      <BasicTable books={books} handleOpen={handleOpen} />

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter your Card ID to borrow the book!
          </Typography>
          <Box>
            <TextField
              required
              id="outlined-required"
              label="Card ID"
              onChange={(e) => {
                setCardID(e.target.value);
                setErrorMessage("");
              }}
              // defaultValue="Card ID"
            />
            <Button variant="contained" onClick={handleCheckout}>
              Check Out
            </Button>
            {errorMessage.length !== 0 ? <p style={{color: 'red'}}>{errorMessage}</p> : <></>}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}



export default App;
