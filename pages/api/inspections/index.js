
export default async function handler(req, res) {
    console.log(req.body);
    switch (req.body.request) {
      case "create_equipment":
        var data = await createEquipment(req.body);
        res.status(200).json({ data: data });
        break;
  
      default:
        break;
    }
  }
  