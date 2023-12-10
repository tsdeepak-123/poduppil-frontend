import React, { useEffect, useState } from 'react';
import { axiosAdmin } from '../../../Api/Api';
import ReturnButton from '../../CommonComponents/Return/ReturnButton';
import { useLocation } from 'react-router-dom';
import Nodata from '../../CommonComponents/Nodata/Nodata';
import Loading from "../../CommonComponents/Loading/Loading";

function AttendanceSingle() {
  const location = useLocation();
  const id = location?.state?.id;
  const name = location?.state?.LabourName;
  const photo = location?.state?.photo;
  const phone = location?.state?.phone;
  const currentDate = new Date();
  const [data, setData] = useState();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0);

  const dates = [];

  for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`staffattendanceById?staffId=${id}`);
      setData(response?.data?.staffData);

      if (response?.data?.staffData) {
        const firstDataDate = Object.keys(response.data.staffData)[0];
        const month = new Date(firstDataDate).getMonth();
        setCurrentMonth(month);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const getColorClass = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-500';
      case 'halfday':
        return 'bg-yellow-500';
      case 'absent':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };


  return (
    <>
      <ReturnButton />{
        !data ? (
<Loading/>
        ):(
          dates.length>0 ?(
            <div className="flex">
            <div className="w-1/2 p-4 mt-20">
              <div className="text-center">
                <img src={photo} alt="Labor Photo" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h2 className="text-2xl font-semibold">{name}</h2>
                <p>{phone}</p>
              </div>
            </div>
            <div className="w-1/2 p-4">
              {data && (
                <div className="calendar mx-auto max-w-lg">
                  <div className="text-center font-semibold mb-4 mt-6">
                    {monthNames[currentMonth]} {currentDate.getFullYear()}
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="font-semibold text-gray-700">{day}</div>
                    ))}
                    {dates.map((date) => {
                      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`;
                      const status = data && data[dateString] ? data[dateString] : 'gray';
                      const className = getColorClass(status);
    
                      return (
                        <div
                          key={dateString}
                          className="w-12 h-12 flex items-center justify-center"
                          style={{ borderRadius: '50%', border: '1px solid #ccc' }}
                        >
                          <div
                            className={`w-10 h-10 ${className} rounded-full flex items-center justify-center`}
                          >
                            <span
                              className={status === 'absent' ? 'text-white' : 'text-black'}
                            >
                              {date.getDate()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          ):(
            <div>
            <Nodata/>
          </div>
          )
        )
    
      }
      
    </>
  );
}

export default AttendanceSingle;
