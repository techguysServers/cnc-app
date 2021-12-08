import { useState } from "react";

import EquipmentProfilCard from "../../../components/equipment/EquipmentProfilCard";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Select from "../../../components/inputs/Select";

function EquipmentProfil({
  equipmentData,
  equipmentMeta,
  equipmentTypeData,
  equipmentInspectionsType,
}) {
  const [showModal, setShowModal] = useState();
  console.log(equipmentInspectionsType[0]);

  let modalContent;
  if (equipmentInspectionsType.length != 0) {
    var inspectionsTypes = []
    equipmentInspectionsType[0].map(type => {
      inspectionsTypes.push({
        label: type.name,
        value: type.name
      })
    })
    modalContent = (
      <Select
        label="Type d'inspection"
        options={inspectionsTypes}
      />
    )
  } else {
    modalContent = "Aucun inspection associé";
  }

  return (
    <div className="flex flex-row flex-wrap">
      <EquipmentProfilCard
        data={equipmentData[0]}
        metaData={equipmentMeta}
        typeData={equipmentTypeData[0]}
      />
      <div className=" flex flex-column lg:w-1/2">
        <div className="ml-auto">
          <Button label="Créer une inspection" onClick={() => setShowModal(true)} />
        </div>
      </div>
      {showModal && (
        <Modal 
          title="Ajouter une inspection" 
          content={modalContent} 
          onCancel={() => setShowModal(false)}
          />
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
