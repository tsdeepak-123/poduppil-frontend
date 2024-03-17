import React, { useState, useEffect } from 'react';
import Footer from '../../../components/AdminComponents/Footer/Footer';
import moment from 'moment';
import ReturnButton from '../../CommonComponents/Return/ReturnButton';
import { useLocation } from 'react-router-dom';
import { axiosAdmin } from '../../../Api/Api';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const MaterialListTable = () => {
  const location = useLocation();
  const selectedPurchase = location.state;

  const [loading, setLoading] = useState(true);
  const [materialList, setMaterialList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch material list data
  const fetchData = async (page) => {
    try {
      setLoading(true);
      const response = await axiosAdmin.get(`materiallistbycareof?careOf=${selectedPurchase._id}&page=${page}&search=${searchTerm}`);
      setMaterialList(response?.data?.materialList);
      setTotalPages(response?.data?.totalPages || 1);
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, searchTerm]); // Fetch data when currentPage or searchTerm changes

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <ReturnButton navigation={'/admin/projectlist'}/>
      <div className="flex justify-center mt-4">
          <button className="mx-2 px-3 py-1 bg-gray-200 text-gray-500 rounded" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            <KeyboardArrowLeft/>
          </button>
          <span>{currentPage} of {totalPages}</span>
          <button className="mx-2 px-3 py-1 bg-gray-200 text-gray-500 rounded" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            <KeyboardArrowRight/>
          </button>
      </div>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search Material"
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-1 border border-gray-300 rounded"
        />
      </div>
      <div className='relative flex justify-end mx-20 top-24'>
      </div>
      <div className='flex flex-col justify-between min-h-screen mt-14'>
        <div className='flex justify-center mb-44'>
          <table className="w-[80%] border-collapse">
            <thead className='sticky top-0'>
              <tr>
                <th className="py-2 px-4 border">Purchase date</th>
                <th className="py-2 px-4 border">Project name</th>
                <th className="py-2 px-4 border">Material Name</th>
                <th className="py-2 px-4 border">Quantity</th>
                <th className="py-2 px-4 border">Base Rate</th>
                <th className="py-2 px-4 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {materialList && materialList.length > 0 ? (
                materialList.map((purchase, index) => (
                  <React.Fragment key={index}>
                    {purchase.Material.map((material, materialIndex) => (
                      <tr key={materialIndex} className="border">
                        <td className="py-2 px-4 border">{moment(purchase.date).format('DD-MM-YYYY')}</td>
                        <td className="py-2 px-4 border">{purchase.projectname}</td>
                        <td className="py-2 px-4 border">{material.name}</td>
                        <td className="py-2 px-4 border">{material.quantity}</td>
                        <td className="py-2 px-4 border">{material.baseRate}</td>
                        <td className="py-2 px-4 border">{material.total}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MaterialListTable;
