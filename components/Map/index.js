import Image from "next/image";
import styled from "styled-components";

const StyledMap = styled(Image)`
  margin: 3.9px;
`;
export default function Map(){
    return(
<StyledMap
src="/images/Map_Hamburg.png"
height={512}
width={369}
alt="Map of Hamburg"
/>)
}