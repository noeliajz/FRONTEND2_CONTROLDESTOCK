import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesPage from "./routes/RoutesPages";
import Navbar2 from "./components/Navbar2";
import Footer from "./components/Footer";
import { useState } from "react";


function App() {
  const [auth, setAuth] = useState(false)

  const Login=()=>{
    setAuth(true)
  }
  const LoginAuth = () =>{
    setAuth(false)
  }
  return (
    <>
      <Router>
        <Navbar2 Login={Login} LoginAuth={LoginAuth} auth={auth}/>
        <RoutesPage />
        <Footer/>
      </Router>
    </>
  );
}

export default App;
