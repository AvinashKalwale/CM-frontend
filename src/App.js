import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ImportUI from "./import/ImportUI";
import { AuthProvider } from "../src/useauth/Useauth";
import Signup from "./signup/Signup";
import Login from "./login/Login";
// import UnAuthorize from "./unauthorize/UnAuthorize"
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            <AuthProvider>
              {" "}
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path="/contact"
          element={
            <AuthProvider>
              <ImportUI />
            </AuthProvider>
          }
        />
        <Route path="*" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
