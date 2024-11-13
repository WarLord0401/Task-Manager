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
  align-items: center; /* Optional: to vertically center the content */
  border-bottom: 2px solid #007bff; /* Optional: add accent color underline */
  position: fixed; /* Fix the navbar to the top of the page */
  top: 0; /* Ensure it stays at the top */
  left: 0; /* Ensure it stays on the left side */
  width: 100%; /* Ensure it stretches across the entire screen */
  z-index: 1000; /* Make sure it stays above other content */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional: add shadow for better visibility */
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
