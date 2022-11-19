import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useState } from "react";
import NavBar from "./components/Navbar";
import "./test.css";

const BorrowerSignup = () => {
  // const useStyles = {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     justifyContent: 'center'
  //   };

  const Form = () => {
    // const classes = useStyles();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [ssn, setSSN] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [geoState, setGeoState] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    return (
      <div>
        <Grid container alignContent="center" justifyContent="center" padding={2}>
          <Grid item>
            <Typography variant="h5">Borrower Signup</Typography>
          </Grid>
        </Grid>
        <form>
          <Grid container direction="column" alignContent="center" spacing={2}>
            <Grid item>
              <TextField
                label="First Name"
                variant="outlined"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Last Name"
                variant="outlined"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>
        </form>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <Form />
    </div>
  );
};
export default BorrowerSignup;
