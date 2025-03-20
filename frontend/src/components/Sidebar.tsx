import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: ${({ theme }) => theme.sidebarBg};
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.1);
  border-right: 3px solid ${({ theme }) => theme.border}; /* Soft pastel border */
`;

const SidebarItem = styled(Link)<{ $active: boolean }>`
  padding: 15px;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  background: ${({ $active, theme }) =>
    $active ? theme.activeBg : "transparent"};
  border-radius: 12px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBg};
    transform: scale(1.02);
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
`;

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <Title>🌸 Task Manager</Title>
      <SidebarItem to="/" $active={location.pathname === "/"}>
        🏠 Dashboard
      </SidebarItem>
      <SidebarItem to="/tasks" $active={location.pathname === "/tasks"}>
        📋 Tasks
      </SidebarItem>
      <SidebarItem to="/settings" $active={location.pathname === "/settings"}>
        ⚙️ Settings
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
