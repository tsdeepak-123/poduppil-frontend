
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <div className='flex justify-center items-center h-[64vh]'>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box> 
    </div>
  );
}
