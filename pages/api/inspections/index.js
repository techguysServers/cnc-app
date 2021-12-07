import { createInspectionType } from "../../../lib/post";
import { getInspectionsTypes } from "../../../lib/get";

export default async function handler(req, res) {
  console.log(req.body);

  if (req.method == "POST") {
    switch (req.body.request) {
      case "create_inspection_type":
        var data = await createInspectionType(req.body);
        res.status(200).json({ data: data });
        break;

      default:
        break;
    }
  }

  if (req.method == "GET") {
    var data = await getInspectionsTypes();
    res.status(200).json({ data: data });
  }
}
