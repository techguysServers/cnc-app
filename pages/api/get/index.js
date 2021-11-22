import { getEquipments, getEquipmentsTypes, getEquipmentTypeOptions } from "../../../lib/get";

export default async function handler(req, res) {
  console.log(req.query.request);
  switch (req.query.request) {
    case "equipments_types":
      var data = await getEquipmentsTypes();
      res.status(200).json({ data: data });
      break;
    case "equipments":
      var data = await getEquipments(req.query.id);
      res.status(200).json({ data: data });
      break;
    case "equipment_types_options":
      var data = await getEquipmentTypeOptions(req.query.id);
      res.status(200).json({ data: data });
      break;

    default:
      break;
  }
}
