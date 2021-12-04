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
        1,
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
          console.log(option)
          try {
            const secondResult = await excuteQuery({
              query:
                "INSERT INTO equipments_meta (equipment_id, metakey, metavalue) VALUES(?, ?, ?)",
              values: [result.insertId, option.key, option.value],
            });
            console.log(secondResult)
            return 'success'
          } catch (error) {
            console.log(error);
          }
        };
      } else {
        return 'success'
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
      values: [data.userId, data.name, data.addressComponents, data.locationGeo, data.placeId],
    });
    console.log(result);
    return 'success'
  } catch (error) {
    console.log(error);
  }
}

// export async function createInspection(data) {
//   try {
//     const result = await excuteQuery({
//       query:
//         "INSERT INTO inspections ()"
//     })
//   }

// }