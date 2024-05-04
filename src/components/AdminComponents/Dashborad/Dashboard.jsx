import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../../CommonComponents/Card/ItemCard';
import Footer from "../../AdminComponents/Footer/Footer";

function Dashboard() {
  const navigate = useNavigate();

  const cardInfo = [
    { name: "PROJECTS", path: '/admin/projectdetails' },
    { name: "LABOURS", path: '/admin/labourdetails' },
    { name: "STAFFS", path: '/admin/staffdetails' },
    { name: "OFFICE", path: '/admin/officedetails' },
    { name: "CONTRACT WORK", path: '/admin/contractdetails' },
    { name: "MATERIAL PURCHASE", path: '/admin/projectlist' },
  ];

  return (
    <div className='flex flex-col justify-between ml-14'>
      <div className='grid grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-14'>
        {cardInfo.map((card) => (
          <ItemCard key={card.name} name={card.name} navigation={() => navigate(card.path)} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
