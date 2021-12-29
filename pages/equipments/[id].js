import { useRouter } from "next/router";

import EquipmentTable from "../../components/equipment/EquipmentTable";
import MainHeading from "../../components/headings/MainHeading";
import TableHeader from "../../components/TableHeader";

function Equipment({ equipments }) {
  const router = useRouter();
  const { id, name } = router.query;
  console.log(equipments);

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex-1">
          <MainHeading text={name}/>
        </div>
      </div>
      <br />
      <TableHeader onClick={() => router.push("form/add?id=" + id)} />
      <br />
      <EquipmentTable data={equipments} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id = "id" } = context.query;
  let serverResponse = await fetch(
    "http://localhost:3000/api/equipment?request=equipments&id=" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let data = await serverResponse.json();
  console.log(data.data);

  return {
    props: {
      equipments: data.data,
    },
  };
}

export default Equipment;
