import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FormatDate from "../../../utils/FormatDate"
import Search from '../../CommonComponents/Search/Search';

const MaterialListModal = ({ showModal, setShowModal, selectedPurchase, careOf }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Number of items per page

  const filteredPurchaseData = selectedPurchase?.materialList?.filter((obj) =>
    obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obj.projectname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    FormatDate(obj.date).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate the filtered data
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredPurchaseData?.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="modal-content bg-white w-3/4 p-4 rounded-lg">
            <Search value={searchTerm} onChange={handleSearch} />
            <span className='flex justify-end'>
              <CloseIcon className=' cursor-pointer' onClick={() => setShowModal(false)} />
            </span>
            <div className='flex justify-between'>
              <h2 className="text-xl font-bold mb-4">Material List</h2>
              <h2 className="text-xl font-bold mb-4 me-14">CareOf &nbsp;:&nbsp;{selectedPurchase._id}</h2>
            </div>
              {currentItems && currentItems.length > 0 ? (
                <table className="w-full  border-collapse">
                  <thead className='sticky top-0'>
                      <th className="py-2 px-4 border">Puchase date</th>
                      <th className="py-2 px-4 border">Project name</th>
                      <th className="py-2 px-4 border">Material Name</th>
                      <th className="py-2 px-4 border">Quantity</th>
                      <th className="py-2 px-4 border">baseRate</th>
                      <th className="py-2 px-4 border">Total</th>
                  </thead>
                  <tbody>
                    {currentItems.map((material, index) => (
                      <tr key={index} className="border">
                        <td className="py-2 px-4 border">{FormatDate(material.date)}</td>
                        <td className="py-2 px-4 border">{material.projectname}</td>
                        <td className="py-2 px-4 border">{material.name}</td>
                        <td className="py-2 px-4 border">{material.quantity}</td>
                        <td className="py-2 px-4 border">{material.baseRate}</td>
                        <td className="py-2 px-4 border">{material.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <tr>
                  <td colspan="12" class="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
  
            {filteredPurchaseData && filteredPurchaseData.length > pageSize && (
              <div className="flex justify-end mt-4">
                {[...Array(Math.ceil(filteredPurchaseData.length / pageSize))].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-1 border ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialListModal;
