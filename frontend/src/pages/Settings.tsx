// src/pages/Settings.tsx
import { useContext, useState } from "react";
import { ThemeContext } from "../App"; // Import ThemeContext
import styled from "styled-components"

const Container = styled.div`
  padding: 30px;
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SettingOption = styled.div`
  background: ${({ theme }) => theme.primary};
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  font-size: 14px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
`;

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.buttonBg};
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;

const Settings = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [defaultStatus, setDefaultStatus] = useState("TODO");

  return (
    <Container>
      <h2>⚙️ Settings</h2>

      <SettingOption>
        <Label>Dark Mode</Label>
        <ToggleButton onClick={toggleDarkMode}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </ToggleButton>
      </SettingOption>
      <SettingOption>
        <Label>Default Task Status</Label>
        <Select
          value={defaultStatus}
          onChange={(e) => setDefaultStatus(e.target.value)}
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </Select>
      </SettingOption>
    </Container>
  );
};

export default Settings;
