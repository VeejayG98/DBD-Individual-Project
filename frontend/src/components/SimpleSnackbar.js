import React from "react";
import { Button } from "@mui/material";
import { Snackbar } from "@mui/material";

function SimpleSnackbar({setOpen, open, message}) {

  const action = (
    <div>
      <Button size="small" onClick={() => setOpen(false)}>
        Close
      </Button>
    </div>
  );
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      message={message}
      action={action}
    ></Snackbar>
  );
}
export default SimpleSnackbar;
