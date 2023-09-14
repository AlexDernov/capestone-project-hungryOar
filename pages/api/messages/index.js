import dbConnect from "../../../db/connect";
import Message from "../../../db/model/Messages";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const messages = await Message.find();
    return response.status(200).json(messages);
  } else if (request.method === "POST") {
    try {
      const messageData = request.body;
      const dataMessages = await Message.create(messageData);
      response.status(201).json({ status: "Note created", data: dataMessages });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }/*  else if (request.method === "PUT") {
    await Message.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json({ message: "Update is successful!" });
  } */ else if (request.method === "DELETE") {
    await Message.findByIdAndDelete(id);
    response.status(200).json({ message: "Note successfully deleted!" });
  }
}
