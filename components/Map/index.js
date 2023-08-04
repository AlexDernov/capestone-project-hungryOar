import styled from "styled-components";

const StyledMap = styled.div`
  margin-top: 15px;
  min-height: 100vh;
  background-image: url(/images/Map_Hamburg.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
`;

export default function Map() {
  return <StyledMap />;
}
