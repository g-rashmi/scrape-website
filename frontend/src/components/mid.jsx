import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Delete as DeleteIcon, GetApp as GetAppIcon } from '@mui/icons-material';
import { CSVLink } from 'react-csv';

const CompanyActions = ({ selectedCount, onDelete, generateCSVData, csvData }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '13px' }}>
      <Typography variant="subtitle1">
        {selectedCount} selected
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={onDelete}
        disabled={selectedCount === 0}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GetAppIcon />}
        onClick={generateCSVData}
        disabled={selectedCount === 0}
      >
        <CSVLink
          data={csvData}
          filename={"companies.csv"}
          target="_blank"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Export as CSV
        </CSVLink>
      </Button>
    </div>
  );
};

export default CompanyActions;
