import { useState, useEffect } from "react";

import EquipmentProfilCard from "../../../components/equipment/EquipmentProfilCard";
import TableHeader from "../../../components/TableHeader";
import InspectionTable from "../../../components/inspection/InspectionTable";
import InspectionSurveyBox from "../../../components/InspectionSurveyBox";

function EquipmentProfil({
  equipmentData,
  equipmentMeta,
  equipmentTypeData,
  equipmentInspectionsType,
}) {
  const [showModal, setShowModal] = useState();
  const [addInspection, setAddInspection] = useState(false);
  const [inspectionForm, setInspectionForm] = useState();
  const [inspectionQuestion, setInspectionQuestion] = useState([])

  console.log(equipmentInspectionsType)
  // Create an array containing all the options in the select input
  // Each option is a different inspection form
  let inspectionsTypes;
  if (equipmentInspectionsType.length != 0) {
    inspectionsTypes = [];
    equipmentInspectionsType.map((type) => {
      console.log(type);
      inspectionsTypes.push({
        label: type[0].name,
        value: type[0].id,
      });
    });
  } else {
    inspectionsTypes = [];
  }

  // Fetch the inspection form when the selected option change
  useEffect(() => {
    console.log(inspectionForm);
    // GET the equipment data
    const fetchInspectionQuestions = async () => {
      let serverResponse = await fetch(
        "http://localhost:3000/api/inspections?request=inspection_question&id=" + inspectionForm,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      let data = await serverResponse.json();
      console.log(data);
      setInspectionQuestion(data.data)
    };
    fetchInspectionQuestions()
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
            options={inspectionsTypes}
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

export async function getServerSideProps(context) {
  const { id = "id" } = context.query;

  // GET the equipment data
  let serverResponse = await fetch(
    "http://localhost:3000/api/equipment/" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let data = await serverResponse.json();

  // Get the equipment type id from the data
  let equipmentTypeId = data.data[0].equipment_type_id;
  // GET the equipment type data
  let serverSecondResponse = await fetch(
    "http://localhost:3000/api/get?request=equipment_type&id=" +
      equipmentTypeId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let equipmentTypeData = await serverSecondResponse.json();

  // GET the equipment inspections types
  let serverThirdResponse = await fetch(
    "http://localhost:3000/api/inspections?request=equipment_inspections&id=" +
      equipmentTypeId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let equipmentInspectionsType = await serverThirdResponse.json();

  return {
    props: {
      equipmentData: data.data,
      equipmentMeta: data.metaData,
      equipmentTypeData: equipmentTypeData.data,
      equipmentInspectionsType: equipmentInspectionsType.data,
    },
  };
}

export default EquipmentProfil;
