import { useState } from "react";
import { useRouter } from "next/router";
import DeleteCard from "../DeleteCard";

function InspectionTable({ data }) {
  const router = useRouter();

  const [showCard, setShowCard] = useState(false);
  const [equipmentToDeleteName, setEquipmentToDeleteName] = useState("");
  const [equipmentToDeleteId, setEquipmentToDeleteId] = useState("");

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleDelete = (e, id, serialNb) => {
    e.stopPropagation();
    setEquipmentToDeleteName(serialNb);
    setEquipmentToDeleteId(id);
    setShowCard(true);
  };

  const confirmDelete = () => {
    console.log(equipmentToDeleteId);
    const deleteEquipment = async () => {
      let serverResponse = await fetch(
        "/api/equipment/" + equipmentToDeleteId,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      let response = await serverResponse.json();
      setShowCard(false);
      refreshData()
      console.log(response);
    };
    deleteEquipment();
  };

  const handleClick = (id) => {
    router.push('/equipments/equipment/' + id)
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date d'inspection
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Créateur
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((type) => (
                    <tr key={type.serial_nb} onClick={() => handleClick(type.id)} class="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full p-1">
                              <img
                                src="https://res.cloudinary.com/techguys/image/upload/v1637538500/cnc/service_dcnymj.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {type.serial_nb}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {type.num_inspection}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {type.date_created.split("T")[0]}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {type.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Modifier
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          onClick={(e) => handleDelete(e, type.id, type.serial_nb)}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        >
                          Supprimer
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showCard && (
        <>
          <DeleteCard
            onCancel={() => setShowCard(false)}
            onDelete={() => confirmDelete()}
            message={
              "Voulez-vous vraiment supprimer l'équipement " +
              equipmentToDeleteName
            }
          />
          <div className="w-screen h-screen bg-gray-500	bg-opacity-25 fixed inset-x-0 top-0"></div>
        </>
      )}
    </div>
  );
}

export default InspectionTable;
