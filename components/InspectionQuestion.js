import { useEffect, useState } from "react";
import InputRequired from "./inputs/Required";
import YesNo from "./inputs/YesNo";

function InspectionQuestion({ label, description, inputType }) {
  const [optionInput, setOptionInput] = useState("");
  // Create the different form input for all the equipment options
  useEffect(() => {
    const createOptionInput = () => {
      switch (inputType) {
        case "input":
          console.log(true);
          setOptionInput(
            <div className=" relative ">
              <InputRequired />
            </div>
          );
          break;
        case "yesno":
          console.log(true);
          setOptionInput(
            <div className=" relative ">
              <YesNo />
            </div>
          );
          break;

        default:
          break;
      }
    };
    createOptionInput();
  }, []);
  return (
    <div className="flex flex-row">
      <div className="w-2/3">
        <b>{label} :</b>
        <br />
        <p>{description}</p>
      </div>
      <div className="w-1/3">{optionInput}</div>
    </div>
  );
}

export default InspectionQuestion;
