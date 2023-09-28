import dbConnect from "../../../db/connect";
import Message from "../../../db/model/Messages";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
  const { id } = request.query;
  if (session?.user.name === "HungryOar") {
  if (request.method === "GET") {
    const messages = await Message.findById(id);
    return response.status(200).json(messages);
  } else if (request.method === "DELETE") {
    await Message.findByIdAndDelete(id);
    response.status(200).json({ message: "Message successfully deleted!" });
  }}
}
