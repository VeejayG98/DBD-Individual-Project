import logo from "./logo.svg";
import "./App.css";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
// import InputBase from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// import Sea
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
      // .then((res) => res.json())
      // .then((res) => {
      //   if("error" in res){
      //     setErrorMessage(res['error']);
      //     console.log(errorMessage);
      //   }
      // })
      .then((res) => {
        console.log(res);
        if (res.status !== 200)
          // throw new Error(res.statusText);
          res.json().then((data) => setErrorMessage(data['error']));
      })
      .catch((error) => {

        console.log(error.message);
        setErrorMessage(error.message);
      });

    // .then((res) => {
    //   let error = false;
    //   if(!res.ok){
    //     // errorMessage = res;
    //     error = true;
    //   }
    //   res = res.json()
    //   console.log(res);
    //   return res, error;
    // })
    // .then((res, error) => {
    //   if(error === true){
    //     console.log(res);
    //     setErrorMessage(res);
    //   }
    // })
    // .then((data) => setErrorMessage(data));
    // .catch((error) => {
    //   setErrorMessage(error);
    //   console.log(error);
    // })
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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter your Card ID to borrow the book!
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
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

const BasicTable = ({ books, handleOpen }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableCell align="right">ISBN</TableCell>
          <TableCell align="right">Book Title</TableCell>
          <TableCell align="right">Book Author</TableCell>
          <TableCell align="right">Book Availability</TableCell>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow
              key={book.ISBN13}
              sx={{ "&:last-child td, &:last-chlild th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {book.ISBN13}
              </TableCell>
              {/* <TableCell align='right'>{book.ISBN13}</TableCell> */}
              <TableCell align="right">{book.TITLE}</TableCell>
              <TableCell align="right">{book.NAME}</TableCell>
              <TableCell align="right">{book.AVAILABLE ? "Yes":"No"}</TableCell>
              <TableCell aligh="right">
                <Button
                  variant="contained"
                  id={book.ISBN13}
                  onClick={handleOpen}
                >
                  Check Out
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default App;
