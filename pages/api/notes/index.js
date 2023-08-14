import dbConnect from "../../../db/connect";
import Note from "../../../db/model/Notes";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const notes = await Note.find();
    return response.status(200).json(notes);
  } else if (request.method === "POST") {
    try {
      const noteData = request.body;
      const dataNotes = await Note.create(noteData);
      response.status(201).json({ status: "Note created", data: dataNotes });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
