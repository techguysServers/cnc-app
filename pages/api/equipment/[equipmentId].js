import { deleteEquipment } from "../../../lib/delete";
import { getEquipment, getEquipmentMeta } from "../../../lib/get";

export default async function handler(req, res) {
  const { equipmentId } = req.query;
  console.log("on est la");
  switch (req.method) {
    case "GET":
      var data = await getEquipment(equipmentId);
      var metaData = await getEquipmentMeta(equipmentId);
      res.status(200).json({ data: data, metaData: metaData });
      break;
    case "DELETE":
      console.log("delete");
      var data = await deleteEquipment(equipmentId);
      res.status(200).json({ data: data });
      break;

    default:
      break;
  }
}
