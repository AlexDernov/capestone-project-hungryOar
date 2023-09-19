import { useState } from "react";
import { CldUploadButton, CldImage } from "next-cloudinary";


export default function EditMode({ data, handleOnEditMode, mutate, bild, session}) {
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
      coords:  [locationData.latitude, locationData.longitude],
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
      <form onSubmit={handleEditLocation}>
        <label htmlFor="name"> Location:</label>
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
        <label htmlFor="location"> Addresse: </label>
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
        <label htmlFor="zeit"> Öffnungszeiten:</label>
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
        <legend> MenuArt: </legend>
        {menuTypes.map((type) => (
          <label htmlFor={type.type} key={type.id}>
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
          defaultValue={data?.verleih}
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
          required={isAdmin? true: false}
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
          required={isAdmin? true: false}
          maxlengh="11"
          placeholder="Längengrad: z.B. 9.964722"
          pattern="/^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g"
        />
        <br />
        <CldUploadButton uploadPreset="twyzoxpk" onUpload={onUpload}>
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
        </CldUploadButton>
        <br />
        <br />
        <CldImage
          src={imageUrl ? imageUrl : bild?.img}
          height={300}
          width={350}
          crop="fill"
          gravity="auto"
          alt={data?.name}
        />
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={handleOnEditMode}>
          Cancel
        </button>
        <button type="button" onClick={handleDeleteLocation}>
                Delete
              </button>
      </form>
    </>
  );
}
