import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import Loading from "../../CommonComponents/Loading/Loading";
import Footer from "../Footer/Footer";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import { useLocation } from "react-router-dom"
import PayModal from "./PayModal";
import moment from "moment"

function CareOfPayment() {
  const location = useLocation();
  const careofId=location?.state?.id
  const careofName=location?.state?.name
  const [PaymentData, setPaymentData] = useState();
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`paymentsbycareof?id=${careofId}`);
      setPaymentData(response?.data?.payments);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [PaymentData]);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <ReturnButton navigation={"/admin/projectlist"}/>
      <div className="flex justify-between mx-80 mb-4">
        <p className="font-bold">CARE OF : <span className="text-red-500">{careofName} </span> </p>
        <PayModal careof={careofId}/>
      </div>
      {!PaymentData ? (
        <Loading />
      ) : (
        <div className="flex justify-center mb-32">
          <div className="w-[60%] relative overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Paid by
                  </th>
                </tr>
              </thead>
              <tbody>
                {PaymentData && PaymentData.length > 0 ? (
                  PaymentData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                        {moment(item.date).format("DD-MM-YYYY")}
                      </td>
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                        {item.paymentType}
                      </td>
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                        {item.paidBy}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default CareOfPayment;
