import dbConnect from "../../../db/connect";
import Message from "../../../db/model/Messages";
import { getServerSession } from "next-auth/next";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions); 
  if (session?.user.name === "HungryOar"){
    if (request.method === "GET") {
    const messages = await Message.find();
    return response.status(200).json(messages);
  }
   else if (request.method === "DELETE") {
    await Message.findByIdAndDelete(id);
    response.status(200).json({ message: "Message successfully deleted!" });
  }}
  else if (session){
    if (request.method === "POST") {
    try {
      const messageData = request.body;
      const dataMessages = await Message.create(messageData);
      response.status(201).json({ status: "Note created", data: dataMessages });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
   }
}
