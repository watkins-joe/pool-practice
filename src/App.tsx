import React, { ChangeEvent, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ScoreTable from "./components/ScoreTable";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

function App() {
  return (
    <>
      <ScoreTable />
    </>
  );
}

export default App;
