import excuteQuery from "./db";

export async function getEquipmentsTypes() {
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM equipments_types WHERE user_id = ?",
      values: [1],
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getEquipments(equipmentTypeId) {
  try {
    var result = await excuteQuery({
      query: "SELECT * FROM equipments WHERE equipment_type_id = ?",
      values: [equipmentTypeId],
    });
    return result
  } catch (error) {
    console.log(error);
  }
  console.log(data);
  return data;
}
