import React, { ChangeEvent, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ScoreTable from "./components/ScoreTable";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

function App() {
  const [showRatings, updateShowRatings] = useState(false);

  const handleShowRatingsChanges = () => {
    updateShowRatings(!showRatings);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={handleShowRatingsChanges} />}
            label="Show ratings?"
          />
        </FormGroup>
      </div>

      <ScoreTable showRatings={showRatings} />
    </>
  );
}

export default App;
