import { deleteEquipment } from "../../../lib/delete";
import { users } from "@clerk/clerk-sdk-node";

import {
  getEquipment,
  getEquipmentInspectionsTypes,
  getEquipmentMeta,
  getEquipmentType,
  getInspections,
} from "../../../lib/get";

export default async function handler(req, res) {
  const { equipmentId } = req.query;
  /*
   *
   * The first Switch Case statement checks the type of method used by the request,
   * If its GET, POST
   *
   */
  switch (req.method) {
    /**
     *
     * The different GET requests are for different APP pages, exemple the equipmentProfil page needs
     * a lot of different info from different table, this API endpoints will only be use for this specific view
     *
     */
    case "GET":
      switch (req.query.request) {
        /**
         *
         * API request for the Equipment Profil page, returns a whole lot of shit
         *
         */
        case "equipmentProfil":
          // Get the information from the equipment table
          var equipmentData = await getEquipment(equipmentId);
          // Get the other data of the equipment from the equipment_meta_data
          var equipmentMetaData = await getEquipmentMeta(equipmentId);
          // Retreive the equipment type id from the received equipment data
          var equipmentTypeId = equipmentData[0].equipment_type_id;
          var equipmentTypeData = await getEquipmentType(equipmentTypeId);
          // Get the inspections type associated with th equipment type
          var inspectionsType = await getEquipmentInspectionsTypes(
            equipmentTypeId
          );
          // Get all the inspections of the equipment
          var inspections = await getInspections(equipmentId);
          // Get all the unique user ids from the inspections
          const uniqueIds = [
            ...new Set(inspections.map((item) => item.user_id)),
          ];
          // Loop trough all the different users unique Id and store the user object in an array
          const usersArray = [];
          for (const id of uniqueIds) {
            var user = await users.getUser(id);
            console.log(user);
            usersArray.push(user);
          }

          // Respond with all the data
          res.status(200).json({
            data: equipmentData,
            metaData: equipmentMetaData,
            equipmentTypeData: equipmentTypeData,
            inspectionsTypes: inspectionsType,
            inspections: inspections,
            users: usersArray,
          });
          break;
        /**
         *
         * API request for the edit equipment form page
         * Returns the equipment data, meta_data and the equipment type data
         *
         */
        case "editEquipment":
          // Get the information from the equipment table
          var equipmentData = await getEquipment(equipmentId);
          // Get the other data of the equipment from the equipment_meta_data
          var equipmentMetaData = await getEquipmentMeta(equipmentId);
          // Retreive the equipment type id from the received equipment data
          var equipmentTypeId = equipmentData[0].equipment_type_id;
          var equipmentTypeData = await getEquipmentType(equipmentTypeId);

          res.status(200)({
            equipmentData: equipmentData,
            equipmentMetaData: equipmentMetaData,
            equipmentTypeData: equipmentTypeData,
          });
          break;
        default:
          break;
      }
      break;
    /**
     *
     * The DELETE method only calls the deleteEquipment function
     *
     */
    case "DELETE":
      // Call the delete equipment functions
      var data = await deleteEquipment(equipmentId);
      // Respond the function responses with his either success(equipment as been delete) or an error
      res.status(200).json({ data: data });
      break;

    default:
      break;
  }
}
