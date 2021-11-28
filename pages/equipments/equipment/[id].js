import EquipmentProfilCard from "../../../components/equipment/EquipmentProfilCard";

function EquipmentProfil({ equipmentData, equipmentMeta, equipmentTypeData }) {
  console.log(equipmentMeta);
  return (
    <div className="flex flex-row flex-wrap">
      <EquipmentProfilCard data={equipmentData[0]} metaData={equipmentMeta} typeData={equipmentTypeData[0]}/>
      <div className="lg:w-1/2"></div>
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

  return {
    props: {
      equipmentData: data.data,
      equipmentMeta: data.metaData,
      equipmentTypeData: equipmentTypeData.data,
    },
  };
}

export default EquipmentProfil;
