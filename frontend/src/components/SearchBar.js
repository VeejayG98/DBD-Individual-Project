import React, { useEffect, useState } from "react";
import { Box, IconButton, Input, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ placeholder, onChange }) {
  return (
    <Paper sx={{ minWidth: 650 }}>
      <Box sx={{ display: "flex", alignItems: "center" }} padding={1}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Input fullWidth placeholder={placeholder} disableUnderline onChange={onChange} />
      </Box>
    </Paper>
  );
}
export default SearchBar;
