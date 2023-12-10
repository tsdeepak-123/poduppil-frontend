import React, { useEffect } from "react";

function CashTable({ RecievedData ,fetchData}) {
    useEffect(()=>{
      fetchData()
    },[RecievedData])
  return (
    <>
      <div className="flex justify-center mt-8">
        <div class=" w-[80%] relative overflow-y-scroll  overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Project name
                </th>
                <th scope="col" class="px-6 py-3 flex justify-end">
                  AMOUNT RECIEVED
                </th>
              </tr>
            </thead>
            <tbody>
              {RecievedData ? (
                RecievedData.map((item, index) => (
                  <tr
                    key={index}
                    class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.projectName}
                    </td>
                    <td
                      scope="row"
                      class="flex justify-end px-6 py-4 font-medium text-green-600 whitespace-nowrap dark:text-white"
                    >
                      + {item.totalAmountReceived}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="8" class="text-center py-4">
                    No data available
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

export default CashTable;
