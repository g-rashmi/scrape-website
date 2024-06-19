
import { Button, Typography } from '@mui/material';

import { CSVLink } from 'react-csv';
import { LuListPlus } from "react-icons/lu";

const CompanyActions = ({ selectedCount, onDelete, generateCSVData, csvData }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '13px' }}>
      <Typography variant="subtitle1">
        {selectedCount} selected
      </Typography>
      <Button
      color="secondary"
        variant="contained"
       
        onClick={onDelete}
        disabled={selectedCount === 0}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        color="primary"
        
        
        onClick={generateCSVData}
        disabled={selectedCount === 0}
      >
        <CSVLink
          data={csvData}
          filename={"companies.csv"}
          target="_blank"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
        {<LuListPlus/>} Export as CSV
        </CSVLink>
      </Button>
    </div>
  );
};

export default CompanyActions;
