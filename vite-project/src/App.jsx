import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesPage from "./routes/RoutesPages";
import Navbar2 from "./components/Navbar2";
import Footer from "./components/Footer";


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
