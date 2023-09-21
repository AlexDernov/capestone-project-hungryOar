import AddLocation from "@/components/AddLocation";
import Head from "next/head";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TitleSection from "../components/TitleSection";
import Heading from "../components/Heading";
import LogInOutButton from "../components/LogInOutButton";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function AddPage({noRental, setNoRental}) {
  const { data: session } = useSession();
  const [addMode, setAddMode] = useState(true);
  const [menuTypes, setMenuTypes] = useState([
    { type: "Cafe", id: "Cafe", checked: false },
    { type: "Bar", id: "Bar", checked: false },
    {
      type: "Restaurant",
      id: "Restaurant",
      checked: false,
    },
    { type: "Kuchen", id: "Kuchen", checked: false },
    { type: "Eis", id: "Eis", checked: false },
    { type: "Snacks", id: "Snacks", checked: false },
  ]);
  const placeholderImage = `https://res.cloudinary.com/demaz2nqa/image/upload/v1690563536/HungryOar/cafe-on-the-water-vessela-kolibarova_clqmbu.jpg`;
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
 

  const menuCheck = menuTypes
    .filter((menuType) => menuType.checked)
    .map((menuTypeChecked) => menuTypeChecked.type);

  function handleFilter(id) {
    setMenuTypes(
      menuTypes.map((menuType) =>
        menuType.id === id
          ? { ...menuType, checked: !menuType.checked }
          : menuType
      )
    );
  }
  function handleHome() {
    router.push("/");
  }

  function onOptionChange() {
    setChecked(!checked);
    setNoRental(!noRental);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const locationData = Object.fromEntries(formData);

    const newLocation = {
      name: locationData.name,
      location: locationData.location,
      zeit: locationData.zeit,
      art: menuCheck,
      verleihOpt: checked,
      verleih: locationData.verleih || "",
      bild: {
        img: imageUrl || placeholderImage,
        width: imageWidth || 900,
        height: imageHeight || 751,
      },
      visible: false,
      coords: [locationData.latitude, locationData.longitude],
    };
    const response = await fetch("/api/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });

    if (response.ok) {
      setAddMode(!addMode);
    }
  }
  function handleAddMode() {
    setAddMode(!addMode);
  }
  return (
    <>
      <Head>
        <title>
          {addMode ? "Add new location" : "Your location was added"}
        </title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      {addMode ? (
        <>
          <TitleSection>
            <Heading>Add new location</Heading>
            <LogInOutButton session={session} />
          </TitleSection>
          <DivPage>
            <StyledArticle>
              <AddLocation
                session={session}
                onSubmit={handleSubmit}
                handleFilter={handleFilter}
                menuTypes={menuTypes}
                checked={checked}
                onOptionChange={onOptionChange}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                noRental={noRental}
                setImageHeight={setImageHeight}
                setImageWidth={setImageWidth}
                placeholderImage={placeholderImage}
              />
            </StyledArticle>
          </DivPage>
        </>
      ) : (
        <DivPage>
          <StyledDiv>
            <StyledP>
              The upload was successful! <br />
              Thank you for helping to improve our App! <br />
              The data will be checked by admin, after that the suggested
              location will appear in the main list of locations.
            </StyledP>
            <StyledButtonsDiv>
              <button type="button" onClick={handleHome}>
                Homepage
              </button>
              <button type="button" onClick={handleAddMode}>
                Add more locations
              </button>
            </StyledButtonsDiv>
          </StyledDiv>
        </DivPage>
      )}
    </>
  );
}
const StyledArticle = styled.article`
  background-color: rgba(255, 255, 255, 0.6);
  margin-top: 99px;
  margin-bottom: 90px;
  height: 100%;
  line-height: 120%;
  padding: 10px;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  margin-top: 1px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.6);
`;

const StyledButtonsDiv = styled.div`
  width: 300px;
  margin: 5px;
  display: flex;
  justify-content: space-around;
`;

const StyledP = styled.p`
  padding-top: 40px;
  margin: 20px;
  font-size: 16px;
`;
const DivPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
