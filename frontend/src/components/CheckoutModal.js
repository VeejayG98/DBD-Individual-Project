import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";

function CheckoutModal({ modalOpen, handleClose, getBookSearch, ISBN13 }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [cardID, setCardID] = useState("");

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

  const handleSubmit = (event) => {
    setCardID(event.target.value);
    setErrorMessage("");
  };

  const handleCheckout = async () => {
    const response = await fetch(`http://127.0.0.1:5000/books/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        isbn13: ISBN13,
        card_id: cardID,
      }),
    });
    if (response.status !== 200) {
      const errorJson = await response.json();
      setErrorMessage(errorJson["error"]);
    } else {
      getBookSearch();
    }
  };

  return (
    <div>
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
          <Box>
            <TextField
              required
              id="outlined-required"
              label="Card ID"
              onChange={handleSubmit}
            />
            <Button variant="contained" onClick={handleCheckout}>
              Check Out
            </Button>
            {errorMessage.length !== 0 ? (
              <p style={{ color: "red" }}>{errorMessage}</p>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
export default CheckoutModal;
