import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Router from "./ruter/Router";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const App = () => {
  return <>
    <ToastContainer position="bottom-left"/>
    <Navbar />
    <Router />
  </>;
};

export default App;
