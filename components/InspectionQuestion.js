import { useEffect, useState } from "react";
import InputRequired from "./inputs/Required";
import YesNo from "./inputs/YesNo";

function InspectionQuestion({ label, description, inputType, onChange, id }) {
  const [optionInput, setOptionInput] = useState("");
  // Create the different form input for all the equipment options
  useEffect(() => {
    const createOptionInput = () => {
      switch (inputType) {
        case "input":
          console.log(true);
          setOptionInput(
            <div className=" relative ">
              <InputRequired key={id} id={id} onChange={onChange}/>
            </div>
          );
          break;
        case "yesno":
          console.log(true);
          setOptionInput(
            <div className=" relative ">
              <YesNo key={id} name={label} onChange={onChange}/>
            </div>
          );
          break;

        default:
          break;
      }
    };
    createOptionInput();
  }, [inputType, onChange]);
  return (
    <div className="flex flex-row items-center">
      <div className="w-2/3">
        <b>{label} :</b>
        <br />
        <p>{description}</p>
      </div>
      <div className="w-1/3 p-5">{optionInput}</div>
    </div>
  );
}

export default InspectionQuestion;
