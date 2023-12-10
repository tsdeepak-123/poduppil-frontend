import React from 'react'

function CommonCard({label,value}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
    <h3 className="text-lg font-semibold mb-2 text-red-500 uppercase">{label}</h3>
    <p className="text-base text-gray-700">{value}</p>
  </div>
  )
}

export default CommonCard