import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { axiosAdmin } from '../../../Api/Api';
import Buttons from '../../CommonComponents/Button/Buttons';
import toast, { Toaster } from 'react-hot-toast';
import TextFields from '../../CommonComponents/TextFields/TextFields';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '40px',
  width: 500,
  bgcolor: '#FFFFFF',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
  p: 4,
};

function AttendanceEditStaff({ name,photo,id }) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const [date, setDate] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRadioButtonChange = (event, id) => {
    const { value } = event.target;

    setSelectedValues(value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosAdmin.post('staffAttendanceEdit', {
        status: selectedValues,
        staffId: id,
        date: date,
      });
      if (response?.data?.success) {
        handleClose();
        toast.success('Staff attendance edited successfully');
        window.location.reload()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      if (error.response && error.response.status === 401) {
        window.location.replace('/admin/login');
      }
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Button onClick={handleOpen} variant="outlined" color="primary">
        EDIT ATTENDANCE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="mb-4">
            <Typography variant="h5" className="flex justify-center">
              EDIT ATTENDANCE
            </Typography>
          </div>
          <div className="mb-4">
          <div className='pt-4'>
                <TextFields
                  name="Choose Date"
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  input={true}
                />
              </div>
            <div
              key={id}
              className="p-4 flex gap-4 w-auto rounded-2xl shadow-xl"
            >
                               <div className="w-[40%]">
                    <img
                      className="w-16 rounded-full h-16"
                      src={photo}
                      alt="labour photo"
                    />
                    <div>
                      <p className="text-lg font-medium mt-4 flex">
                        {name}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-10  grid-cols-3 mb-5 items-center w-full">
                    <div className="w-10 h-10">
                      <label>
                        <input
                          type="radio"
                          name={`attendance_${id}`}
                          value="present"
                          checked={selectedValues === "present"}
                          onChange={(event) =>
                            handleRadioButtonChange(event,id)
                          }
                        />
                        <span className="text-xs font-medium">PRESENT</span>
                      </label>
                    </div>
                    <div className="w-10 h-10">
                      <label>
                        <input
                          type="radio"
                          name={`attendance_${id}`}
                          value="halfday"
                          checked={selectedValues === "halfday"}
                          onChange={(event) =>
                            handleRadioButtonChange(event,id)
                          }
                        />
                        <span className="text-xs font-medium">HALF_DAY</span>
                      </label>
                    </div>
                    <div className="w-10 h-10">
                      <label>
                        <input
                          type="radio"
                          name={`attendance_${id}`}
                          value="absent"
                          checked={selectedValues === "absent"}
                          onChange={(event) =>
                            handleRadioButtonChange(event, id)
                          }
                        />
                        <span className="text-xs font-medium">ABSENT</span>
                      </label>
                    </div>
                  </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Buttons name="SUBMIT" click={handleSubmit} />
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default AttendanceEditStaff;
