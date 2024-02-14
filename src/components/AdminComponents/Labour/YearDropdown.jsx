import React from 'react'

function YearDropdown({YearNames,currentYear,handleYearChange}) {
  return (
    <div className="flex items-center justify-center mt-4">
  <label className="mr-2 text-gray-700">Select Year:</label>
  <div className="relative">
    <select
      value={currentYear}
      onChange={handleYearChange}
      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    >
      {YearNames.map((Year, index) => (
        <option key={index} value={Year} className="capitalize">
          {Year}
        </option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
    </div>
  </div>
</div>

  )
}

export default YearDropdown