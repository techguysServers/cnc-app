import excuteQuery from "./db";

export async function createEquipmentType(data) {
  try {
    const result = await excuteQuery({
      query:
        "INSERT INTO equipments_types (user_id, name, description) VALUES(?, ?, ?, ?)",
      values: [data.user_id, data.name, data.description],
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function createEquipment(data) {
  let today = new Date().toISOString().slice(0, 10);
  try {
    const result = await excuteQuery({
      query:
        "INSERT INTO equipments (user_id, equipment_type_id, serial_nb, num_inspection, status, date_created) VALUES(?, ?, ?, ?, ?, ?)",
      values: [
        data.userId,
        data.equipmentTypeId,
        data.numSerie,
        data.numInspection,
        "Active",
        today,
      ],
    });
    console.log(result);
    // If we receive an equipment id, add the other options to the db
    if (result.insertId) {
      console.log(result.insertId);

      if (data.metaData.length != 0) {
        for (const option of data.metaData) {
          console.log(option);
          try {
            var secondResult = await excuteQuery({
              query:
                "INSERT INTO equipments_meta (equipment_id, metakey, metavalue) VALUES(?, ?, ?)",
              values: [result.insertId, option.key, option.value],
            });
            console.log(secondResult);
            return "success";
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        return "success";
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createLocation(data) {
  try {
    const result = await excuteQuery({
      query:
        "INSERT INTO locations (user_id, name, address_components, geometry, place_id) VALUES(?, ?, ?, ?, ?)",
      values: [
        data.userId,
        data.name,
        data.addressComponents,
        data.locationGeo,
        data.placeId,
      ],
    });
    console.log(result);
    return "success";
  } catch (error) {
    console.log(error);
  }
}

export async function createInspectionType(data) {
  let today = new Date().toISOString().slice(0, 10);
  try {
    const result = await excuteQuery({
      query:
        "INSERT INTO inspections_reports (user_id, date_created, name) VALUES(?, ?, ?)",
      values: [data.userId, today, data.name],
    });
    console.log(result);
    if (result.insertId) {
      console.log(result.insertId);

      // Add the data to the inspection_equipment table
      if (data.inspectionEquipments.length != 0) {
        for (const equipment of data.inspectionEquipments) {
          try {
            var secondResult = await excuteQuery({
              query:
                "INSERT INTO inspection_equipments (inspections_reports_id, equipment_type_id) VALUES(?, ?)",
              values: [result.insertId, equipment.id],
            });
            console.log(secondResult);
          } catch (error) {
            console.log(error);
          }
        }
      }

      // Add the data to the inspections_option table
      if (data.inspectionOptions.length != 0) {
        for (const option of data.inspectionOptions) {
          try {
            var secondResult = await excuteQuery({
              query:
                "INSERT INTO inspections_options (inspection_id, inputType, label, description) VALUES(?, ?, ?, ?)",
              values: [
                result.insertId,
                option.inputType,
                option.label,
                option.description,
              ],
            });
            console.log(secondResult);
          } catch (error) {
            console.log(error);
          }
        }
      }

      return "success";
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createInspectionResponse(data) {
  let today = new Date().toISOString().slice(0, 10);
  try {
    var result = await excuteQuery({
      query:
        "INSERT INTO inspections (inspections_reports_id, date_created, user_id, equipment_id) VALUES(?, ?, ?, ?)",
      values: [data.inspectionReportId, today, data.userId, data.equipmentId],
    });
    console.log(result);
    if (result.insertId) {
      for (const response of data.inspectionResponses) {
        try {
          var secondResult = await excuteQuery({
            query:
              "INSERT INTO inspections_responses (inspection_id, inspection_option_id, response) VALUES(?, ?, ?)",
            values: [
              result.insertId,
              response.inspectionOptionId,
              response.input,
            ],
          });
          console.log(secondResult);
        } catch (error) {
          console.log(error);
        }
      }
      return "success";
    }
  } catch (error) {
    console.log(error);
  }
}
