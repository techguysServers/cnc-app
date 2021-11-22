import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

import Button from "../../components/Button";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";

function EquipmentTable() {
  const router = useRouter()
  const { id, name } = router.query
  console.log(name)

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let serverResponse = await fetch("/api/get?request=equipments&id=" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let data = await serverResponse.json();
      console.log(data)
      setData(data.data);
    };
    getData();
  }, []);

  return (
    <div className="flex flex-no-wrap">
      <Sidebar />
      <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
        <div className="w-full h-full">
          <div className="flex flex-row">
            <div className="flex-1">
              <h1 className="text-2xl">{name}</h1>
            </div>
            <div className="flex-1 text-right">
              <Button label="Ajouter" />
            </div>
          </div>
          <br />
            <Table data={data}/>
        </div>
      </div>
    </div>
  );
}

export default EquipmentTable