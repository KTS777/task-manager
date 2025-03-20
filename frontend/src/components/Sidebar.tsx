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
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.1);
  border-right: 3px solid ${({ theme }) => theme.border};
`;

const SidebarItem = styled(Link)<{ isActive: boolean }>`
  padding: 15px;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  background: ${({ isActive, theme }) =>
    isActive ? theme.activeBg : "transparent"};
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
  text-align: center;
`;

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { path: "/", label: "📋 Tasks" }, // Tasks page is now the home page
    { path: "/settings", label: "⚙️ Settings" },
  ];

  return (
    <SidebarContainer>
      <Title>🌸 Task Manager</Title>
      {menuItems.map((item) => (
        <SidebarItem
          key={item.path}
          to={item.path}
          isActive={location.pathname === item.path}
        >
          {item.label}
        </SidebarItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
