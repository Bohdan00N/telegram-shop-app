import { useEffect } from "react";
import "./App.css";
import { useTG } from "./hooks/useTG";





function App() {
  const {onToggleButton, tg} = useTG();


  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="App">
      <button onClick={onToggleButton}></button>
    </div>
  );
}

export default App;
