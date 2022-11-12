// import "./App.css";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";

const BasicTable = ({ books, handleOpen }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ISBN</TableCell>
            <TableCell align="right">Book Title</TableCell>
            <TableCell align="right">Book Author</TableCell>
            <TableCell align="right">Book Availability</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
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
              <TableCell align="right">{book.TITLE}</TableCell>
              <TableCell align="right">{book.NAME}</TableCell>
              <TableCell align="right">
                {book.AVAILABLE ? "Yes" : "No"}
              </TableCell>
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
export default BasicTable;
