import { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import ViewFinesTable from "./components/ViewFinesTable";

function ViewFines() {
  const [fines, setFines] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/fines/all", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFines(data));
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ margin: "20px" }}>
        <ViewFinesTable fines={fines} />
      </div>
    </div>
  );
}

export default ViewFines;
