import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
} from "@mui/material";
import { Paper } from "@mui/material";

const ViewFinesTable = ({ fines }) => {
  return (
    <div>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Loan ID</TableCell>
              <TableCell align="center">Fine Amount</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines.map((fine) => (
              <TableRow
                key={fine.LOAN_ID}
                sx={{ "&:last-child td, &:last-chlild th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {fine.LOAN_ID}
                </TableCell>
                <TableCell align="center">{fine.FINE_AMT}</TableCell>
                <TableCell align="center">{fine.PAID? "Paid" : "Not Paid"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewFinesTable;
