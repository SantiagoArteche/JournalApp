import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
function JournalApp() {
  return (
    <AppTheme>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppTheme>
  );
}

export default JournalApp;
