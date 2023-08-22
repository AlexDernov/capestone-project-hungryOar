import dbConnect from "../../../db/connect";
import Note from "../../../db/model/Note";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (request.method === "GET") {
    const notes = await Note.findById(id);
    return response.status(200).json(notes);
  
  } else if (request.method === "PUT") {
    await Note.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json({ message: "Update is successful!" });
  } else if (request.method === "DELETE") {
    await Note.findByIdAndDelete(id);
    response.status(200).json({ message: "Note successfully deleted!" });
  }
}