import dbConnect from "../../../db/connect";
import Location from "../../../db/model/Location";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const locations = await Location.find();
    return response.status(200).json(locations);
  } else if (request.method === "POST") {
    try {
      const locationData = request.body;
      const dataLocations = await Location.create(locationData);
      response
        .status(201)
        .json({ status: "Location created", data: dataLocations });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else if (request.method === "DELETE") {
    await Location.findByIdAndDelete(id);
    response.status(200).json({ message: "Location successfully deleted!" });
  }
}
