import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import Button from "../components/Button";
import Card from "../components/Card";
import MainHeading from "../components/headings/MainHeading";

export default function Home() {
  const user = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let serverResponse = await fetch("/api/equipment-type?request=equipments_types&userId=" + user.id, {
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
    <div>
      <div className="flex flex-row">
        <div className="flex-1">
          <MainHeading text="Type d'équipement" />
        </div>
        <div className="flex-1 text-right">
          <Button label="Ajouter" />
        </div>
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        {data.map((type) => (
          <Card
            key={type.id}
            tag="Transport"
            title={type.name}
            description={type.description}
            link={"/equipments/" + type.id + "?name=" + type.name}
            image={type.image_link}
          />
        ))}
      </div>
    </div>
  );
}