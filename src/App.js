import { useEffect } from "react";
import css from "./App.module.scss";
import { useTG } from "./hooks/useTG";





function App() {
  const {onToggleButton, tg} = useTG();


  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className={css.app}>
      <button onClick={onToggleButton}></button>
    </div>
  );
}

export default App;
