import React from 'react';

function ServiceCard({name,image}) {
  const cardStyle = {
    backgroundImage: `url(${image})`
  };

  return (
    <article className="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" style={cardStyle}>
      <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
      <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
        <h3 className="text-center">
          <h1 className="transition ease-in delay-150 hover:text-yellow-500 font-bold text-2xl text-white">
            <span className="absolute inset-0"></span>
            {name}
          </h1>
        </h3>
      </div>
    </article>
  );
}

export default ServiceCard;
