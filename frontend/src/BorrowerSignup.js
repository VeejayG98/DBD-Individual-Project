import { Card, CardContent, Grid } from "@mui/material";
import { useState } from "react";
import BorrowerForm from "./components/BorrowerForm";
import NavBar from "./components/Navbar";
import SimpleSnackbar from "./components/SimpleSnackbar";

const BorrowerSignup = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");

  return (
    <div>
      <NavBar />
      <Grid container alignContent="center" justifyContent="center" padding={2}>
        <Grid item>
          <Card sx={{ minWidth: 450 }}>
            <CardContent>
              <BorrowerForm
                setOpenSnackBar={setOpenSnackBar}
                setSignupMessage={setSignupMessage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <SimpleSnackbar
        setOpen={setOpenSnackBar}
        open={openSnackBar}
        message={signupMessage}
      />
    </div>
  );
};
export default BorrowerSignup;
