import styled from "styled-components";
import NewLocationPreviewCard from "@/components/LocationPreviewCard";
import Heading from "@/components/Heading";
import TitleSection from "@/components/TitleSection";
import LogInOutButton from "../LogInOutButton";

export default function NewLocationsList({
  data,
  session,
  mutate
}) {
    
  return (
    <>
      <TitleSection>
          <Heading>New Locations</Heading>
        <LogInOutButton session={session} />
      </TitleSection>
      <StyledUl>
        {data.length == 0 && favoritePage ? (
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
             
            />
          ))
        )}
      </StyledUl>
    </>
  );
}
const StyledUl = styled.ul`
  padding: 0;
  margin-top: 90px;
  margin-bottom: 105px;
 
  display: grid;
  grid-template-columns: 375px;
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
