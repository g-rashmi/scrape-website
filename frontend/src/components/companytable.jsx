import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Checkbox } from '@mui/material';
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from "axios";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useState, useEffect } from 'react';
import CompanyActions from './mid'; // Assuming correct import path for CompanyActions

const CompanyTable = ({ companies, onDelete}) => { 
  const [csvData, setCsvData] = useState([]);
  const [count, setCount] = useState(0);
  const [deletee, setDelete] = useState([]);
  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(20);
  const indexOfLastCompany = currentPage * perPage;
  const indexOfFirstCompany = indexOfLastCompany - perPage;

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages for pagination 


  const totalPages = Math.ceil(companies.length / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Function to handle checkbox change
  const handleCheckboxChange = (event, companyId) => {
    if (event.target.checked) {
      setCount(count + 1);
      setDelete([...deletee, companyId]);
      setSelectedCompanyIds([...selectedCompanyIds, companyId]);
    } else {
      setCount(count - 1);
      setDelete(deletee.filter(id => id !== companyId));
      setSelectedCompanyIds(selectedCompanyIds.filter(id => id !== companyId));
    }
  }; const handleHeaderCheckboxChange = (event) => {
    if (event.target.checked) {
      const allCompanyIds = companies.map(company => company._id);
      setCount(companies.length);
      setDelete(allCompanyIds);
      setSelectedCompanyIds(allCompanyIds);
    } else {
      setCount(0);
      setDelete([]);
      setSelectedCompanyIds([]);
    }
  };


  // Function to generate CSV data for selected companies
  const generateCSVData = async () => {
    try {
      const csvRows = [['Domain', 'Name', 'Description']]; // CSV header

      // Fetch details for each selected company ID
      for (const id of selectedCompanyIds) {
        const response = await axios.get(`http://localhost:4000/api/company/${id}`);
        const company = response.data.company; // Assuming your API response structure

        csvRows.push([company.domain, company.name, company.description]);
      }

   
      setCsvData(csvRows);
    } catch (error) {
      console.error('Error fetching company details:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  // Function to handle deletion of selected companies
  const handleDeleteClick = async () => {
    try {
      await onDelete(deletee); // Call onDelete callback with deletee array

      // Clear selections and update UI
      setCount(0);
      setDelete([]);
      setSelectedCompanyIds([]);
    } catch (error) {
      console.error('Error deleting companies:', error);
    }
  };

 
  useEffect(() => {
    generateCSVData();
  }, [selectedCompanyIds]); 
 
  return (
    <div>
  
      <CompanyActions
        selectedCount={count}
        onDelete={handleDeleteClick}
        generateCSVData={generateCSVData}
        csvData={csvData}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Checkbox onChange={handleHeaderCheckboxChange} /></TableCell>
              <TableCell>COMPANY</TableCell>
              <TableCell>SOCIAL-PROFILES</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>PHONE NO.</TableCell>
              <TableCell>EMAIL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.slice(indexOfFirstCompany, indexOfLastCompany).map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCompanyIds.includes(company._id)}
                    onChange={(event) => handleCheckboxChange(event, company._id)}
                  />
                </TableCell>
                <TableCell>
                  <img src={company.logo} alt="Logo" style={{ width: 50, height: 'auto' }} />
                  <Link to={`/singlecompany/${company._id}`}>{company.name}</Link>
                </TableCell>
                <TableCell>
                  <a href={company.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                  <a href={company.twitter} target="_blank" rel="noopener noreferrer"><FaSquareXTwitter /></a>
                  <a href={company.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                </TableCell>
                <TableCell>{company.description}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell><a href={`mailto:${company.email}`}>{company.email}</a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => handlePageChange(number)} style={{ margin: '0 0.5rem' }}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompanyTable;
