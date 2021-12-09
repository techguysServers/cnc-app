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

export async function getInspectionsTypes() {
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM inspections WHERE user_id = ?",
      values: [1],
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getEquipmentInspectionsTypes(equipmentTypeId) {
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM inspection_equipments WHERE equipment_type_id = ?",
      values: [equipmentTypeId],
    });
    console.log(result);

    try {
      var inspectionTypeArray = []
      if (result.length != 0) {
        for (const inspectionType of result) {
          try {
            var secondResult = await excuteQuery({
              query:
                "SELECT * FROM inspections WHERE id = ?",
              values: [inspectionType.inspection_id],
            });

            if(secondResult.length != 0) {
              inspectionTypeArray.push(secondResult)
            }
          } catch (error) {
            console.log(error);
          }
        }
        console.log('thereee')
        console.log(inspectionTypeArray)
        return inspectionTypeArray
      }

    } catch(error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getInspectionsFormQuestion(id) {
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM inspections_options WHERE inspection_id = ?",
      values: [id],
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}