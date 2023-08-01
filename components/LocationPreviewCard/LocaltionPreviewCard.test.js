import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LocationPreviewCard from "./index";

const exampleBild =  {
    img: "https://res.cloudinary.com/demaz2nqa/image/upload/c_thumb,h_62,w_350/v1690563536/cafe-on-the-water-vessela-kolibarova_clqmbu.webp",
    height: 62,
    width:350,
    }
test("renders Locations bild, name and addresse", () => {
  render(
    <LocationPreviewCard
      name = "Cafe Sommerterrassen"
       bild = {exampleBild}
      addresse = "Goldbekkanal_Südring 44"
      id="2djjhtgjh"
    />
  );

    const bild = screen.getByRole("img", {name:"Cafe Sommerterrassen"});
  const name = screen.getByText(/Cafe Sommerterrassen/i);
  const addresse = screen.getByText(/Goldbekkanal_Südring 44/i);

  expect(name).toBeInTheDocument();
  expect(addresse).toBeInTheDocument();
   expect(bild).toBeInTheDocument();
});
