import Image from "next/image";
import styled from "styled-components";

export default function Loading() {
  return (
    <StyledDiv>
      <Image src="/images/anima.gif" width="150" height="150" alt="loading" />
    </StyledDiv>
  );
}
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 190px 20px 10px 70px;
  padding: 20px;
  align-item: center;
`;
