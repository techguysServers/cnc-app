import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import InputRequired from "../../../../components/inputs/Required";
import YesNo from "../../../../components/inputs/YesNo";
import SuccessCard from "../../../../components/SuccessCard";

function AddEquipment({ equipmentTypeData }) {
  const router = useRouter();
  const { id } = router.query;
  const [optionData, setOptionData] = useState([]);
  const [numSerie, setNumSerie] = useState();
  const [numInspection, setNumInspection] = useState();
  const [customInputs, setCustomInputs] = useState([]);
  const [optionInputs, setOptionsInputs] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get the options data from the DB
  useEffect(() => {
    const getEquipmentOptionsData = async () => {
      let serverResponse = await fetch(
        "/api/get?request=equipment_types_options&id=" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      let data = await serverResponse.json();
      console.log(data);
      setOptionData(data.data);
    };
    getEquipmentOptionsData();
  }, [id]);

  // Send the data to the API
  const submitData = async (e) => {
    e.preventDefault();
    var body = {
      request: "create_equipment",
      equipmentTypeId: id,
      numSerie: numSerie,
      numInspection: numInspection,
      metaData: customInputs,
    };
    let serverResponse = await fetch("/api/equipment", {
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

  // Handle when one of the custom input value change
  const handleChange = (key, value) => {
    // Get the data
    var newInputsArray = [...customInputs];
    // Check if the object is already in the custom inputs array
    var objectIndex;
    var isInArray;
    newInputsArray.forEach((input, index) => {
      if (input.key == key) {
        isInArray = true;
        objectIndex = index;
      }
    });
    // If the object is already there, edit the old one
    if (isInArray === true) {
      console.log(objectIndex);
      // Get the object
      var newObject = newInputsArray[objectIndex];
      newObject["value"] = value;
      newInputsArray[objectIndex] = newObject;
    } else {
      newInputsArray.push({
        key: key,
        value: value,
      });
    }
    console.log(newInputsArray);
    setCustomInputs(newInputsArray);
  };

  // Redirect the user to the equipment page after confirm
  const handleConfirm = () => {
    router.push('/equipments/' + id + '?name=' + equipmentTypeData.name)
  }

  // Create the different form input for all the equipment options
  useEffect(() => {
    const createOptionsInputs = () => {
      var inputs = [];
      optionData.forEach((option) => {
        switch (option.input_type) {
          case "input":
            console.log(true);
            inputs.push(
              <div className=" relative ">
                <InputRequired
                  label={option.key}
                  id={option.key}
                  onChange={(e) => handleChange(option.key, e.target.value)}
                />
              </div>
            );
            break;
          case "yesno":
            console.log(true);
            inputs.push(
              <div className=" relative ">
                <YesNo
                  label={option.key}
                  onChange={(e) => handleChange(option.key, e.target.value)}
                />
              </div>
            );
            break;

          default:
            break;
        }
      });
      setOptionsInputs(inputs);
    };
    createOptionsInputs();
  }, [optionData]);

  return (
    <div>
      <form className="container max-w-2xl mx-auto shadow-md md:w-3/4">
        <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <img
                alt="profil"
                src={equipmentTypeData.image_link}
                className="mx-auto object-cover rounded-full h-16 w-16 "
              />
              <h1 className="text-gray-600">
                Ajouter un {equipmentTypeData.name}
              </h1>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-white">
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Information de base</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div>
                <div className=" relative ">
                  <InputRequired
                    label="Num. de série"
                    placeholder="12345678"
                    id="num_serie"
                    onChange={(e) => setNumSerie(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <div>
                <div className=" relative ">
                  <InputRequired
                    label="Num. d'inspection"
                    placeholder="12345678"
                    id="num_inspection"
                    onChange={(e) => setNumInspection(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Information générale</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              {optionInputs}
            </div>
          </div>
          <hr />
          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button
              onClick={(e) => submitData(e)}
              type="submit"
              className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Ajouter
            </button>
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
  const { id = "id" } = context.query;
  let serverResponse = await fetch(
    "http://localhost:3000/api/get?request=equipment_type&id=" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let data = await serverResponse.json();
  console.log(data);
  return {
    props: {
      equipmentTypeData: data.data[0],
    },
  };
}

export default AddEquipment;
