import { useState } from "react";
import Image from "next/image";

export default function EditMode({ data, handleOnEditMode, mutate }) {
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
          defaultValue={data?.zeit}
          pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
        />
        <br />
        <legend htmlFor="addresse"> MenuArt: </legend>
        {menuTypes.map((type) => (
          <label for={type.type} key={type.id}>
            {type.type}
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
        <br />
        <legend>Verleih Möglichkeit</legend>
        <input
          type="radio"
          name="verleihOpt"
          value="true"
          id="true"
          checked={checked}
          onChange={onOptionChange}
        />
        <label htmlFor="true">ja</label>
        <br />
        <input
          type="radio"
          name="verleihOpt"
          value="false"
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
          defaultValue={data?.verleih}
          pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
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
