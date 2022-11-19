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
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://127.0.0.1:5000/borrowers/addnew", {
        method: "POST",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          ssn: ssn,
          address: address,
          city: city,
          state: geoState,
          phone: phone,
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if(response.status !== 200){
        const error = await response.text();
        setErrorMessage(error);
      }
    };

    return (
      <div>
        <Grid
          container
          alignContent="center"
          justifyContent="center"
          padding={2}
        >
          <Grid item>
            <Typography variant="h5">Borrower Signup</Typography>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
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
            <Grid item>
              <TextField
                label="SSN"
                variant="outlined"
                required
                onChange={(e) => setSSN(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Address"
                variant="outlined"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="City"
                variant="outlined"
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="State"
                variant="outlined"
                required
                onChange={(e) => setGeoState(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Phone Number"
                variant="outlined"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
            {errorMessage.length !== 0 ?
            <Grid item>
              <p style={{ color: "red" }}>{errorMessage}</p>
            </Grid>:<></>
            }
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
