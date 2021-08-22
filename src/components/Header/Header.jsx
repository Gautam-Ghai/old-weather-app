import React, { useEffect } from "react";
import SearchBar from "../../utils/SearchBar/SearchBar";
import "./Header.scss";

//Material-UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ReplayIcon from "@material-ui/icons/Replay";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";

function Header({ theme, setTheme, setUnits, load, city, setCity, onSubmit }) {
  useEffect(() => {
    if (theme) {
      document.getElementById("head").classList.add("dark-mode");
      document.getElementById("selectValue").classList.add("dark-mode");
    } else {
      document.getElementById("head").classList.remove("dark-mode");
      document.getElementById("selectValue").classList.remove("dark-mode");
    }
  }, [theme]);
  return (
    <AppBar elevation={0} id="head">
      <Toolbar className="head__wrapper">
        <Tooltip title="Units" placement="left">
          <Select
            labelId="selectValue"
            id="selectValue"
            variant="outlined"
            autoWidth
            defaultValue="metric"
            onChange={(e) => setUnits(e.target.value)}
          >
            <MenuItem value="metric">C°</MenuItem>
            <MenuItem value="imperial">F°</MenuItem>
          </Select>
        </Tooltip>
        <Hidden xsDown>
          <SearchBar city={city} setCity={setCity} onSubmit={onSubmit} />
        </Hidden>

        <Tooltip title="Reload" aria-label="reload">
          <IconButton
            color="inherit"
            onClick={() => {
              load();
              setCity("");
            }}
          >
            <ReplayIcon />
          </IconButton>
        </Tooltip>

        <div>
          <Tooltip title="Mode" aria-label="change mode">
            <IconButton onClick={() => setTheme(!theme)} color="inherit">
              {theme ? <WbSunnyIcon /> : <NightsStayIcon />}
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
