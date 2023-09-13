import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

export default function AddLocation({ data, handleOnEditMode, mutate }) {
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
  const [checked, setChecked] = useState(false);
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
      verleih: locationData.verleih,
    };

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

  return (
    <>
      <form onSubmit={handleEditLocation}>
        <label htmlFor="title"> Location:</label>
        <br />
        <textarea
          type="text"
          id="name"
          name="name"
          required
          minlengh="3"
          maxlengh="50"
          defaultValue={data?.name}
          placeholder="z.B. Cafe Canale"
          pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
        />
        <br />
        <label htmlFor="addresse"> Addresse: </label>
        <br />
        <textarea
          type="text"
          id="location"
          name="location"
          required
          minlengh="3"
          max="40"
          maxlengh="200"
          placeholder="Str., Hausnummer,..."
          defaultValue={data?.location}
          pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
        />
        <br />
        <label htmlFor="title"> Öffnungszeiten:</label>
        <br />
        <textarea
          type="text"
          id="zeit"
          name="zeit"
          required
          minlengh="3"
          maxlengh="50"
          placeholder="Mo.-Fr: "
          defaultValue={data?.zeit}
          pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
        />
        <br />

        <legend htmlFor="addresse"> MenuArt: </legend>
        <StyledArtSection>
          {menuTypes.map((type) => (
            <label for={type.type} key={type.id}>
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
            </label>
          ))}
        </StyledArtSection>
        <br />
        <legend>Verleih Möglichkeit</legend>
        <input
          type="radio"
          name="verleihOpt"
          value={data?.verleihOpt === true}
          id="true"
          checked={checked}
          onChange={onOptionChange}
        />
        <label htmlFor="true">ja</label>
        <br />
        <input
          type="radio"
          name="verleihOpt"
          value={data?.verleihOpt === false}
          id="false"
          checked={!checked}
          onChange={onOptionChange}
        />
        <label htmlFor="false">nein</label>
        <br />
        <br />
        <label htmlFor="verleih">Was kann man ausleihen?:</label>
        <br />
        <textarea
          type="text"
          id="verleih"
          name="verleih"
          required
          minlengh="3"
          maxlengh="50"
          placeholder="Kajak, SUP,..."
          pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
        />
        <br />
        <br />
        <legend>Coordinaten:</legend>
        <label htmlFor="addresse"> </label>

        <textarea
          type="number"
          id="latitude"
          name="latitude"
          minlengh="8"
          min="53"
          max="54"
          maxlengh="11"
          placeholder="Breitengrad: z.B. 53.571389"
          pattern="/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g"
        />
        <br />

        <textarea
          type="number"
          id="longitude"
          name="longitude"
          minlengh="8"
          min="9"
          max="11"
          maxlengh="11"
          placeholder="Längengrad: z.B. 9.964722"
          pattern="/^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g"
        />
        <br />
        <Image src={data?.bild.img} height={62} width={350} alt={data?.name} />
        <button type="submit">Save</button>
        <button type="button" onClick={handleOnEditMode}>
          Cancel
        </button>
      </form>
    </>
  );
}
const StyledArtSection = styled.section`
  margin: 10px;
  padding-left: 27px;
  padding-right: 27px;
  display: grid;
  grid-template-columns: 71px 71px 71px;
  row-gap: 20px;
  column-gap: 10px;
  position: center;
`;
