import styled from "styled-components";
import NavBar from "../NavigationsBar";


const StyledLayout = styled.div`
  margin: 0;
  background-image: url(/images/background-HungryOar.webp);
  background-color: var(--primary-color-back);
  background-repeat: no-repeat;
  background-size: cover, contain;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
`;

export default function Layout({ children }) {

  return (
    <StyledLayout>
      {children} 
      <NavBar />
    </StyledLayout>
  );
}
