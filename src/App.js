import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "pages/dashboard"
import Login from "pages/login"
import Signup from "pages/signup";
import Layout from "pages/layout"
import Logout from "pages/logout";
import Transactions from "pages/transactions";
import { useEffect } from "react";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const [username, setUsername] = useState("")

  useEffect(()=>{
    const user = localStorage.getItem('username')
    if (user) {
      setUsername(user)
    }
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout username={username} />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard username={username} />} />
              <Route path="/login" element={<Login setUsername={setUsername} />} />
              <Route path="/logout" element={<Logout setUsername={setUsername} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/transactions" element={<Transactions/>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
