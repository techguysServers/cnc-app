import Select from "./inputs/Select";
import InspectionsQuestions from "./InspectionQuestion";

function InspectionSurveyBox({ inspectionsQuestions, preview, options, onSelect }) {
  return (
    <div className="border-b rounded-lg shadow-md p-5">
      {!preview && <Select onChange={onSelect} options={options}/>}
      {inspectionsQuestions.map((element) => (
        <div className="mt-5">
          <InspectionsQuestions
            label={element.label}
            description={element.description}
            inputType={element.inputType}
          />
        </div>
      ))}
    </div>
  );
}

export default InspectionSurveyBox;
