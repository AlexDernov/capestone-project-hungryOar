import styled from "styled-components";
import NavBar from "../NavigationsBar";

/* import Navigation from "./Navigation/Navigation"; */
const StyledLayout = styled.div`
  margin: 0;
  background-image: url(/images/background-HungryOar.webp);
  background-color: var(--primary-color-back);
  background-repeat: no-repeat;
  background-size: cover, contain;

  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-self: center;
  justify-content: center;
  flex-direction: column;
`;

export default function Layout({ children }) {
  return (
    <StyledLayout>
      <div>{children}</div>
      <NavBar />
    </StyledLayout>
  );
}
