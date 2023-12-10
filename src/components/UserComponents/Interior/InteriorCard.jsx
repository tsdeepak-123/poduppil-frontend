import React from 'react';

function SimpleCard({ name, image }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mt-8">
      <div className="bg-gray-200 rounded-lg overflow-hidden mb-10 hover:bg-black text-gray-600 hover:text-white transition ease-in delay-150">
        <img
          src={image}
          alt="image"
          className="w-full h-80 object-cover"
        />
        <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center cursor-pointer h-24">
          <h3 className="font-bold text-2xl mb-4 block">{name}</h3>
        </div>
      </div>
    </div>
  );
}

export default SimpleCard;
