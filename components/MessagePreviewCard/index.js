import styled from "styled-components";
import { StyledColorButtonKl } from "../StyledColorButton";
import { useRouter } from "next/router";

export default function MessagePreviewCard({ id, name, text, date, data, mutate }) {
  const router = useRouter();
  async function handleDelete() {
    const responseMessage = await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });
    if (!responseMessage.ok) {
      return <h1>Something gone wrong!</h1>;
    }

    if (responseMessage.ok) {
      mutate()
      router.push("/messages");
    }
  }
  return (
    <>
      <StyledListItem>
        <Div>
          {data.length === 0 ? (
            <StyledPDiv>
              {" "}
              <Par>You don&apos;t have any messages yet.</Par>
            </StyledPDiv>
          ) : (
            <StyledDiv>
              <H2>{name}</H2>
              <StyledPDiv>
                <StyledDate>{new Date(date).toLocaleString()}</StyledDate>
                <P>{text}</P>
              </StyledPDiv>
              <StyledColorButtonKl type="button" onClick={handleDelete}>
                Delete
              </StyledColorButtonKl>
            </StyledDiv>
          )}
        </Div>
      </StyledListItem>
    </>
  );
}

const StyledListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
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

const P = styled.p`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  margin-top: 0;
  padding: 0;
  font-style: oblique;
`;
const H2 = styled.p`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 0;
  padding: 0;
  font-weight: bold;
`;
const StyledDate = styled.p`
  margin: 0;
  padding: 10px 10px 10px 0;
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
