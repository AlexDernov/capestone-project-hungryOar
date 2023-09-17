import styled from "styled-components";


export default function MessagePreviewCard( id, 
  name,
  text,
 date
 ) {
  console.log("Name in Message", name);
  console.log("Text in Message", text);
  async function handleDelete() {
    const responseMessage = await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });
    if (!responseMessage.ok) {
      return <h1>Something gone wrong!</h1>;
    }

    if (responseMessage.ok) {
     router.push("/messages")
    }
  }
  return (
    <>
      <StyledListItem>
        <Div>
        {data.length===0? <StyledPDiv> <Par>You don&apos;t have any messages yet.</Par></StyledPDiv>:
            <StyledDiv>
              <StyledName>{name}</StyledName>
              <StyledPDiv>
                <StyledAddresse>Created at: {new Date(date).toLocaleString()}</StyledAddresse>
                <StyledAddresse>{text}</StyledAddresse>
              </StyledPDiv>
              <button type="button" onClick={handleDelete}>Delete</button>
            </StyledDiv>}
        </Div>
      </StyledListItem>
    </>
  );
}


const StyledListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  align-content: center;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-around;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
`;
const Div = styled.div`
  position: relativ;
  display: flex;
  flex-direction: row;
  align-content: space-around;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
`;
const StyledName = styled.h2`
  color: #373636;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
  padding: 0;
`;
const StyledAddresse = styled.p`
  margin: 0;
  padding: 10px;
  color: #040404;
  text-align: right 10px;
  text-shadow: 1px 1px 2px 0px #fff;
  font-family: Roboto Slab;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2.2px;
  position: relativ;
  right: 0;
  top: 10px;
`;
const StyledPDiv = styled.div`
margin: 0;
width = 30%;
align-self: flex-end;
align: right`;

const Par = styled.p`
  height: 90vh;
  width: auto;
  padding-top: 30px;
  padding-left: 10px;
  color: grey;
`;