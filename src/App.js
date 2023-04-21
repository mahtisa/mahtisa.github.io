import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";

import AuthContext from "./provider/AuthContext";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Panel from "./pages/panel/Panel";
import Register from "./pages/register/Register";
import RegisterContact from "./pages/register/RegisterContact";
import RegisterLocation from "./pages/register/RegisterLocation";
import RegisterPerson from "./pages/register/RegisterPerson";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function App() {
  const [personCircle, setPersonCircle] = useState("");
  const [contactCircle, setContactCircle] = useState("");
  const [contactText, setContactText] = useState("");
  const [locationCircle, setLocationCircle] = useState("");
  const [locationText, setLocationText] = useState("");
  return (
    <AuthContext>
      <div className="App">
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route
            path="register"
            element={
              <Register
                setPersonCircle={setPersonCircle}
                setContactCircle={setContactCircle}
                setLocationCircle={setLocationCircle}
                setContactText={setContactText}
                setLocationText={setLocationText}
              />
            }
          >
            <Route
              path=""
              element={<RegisterPerson personCircle={personCircle} />}
            />
            <Route
              path="contact"
              element={
                <RegisterContact
                  contactCircle={contactCircle}
                  contactText={contactText}
                />
              }
            />
            <Route
              path="location"
              element={
                <RegisterLocation
                  locationCircle={locationCircle}
                  locationText={locationText}
                />
              }
            />
          </Route>
          <Route path="panel" element={<Panel />}>
            <Route path="" element={<Panel />} />
          </Route>
          <Route
            path="*"
            element={<NotFound/>}
          />
        </Routes>

        <ToastContainer />
      </div>
    </AuthContext>
  );
}

export default App;
