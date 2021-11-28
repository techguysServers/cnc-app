import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "../../components/Button";
import Search from "../../components/Search";
import EquipmentTable from "../../components/equipment/EquipmentTable";

function Equipment({ equipments }) {
  const router = useRouter();
  const { id, name } = router.query;
  console.log(equipments);

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex-1">
          <h1 className="text-2xl font-normal">{name}</h1>
        </div>
      </div>
      <br />
      <header class="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-40">
        <div class="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
          <div class="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
            <div class="container relative left-0 z-50 flex w-3/4 h-auto h-full">
              <Search/>
            </div>
            <div class="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
              <Button
                label="Ajouter"
                onClick={() => router.push("form/add?id=" + id)}
              />
            </div>
          </div>
        </div>
      </header>
      <br />
      <EquipmentTable data={equipments} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id = "id" } = context.query;
  let serverResponse = await fetch(
    "http://localhost:3000/api/get?request=equipments&id=" + id,
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
