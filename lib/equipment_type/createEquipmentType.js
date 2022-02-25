import excuteQuery from "../db";

export async function createEquipmentType(data) {
    let today = new Date().toISOString().slice(0, 10);
    try {
      const result = await excuteQuery({
        query:
          "INSERT INTO equipments_types (user_id, name, description, image_link) VALUES(?, ?, ?, ?)",
        values: [data.userId, data.name, data.description, "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"],
      });
      console.log(result);
      if (result.insertId) {
        console.log(result.insertId);
  
        // Add the data to the inspections_option table
        if (data.equipmentOptions.length != 0) {
          for (const option of data.equipmentOptions) {
            try {
              var secondResult = await excuteQuery({
                query:
                  "INSERT INTO equipments_types_options (equipment_type_id, label, input_type, choices) VALUES(?, ?, ?, ?)",
                values: [result.insertId, option.label, option.inputType, ""],
              });
              console.log(secondResult)
            } catch (error) {
              console.log(error);
            }
          }
        }
  
        return 'success'
      }
    } catch (error) {
      console.log(error);
    }
  }