import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { axiosUser } from '../../../Api/Api';

function Services() {
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axiosUser.get("findservice");
      setServiceData(response?.data?.allServiceData || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Service data:", error);
      setLoading(false); // Set loading to false even on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // If loading or no data, show six default cards
  const defaultCards = [
    { name: 'COMMERCIAL CONSTRUCTIONS', photo: '/Images/com.jpg' },
    { name: 'RESIDENCIAL CONSTRUCTIONS', photo: '/Images/residancial.jpg' },
    { name: 'INTERIOR AND EXTERIOR REMODELING', photo: '/Images/interior.jpg' },
    { name: 'ROOFING SERVICES', photo: '/Images/roof.jpg' },
    { name: 'CONTRACT WORKS', photo: '/Images/contract.jpg' },
    { name: 'ALL MAINTAINANCE WORKS', photo: '/Images/main.jpg' },

  ];

  const filteredServices = serviceData.filter(service => !service.IsBlocked);

  return (
    <div className="py-28" id="Services">
      <h1 className="text-2xl md:text-5xl font-extrabold ml-5 md:ml-80">OUR SERVICES</h1>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-12">
        <article>
          <section className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
            {(loading || serviceData.length === 0 ? defaultCards : filteredServices).map((service, index) => (
              <ServiceCard key={index} name={service.name} image={service.photo} />
            ))}
          </section>
        </article>
      </section>
    </div>
  );
}

export default Services;
