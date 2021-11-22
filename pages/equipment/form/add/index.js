import { useEffect, useState } from "react";

import InputRequired from "../../../../components/inputs/Required";

function AddEquipment() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let serverResponse = await fetch("/api/get?request=equipment_types_options&id=1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let data = await serverResponse.json();
      console.log(data)
      setData(data.data);
    };
    getData();
  }, []);

  return (
    <section className="h-screen bg-gray-100 bg-opacity-50 mt-8">
      <form className="container max-w-2xl mx-auto shadow-md md:w-3/4">
        <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <a href="#" className="block relative">
                <img
                  alt="profil"
                  src="/images/person/1.jpg"
                  className="mx-auto object-cover rounded-full h-16 w-16 "
                />
              </a>
              <h1 className="text-gray-600">Charlie</h1>
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
                  />
                </div>
              </div>
              <br/>
              <div>
                <div className=" relative ">
                  <InputRequired 
                    label="Num. d'inspection" 
                    placeholder="12345678"
                    id="num_inspection"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Information générale</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              {data.map(option => (
                <div className=" relative ">
                  <InputRequired
                    label={option.key}
                    id={option.key}
                  />
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button
              type="submit"
              className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddEquipment;
