import styled from "styled-components";
import Link from "next/link";

const NavLink = styled(Link)`
  margin: 10px;
  widht: 100%;
  text-decoration: none;
  color: var(--primary-color);
  text-shadow: 1px 1px 1px black;
  border-color: black;
  &: hover {
    font-size: 1.1em;
  }
`;
const StyledNav = styled.nav`
  background-color: var(--primary-color-back);
  width: 100%;
  height: 89px;
  margin-right: 10px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
`;

const StyledH4 = styled.h4`
  font-size: 10px;
  text-shadow: 1px 1px 1px black;
  color: var(--primary-color);
  padding: 0;
  margin: 0;
  text-align: center;
  width: 41px;
  height: auto;
`;

const StyledSvg = styled.svg`
  &: hover {
    width: 45px;
    height: 45px;
  }
`;

export default function NavBar() {
  return (
    <StyledNav name="NavBar">
      <NavLink href="/">
        {" "}
        <StyledSvg
          width="41"
          height="41"
          viewBox="0 0 41 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.125 10.25L15.375 5.125L25.625 10.25L35.875 5.125V30.75L25.625 35.875L15.375 30.75L5.125 35.875V10.25Z"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.375 5.125V30.75"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M25.625 10.25V35.875"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </StyledSvg>
        <StyledH4>Map </StyledH4>
      </NavLink>
      <NavLink href="/locations">
        {" "}
        <StyledSvg
          width="42"
          height="42"
          viewBox="0 0 41 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.6667 10.25H35.875"
            stroke="white"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.6667 20.5H35.875"
            stroke="white"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.6667 30.75H35.875"
            stroke="white"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.125 10.25H5.14137"
            stroke="white"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.125 20.5H5.14137"
            stroke="white"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.125 30.75H5.14137"
            stroke="white"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </StyledSvg>
        <StyledH4> List of Locations</StyledH4>
      </NavLink>
    </StyledNav>
  );
}
