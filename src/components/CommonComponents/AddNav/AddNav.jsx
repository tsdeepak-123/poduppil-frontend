import React from 'react'
import { useNavigate } from 'react-router-dom';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Buttons from '../Button/Buttons'
import Search from '../Search/Search'


function AddNav({name,click,value,onChange,navigation,viewClick,twoButton,viewButtonName}) {
    const navigate=useNavigate()
    const handleBackArrowClick=()=>{
        navigate(navigation)
    }

  return (
    <>
    <div className='flex justify-between me-7 mt-32'>
    <KeyboardReturnIcon
          className="ms-11 mt-4 cursor-pointer"
          onClick={handleBackArrowClick}
        />
    <div className='relative top-20 block sm:hidden'>
    <Buttons name="+" click={click}/>
    </div>
    {
      !twoButton ?
      <div className='relative top-20 hidden sm:block'>
      <Buttons name={name} click={click}/>
      </div>:""
    }
  
    { twoButton ?
    <>
      <div className='relative top-20 left-96 hidden sm:block'>
      <Buttons name={name} click={click}/>
      </div>
    <div className="relative top-20">
    <Buttons name={viewButtonName} click={viewClick} />
  </div> </>:""
    }

    </div>
    <div className="ms-6 mt-9">
   <Search value={value} onChange={onChange}/>
  </div>
  </>
  )
}

export default AddNav