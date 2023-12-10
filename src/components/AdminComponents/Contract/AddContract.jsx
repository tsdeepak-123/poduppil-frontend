import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import TextFields from '../../CommonComponents/TextFields/TextFields'
import Buttons from '../../CommonComponents/Button/Buttons'
import { axiosAdmin } from '../../../Api/Api'
import Dropdown from '../../../components/CommonComponents/Dropdown/Dropdown'
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import toast, { Toaster } from 'react-hot-toast';
 import Swal from 'sweetalert2'

function AddContract() {
  const navigate = useNavigate();
  const [projectname,setProjectName]=useState("")
  const [Contractwork,setContractwork]=useState("")
  const [Contractorname,setContractorname]=useState("")
  const [totallabour,settotallabour]=useState(0)
  const [totalhelper,setTotalhelper]=useState(0)
  const [Details,setDetails]=useState("")
  const [status,setStatus]=useState("")
  const [Amount,setAmount]=useState(0)
  const [Paymentdetails,setPaymentdetails]=useState(0)
  const [phone,setPhone] = useState('')
  const [date,setDate] = useState('')
  const [projectData,setProjectData] = useState('')
  const [loading,setLoading]=useState(false)

  const handleDataReceived = (projectname) => {
    setProjectName(projectname)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    axiosAdmin
      .post("AddContract", {
        projectname,Contractwork,totallabour,Contractorname,
        totalhelper,Details,phone,date,Paymentdetails,status,Amount
      })
      .then((response) => {
        setLoading(false)
        if(response.data.success){
          Swal.fire("Contract added successfully")
          navigate("/admin/contractdetails");
        }
        toast.error(response.data.messege)
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.response.data.message)
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login")
        }
      });
  };

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("projectList?status=false");

      setProjectData(response?.data?.FindProject);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  };

  //data display when mounting
  useEffect(() => {
    fetchData();
  }, []);



  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
    <ReturnButton/>
      <div  className='flex flex-wrap justify-around px-16 mt-24'>
      <div className="ms-4 sm:mb-0 mb-4">
      <Dropdown projects={projectData} onDataPassed={handleDataReceived}/>
      </div>  
      <TextFields name="Contract work name" onChange={(e) => {setContractwork(e.target.value)}} type="text"/>
      <TextFields name="Contractor name"  onChange={(e) => {setContractorname(e.target.value)}} type="text"/>
      <TextFields name="Contractor phone"  onChange={(e) => {setPhone(e.target.value)}} type="number"/>
      <TextFields name="Total main labours" onChange={(e) => {settotallabour(e.target.value)}} type="number"/>
      <TextFields name="Total helpers" onChange={(e) => {setTotalhelper(e.target.value)}} type="number"/>
      <TextFields name="Other details"  onChange={(e) => {setDetails(e.target.value)}} type="text"/>
      <TextFields name="Work status"  onChange={(e) => {setStatus(e.target.value)}}type="text"/> 
      <TextFields name="Contraction Amount"  onChange={(e) => {setAmount(e.target.value)}} type="text"/> 
      <TextFields name="Payment details"  onChange={(e) => {setPaymentdetails(e.target.value)}} type="text"/> 
      <TextFields name="date" type="date"  onChange={(e) => {setDate(e.target.value)}} input={true}/> 
    <div className="flex justify-center mt-3">
          <Buttons name={loading ?"LOADING...":"ADD CONTRACT"} classes={"sm:w-96"} click={handleSubmit} />
        </div>
   </div> 
    </>
  );
}

export default AddContract;
