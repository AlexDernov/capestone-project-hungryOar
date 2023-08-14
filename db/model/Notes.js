import mongoose from "mongoose";

const { Schema } = mongoose;

const notesSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
});
const Note = mongoose.models.Note || mongoose.model("Note", notesSchema);

export default Note;
