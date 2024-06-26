import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TextFields from '../../CommonComponents/TextFields/TextFields';
import Buttons from '../../CommonComponents/Button/Buttons';
import { axiosAdmin } from '../../../Api/Api';
import ReturnButton from '../../CommonComponents/Return/ReturnButton';
import TextField from "@mui/material/TextField";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Footer from "../../AdminComponents/Footer/Footer"

function AddLabour() {
  const navigate = useNavigate();
  const location = useLocation();
  const { labourData } = location.state || {};

  const [name, setName] = useState(labourData?.name || "");
  const [age, setAge] = useState(labourData?.age || "");
  const [phone, setPhone] = useState(labourData?.phone || "");
  const [street, setStreet] = useState(labourData?.address?.[0]?.street || "");
  const [post, setPost] = useState(labourData?.address?.[0]?.post || "");
  const [town, setTown] = useState(labourData?.address?.[0]?.town || "");
  const [district, setDistrict] = useState(labourData?.address?.[0]?.district || "");
  const [state, setState] = useState(labourData?.address?.[0]?.state || "");
  const [adhar, setAdhar] = useState(labourData?.adhar || "");
  const [pincode, setPincode] = useState(labourData?.address?.[0]?.pincode || "");
  const [salary, setSalary] = useState(labourData?.salary || "");
  const [date, setDate] = useState(labourData?.date || "");
  const [idproof, setIdproof] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booknumber,setBooknumber] = useState(labourData?.booknumber || "");

  useEffect(() => {
    // You can do additional setup or data fetching here
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleBookChange = (e) => {
    setBooknumber(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleProofChange = (e) => {
    const selectedPhotos = e.target.files;
    setIdproof(selectedPhotos);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  
  
    const handleSubmit=(e)=>{
  try {
    e.preventDefault()
    setLoading(true)

    if(labourData){
      const address={street:street,
         post:post,
         town:town,
         district:district,
         state:state,
         pincode:pincode
         }

         const newaddress=JSON.stringify(address)
         const Staffdata={
         name,
         age,
         phone,
         address:newaddress,
         salary,
         adhar,
         date,
         booknumber
       }
     
       const formData = new FormData();

       Object.entries(Staffdata).forEach(([key, value]) => {
         console.log(key,":",value);
         formData.append(key, value);
       });
       
       for (const proof of idproof) {
         formData.append("proof", proof);
       }
       formData.append("photo",photo);
      //update operation with the edited values
      axiosAdmin.patch(`editlabour/${labourData._id}`,formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
       
      })
       .then((response) => {
        if(response?.data?.success){
          navigate("/admin/labourdetails");
          Swal.fire('labour updated successfully')
        }
       })
       .catch((error) => {
         if (error.response && error.response.status === 401) {
           window.location.replace("/admin/login")
         }
       });
    }else{
      const LabourData={
        name,
        age,
        phone,
        street,
        post,
        town,
        district,
        state,
        pincode,
        salary,
        adhar,
        date,
        booknumber
      }
      const formData = new FormData();
      
      Object.entries(LabourData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      for (const proof of idproof) {
        formData.append("proof", proof);
      }
    
      // formData.append("proof",idproof);
      formData.append("photo",photo);
      axiosAdmin.post('addlabour',formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }  
           
           
      }).then((response)=>{
        setLoading(false)
        if(response.data.success){
          Swal.fire('Labour added successfully')
          navigate('/admin/labourdetails')
        }
        toast.error(response?.data?.message);
        
       
      })
    }
  
    
  } catch (error) {
    setLoading(false)
    toast.error(error.response?.data?.message);
    if (error.response && error.response.status === 401) {
      window.location.replace("/admin/login")
    }
  }
}
  


  return (
    <div className='flex flex-col justify-between h-screen'>
      <Toaster position='top-center' reverseOrder={false} />
      <ReturnButton navigation={"/admin/labourdetails"}/>
      <div className='flex flex-wrap justify-around px-16 mt-24'>
        {/* Add input fields for other labour properties */}
        <TextFields name="Book Number" type="number" value={booknumber} onChange={handleBookChange} />
        <TextFields name="Labour name" type="text" value={name} onChange={handleNameChange} />
        <TextFields name="Age" type="number" value={age} onChange={handleAgeChange} />
        <TextFields name="Phone number" type="number" value={phone} onChange={handlePhoneChange} />
        <TextFields name="Street name" type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
        <TextFields name="Post office" type="text" value={post} onChange={(e) => setPost(e.target.value)} />
        <TextFields name="Town" type="text" value={town} onChange={(e) => setTown(e.target.value)} />
        <TextFields name="District" type="text" value={district} onChange={(e) => setDistrict(e.target.value)} />
        <TextFields name="State" type="text" value={state} onChange={(e) => setState(e.target.value)} />
        <TextFields name="Adhar Number" type="number" value={adhar} onChange={(e) => setAdhar(e.target.value)} />
        <TextFields name="Pincode" type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} />
        <TextFields name="Basic salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
        <TextFields name="Date of joining" type="date" value={date} onChange={(e) => setDate(e.target.value)} input={true} />
        <TextFields name="photo" type="file" input={true} onChange={handleImageChange} />
        <TextField
          type="file"
          label="idproof"
          InputLabelProps={{ shrink: true }}
          inputProps={{ multiple: true }}
          className='sm:w-96 w-80'
          onChange={handleProofChange}
        />
        <Buttons click={handleSubmit} name={loading ? "LOADING..." : labourData ? "UPDATE LABOUR" : "ADD LABOUR"} classes={'sm:w-96'} />
      </div>
      <div className='mt-4'>
      <Footer/>
      </div>
    
    </div>
  );
}

export default AddLabour;
