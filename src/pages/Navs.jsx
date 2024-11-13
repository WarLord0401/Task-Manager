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

// Styled-components for the elements

const Navbar = styled.nav`
  background-color: #282c34;
  padding: 10px 0;
  display: flex;
  justify-content: center;
`;

const NavList = styled.ul`
  margin-left: -40px;
  list-style: none;
  display: flex;
  gap: 20px;
`;

const NavItem = styled.li`
  font-size: 18px;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }

  // Apply active color when the link is active
  ${({ isActive }) =>
    isActive &&
    `
    color: grey;
  `}
`;

export default Navs;
