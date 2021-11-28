import BlocList from "../BlocList";

function EquipmentProfilCard({ data, metaData, typeData }) {
  console.log(typeData)
  return (
    <div className="lg:w-1/3 px-1 mx-auto">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <img
                alt="..."
                src={typeData.image_link}
                className="shadow-xl rounded-full h-24 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-30-px"
              />
            </div>
            <div className="w-full px-4 text-center mt-5">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-l font-bold block uppercase tracking-wide text-blueGray-600">
                    0
                  </span>
                  <span className="text-sm text-blueGray-400">
                    Total d'inspection
                  </span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-l font-bold block uppercase tracking-wide text-blueGray-600">
                    {data.date_created.split("T")[0]}
                  </span>
                  <span className="leading-none text-sm text-blueGray-400">
                    Date de création
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-1">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              {typeData.name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
              {'Num. de série : ' + data.serial_nb} 
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
              {"Num. d'inspection :" + data.num_inspection}
            </div>
          </div>
          <div className="mt-5 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <BlocList data={metaData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquipmentProfilCard;
