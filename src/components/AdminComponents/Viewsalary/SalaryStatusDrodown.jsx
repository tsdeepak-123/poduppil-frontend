import React,{useState} from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { axiosAdmin } from '../../../Api/Api';

function SalaryStatusDrodown({status,laborerId,staffId}) {
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleChange = async (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    if (newStatus) {
      try {
        if(laborerId){
          await axiosAdmin.post(`laboursalarystatus?id=${laborerId}`, { status: newStatus }).then(()=>{
            window.location.reload()
          })
        }
        else{
          await axiosAdmin.post(`staffsalarystatus?id=${staffId}`, { status: newStatus }).then(()=>{
            window.location.reload()
          })
        }
        
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login");
        }
      }
    }
  };

  
  return (
    <div>
      {
         status && status==="paid" ?(
              <>
              <p className='text-green-500'>Paid</p>
              </>
         ):(
          <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedStatus}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              
              
              {status}
            </MenuItem>
            <MenuItem value={"paid"} >Paid </MenuItem>
            <MenuItem value={"pending"}>pending</MenuItem>
          </Select>
        </FormControl>
         )
      }
    
    </div>
  )
}

export default SalaryStatusDrodown