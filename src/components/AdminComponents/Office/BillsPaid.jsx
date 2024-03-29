import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosAdmin } from '../../../Api/Api';
import ReturnButton from '../../CommonComponents/Return/ReturnButton';
import Nodata from "../../CommonComponents/Nodata/Nodata"
import moment from "moment"
import Footer from '../../AdminComponents/Footer/Footer';

function BillsPaid() {

    const [billData, setBillData] = useState();
    const navigate = useNavigate();
  
    // fetching data from backend
    const fetchData = async () => {
      try {
        const response = await axiosAdmin.get("billslist?status=true");
        setBillData(response?.data?.allBillData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login")
        }
      }
    };
    //data displayin when mounting
    useEffect(() => {
      fetchData();
    }, []);
    const nav = (id) => {
      navigate("/admin/billsingleview", { state: { id } });
    };
  return (
    <div className='flex flex-col justify-between min-h-screen gap-8'>
    <ReturnButton navigation={"/admin/utilitybills"}/>

{
  billData?.length>0 ?(
    <div className="flex justify-center mt-8">
    <div class="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg max-h-[500px]">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Bill Date
            </th>
            <th scope="col" class="px-6 py-3">
              Bill Name
            </th>
            <th scope="col" class="px-6 py-3">
              Amount
            </th>
            <th scope="col" class="px-6 py-3">
              Paid By
            </th>
            <th scope="col" class="px-6 py-3">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {billData && billData.length > 0 ? (
            billData?.map((data) => {
              return (
                <tr
                  key={data?._id}
                  className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{moment(data.date).format('DD-MM-YYYY')}</td>
                  <td className="px-6 py-4">{data?.name}</td>
                  <td className="px-6 py-4">{data?.amount}</td>
                  <td className="px-6 py-4">{data?.paidby}</td>
                  <td
                    className="px-6 py-4 text-blue-500 cursor-pointer"
                    onClick={() => nav(data?._id)}
                  >
                    View
                  </td>
                </tr>
              );
            })
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
  ):(
    <Nodata/>
  )
}
   <Footer/>
  </div>
  )
}

export default BillsPaid