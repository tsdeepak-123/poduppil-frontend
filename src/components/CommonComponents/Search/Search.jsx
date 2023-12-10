import React from 'react'

function Search({value,onChange}) {
  return (
    <>
       <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={onChange}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 sm:w-[200px] w-[150px]"
    />
    </>
  )
}

export default Search
