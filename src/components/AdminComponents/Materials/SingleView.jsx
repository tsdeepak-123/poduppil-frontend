import React, { useEffect, useRef, useState } from "react";
import FormatDate from "../../../utils/FormatDate";
import Search from "../../CommonComponents/Search/Search"

function SingleView({ materialData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTotalRate, setFilteredTotalRate] = useState(0);
  const [filteredMaterialData, setFilteredMaterialData] = useState([]);

  const applySearchFilter = (data, term) => {
    return data.filter((material) =>
      material.name?.toLowerCase().includes(term.toLowerCase()) ||
      material.careof?.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (materialData && materialData.length > 0) {
      let totalRate = 0;
      let filteredData = [];

      materialData.forEach((data) => {
        let filteredMaterial = [];
        if (searchTerm) {
          filteredMaterial = applySearchFilter(data.Material, searchTerm);

          if (filteredMaterial.length > 0) {
            const materialTotal = filteredMaterial.reduce(
              (acc, material) => acc + parseFloat(material.total || 0),
              0
            );
            totalRate += materialTotal;
            filteredData.push({ ...data, Material: filteredMaterial });
          }
        } else {
          totalRate += parseFloat(data.TotalAmount || 0);
          filteredData.push(data);
        }
      });

      setFilteredTotalRate(searchTerm ? totalRate : totalRate);
      setFilteredMaterialData(filteredData);
    }
  }, [materialData, searchTerm]);

  return (
    <>
      <div className="mx-20 mt-14 flex justify-between">
        <Search value={searchTerm} onChange={handleSearch} />
        {filteredTotalRate === 0 ? (
          ""
        ) : (
          <div className="flex ml-4">
            <p className="font-bold text-xl border-b-2 border-gray-300 pb-2 inline-block">
              Total&nbsp;:{" "}
              <span className="text-red-500 ms-4">{filteredTotalRate}</span>
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <div className="w-[90%] relative overflow-y-scroll shadow-md sm:rounded-lg max-h-[500px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Purchase Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Material Name
                </th>
                <th scope="col" className="px-6 py-3">
                  c/o
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Base Rate
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                {!searchTerm ? (
                  <th scope="col" className="px-6 py-3">
                    Total Amount
                  </th>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody>
              {filteredMaterialData.length > 0 ? (
                filteredMaterialData.map((data, index) => (
                  <React.Fragment key={index}>
                    {data.Material.map((material, materialIndex) => (
                      <tr
                        key={materialIndex}
                        className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                      >
                        {materialIndex === 0 && (
                          <td
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            rowSpan={data.Material.length}
                          >
                            {FormatDate(data.date)}
                          </td>
                        )}
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {material.name}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {material.careof}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {material.quantity}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {material.baseRate}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {material.total}
                        </td>
                        {!searchTerm && materialIndex === 0 && (
                          <td
                            className="px-6 py-4 font-medium text-red-500 whitespace-nowrap dark:text-white"
                            rowSpan={data.Material.length}
                          >
                            {data.TotalAmount}
                          </td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4">
                    No matches found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SingleView;
