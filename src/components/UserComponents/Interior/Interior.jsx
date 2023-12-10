import React, { useEffect, useState } from 'react';
import InteriorCard from './InteriorCard';
import {axiosUser} from "../../../Api/Api"

function Interior() {
  const [InteriorData, setInteriorData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosUser.get("findinterior");
      setInteriorData(response?.data?.allInteriorData || []);
    } catch (error) {
      console.error("Error fetching interior data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const filteredInterior = InteriorData.filter(interior => !interior.IsBlocked);
  return (
    <div className="" id="Interior">
      <p className="text-2xl md:text-5xl font-extrabold ml-5 md:ml-80 mb-6">INTERIOR WORKS</p>

      <div className="container max-w-7xl flex mx-auto">
        <div className="flex flex-wrap">
          {
           filteredInterior && filteredInterior?.map((interior)=>(
            <InteriorCard name={interior.name} image={interior.photo} />
           ))
          }
         
        </div>
      </div>
    </div>
  );
}

export default Interior;
