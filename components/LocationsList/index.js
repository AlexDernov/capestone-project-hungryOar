import styled from "styled-components";
import LocationPreviewCard from "@/components/LocationPreviewCard";
import Heading from "@/components/Heading";
import TitleSection from "@/components/TitleSection";
import LogInOutButton from "../LogInOutButton";

export default function LocationsList({
  data,
  onToggleLiked,
  locationsInfo,
  favoritePage,
  session,
  newLocationPage,
}) {
  return (
    <>
      <TitleSection>
        {" "}
        {favoritePage ? (
          <Heading>Favorite Locations</Heading>
        ) : newLocationPage ? (
          <Heading>New Locations</Heading>
        ) : (
          <Heading>Locations</Heading>
        )}
        <LogInOutButton session={session} />
      </TitleSection>
      {newLocationPage ? (
        <p>
          These locaions must be verified by admin to be displayed in the main
          list.
        </p>
      ) : null}
      <StyledUl>
        {data.length == 0 && favoritePage ? (
          <Par>You don&apos;t have any favorite locations yet</Par>
        ) : (
          data?.map((location) => (
            <LocationPreviewCard
              key={location._id}
              id={location._id}
              name={location.name}
              addresse={location.location}
              bild={location.bild}
              onToggleLiked={() => onToggleLiked(location?._id)}
              isLiked={
                locationsInfo.find((locI) => locI.id === location._id)?.isLiked
              }
              newLocationPage={newLocationPage}
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
