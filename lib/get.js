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

export async function getEquipmentType(equipmentTypeId) {
  try {
    var result = await excuteQuery({
      query: "SELECT * FROM equipments_types WHERE id = ?",
      values: [equipmentTypeId],
    });
    return result
  } catch (error) {
    console.log(error);
  }
  console.log(data);
  return data;
}

export async function getAllEquipments(equipmentTypeId) {
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

export async function getEquipment(equipmentId) {
  try {
    var result = await excuteQuery({
      query: "SELECT * FROM equipments WHERE id = ?",
      values: [equipmentId],
    });
    return result
  } catch (error) {
    console.log(error);
  }
  console.log(data);
  return data;
}

export async function getEquipmentMeta(equipmentId) {
  try {
    var result = await excuteQuery({
      query: "SELECT metakey, metavalue FROM equipments_meta WHERE equipment_id = ?",
      values: [equipmentId],
    });
    return result
  } catch (error) {
    console.log(error);
  }
  console.log(data);
  return data;
}

export async function getEquipmentTypeOptions(equipmentTypeId) {
  try {
    var result = await excuteQuery({
      query: "SELECT * FROM equipments_types_options WHERE equipment_type_id = ?",
      values: [equipmentTypeId],
    });
    return result
  } catch (error) {
    console.log(error);
  }
  console.log(data);
  return data;
}


export async function getLocations() {
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM locations WHERE user_id = ?",
      values: [1],
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}