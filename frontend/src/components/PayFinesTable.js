import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";

const PayFinesTable = ({ userFines }) => {
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
                    // onClick={handleCheckIn}
                  >
                    Pay Fines
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <SimpleSnackbar
            setOpen={setOpenSnackBar}
            open={openSnackBar}
            message={checkinMessage}
          /> */}
    </div>
  );
};
export default PayFinesTable;
