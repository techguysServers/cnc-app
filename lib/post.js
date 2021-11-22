import excuteQuery from "./db";

export async function createEquipmentType(data) {
    try {
        const result = await excuteQuery({
            query: 'INSERT INTO equipments_types (user_id, name, description) VALUES(?, ?, ?, ?)',
            values: [ data.user_id, data.name, data.description ]
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}