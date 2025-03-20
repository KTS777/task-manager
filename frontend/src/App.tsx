// src/App.tsx
import { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/theme";
import Sidebar from "./components/Sidebar";
import TasksPage from "./pages/TasksPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Create Theme Context
export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Function to toggle dark mode and store preference
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Router>
          <Sidebar />
          <div style={{ marginLeft: "250px", padding: "20px" }}>
            <Routes>
              <Route path="/" element={<TasksPage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
