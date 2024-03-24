import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Dropdown({ projects, onDataPassed }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleChange = (event, newValue) => {
    if (newValue) {
      setSelectedProject(newValue); // Set the entire option object
      onDataPassed(newValue.name);
    } else {
      setSelectedProject(null);
      onDataPassed(null);
    }
  };

  return (
    <Box className='w-[380px]'>
      <Autocomplete
        value={selectedProject}
        onChange={handleChange}
        options={projects}
        getOptionLabel={(option) => option.name || ''}
        renderInput={(params) => (
          <TextField {...params} label="SELECT PROJECT" variant="outlined" />
        )}
      />
    </Box>
  );
}

export default Dropdown;
