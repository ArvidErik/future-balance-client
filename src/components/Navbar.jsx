import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/ErikArvidHosszu.png";
import { AppBar, useTheme } from "@mui/material";

function Navbar() {
  const dispatch = useDispatch();
  const theme = useTheme();

  return <AppBar>

  </AppBar>;
}

export default Navbar;
