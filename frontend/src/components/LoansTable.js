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

const LoansTable = ({ loans }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleCheckIn = (event) => {
    console.log(event.target.id);
    fetch("http://127.0.0.1:5000/books/checkin", {
      method: "POST",
      body: JSON.stringify({
        loan_id: event.target.id,
      }),
      headers: {
        "Content-Type": "application/json",
        // "Accept": "application/json"
      },
    });

    setOpenSnackBar(true);
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
          <TableHead>
            <TableCell align="right">Loan ID</TableCell>
            <TableCell align="right">Card ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Book ID</TableCell>
            <TableCell align="right">Date Out</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right"></TableCell>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow
                key={loan.LOAN_ID}
                sx={{ "&:last-child td, &:last-chlild th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {loan.LOAN_ID}
                </TableCell>
                <TableCell align="right">{loan.CARD_ID}</TableCell>
                <TableCell align="right">{loan.FIRST_NAME}</TableCell>
                <TableCell align="right">{loan.LAST_NAME}</TableCell>
                <TableCell align="right">{loan.ISBN13}</TableCell>
                <TableCell align="right">{loan.DATE_OUT}</TableCell>
                <TableCell align="right">{loan.DUE_DATE}</TableCell>
                <TableCell aligh="right">
                  <Button
                    variant="contained"
                    id={loan.LOAN_ID}
                    onClick={handleCheckIn}
                  >
                    Check In
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SimpleSnackbar setOpen={setOpenSnackBar} open={openSnackBar} />
    </div>
  );
};
export default LoansTable;
