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
      console.log(locationData)
      const dataLocations = await Location.create(locationData);
      console.log(dataLocations)
      response
        .status(201)
        .json({ status: "Location created", data: dataLocations });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
