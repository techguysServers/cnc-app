import excuteQuery from "./db";

export async function deleteEquipment(id) {
  console.log('We HERERERE ' + id)
  try {
    const result = await excuteQuery({
      query: "DELETE FROM equipments WHERE id = ?",
      values: [id],
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
