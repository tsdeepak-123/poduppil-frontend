import React from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

function ReturnButton() {
    const navigate = useNavigate();

    const handleBackArrowClick = () => {
        navigate("/admin/dashboard");
      };
  return (
    <div className="flex justify-start mt-32">
    <KeyboardReturnIcon
      className="ms-11 mt-4 cursor-pointer"
      onClick={handleBackArrowClick}
    />
  </div>
  )
}

export default ReturnButton