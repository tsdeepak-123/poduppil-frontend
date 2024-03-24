import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { axiosAdmin } from '../../../Api/Api';
import AddCareOfModal from './AddCareOfModal'

function CareofDropdown({ onDataPassed }) {
  const [careof, setCareOf] = useState("");
  const [careofData, setCareOfData] = useState("");

  const fetchCareOfData = async () => {
    try {
      const response = await axiosAdmin.get("getcareof"); 
      setCareOfData(response?.data?.allCareOfs);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  };

  const handleCareOfChange = (e) => {
    const selectedCareOfname = e.target.value;
    setCareOf(selectedCareOfname);
    onDataPassed(selectedCareOfname);
  };

  useEffect(() => {
    fetchCareOfData()
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-6">
        {careofData?.length > 0 ? (
          <Box className="sm:w-96 w-80">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                SELECT CARE OF
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={careof}
                label="SELECT CARE OF"
                onChange={handleCareOfChange}
              >
                {careofData.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box className="sm:w-96 w-80">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                No careOf found
              </InputLabel>
              <Select
                id="demo-simple-select"
                label="SELECT CARE OF"
                disabled
              >
                <MenuItem>No Careof found</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
        <div className="mt-3">
          <AddCareOfModal />
        </div>
      </div>
    </div>
  );
}

export default CareofDropdown;
