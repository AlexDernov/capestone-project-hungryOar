import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LocationsList from "./index";

const exampleData = [
  {
    _id: "1",
    name: "Alster Beach Club",
    location: "Alster (Deelbögenkamp 2-3)",
/*  bild: {
      img: "https://res.cloudinary.com/demaz2nqa/image/upload/c_thumb,h_62,w_350/v1690563536/cafe-on-the-water-vessela-kolibarova_clqmbu.webp",
      height: 100,
      width: 350,  */
   /*  }, */
  },
  {
    _id: "2",
    name: "Cafe Sommerterrassen",
    location: "Goldbekkanal (Südring 44)",
  /*   bild: {
      img: "https://res.cloudinary.com/demaz2nqa/image/upload/c_thumb,h_62,w_350/v1690563536/cafe-on-the-water-vessela-kolibarova_clqmbu.webp",
      height: 100,
      width: 350,
    }, */
  },
];

test("All locations are displayed as a list", () => {
  render(<LocationsList data={exampleData} />);
  const listLocations = screen.getAllByRole("listitem");
  expect(listLocations).toHaveLength(2);
});
