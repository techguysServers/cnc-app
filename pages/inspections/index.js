import Button from "../../components/Button";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import CardWithIcon from "../../components/CardWithIcon";
import MainHeading from "../../components/headings/MainHeading";

function Inspections({ inspectionsTypes }) {
  const router = useRouter();
  console.log(inspectionsTypes);
  return (
    <div>
      <div className="flex flex-row">
        <div className="flex-1">
          <MainHeading text="Rapports d'inspections"/>
        </div>
        <div className="flex-1 text-right">
          <Button
            label="Ajouter"
            onClick={() => router.push("/inspections/form/add")}
          />
        </div>
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
        {inspectionsTypes.map((type) => (
          <CardWithIcon 
            key={type.id}
            // tag="Transport"
            title={type.name}
            // link={"/equipments/" + type.id + "?name=" + type.name}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id = "id" } = context.query;
  let serverResponse = await fetch("http://localhost:3000/api/inspections?request=inspections_types", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  let data = await serverResponse.json();
  console.log(data.data);

  return {
    props: {
      inspectionsTypes: data.data,
    },
  };
}

export default Inspections;
