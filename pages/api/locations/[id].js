import dbConnect from "../../../db/connect";
import Location from "../../../db/model/Location";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (request.method === "GET") {
    const location = await Location.findById(id).populate("notes");

    if (!location) {
      return response.status(404).json({ status: "Not found" });
    }
    return response.status(200).json(location);
  }
  else if (request.method === "PATCH") {
    await Location.findByIdAndUpdate(id, { $set: request.body });
    response.status(200).json({ message: "Update is successful!" });
  } else if (request.method === "DELETE") {
    await Location.findByIdAndDelete(id);
    response.status(200).json({ message: "Location successfully deleted!" });
  }
}
