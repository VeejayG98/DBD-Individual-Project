import { useEffect, useState } from "react";
import LoansTable from "./components/LoansTable";
import NavBar from "./components/Navbar";

function CheckIn() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/loans/all", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setLoans(data));
  }, []);

  useEffect(() => {
    console.log(loans)
  }, [loans])

  return (
    <div>
      <NavBar />
      <LoansTable loans={loans} />
    </div>
  );
}
export default CheckIn;
