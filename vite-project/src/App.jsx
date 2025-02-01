import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesPage from "./routes/RoutesPages";

function App() {
  return (
    <>
      <Router>
        <RoutesPage />
      </Router>
    </>
  );
}

export default App;
