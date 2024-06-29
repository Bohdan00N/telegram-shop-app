import { useEffect } from "react";
import css from "./App.module.scss";
import { useTG } from "./hooks/useTG";
import { Button } from "./components/Button/Button";





function App() {
  const {onToggleButton, tg} = useTG();


  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className={css.app}>
      <Button onClick={onToggleButton}>Toggle</Button>
    </div>
  );
}

export default App;
