import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Grid,
} from "@mui/material";
import CompanyTable from "./companytable";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import { backend_url } from "./config";
const Navbar = ({ show}) => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };
const[loader,setloader] =useState(false) ;
  useEffect(() => {
    axios.get(`${backend_url}/api/bulk?filter=` + domain).then((response) => {
     console.log(response); setCompanies(response.data.companies); 
      setloader(true)
    });
  }, [domain]);

  const handleFetchData = async () => {
    setLoading(true);
    try {
    
      if (companies) {   
        alert("already fetched")
        setLoading(false); 
      setDomain("");
        }
      else{
      const response = await axios.post(`${backend_url}/api/scrape`, {
        domain,
      }); 
    
      setLoading(false); 
      navigate(`/singlecompany/${response.data.companyid}`);
      setDomain("");
      console.log("Response data:", response.data);
    }
    } catch (error) {
      
      console.log(error)
      alert(error); // Alert user on internal server error
      setLoading(false);
      setDomain("");
      navigate("/");
      show = true;
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (deleteIds) => {
    try {
      await axios.post(`${backend_url}/api/delete`, { ids: deleteIds });

      // Update state in the Navbar component
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => !deleteIds.includes(company._id))
      );
    } catch (error) {
      console.error("Error deleting companies:", error);
    }
  };
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#FFFFFF" }}>
        <Toolbar>
          <TextField
            variant="outlined"
            placeholder="Enter domain name"
            value={domain}
            onChange={handleDomainChange}
            sx={{ mr: 1, p: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon style={{ color: "grey" }} />
                </IconButton>
              ),
              style: { color: "gray", backgroundColor: "#E5E7EB" },
            }}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#EDE5FF", color: "#6C2BD9" }}
            onClick={handleFetchData}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Fetch & Save Details"}
          </Button>
        </Toolbar>
      </AppBar>

      {loading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        show ? (
          loader ? (
            <CompanyTable companies={companies} onDelete={handleDelete} />
          ) : (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ minHeight: "80vh" }}
            >
              <CircularProgress />
            </Grid>
          )
        ) : null
        
      )}
    </div>
  );
};

export default Navbar;
