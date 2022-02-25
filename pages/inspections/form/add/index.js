import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Badge from "../../../../components/Badge";
import Button from "../../../../components/Button";
import ButtonOutlined from "../../../../components/ButtonOutlined";
import Collapsable from "../../../../components/Collapsable";
import InputRequired from "../../../../components/inputs/Required";
import Select from "../../../../components/inputs/Select";
import SelectFancy from "../../../../components/inputs/SelectFancy";
import TextArea from "../../../../components/inputs/TextArea";
import InspectionQuestion from "../../../../components/InspectionQuestion";
import SuccessCard from "../../../../components/SuccessCard";

const mock = [
  {
    label: "Élément",
    inputType: "yesno",
    description: "Une procédure très très longue et importante.",
  },
];

function AddInspection({ equipments }) {
  const router = useRouter();
  const [name, setName] = useState("Rapport d'inspection");
  const [elementsArray, setElementsArray] = useState(mock);
  const [tags, setTags] = useState([]);
  const [showSuccess, setShowSuccess] = useState();

  // Send the data to the server
  const submitForm = async (e) => {
    e.preventDefault();
    var body = {
      request: "create_inspection_type",
      userId: 1,
      name: name,
      inspectionOptions: elementsArray,
      inspectionEquipments: tags,
    };
    let serverResponse = await fetch("/api/inspections", {
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
      label: "Élément",
      inputType: "yesno",
      description: "Une procédure très très longue et importante.",
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

  // Function that executes when an equipment is selected
  const AddEquipmentTag = (element) => {
    console.log(element);
    var newTagsArray = [...tags];
    var tagObject = {
      name: element.name,
      id: element.id,
    };
    // Check if the tag already exists
    tags.forEach((tag) => {
      if (tag.id != element.id) {
        // The object is not existing in the array of tags
        console.log("yolo");
        newTagsArray.push(tagObject);
        setTags(newTagsArray);
        console.log(tags);
      } else {
        console.log("Already selected");
      }
    });
    // if the array is empty, add the object
    if (tags.length == 0) {
      newTagsArray.push(tagObject);
      setTags(newTagsArray);
    }
  };

  // Remove the equipment from the tag array
  const removeTag = (index, e) => {
    e.preventDefault();
    console.log(index);
    var newArray = [...tags];
    newArray.splice(index);
    console.log(newArray);
    setTags(newArray);
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
    router.push("/inspections");
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="w-1/2">
          <h1 className="text-gray-500 text-xl">
            Créer un rapport d'inspection
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
              label="Titre du formulaire"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br/>
            <div className="pr-8">
              <SelectFancy
                key="selectfancy"
                handleClick={AddEquipmentTag}
                data={equipments.data}
                label="Ajouter des équipements"
              />
              <br />
              <div className="flex flex-row">
                {tags.map((tag, index) => (
                  <Badge
                    label={tag.name}
                    onCancel={(e) => removeTag(index, e)}
                  />
                ))}
              </div>
            </div>
            <br />
            <h1 className="text-lg font-bold">Questions</h1>
            <br />
            <ButtonOutlined
              onClick={() => addElement()}
              label="Ajouter une question"
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

export async function getServerSideProps(context) {
  let serverResponse = await fetch(
    "http://localhost:3000/api/get?request=equipments_types",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let data = await serverResponse.json();

  return {
    props: {
      equipments: data,
    },
  };
}

export default AddInspection;
