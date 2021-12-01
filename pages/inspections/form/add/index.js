import { useState, useEffect } from "react";

import Button from "../../../../components/Button";
import Collapsable from "../../../../components/Collapsable";
import InputRequired from "../../../../components/inputs/Required";
import Select from "../../../../components/inputs/Select";
import TextArea from "../../../../components/inputs/TextArea";
import InspectionQuestion from "../../../../components/InspectionQuestion";

const mock = [
  {
    label: "Élément",
    inputType: "yesno",
    description: "Une procédure très très longue et importante.",
  },
];

function AddInspection() {
  const [elementsArray, setElementsArray] = useState(mock);

  // Function that add an element to the element array when a user clicks on the add button
  const addElement = () => {
    const newArray = [...elementsArray];
    newArray.push({
      label: "Élément",
      inputType: "yesno",
      description: "Une procédure très très longue et importante.",
    });
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

  return (
    <div>
      <form className="container mx-auto shadow-md pb-10">
        <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              {/* <img
                alt="profil"
                src={equipmentTypeData.image_link}
                className="mx-auto object-cover rounded-full h-16 w-16 "
              /> */}
              <h1 className="text-gray-600">Créer un rapport d'inspection</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row p-10">
          <div className="w-1/2 text-center mx-10">
            {/* <h2 className="m-auto">Ajouter des éléments</h2> */}
            <br />
            <Button onClick={() => addElement()} label="Ajouter un élément" />
            <br />
            <div className="pt-2">
              {elementsArray.map((element, index) => (
                <div className="py-4">
                  <Collapsable
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
          <div className="border-b rounded-lg shadow-md w-1/2 p-5">
            <h2 className="text-center">Aperçu</h2>
            <br />
            {elementsArray.map((element) => (
              <InspectionQuestion
                label={element.label}
                description={element.description}
                inputType={element.inputType}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddInspection;
