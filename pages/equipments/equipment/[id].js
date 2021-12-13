import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import EquipmentProfilCard from "../../../components/equipment/EquipmentProfilCard";
import TableHeader from "../../../components/TableHeader";
import InspectionTable from "../../../components/inspection/InspectionTable";
import InspectionSurveyBox from "../../../components/InspectionSurveyBox";
import SuccessCard from "../../../components/SuccessCard";

function EquipmentProfil({
  equipmentData,
  equipmentMeta,
  equipmentTypeData,
  equipmentInspectionsType,
  equipmentInspections
}) {
  const router = useRouter();
  const [addInspection, setAddInspection] = useState(false);
  const [inspectionForm, setInspectionForm] = useState();
  const [inspectionQuestion, setInspectionQuestion] = useState([]);
  const [success, setSuccess] = useState(false);
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

  const refreshData = () => {
    router.replace(router.asPath);
  };

  // Fetch the inspection form when the selected option change
  useEffect(() => {
    console.log(inspectionForm);
    // GET the equipment data
    const fetchInspectionQuestions = async () => {
      let serverResponse = await fetch(
        "http://localhost:3000/api/inspections?request=inspection_question&id=" +
          inspectionForm,
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
      setInspectionQuestion(data.data);
    };
    fetchInspectionQuestions();
  }, [inspectionForm]);

  const handleConfirm = () => {
    setAddInspection(false);
    refreshData()
    setSuccess(false)
  };

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
            equipmentId={equipmentData[0].id}
            inspectionReportId={inspectionForm}
            value={inspectionForm}
            options={inspectionsTypes}
            inspectionsQuestions={inspectionQuestion}
            onSelect={(e) => setInspectionForm(e.target.value)}
            onSubmit={() => setSuccess(true)}
          />
        ) : (
          <InspectionTable data={equipmentInspections} />
        )}
      </div>
      {success && (
        <>
          <SuccessCard
            onClick={() => handleConfirm()}
            successMessage="L'inspection à été ajouté"
            buttonLabel="Confimer"
          />
          <div className="w-screen h-screen bg-gray-500	bg-opacity-25 fixed inset-x-0 top-0"></div>
        </>
      )}
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
    "http://localhost:3000/api/inspections?request=equipment_inspections_reports&id=" +
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

  // GET the equipment inspections
  let inspectionResponse = await fetch(
    "http://localhost:3000/api/inspections?request=equipment_inspections&id=" +
      id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let equipmentInspections = await inspectionResponse.json();

  return {
    props: {
      equipmentData: data.data,
      equipmentMeta: data.metaData,
      equipmentTypeData: equipmentTypeData.data,
      equipmentInspectionsType: equipmentInspectionsType.data,
      equipmentInspections: equipmentInspections.data
    },
  };
}

export default EquipmentProfil;
