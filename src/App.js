import "./styles.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Login from "./components/login";
import Reset from "./components/reset";
import Dashboard from "./components/Dashboard.js";
//import Preferences from "./components/Preferences/Preferences";
import RegisterForm from "./components/register";
import UpdateInfo from "./components/updateProfile.js";
import CheckIn from "./components/check_inMatin.js";
import Admin from "./components/admin.js";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/home" element={<Login />} />
          <Route exact path="/checkin" element={<CheckIn />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/profile" element={<UpdateInfo />} />
          <Route exact path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
