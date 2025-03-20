// src/App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/theme";
import Sidebar from "./components/Sidebar";
import TasksPage from "./pages/TasksPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Sidebar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <button onClick={() => setDarkMode(!darkMode)}>
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
