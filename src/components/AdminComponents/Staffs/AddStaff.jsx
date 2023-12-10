import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TextFields from '../../CommonComponents/TextFields/TextFields';
import Buttons from '../../CommonComponents/Button/Buttons';
import { useState } from 'react'
import { axiosAdmin } from '../../../Api/Api'
import ReturnButton from '../../CommonComponents/Return/ReturnButton'
import TextField from "@mui/material/TextField";
import toast, { Toaster } from 'react-hot-toast';
 import Swal from 'sweetalert2'

function AddStaff() {
    const navigate= useNavigate()
    const location = useLocation();
  const { staffData } = location.state || {};
   
  const [name, setName] = useState(staffData?.name || "");
  const [age, setAge] = useState(staffData?.age || "");
  const [phone, setPhone] = useState(staffData?.phone || "");
  const [street, setStreet] = useState(staffData?.address?.[0]?.street || "");
  const [post, setPost] = useState(staffData?.address?.[0]?.post || "");
  const [town, setTown] = useState(staffData?.address?.[0]?.town || "");
  const [district, setDistrict] = useState(staffData?.address?.[0]?.district || "");
  const [state, setState] = useState(staffData?.address?.[0]?.state || "");
  const [adhar, setAdhar] = useState(staffData?.adhar || "");
  const [pincode, setPincode] = useState(staffData?.address?.[0]?.pincode || "");
  const [salary, setSalary] = useState(staffData?.salary || "");
  const [date, setDate] = useState(staffData?.date || "");
  const [idproof, setIdproof] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

    const handleNameChange=(e)=>{
      setName(e.target.value)
    }
    const handleAgeChange=(e)=>{
      setAge(e.target.value)
    } 
    const handlePhoneChange=(e)=>{
      setPhone(e.target.value)
    }
    const handleStreetChange=(e)=>{
      setStreet(e.target.value)
    }
    const handlePostChange=(e)=>{
      setPost(e.target.value)
    }
    const handleTownChange=(e)=>{
      setTown(e.target.value)
    }
    const handleDistrictChange=(e)=>{
      setDistrict(e.target.value)
    }
    const handleStateChange=(e)=>{
      setState(e.target.value)
    }
    const handlePincodeChange=(e)=>{
      setPincode(e.target.value)
    }
    const handleSalaryChange=(e)=>{
      setSalary(e.target.value)
    }
    const handleDateChange=(e)=>{
      setDate(e.target.value)
    }
    const handleAdharChange=(e)=>{
      setAdhar(e.target.value)
    }
  


  
    const handleproofChange=(e)=>{
      const file = e.target.files
      setIdproof(file)
    }
    const handleImageChange=(e)=>{
      const file = e.target.files[0];
      setPhoto(file)
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      setLoading(true)


      if(staffData){
        //update operation with the edited values
        axiosAdmin.patch(`editstaff/${staffData._id}`, {
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
         date
        })
        .then((response) => {
          navigate("/admin/staffdetails");
          Swal.fire('staff updated successfully')
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            window.location.replace("/admin/login")
          }
        });
     }else{
  
      const staffData={
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
        date
      }
      const formData = new FormData();
      
      Object.entries(staffData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      for (const proof of idproof) {
        formData.append("proof", proof);
      }
      formData.append("photo",photo);
      axiosAdmin.post('addstaff',formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
       
      }).then((response)=>{
        setLoading(false)
        if(response.data.success){
          navigate('/admin/staffdetails')
          Swal.fire('Staff added successfully')
        }
        toast.error(response.data.message)
      }).catch((error)=>{
        setLoading(false)
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login");
        }
      })
     }
    }

  return (

  <>
  <Toaster position='top-center' reverseOrder={false}/>
  <ReturnButton/>
   <div>
    <form action='' className='flex flex-wrap justify-around px-16 mt-24' onSubmit={handleSubmit}>
      <TextFields name="Staff name" type="text" value={name} onChange={handleNameChange}/>
      <TextFields name="Age" type="number" value={age} onChange={handleAgeChange}/>
      <TextFields name="Phone number" type="number  " value={phone} onChange={handlePhoneChange}/>
      <TextFields name="Street name" type="text" value={street} onChange={handleStreetChange}/>
      <TextFields name="Post office" type="text" value={post} onChange={handlePostChange}/>
      <TextFields name="Town" type="text" value={town} onChange={handleTownChange}/>
      <TextFields name="District" type="text" value={district} onChange={handleDistrictChange}/>
      <TextFields name="State" type="text" value={state} onChange={handleStateChange}/>
      <TextFields name="Adhar Number" type="number" value={adhar} onChange={handleAdharChange}/>
      <TextFields name="Pincode" type="number" value={pincode} onChange={handlePincodeChange}/>
      <TextFields name="Basic salary" type="number" value={salary} onChange={handleSalaryChange}/>
      <TextFields name="Date of joining" type="date"  value={date} onChange={handleDateChange} input={true}/>
      <TextFields name="photo" type="file" input={true} onChange={handleImageChange}/>
      <TextField
              type="file"
              label="idproof"
              InputLabelProps={{shrink:true}}
              inputProps={{ multiple: true }} // Allow multiple file selection
              className='sm:w-96 w-80'
              onChange={handleproofChange}
              
            />

    <div className='flex justify-center mt-3'>
    <Buttons type="submit" name={loading ?"LOADING...": staffData ? "UPDATE STAFF" : "ADD STAFF"} classes={'sm:w-96 '} />
    </div>
    </form>
   </div>
</>
  )
}

export default AddStaff
