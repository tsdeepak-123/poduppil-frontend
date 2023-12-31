import React from "react";
import Buttons from "../../CommonComponents/Button/Buttons";
import { useNavigate } from "react-router-dom";
import Footer from "../../AdminComponents/Footer/Footer"


function Home() {
    const navigate=useNavigate()

    const handleLoginClick=()=>{
        navigate('/admin/login')
    }

  return (
<div className="flex flex-col justify-between h-screen">
  <div className="flex flex-col justify-center items-center">
    <div className="">
    <img
      src="/Images/poduppilLogo.jpg"
      alt=""
      className="w-[300px]"
    />
    </div> 
      <Buttons name="LOGIN TO CONTINUE" classes={'h-14 w-[300px]'} click={handleLoginClick}/>
  </div>
 <Footer/>
</div>

  );
}

export default Home;
