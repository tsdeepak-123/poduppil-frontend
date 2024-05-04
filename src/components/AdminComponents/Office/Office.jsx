import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../../CommonComponents/Card/ItemCard';
import ReturnButton from '../../CommonComponents/Return/ReturnButton';
import Footer from '../../AdminComponents/Footer/Footer';

function Office() {
  const navigate = useNavigate();

  const options = [
    { name: 'ATTENDANCE', path: '/admin/labourattendance' },
    { name: 'UTILITY BILLS', path: '/admin/utilitybills' },
    { name: 'SALARY MANAGEMENT', path: '/admin/salarymanagement' },
    { name: 'RECEIVED CASH', path: '/admin/recievedcash' }, // Corrected typo in 'RECEIVED'
    { name: 'USER HOME CONTROL', path: '/admin/userhomecontroll' }, // Corrected typo in 'CONTROL'
    { name: 'ADMIN ACCOUNT', path: '/admin/adminaccount' }, // Corrected path typo
    { name: 'OWNER EXPENSE', path: '/admin/ownerexpense' },
    { name: 'CREDIT BALANCE', path: '/admin/creditbalance' },
    { name: 'WORK REPORT', path: '/admin/workreport' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <ReturnButton navigation="/admin/dashboard " />
      <div className='flex flex-col justify-between'>
        <div className='grid grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-14 ml-14'>
          {options.map((option) => (
            <ItemCard key={option.name} name={option.name} navigation={() => handleNavigation(option.path)} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Office;
