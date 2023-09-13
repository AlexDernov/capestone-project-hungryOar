import dbConnect from "../../../db/connect";
import Message from "../../../db/model/Message";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (request.method === "GET") {
    const messages = await Message.findById(id);
    return response.status(200).json(messages);
  
  } /* else if (request.method === "PUT") {
    await Message.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json({ message: "Update is successful!" });
  }  */else if (request.method === "DELETE") {
    await Message.findByIdAndDelete(id);
    response.status(200).json({ message: "Note successfully deleted!" });
  }
}