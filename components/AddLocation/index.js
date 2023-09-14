import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { CldUploadButton, CldImage } from "next-cloudinary";

export default function AddLocation({
  onSubmit,
  menuTypes,
  handleFilter,
  checked,
  onOptionChange,
  imageUrl,
  setImageUrl,
  noRental,
  placeholderImage,
setImageHeight,
setImageWidth
}) {
 
function onUpload(event){
    setImageUrl(event.info.secure_url)
    setImageHeight(event.info.height)
    setImageWidth(event.info.width)
}

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="title"> Location:</label>
        <br />
        <textarea
          type="text"
          id="name"
          name="name"
          required
          minlengh="3"
          maxlengh="50"
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
        {noRental? <>
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
        /></>:null}
        <br />
        <br />
        <legend>Coordinaten:</legend>

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
        <br />
        <CldUploadButton
          uploadPreset="twyzoxpk"
          onUpload={onUpload}
        >
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
          Bild hinzufügen
        </CldUploadButton>
        <br />
        <br/>
        <CldImage
          src={
            imageUrl
              ? imageUrl
              : placeholderImage
          }
          height={200}
          width={350}
          crop="thumb"
          gravity="auto"
          alt={imageUrl ? "Bildvorschau" : "Platzhalterbild"}
        />
        <br />
        <button type="submit">Save</button>
        <button type="button">
          <StyledLink href="/">Cancel</StyledLink>
        </button>
      </form>
    </>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

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
