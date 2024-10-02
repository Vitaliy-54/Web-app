import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import { Container } from "@mui/material";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;