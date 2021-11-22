import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let serverResponse = await fetch("/api/get?request=equipments_types", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let data = await serverResponse.json();
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
              <h1 className="text-2xl">Types d'équipement</h1>
            </div>
            <div className="flex-1 text-right">
              <Button label="Ajouter" />
            </div>
          </div>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {data.map(type =>(
              <Card
                key={type.id}
                tag="Transport"
                title={type.name}
                description={type.description}
                link={"/equipment/" + type.id + "?name=" + type.name}
                image={type.image_link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
