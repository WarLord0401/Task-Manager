import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const Navs = () => {
  const location = useLocation(); // Get the current location (URL)

  return (
    <Navbar>
      <NavList>
        <NavItem>
          <StyledNavLink
            to="/"
            isActive={location.pathname === "/"} // Check if current path is "/"
          >
            Home
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink
            to="/about"
            isActive={location.pathname === "/about"} // Check if current path is "/about"
          >
            About
          </StyledNavLink>
        </NavItem>
      </NavList>
    </Navbar>
  );
};

export default Navs;

// Styled Components
const Navbar = styled.nav`
  background-color: #343a40; /* Darker shade for navbar */
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #007bff; /* Optional: add accent color underline */
`;

const NavList = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  font-size: 1.1rem;
`;

const StyledNavLink = styled(NavLink)`
  color: #bbb;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    background-color: #495057;
  }

  /* Apply active color when the link is active */
  ${({ isActive }) =>
    isActive &&
    `
    color: #007bff;
    background-color: #495057;
  `}
`;
