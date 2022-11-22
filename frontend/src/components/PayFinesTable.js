import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import SimpleSnackbar from "./SimpleSnackbar";

const PayFinesTable = ({ userFines, getUserFines }) => {

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  const handlePayFines = async(event) => {
    const response = await fetch("http://127.0.0.1:5000/fines/payment", {
      method: "POST",
      body: JSON.stringify({
        card_id: event.target.id
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    if(response.status !== 200){
      const error = await response.text()
      setPaymentMessage(error);
    }
    else{
      setPaymentMessage("Payment Successful");
    }
    getUserFines();
    setOpenSnackBar(true);
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Fines Due</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userFines.map((user) => (
              <TableRow
                key={user.CARD_ID}
                sx={{ "&:last-child td, &:last-chlild th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {user.FIRST_NAME}
                </TableCell>
                <TableCell align="center">{user.LAST_NAME}</TableCell>
                <TableCell align="center">{user.FINES_DUE}</TableCell>
                <TableCell aligh="center">
                  <Button
                    variant="contained"
                    id={user.CARD_ID}
                    onClick={handlePayFines}
                  >
                    Pay Fines
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SimpleSnackbar
            setOpen={setOpenSnackBar}
            open={openSnackBar}
            message={paymentMessage}
          />
    </div>
  );
};
export default PayFinesTable;
