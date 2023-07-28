import dbConnect from "../../../db/connect";
import Location from "../../../db/model/Location";

export default async function handler(request,response) {
    await dbConnect();
    if (request.method === "GET") {
        const locations = await Location.find();
        console.log(locations);
        const data = response.status(200).json(locations);
        console.log(data);
        return data
    }
}