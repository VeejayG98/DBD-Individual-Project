// import "./App.css";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import SimpleSnackbar from "./SimpleSnackbar";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { green, red } from "@mui/material/colors";

const BasicTable = ({ books, handleOpen, openSnackBar, setOpenSnackBar, checkoutMessage }) => {

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ISBN</TableCell>
              <TableCell align="center">Book Title</TableCell>
              <TableCell align="center">Book Author</TableCell>
              <TableCell align="center">Book Availability</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.ISBN13}
                sx={{ "&:last-child td, &:last-chlild th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {book.ISBN13}
                </TableCell>
                <TableCell align="center" sx={{minWidth: 750, maxWidth: 750}}>{book.TITLE}</TableCell>
                <TableCell align="center">{book.NAME}</TableCell>
                <TableCell align="center">
                  {book.AVAILABLE ? <CheckRoundedIcon sx={{color: green[600]}} /> : <CloseRoundedIcon sx={{color: red[600]}} />}
                </TableCell>
                <TableCell aligh="center">
                  <Button
                    variant="contained"
                    id={book.ISBN13}
                    onClick={handleOpen}
                    style={{width: 119, height: 36.5}}
                  >
                    Check Out
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
        message={checkoutMessage}
      />
    </div>
  );
};
export default BasicTable;
