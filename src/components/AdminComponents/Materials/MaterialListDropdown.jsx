import React, { useState, useEffect } from 'react';
import AddMaterialModal from './AddMaterialModal';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { axiosAdmin } from '../../../Api/Api';

function MaterialListDropdown({onDataPassed}) {
  const [MaterialData, setMaterialData] = useState("");
  const [MaterialName, setMaterialName] = useState("");



  const fetchMaterialData = async () => {
    try {
      const response = await axiosAdmin.get("allmateriallist");
      setMaterialData(response?.data?.allMaterials);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };
  useEffect(() => {
    fetchMaterialData();
  }, [MaterialData]); 

  const handleChange = (e) => {
    const selectedMaterialName = e.target.value;
    setMaterialName(selectedMaterialName);
    onDataPassed(selectedMaterialName);
  };

  return (
    <div>
      <div className="flex flex-row gap-6">
        {MaterialData?.length > 0 ? (
          <Box className="sm:w-96 w-80">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                SELECT MATERIAL
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={MaterialName}
                label="SELECT MATERIAL"
                onChange={handleChange}
              >
                {MaterialData.map((item) => (
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
                No materials found
              </InputLabel>
              <Select
                id="demo-simple-select"
                label="SELECT PROJECT"
                disabled
              >
                <MenuItem>No materials found</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
        <div className="mt-3">
          <AddMaterialModal />
        </div>
      </div>
    </div>
  );
}

export default MaterialListDropdown;
