import React from "react";
import Buttons from "../../CommonComponents/Button/Buttons";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate=useNavigate()

    const handleLoginClick=()=>{
        navigate('/admin/login')
    }

  return (
<div>
  <div className="flex flex-col items-center">
    <div className="relative top-32 sm:top-0">
    <img
      src="/Images/poduppilLogo.jpg"
      alt=""
      className="max-w-[100%] sm:h-[500px] h-[300px]"
    />
    </div> 
    <div className="relative bottom-[-110px] sm:bottom-20">
      <Buttons name="LOGIN TO CONTINUE" classes={'h-14 w-[300px]'} click={handleLoginClick}/>
    </div>
  </div>
</div>

  );
}

export default Home;
