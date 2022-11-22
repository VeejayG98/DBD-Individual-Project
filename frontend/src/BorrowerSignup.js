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
      <BorrowerForm
        setOpenSnackBar={setOpenSnackBar}
        setSignupMessage={setSignupMessage}
      />
      <SimpleSnackbar
        setOpen={setOpenSnackBar}
        open={openSnackBar}
        message={signupMessage}
      />
    </div>
  );
};
export default BorrowerSignup;
