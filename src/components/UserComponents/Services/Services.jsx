import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { axiosUser } from '../../../Api/Api';

function Services() {
  const [ServiceData, setServiceData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosUser.get("findservice");
      setServiceData(response?.data?.allServiceData || []);
    } catch (error) {
      console.error("Error fetching Service data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const filteredServices = ServiceData.filter(service => !service.IsBlocked);
  return (
    <div className="py-28" id="Services">
      <h1 className="text-2xl md:text-5xl font-extrabold ml-5 md:ml-80">OUR SERVICES</h1>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-12">
        <article>
          <section className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
            {
              filteredServices && filteredServices.map((service)=>(
                <ServiceCard name={service.name} image={service.photo}/>
              ))
            }
           
          </section>
        </article>
      </section>
    </div>
  );
}

export default Services
