import { useState } from "react";
import { CldUploadButton, CldImage } from "next-cloudinary";
import Image from "next/image";
import styled from "styled-components";
import { StyledColorButton, StyledColorButtonKl } from "../StyledColorButton";

export default function EditMode({
  data,
  handleOnEditMode,
  mutate,
  bild,
  session,
  noRental,
  setNoRental,
}) {
  const [menuTypes, setMenuTypes] = useState([
    { type: "Cafe", id: "Cafe", checked: data?.art.includes("Cafe") },
    { type: "Bar", id: "Bar", checked: data?.art.includes("Bar") },
    {
      type: "Restaurant",
      id: "Restaurant",
      checked: data?.art.includes("Restaurant"),
    },
    { type: "Kuchen", id: "Kuchen", checked: data?.art.includes("Kuchen") },
    { type: "Eis", id: "Eis", checked: data?.art.includes("Eis") },
    { type: "Snacks", id: "Snacks", checked: data?.art.includes("Snackes") },
  ]);
  const [checked, setChecked] = useState(data?.verleihOpt === true);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const isAdmin = session?.user.name === "HungryOar";
  function onOptionChange() {
    setChecked(!checked);
  }

  function handleFilter(id) {
    setMenuTypes(
      menuTypes.map((menuType) =>
        menuType.id === id
          ? { ...menuType, checked: !menuType.checked }
          : menuType
      )
    );
  }
  function onOptionChange() {
    setChecked(!checked);
    setNoRental(!noRental);
  }
  const menuCheck = menuTypes
    .filter((menuType) => menuType.checked)
    .map((menuTypeChecked) => menuTypeChecked.type);

  async function handleEditLocation(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const locationData = Object.fromEntries(formData);

    const editLocation = {
      name: locationData.name,
      location: locationData.location,
      zeit: locationData.zeit,
      art: menuCheck,
      verleihOpt: checked,
      bild: {
        img: imageUrl || bild?.img,
        width: imageWidth || bild?.width,
        height: imageHeight || bild?.height,
      },
      verleih: locationData.verleih,
      coords: [locationData.latitude, locationData.longitude],
    };
    console.log("handleEditLocation");
    const response = await fetch(`/api/locations/${data?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editLocation),
    });
    if (response.ok) {
      mutate();
      handleOnEditMode();
    }
  }
  async function handleDeleteLocation() {
    const responseLocation = await fetch(`/api/locations/${data?._id}`, {
      method: "DELETE",
    });
    if (!responseLocation.ok) {
      return <h1>Something gone wrong!</h1>;
    }

    if (responseLocation.ok) {
      mutate();
      handleOnEditMode();
    }
  }
  function onUpload(event) {
    setImageUrl(event.info.secure_url);
    setImageHeight(event.info.height);
    setImageWidth(event.info.width);
  }

  return (
    <>
      <Div>
        <StyledColorButton type="button" onClick={handleOnEditMode}>
          Edit mode aus
        </StyledColorButton>
        <StyledForm onSubmit={handleEditLocation}>
          <Label htmlFor="name"> Location:</Label>
          <br />
          <Input
            type="text"
            id="name"
            name="name"
            required
            minlengh="3"
            maxlengh="50"
            defaultValue={data?.name}
            pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
          />
          <br />
          <Label htmlFor="location"> Addresse: </Label>
          <br />
          <Input
            type="text"
            id="location"
            name="location"
            required
            minlengh="3"
            max="40"
            maxlengh="200"
            defaultValue={data?.location}
            pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
          />
          <br />
          <Label htmlFor="zeit"> Öffnungszeiten:</Label>
          <br />
          <TextArea
            type="text"
            id="zeit"
            name="zeit"
            required
            minlengh="3"
            maxlengh="50"
            defaultValue={data?.zeit}
            pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
          />
          <br />
          <Legend> Was gibt&apos;s: </Legend>
          <MenuDiv>
            {menuTypes.map((type) => (
              <LabelKl htmlFor={type.type} key={type.id}>
                {type.type === "Cafe" ? (
                  <Image
                    key={1}
                    src="/images/CafeIcon.svg"
                    width={71}
                    height={45}
                    alt="Cafe icon"
                  />
                ) : type.type === "Restaurant" ? (
                  <Image
                    key={2}
                    src="/images/RestaurantIcon.svg"
                    width={71}
                    height={44}
                    alt="Restaurant-icon"
                  />
                ) : type.type === "Bar" ? (
                  <Image
                    key={3}
                    src="/images/BarIcon.svg"
                    width={57}
                    height={44}
                    alt="Bar-icon"
                  />
                ) : type.type === "Kuchen" ? (
                  <Image
                    key={4}
                    src="/images/KuchenIcon.svg"
                    width={71}
                    height={44}
                    alt="Kuchen-icon"
                  />
                ) : type.type === "Eis" ? (
                  <Image
                    key={5}
                    src="/images/EisIcon.svg"
                    width={57}
                    height={45}
                    alt="Eis-icon"
                  />
                ) : type.type === "Snacks" ? (
                  <Image
                    key={6}
                    src="/images/SnacksIcon.svg"
                    width={71}
                    height={44}
                    alt="Snacks-icon"
                  />
                ) : (
                  []
                )}
                <input
                  type="checkbox"
                  name="type"
                  value={type.type}
                  id={type.id}
                  onChange={() => handleFilter(type.id)}
                  checked={type.checked}
                />
              </LabelKl>
            ))}
          </MenuDiv>

          <Legend>Verleih Möglichkeit</Legend>
          <CheckDiv>
            <LabelKl htmlFor="true">
              <input
                type="radio"
                name="verleihOpt"
                value={data?.verleihOpt === true}
                id="true"
                checked={checked}
                onChange={onOptionChange}
              />
              ja
            </LabelKl>
            <br />
            <LabelKl htmlFor="false">
              <input
                type="radio"
                name="verleihOpt"
                value={data?.verleihOpt === false}
                id="false"
                checked={!checked}
                onChange={onOptionChange}
              />
              nein
            </LabelKl>
          </CheckDiv>
          <br />

          <LabelRental htmlFor="verleih" noRental={noRental}>
            Was kann man ausleihen?:
            <br />
            <TextAreaRental
              type="text"
              id="verleih"
              name="verleih"
              required={!noRental?true: false}
              minlengh="3"
              maxlengh="50"
              defaultValue={data?.verleih}
              pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
            />
          </LabelRental>
          <Legend>Coordinaten:</Legend>
          <Input
            type="number"
            id="latitude"
            name="latitude"
            minlengh="8"
            min="53"
            max="54"
            defaultValue={data?.coords[0]}
            required={true}
            maxlengh="11"
            placeholder="Breitengrad: z.B. 53.571389"
            pattern="/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g"
          />
          <br />

          <Input
            type="number"
            id="longitude"
            name="longitude"
            minlengh="8"
            min="9"
            max="11"
            required={isAdmin ? true : false}
            maxlengh="11"
            defaultValue={data?.coords[1]}
            placeholder="Längengrad: z.B. 9.964722"
            pattern="/^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g"
          />
          <br />
          <DivButton>
            <StyledCldUploadButton uploadPreset="twyzoxpk" onUpload={onUpload}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
              </svg>{" "}
              Bild ändern
            </StyledCldUploadButton>
          </DivButton>
          <br />
          <CldImage
            src={imageUrl ? imageUrl : bild?.img}
            height={300}
            width={360}
            crop="fill"
            gravity="auto"
            alt={data?.name}
          />
          <br />
          <DivButton>
            <StyledColorButtonKl type="submit">Save</StyledColorButtonKl>

            <StyledColorButtonKl type="button" onClick={handleDeleteLocation}>
              Delete
            </StyledColorButtonKl>
          </DivButton>
        </StyledForm>
      </Div>
    </>
  );
}
const MenuDiv = styled.div`
  margin-top: 0;
  display: grid;
  grid-template-columns: 100px 100px 110px;
  row-gap: 15px;
  column-gap: 15px;
`;

const CheckDiv = styled.div`
  margin-top: 0;
  margin-left: 15px;
  margin-bottom: o;
  width: 150px;
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const LabelKl = styled.p`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  margin-top: 0;
  padding: 0;
  font-style: oblique;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  width: 355px;
`;

const Div = styled.div`
  padding: 10px;
  width: 360px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DivButton = styled.div`
  width: 360px;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-left: 0;
  justify-content: space-around;
`;
const Input = styled.input`
  padding: 0.5 rem;
  font-size: inherit;
  border: 1px solid grey;
  border-radius: 0.5rem;
  width: 345px;
  height: 40px;
  overflow: scroll;
`;
const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid grey;
  width: 345px;
  border-radius: 0.5rem;
  overflow: scroll;
`;
const TextAreaRental = styled.textarea`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid grey;
  width: 345px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 0.5rem;
  overflow: scroll;
`;

const Label = styled.label`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 0;
  padding: 0;
`;
const LabelRental = styled.label`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  width: 360px;
  margin-top: 0;
  display: ${({ noRental }) => (!noRental ? "block" : "none")};
  font-weight: bold;
  padding: 0;
`;
const Legend = styled.label`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  margin-top: 0px;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 0;
`;
const StyledCldUploadButton = styled(CldUploadButton)`
  width: 250px;
  height: 27px;
  flex-shrink: 0;
  border: none;
  margin-bottom: 5px;
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    rgba(216, 11, 250, 0.31) 18.56%,
    rgba(4, 178, 252, 0.34) 104.43%
  );
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
  color: #000;
  text-align: center;
  font-family: Roboto Slab;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 3.25px;
  &: hover {
    background: linear-gradient(
      90deg,
      rgba(216, 11, 250, 0.5) 18.56%,
      rgba(4, 178, 252, 0.5) 104.43%
    );
    filter: drop-shadow(4px 4px 7px rgba(0, 0, 0, 0.41));
    width: 255px;
    height: 32px;
    margin-bottom: 0;
  }
`;
