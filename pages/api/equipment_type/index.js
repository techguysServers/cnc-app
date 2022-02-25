import { createEquipmentType } from "../../../lib/equipment_type/createEquipmentType";

export default async function handler(req, res) {
  console.log(req.body);

  if (req.method == "POST") {
    switch (req.body.request) {
      case "create_equipment_type":
        var data = await createEquipmentType(req.body);
        res.status(200).json({ data: data });
        break;

      default:
        break;
    }
  }

  if (req.method == "GET") {
    switch (req.query.request) {
      case "something":
        // var data = await getInspectionsTypes();
        // res.status(200).json({ data: data });
        break;
      default:
        break;
    }
  }
}
