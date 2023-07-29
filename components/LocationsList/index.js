import Image from "next/image";
import styled from "styled-components";

export default function LocationsList({data}) {
    console.log("LocData", data)
   
    const StyledImage = styled(Image)`
    max-width: 100% 
    height: auto
    mode: thumb
padding: o;
margin: 0;
display: flex;
position:relativ;
align-content: center;
justify-content:center;
`;
const StyledImgDiv =styled.div`
max-width: 100%
height: 62px`;
    return (
        <>
        <ul>
            {data.map((location) => (
                <li key={location._id}>
                    <h1>{location.name}</h1> 
                    <h2>{location.location}</h2>
                    <StyledImgDiv>
                    <StyledImage src={location.bild.img} width={location.bild.width} height={location.bild.height} alt="Bild"/>
                    </StyledImgDiv>
                </li>))}
                </ul>
                </>
    )
}