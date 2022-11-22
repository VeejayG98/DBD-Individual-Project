import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const BorrowerForm = ({ setOpenSnackBar, setSignupMessage }) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ssn, setSSN] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [geoState, setGeoState] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  

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

    if (response.status !== 200) {
      const error = await response.text();
      setSignupMessage(error);
    } else {
      setSignupMessage("Borrower added to the system.");
    }
    setOpenSnackBar(true);
  };

  return (
    <div>
      <Grid container alignContent="center" justifyContent="center" padding={2}>
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
          {/* {errorMessage.length !== 0 ? (
            <Grid item>
              <p style={{ color: "red" }}>{errorMessage}</p>
            </Grid>
          ) : (
            <></>
          )} */}
        </Grid>
      </form>
    </div>
  );
};
export default BorrowerForm;
