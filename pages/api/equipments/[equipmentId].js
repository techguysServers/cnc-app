import { deleteEquipment } from "../../../lib/delete";

export default async function handler(req, res) {
  const { equipmentId } = req.query;
  console.log("on est la");
  switch (req.method) {
    case "DELETE":
      console.log("delete");
      var data = await deleteEquipment(equipmentId);
      console.log(data);
      res.status(200).json({ data: data });
      break;

    default:
      break;
  }
}
