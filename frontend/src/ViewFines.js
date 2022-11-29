import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import ViewFinesTable from "./components/ViewFinesTable";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

function ViewFines() {
  const [fines, setFines] = useState([]);

  const getFines = () => {
    fetch("http://127.0.0.1:5000/fines/all", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFines(data));
  };

  useEffect(() => {
    getFines();
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "right", margin: "10px" }}>
        <IconButton onClick={getFines}>
          <RefreshRoundedIcon fontSize="large" />
        </IconButton>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
      <Typography
        variant="h2"
        sx={{ fontWeight: "medium", marginBottom: 5, marginTop: 2 }}
      >
        View all fines
      </Typography>
      </div>
      <div style={{ margin: "20px" }}>
        <ViewFinesTable fines={fines} />
      </div>
    </div>
  );
}

export default ViewFines;
