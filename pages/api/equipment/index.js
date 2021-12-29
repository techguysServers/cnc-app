import { getAllEquipments } from "../../../lib/get";
import { createEquipment } from "../../../lib/post";

export default async function handler(req, res) {
  console.log(req.body);
  /*
   *
   * The first Switch Case statement checks the type of method used by the request,
   * If its GET, POST
   *
   */
  switch (req.method) {
    case "GET":
      // If its a get request, get all the equipments from the specific equipment id past in the request
      var data = await getAllEquipments(req.query.id);
      // Respond with either all the equipments from an equipment_type, none or an error
      res.status(200).json({ data: data });
      break;
    case "POST":
      // If its a post request, create an equipment with the createEquipment function
      var data = await createEquipment(req.body);
      // Respond with the createEquipment response that is either a success or an error
      res.status(200).json({ data: data });
      break;
    default:
      break;
  }
}
