import styled from "styled-components";

const StyledHr = styled.hr`
padding:0;
margin: 0;
color: var(--prime-color);
border-style: solid;
border-width: 1px;
border-color: var(--primary-color);
border-radius: 5px
`;

export default function Divider() {
   
  return <StyledHr className="rounded" role="none" />;
}
