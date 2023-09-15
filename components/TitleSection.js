import styled from "styled-components";

const TitleSection = styled.section`
  border-bottom-size: 2px;
  border-bottom-style: solid;
  border-bottom-color: var(--primary-color);
  position: fixed;
  top: 0;
  background-color: var(--primary-color-back);
  width: 100%;
  height: 1.4rem
  display: grid;
  grid-column: span 2;
  margin: 0px;
  padding-left: 15px;
  padding-top:10px
`;

export default TitleSection;
