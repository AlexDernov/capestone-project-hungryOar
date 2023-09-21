import styled from "styled-components";
import NewLocationPreviewCard from "@/components/NewLocationPreviewCard";
import Heading from "@/components/Heading";
import TitleSection from "@/components/TitleSection";
import LogInOutButton from "../LogInOutButton";

export default function NewLocationsList({
  data,
  session,
  mutate, isAdmin, noRental, setNoRental
}) {
    console.log("newListData", data);
  return (
    <>
      <TitleSection>
          <Heading>New Locations</Heading>
        <LogInOutButton session={session} />
      </TitleSection>
      <StyledUl isAdmin={isAdmin}>
        {data.length == 0 ? (
          <Par>You don&apos;t have any suggested locations yet.</Par>
        ) : (
          data?.map((location) => (
            <NewLocationPreviewCard
              key={location._id}
              id={location._id}
              name={location.name}
              addresse={location.location}
              bild={location.bild}
              zeit={location.zeit}
              verleiOpt={location.verleihOpt}
              mutate={mutate}
              verleih={location.verleih}
              visible={location.visible}
              data={location}
              menuType={location.art}
              session={session}
              noRental={noRental} setNoRental={setNoRental}
              
             
            />
          ))
        )}
      </StyledUl>
    </>
  );
}
const StyledUl = styled.ul`
  padding: 0;
  margin-top: ${({ isAdmin }) => (isAdmin ? 10 : 90)}px;
  margin-bottom: 105px;
  display: grid;
  grid-template-columns: 360px;
  gap: 1rem;
  list-style-type: none;
`;
const Par = styled.p`
  height: 90vh;
  width: auto;
  padding-top: 30px;
  padding-left: 10px;
  color: grey;
`;
