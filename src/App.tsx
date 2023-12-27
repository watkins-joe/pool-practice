import { useEffect } from "react";
import "./App.css";
import ScoreTable from "./components/ScoreTable";

function App() {
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    return (event.returnValue = "");
  };

  return <ScoreTable />;
}

export default App;
