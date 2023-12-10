import React, { useEffect, useState } from 'react';
import MessageIcon from '@mui/icons-material/Message';
import { axiosUser } from '../../../Api/Api';
import CloseIcon from '@mui/icons-material/Close';
import FormatDate from "../../../utils/FormatDate"
import DeleteIcon from '@mui/icons-material/Delete';
import toast,{Toaster} from "react-hot-toast"


function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosUser.get('getmessage');
      setNotifications(response?.data?.messageData);
    } catch (error) {
      if (error?.response && error?.response?.status === 401) {
        window.location.replace('/admin/login');
      }
    }
  };
  const DeleteMessage= async (id) => {
    try {
      const response = await axiosUser.patch(`deletemessage?id=${id}`);
        if(response.data.success){
          toast.success("Message deleted successfully")
        }else{
          toast.error(response.data.message)
        }
    } catch (error) {

      if (error?.response && error?.response?.status === 401) {
        window.location.replace('/admin/login');
      }
    }
  };

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [notifications]);

  return (
    <div className="p-4">
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex items-center mb-6 gap-4">
        <div className="mt-2">
          <MessageIcon />
        </div>
        <h5 className="text-2xl font-bold">Admin Notifications</h5>
      </div>

      {notifications.map((notification) => (
        <>
        <div
          key={notification?._id}
          className="bg-blue-100 mb-4 p-4 rounded cursor-pointer"
          onClick={() => openModal(notification)}
        >
          <div className='flex justify-between'>
          <p className="text-blue-800">{notification?.subject}</p>
          <p className="text-blue-800">{FormatDate(notification?.timestamp)}</p>
          </div>
          
        </div>
       <div >
        <p className='text-red-500 cursor-pointer' onClick={()=>DeleteMessage(notification._id)}><DeleteIcon/></p>
       </div>
       </>
 
      ))}

      {notifications.length === 0 && <p>No notifications at the moment.</p>}

      {/* Modal */}
      {isModalOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 mx-auto max-w-md rounded-md shadow-lg">
        <div className='flex justify-end'>
        <CloseIcon onClick={closeModal} className='cursor-pointer'/>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Message Details</h2>
        <div className="mb-4">
          <p className="text-lg font-semibold">Name:</p>
          <p className="text-gray-700">{selectedMessage?.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Email:</p>
          <p className="text-gray-700">{selectedMessage?.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Subject:</p>
          <p className="text-gray-700">{selectedMessage?.subject}</p>
        </div>
        <div className="mb-6">
          <p className="text-lg font-semibold">Message:</p>
          <p className="text-gray-700">{selectedMessage?.message}</p>
        </div>
       
      </div>
    </div>
      )}
    </div>
  );
}

export default Notifications;
