import { useState } from "react";

import Select from "./inputs/Select";
import Button from "./Button";
import InspectionsQuestions from "./InspectionQuestion";

function InspectionSurveyBox({
  inspectionsQuestions,
  preview,
  options,
  onSelect,
  equipmentId,
  inspectionReportId,
  onSubmit
}) {
  const [responses, setResponses] = useState([]);

  const handleChange = (value, id) => {
    // Take the old array
    var newResponses = [...responses];
    // Find the index of the question object
    var index = newResponses.findIndex((i) => i.inspectionOptionId === id);
    // If the index return -1, the object doesnt exist in the array
    if (index === -1) {
      // If the object is not in array, add it
      var newAnswer = {
        inspectionOptionId: id,
        input: value,
      };
      setResponses((oldArray) => [...oldArray, newAnswer]);
    } else {
      // Take the old object
      var newAnwser = responses[index];
      // Update the old object with the new value
      newAnwser.input = value;
      // Update the old array with the new object
      newResponses[index] = newAnwser;
      setResponses(newResponses);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    var body = {
      request: "create_inspection",
      inspectionReportId: inspectionReportId,
      userId: 1,
      equipmentId: equipmentId,
      inspectionResponses: responses,
    };
    console.log(body);
    let serverResponse = await fetch("/api/inspections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await serverResponse.json();
    console.log(data);
    if (data.data === "success") {
      onSubmit()
    }
  };

  return (
    <div className="border-b rounded-lg shadow-md p-5">
      {!preview && <Select onChange={onSelect} options={options} />}
      {inspectionsQuestions.map((element, index) => (
        <div className="mt-5">
          <InspectionsQuestions
            key={index}
            label={element.label}
            id={element.label}
            description={element.description}
            inputType={element.inputType}
            onChange={(e) => handleChange(e.target.value, element.id)}
          />
        </div>
      ))}
      <br />
      {!preview && <Button label="Soumettre" onClick={(e) => handleClick(e)} />}
    </div>
  );
}

export default InspectionSurveyBox;
