import Autocomplete from "react-google-autocomplete";
import { useState } from "react";
import { useRouter } from "next/router";

import InputRequired from "../../../components/inputs/Required";
import Button from "../../../components/Button";
import SuccessCard from "../../../components/SuccessCard";

function LocalisationsForms() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [locationName, setLocationName] = useState()
  const [placeId, setPlaceId] = useState()
  const [addressComponents, setAddressComponents] = useState()
  const [locationGeo, setLocationGeo] = useState()

  // Function launch when the user select an address in the adress input
  // Make a call to the Google API to get more details on the location
  const handlePlaceSelection = async (placeObject) => {
    console.log(placeObject)

    // Retreive the latitude and longivitude from the Google places details API
    let url = "/api/localisations?request=place_details&place_id=" + placeObject.place_id;
    var config = {
      method: "GET",
    };
    let serverResponse = await fetch(url, config);
    let placeDetails = await serverResponse.json();
    
    // Set the states
    setPlaceId(placeObject.place_id)
    setAddressComponents(placeObject.address_components)
    setLocationGeo(placeDetails.data.result.geometry)  
  };

  // Function lauch when the user clicks on "Ajouter"
  // Send the form data to the server to be insert in the DB
  const submitData = async () => {

    // If the form has not been completed, display an error
    if(!locationName || !placeId){
      console.log('nonon')
    }
    // Create the request body
    let body = {
      request: 'post_location',
      userId: 1,
      name: locationName,
      placeId: placeId,
      addressComponents: JSON.stringify(addressComponents),
      locationGeo: JSON.stringify(locationGeo)
    }
    // Send the request to the server
    let serverResponse = await fetch("/api/localisations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await serverResponse.json();

    // Show the success card if the data has been inserted successfully
    if (data.data == "success") {
      setShowSuccess(true);
    }
  }

  return (
    <div>
      <form className="container max-w-2xl mx-auto shadow-md md:w-3/4">
        <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              {/* <img
                alt="profil"
                src={equipmentTypeData.image_link}
                className="mx-auto object-cover rounded-full h-16 w-16 "
              /> */}
              <h1 className="text-gray-600">Ajouter une localisation</h1>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-white">
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <div className="max-w-sm mx-auto md:w-2/3">
              <div>
                <div className=" relative ">
                  <InputRequired
                    label="Nom du lieu"
                    id="location_name"
                    placeholder="Chantier ou entrepot"
                    onChange={(e) => setLocationName(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <div>
                <div className=" relative ">
                  <label htmlFor="adresse" className="text-gray-700">
                    Adresse
                    <span className="text-red-500 required-dot">*</span>
                  </label>
                  <Autocomplete
                    apiKey={process.env.GOOGLE_MAP_API}
                    style={{ width: "90%" }}
                    onPlaceSelected={(place) => {
                      handlePlaceSelection(place);
                    }}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    options={{
                      types: ["address"],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              {/* {optionInputs} */}
            </div>
          </div>
          <hr />
          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <Button label="Ajouter" onClick={() => submitData()}/>
          </div>
        </div>
      </form>
      {showSuccess && (
        <>
          <SuccessCard
            buttonLabel="Retour"
            successMessage="L'équipment à été ajouté à la base de donnée"
            onClick={() => router.push('/localisations')}
          />
          <div className="w-screen h-screen bg-gray-500	bg-opacity-25 fixed inset-x-0 top-0"></div>
        </>
      )}
    </div>
  );
}

export default LocalisationsForms;
