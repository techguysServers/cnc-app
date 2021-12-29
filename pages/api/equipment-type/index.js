import {
  getAllEquipments,
  getEquipmentsTypes,
  getEquipmentType,
  getEquipmentTypeOptions,
} from "../../../lib/get";

export default async function handler(req, res) {
  console.log(req.query.request);
  /*
   *
   * The first Switch Case statement checks the type of method used by the request,
   * If its GET, POST
   *
   */
  switch (req.method) {
    /**
     *
     * The different GET requests are for single data types, so for exemple the equipment types request will only
     * return the all the equipment types of the user from the equipment type table
     *
     */
    case "GET":
      switch (req.query.request) {
        // If the request parameter is equipment_type
        case "equipment_type":
          // Get the equipmentTypeId wich is a url parameter
          var equipmentTypeId = req.query.id;
          // Get the equimentType with the getEquipmentType function
          var data = await getEquipmentType(equipmentTypeId);
          // Respond with the data received or with an error
          res.status(200).json({ data: data });
          break;
        // If the request parameter is equipments_types
        case "equipments_types":
          // Get the userId wich is a url parameter
          var userId = req.query.userId;
          // Get the equimentTypes with the getEquipmentTypes function
          var data = await getEquipmentsTypes(userId);
          // Respond with the data received or with an error
          res.status(200).json({ data: data });
          break;
        // If the request parameter is equipment_type_options
        case "equipment_types_options":
          console.log("heree mofo")
          var data = await getEquipmentTypeOptions(req.query.id);
          res.status(200).json({ data: data });
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }
}
