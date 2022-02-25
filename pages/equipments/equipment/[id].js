import { useState, useEffect } from "react";

import EquipmentProfilCard from "../../../components/equipment/EquipmentProfilCard";
import TableHeader from "../../../components/TableHeader";
import InspectionTable from "../../../components/inspection/InspectionTable";
import InspectionSurveyBox from "../../../components/InspectionSurveyBox";
import { getRequest } from "../../../utils/request";

function EquipmentProfil({
  equipmentData,
  equipmentMeta,
  equipmentTypeData,
  equipmentInspectionsType,
  defaultInspectionType
}) {
  /*
   * Component States
   */
  const [showModal, setShowModal] = useState();
  const [addInspection, setAddInspection] = useState(false); // When true, show the inspection dropdown
  const [inspectionForm, setInspectionForm] = useState([]); // The inspection dropdown selection goes here
  const [inspectionQuestion, setInspectionQuestion] = useState([]);

  // Fetch the inspection form when the selected option change
  useEffect(() => {
    console.log(inspectionForm);
    // GET the inspections type questions
    const fetchInspectionQuestions = async () => {
      let inspectionResponse = await getRequest(
        "inspections?request=inspection_question&id=" + inspectionForm
      );
      setInspectionQuestion(inspectionResponse.data);
    };
    fetchInspectionQuestions();
  }, [inspectionForm]);

  return (
    <div className="flex flex-row flex-wrap">
      <EquipmentProfilCard
        data={equipmentData[0]}
        metaData={equipmentMeta}
        typeData={equipmentTypeData[0]}
      />
      <div className="flex flex-col lg:w-2/3 pl-4">
        <TableHeader onClick={() => setAddInspection(true)} />
        <br />

        {addInspection ? (
          <InspectionSurveyBox
            value={inspectionForm}
            options={equipmentInspectionsType}
            inspectionsQuestions={inspectionQuestion}
            onSelect={(e) => setInspectionForm(e.target.value)}
          />
        ) : (
          <InspectionTable data={[]} />
        )}
      </div>
    </div>
  );
}

// Get the data from the server before rendering the app with server side rendering
export async function getServerSideProps(context) {
  // Retreive the equipment id from the url params
  const { id = "id" } = context.query;
  // GET the equipment data
  let equipementData = await getRequest("equipment/" + id);
  console.log("Equipment Data", equipementData);
  // Get the equipment type id from the data
  let equipmentTypeId = equipementData.data[0].equipment_type_id;
  console.log("Equipment Type ID", equipmentTypeId);
  // GET the equipment type data
  let equipmentTypeData = await getRequest(
    "get?request=equipment_type&id=" + equipmentTypeId
  );
  console.log("Equipment Type Data", equipmentTypeData);
  // GET the equipment inspections types
  let equipmentInspectionsType = await getRequest(
    "inspections?request=equipment_inspections&id=" + equipmentTypeId
  );
  
  // Create an array containing all the options in the select input
  // Each option is a different inspection form
  let defaultInspectionType = []
  let inspectionsTypes = [];
  if (equipmentInspectionsType.data) {
    console.log("il y a des rapport !");
    equipmentInspectionsType.data.map((type) => {
      console.log('type', type)
      inspectionsTypes.push({
        label: type[0].name,
        value: type[0].id,
      });
    });
  }
  return {
    props: {
      equipmentData: equipementData.data,
      equipmentMeta: equipementData.metaData,
      equipmentTypeData: equipmentTypeData.data,
      equipmentInspectionsType: inspectionsTypes,
      defaultInspectionType: defaultInspectionType
    },
  };
}

export default EquipmentProfil;
