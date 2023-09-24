import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { CldUploadButton, CldImage } from "next-cloudinary";
import { StyledColorButtonKl } from "../StyledColorButton";

export default function AddLocation({
  onSubmit,
  menuTypes,
  handleFilter,
  checked,
  onOptionChange,
  imageUrl,
  setImageUrl,
  noRental,
  setImageHeight,
  setImageWidth,
}) {
  const router = useRouter();

  function onUpload(event) {
    setImageUrl(event.info.secure_url);
    setImageHeight(event.info.height);
    setImageWidth(event.info.width);
  }
  function handleHome() {
    router.push("/");
  }
  return (
    <>
      <StyledForm onSubmit={onSubmit}>
        <Label htmlFor="name"> Location:</Label>
        <br />
        <Input
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
          placeholder="Str., Hausnummer,..."
          pattern="[0-9A-Za-zß-üА-Яа-яЁё?\s]+"
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
          placeholder="Mo.-Fr: "
          pattern="[0-9A-Za-zß-üА-Яа-яЁё?\s]+"
        />
        <br />
        <Legend> Was gibt&apos;s: </Legend>
        <StyledArtSection>
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
        </StyledArtSection>
        <Legend>Verleih Möglichkeit</Legend>
        <Div>
          <LabelKl htmlFor="true">
            {" "}
            <input
              type="radio"
              name="verleihOpt"
              value="true"
              id="true"
              checked={checked}
              onChange={onOptionChange}
            />
            ja
          </LabelKl>
          <br />
          <LabelKl htmlFor="false">
            {" "}
            <input
              type="radio"
              name="verleihOpt"
              value="false"
              id="false"
              checked={!checked}
              onChange={onOptionChange}
            />
            nein
          </LabelKl>
        </Div>
        <br />
        <LabelVerleih htmlFor="verleih" noRental={noRental}>
          Was kann man ausleihen?:
          <br />
          <TextAreaRental
            type="text"
            id="verleih"
            name="verleih"
            required={noRental === true ? true : false}
            minlengh="3"
            defaultValue={""}
            maxlengh="50"
            placeholder="Kajak, SUP,..."
            pattern="[0-9A-Za-zß-üА-Яа-яЁё?\s]+"
          />
        </LabelVerleih>
        <Legend>Coordinaten:</Legend>
        <Input
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
        <Input
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
            Bild hinzufügen
          </StyledCldUploadButton>
        </DivButton>
        <br />
        <StyledCldImage
          src={imageUrl}
          height={200}
          width={350}
          crop="thumb"
          gravity="auto"
          alt={imageUrl ? "Bildvorschau" : "Platzhalterbild"}
        />
        <br />
        <DivButton>
          <StyledColorButtonKl type="submit">Save</StyledColorButtonKl>
          <StyledColorButtonKl type="button" onClick={handleHome}>
            <StyledLink href="/">Cancel</StyledLink>
          </StyledColorButtonKl>
        </DivButton>
      </StyledForm>
    </>
  );
}
const StyledCldImage = styled(CldImage)`
  padding-right: 5px;
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
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5px;
  width: 355px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
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
const Div = styled.div`
  margin-top: 0;
  margin-left: 15px;
  margin-bottom: 0;
  width: 150px;
  height: auto;
  display: flex;
  justify-content: space-between;
`;
const DivButton = styled.div`
  width: 360px;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-left: 0;
  justify-content: space-around;
`;
const StyledArtSection = styled.section`
  margin-top: 0;
  display: grid;
  grid-template-columns: 100px 100px 110px;
  row-gap: 15px;
  column-gap: 15px;
`;

const Label = styled.label`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
  padding: 0;
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
const Legend = styled.legend`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  margin-top: 0;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 0;
`;
const LabelVerleih = styled.label`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  margin-top: 0px;
  display: ${({ noRental }) => (noRental === true ? "block" : "none")};
  font-weight: bold;
  margin-bottom: 0;
  padding: 0;
`;
const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid grey;
  border-radius: 0.5rem;
  width: 345px;
  overflow: scroll;
`;
const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid grey;
  width: 345px;
  height: 40px;
  border-radius: 0.5rem;
  overflow: scroll;
`;
