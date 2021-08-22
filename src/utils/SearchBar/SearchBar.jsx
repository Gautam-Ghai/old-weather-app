import React from "react";
import "./SearchBar.scss";

//Material-UI
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

function SearchBar({ city, setCity, onSubmit }) {
  return (
    <Paper className="searchBar" elevation={0}>
      <InputBase
        className="input"
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />
      <IconButton
        className="iconButton"
        aria-label="search"
        color="inherit"
        onClick={() => onSubmit(city)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
