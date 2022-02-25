import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Button from "../../../../components/Button";
import ButtonOutlined from "../../../../components/ButtonOutlined";
import Collapsable from "../../../../components/Collapsable";
import InputRequired from "../../../../components/inputs/Required";
import Select from "../../../../components/inputs/Select";
import TextArea from "../../../../components/inputs/TextArea";
import InspectionQuestion from "../../../../components/InspectionQuestion";
import SuccessCard from "../../../../components/SuccessCard";

const mock = [
  {
    label: "Caractéristique",
    inputType: "yesno",
    description: "Une caractéristique de l'équipement.",
  },
];

function AddEquipmentType() {
  const router = useRouter();
  const [name, setName] = useState("Équipement de sécurité");
  const [description, setDescription] = useState("Une description");
  const [elementsArray, setElementsArray] = useState(mock);
  const [showSuccess, setShowSuccess] = useState();

  // Send the data to the server
  const submitForm = async (e) => {
    e.preventDefault();
    var body = {
      request: "create_equipment_type",
      userId: 1,
      name: name,
      description: description,
      equipmentOptions: elementsArray
    };
    let serverResponse = await fetch("/api/equipment_type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await serverResponse.json();
    if (data.data == "success") {
      setShowSuccess(true);
    }
  };

  // Function that add an element to the element array when a user clicks on the add button
  const addElement = () => {
    const newArray = [...elementsArray];
    newArray.push({
      label: "Caractéristique",
      inputType: "yesno",
      description: "Une caractéristique de l'équipement.",
    });
    setElementsArray(newArray);
  };

  // Function that deletes on of the element
  const deleteElement = (index) => {
    var newArray = [...elementsArray];
    newArray.splice(index, 1);
    console.log(newArray);
    setElementsArray(newArray);
  };

  // Function that handle all the changes in the inputs
  const handleChange = (value, index, key) => {
    console.log(value);
    var newElement = elementsArray[index];
    // Check the key of the changed input
    switch (key) {
      case "label":
        newElement.label = value;
        break;
      case "description":
        newElement.description = value;
        break;
      case "inputType":
        newElement.inputType = value;
        break;
      default:
        break;
    }
    console.log(newElement);
    var newArray = [...elementsArray];
    newArray[index] = newElement;
    console.log(newArray);
    setElementsArray(newArray);
  };

  const handleConfirm = () => {
    router.push("/");
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="w-1/2">
          <h1 className="text-gray-500 text-xl">
            Créer un type d'équipement
          </h1>
        </div>
        <div className="w-1/2 text-right">
          <Button label="Confirmer" onClick={(e) => submitForm(e)} />
        </div>
      </div>
      <br />
      <form className="mx-auto shadow-xl pb-10 rounded-lg">
        <div className="flex flex-row p-5">
          <div className="w-1/3 mr-5">
            <InputRequired
              label="Nom de l'équipement"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <TextArea
                value={description}
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <h1 className="text-lg font-bold">Caractéristiques</h1>
            <br />
            <ButtonOutlined
              onClick={() => addElement()}
              label="Ajouter une caractéristique"
            />
            <br />
            <div className="pt-2">
              {elementsArray.map((element, index) => (
                <div className="py-2">
                  <Collapsable
                    onClick={() => deleteElement(index)}
                    header={element.label}
                    content={
                      <div>
                        <InputRequired
                          label="Nom"
                          value={element.label}
                          onChange={(e) =>
                            handleChange(e.target.value, index, "label")
                          }
                        />
                        <TextArea
                          value={element.description}
                          label="Description"
                          onChange={(e) =>
                            handleChange(e.target.value, index, "description")
                          }
                        />
                        <Select
                          value={element.inputType}
                          onChange={(e) =>
                            handleChange(e.target.value, index, "inputType")
                          }
                          label="Type de question"
                          options={[
                            {
                              label: "Oui ou non",
                              value: "yesno",
                            },
                            {
                              label: "Réponse courte",
                              value: "input",
                            },
                          ]}
                        />
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="border-b rounded-lg shadow-md w-2/3 p-5">
            <h2 className="text-lg">Aperçu</h2>
            <br />
            {elementsArray.map((element) => (
              <div className="mt-5">
                <InspectionQuestion
                  label={element.label}
                  description={element.description}
                  inputType={element.inputType}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
      {showSuccess && (
        <>
          <SuccessCard
            buttonLabel="Retour"
            successMessage="L'équipment à été ajouté à la base de donnée"
            onClick={() => handleConfirm()}
          />
          <div className="w-screen h-screen bg-gray-500	bg-opacity-25 fixed inset-x-0 top-0"></div>
        </>
      )}
    </div>
  );
}

export default AddEquipmentType;