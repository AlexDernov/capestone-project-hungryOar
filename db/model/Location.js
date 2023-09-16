import mongoose from "mongoose";
import "./Note";

const { Schema } = mongoose;

const locationSchema = new Schema({
  name: { type: String, required: true },
  locationURL: { type: String, required: false },
  bild: {
    img: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
  },
  googleMap: { type: String, required: false },
  location: { type: String, required: true },
  zeit: { type: String, required: true },
  zeitURL: { type: String, required: false },
  art: { type: Array, required: true },
  verleih: { type: String, required: false },
  verleihOpt:{type: Boolean, required: false},
  liked: { type: Boolean, required: false },
  notes: { type: [Schema.Types.ObjectId], ref: "Note"},
  coords: {type: Array, required: false},
  visible: {type: Boolean, required: true},
});
const Location =
  mongoose.models.Location ||
  mongoose.model("Location", locationSchema, "locations");

export default Location;
