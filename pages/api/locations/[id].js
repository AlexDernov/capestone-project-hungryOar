import dbConnect from "../../../db/connect";
import Location from "../../../db/model/Location";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  console.log(request.query);
  if (request.method === "GET") {
    const location = await Location.findById(id).populate("notes");

    if (!location) {
      return response.status(404).json({ status: "Not found" });
    }
    return response.status(200).json(location);
  }
  if (request.method === "PATCH") {
    await Location.findByIdAndUpdate(id, {$set:request.body});
    response.status(200).json({ message: "Update is successful!" });
  }
}
