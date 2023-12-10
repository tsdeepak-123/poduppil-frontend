import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
function PurchaseTable({values,handleDelete}) {
  return (
    <div className='flex justify-center mt-8'>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Material name
                </th>
                <th scope="col" class="px-6 py-3">
                    Care Of
                </th>
                <th scope="col" class="px-6 py-3">
                    Quantity
                </th>
                <th scope="col" class="px-6 py-3">
                    Rate/Unit
                </th>
                <th scope="col" class="px-6 py-3">
                    Total
                </th>
                <th scope="col" class="px-6 py-3">
                    delete
                </th>
            </tr>
        </thead>
        <tbody>
{values?.map((data,index)=>{
    return(
        <tr key={index}  class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {data?.name}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {data?.careof}
                </td>
               
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {data?.quantity}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {data?.baseRate}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {data?.total}
                </td>
                <td scope="row" class="px-6 py-4 cursor-pointer " onClick={()=>handleDelete(index)}><DeleteIcon/>
                </td>
            </tr>

    )
   })}

        </tbody>
    </table>
</div>
</div>
  )
}

export default PurchaseTable