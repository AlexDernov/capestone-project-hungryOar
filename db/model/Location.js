import mongoose from "mongoose";

const { Schema } = mongoose;

const locationSchema = new Schema({
  name: { type: String, required: true },
  locationURL: { type: String, required: false },
  bild: {
    img: { type: String, required: false },
    hight: { type: Number, required: false },
    width: { type: Number, required: false },
  },
  googleMap: { type: String, required: false },
  location: { type: String, required: true},
  zeit:  { type: String, required: true },
  zeitURL:  { type: String, required: false },
  art:  { type: String, required: true },
  verleih:  { type: String, required: true },
  liked:  { type: Boolean, required: false },
  notes:  { type: Array, required: false },
});
const Location =
  mongoose.models.Location || mongoose.model("Location", locationSchema, "locations");

export default Location;
