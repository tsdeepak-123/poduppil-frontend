import React from 'react'


 

function SingleBydate({materialData}) {

  return (
    <>
  <div className='flex justify-center mt-8'>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" class="px-16 py-3">
                    Purchase Date
                </th>
                <th scope="col" class="px-16 py-3">
                    C/O OF
                </th>
                <th scope="col" class="px-16 py-3">
                    Total
                </th>
            </tr>
        </thead>
        <tbody>
            {
                materialData?.map((data,index)=> 
                <tr key={index} class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                           <td scope="row" class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> 
                         {data.date}
                         </td>
                           <td scope="row" class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> 
                         {data.careof}
                         </td>
                           <td scope="row" class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> 
                         {data.TotalAmount}
                         </td>
                </tr>
                )
            }
           
        </tbody>
    </table>
</div>
</div>
    </>
  )
}

export default SingleBydate