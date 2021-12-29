import {
  createInspectionType,
  createInspectionResponse,
} from "../../../lib/post";
import {
  getInspectionsFormQuestion,
  getInspectionsTypes,
} from "../../../lib/get";

export default async function handler(req, res) {
  console.log(req.body);

  if (req.method == "POST") {
    switch (req.body.request) {
      case "create_inspection_type":
        var data = await createInspectionType(req.body);
        res.status(200).json({ data: data });
        break;
      case "create_inspection":
        var data = await createInspectionResponse(req.body);
        res.status(200).json({ data: data });
      default:
        break;
    }
  }

  if (req.method == "GET") {
    switch (req.query.request) {
      case "inspections_types":
        var data = await getInspectionsTypes();
        res.status(200).json({ data: data });
        break;
      case "inspection_question":
        var inspectionId = req.query.id;
        var data = await getInspectionsFormQuestion(inspectionId);
        res.status(200).json({ data: data });
        break;
    }
  }
}
