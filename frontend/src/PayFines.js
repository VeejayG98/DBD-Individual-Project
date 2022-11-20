import { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import PayFinesTable from "./components/PayFinesTable";

function PayFines() {
  const [userFines, setUserFines] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/fines/users", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUserFines(data));
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ margin: "20px" }}>
        <PayFinesTable userFines={userFines} />
      </div>
    </div>
  );
}
export default PayFines;
