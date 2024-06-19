
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Grid, Paper, Divider, CircularProgress, IconButton } from '@mui/material';
import Navbar from "../components/Navbar"
import { styled } from '@mui/system';
import axios from 'axios';
import {
  ArrowRight,
  Email,
  Phone,
  Home,
  Web,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
} from '@mui/icons-material';


const StyledContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const Header = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const Logo = styled('img')(({ theme }) => ({
  width: '100px',
  height: 'auto',
  marginBottom: theme.spacing(2),
}));

const Screenshot = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
}));

const DetailItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const DetailIcon = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const SingleCompany = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/company/${id}`);
        setCompany(response.data.company);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company data:', error);
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Grid>
    );
  }

  if (!company) {
    return (
      <Typography variant="h6" align="center">
        Company not found
      </Typography>
    );
  }

  return (
    <div>
    <Navbar show={false}/>
      <StyledContainer container spacing={3}>
      <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        <Link to="/">Home</Link> <span>  <ArrowRight style={{ fontSize: 24, color: 'green' }} /></span> {company.name}

      </Typography>
      <Divider /> 
     
    </Grid>
    <Grid item xs={12}>
    <Header elevation={3}>
      <Logo src={company.logo} alt="Company Logo" />
      <Typography variant="h4" gutterBottom>
        {company.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {company.description}
      </Typography>
      <DetailItem>
        <DetailIcon>
          <Phone />
        </DetailIcon>
        <Typography variant="body1">{company.phone}</Typography>
      </DetailItem>
      <DetailItem>
        <DetailIcon>
          <Email />
        </DetailIcon>
        <Typography variant="body1">{company.email}</Typography>
      </DetailItem>
    </Header>
  </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Company Details
          </Typography>
          <DetailItem>
            <DetailIcon>
              <Web />
            </DetailIcon>
            <Typography variant="body1">
              <a href={company.domain} target="_blank" rel="noopener noreferrer">
                {company.domain}
              </a>
            </Typography>
          </DetailItem>
          <DetailItem>
            <DetailIcon>
              <Email />
            </DetailIcon>
            <Typography variant="body1">{company.email}</Typography>
          </DetailItem>
          <DetailItem>
            <DetailIcon>
              <Facebook />
            </DetailIcon>
            <Typography variant="body1">
              <a href={company.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </Typography>
          </DetailItem>
          <DetailItem>
            <DetailIcon>
              <Instagram />
            </DetailIcon>
            <Typography variant="body1">
              <a href={company.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </Typography>
          </DetailItem>
          <DetailItem>
            <DetailIcon>
              <Twitter />
            </DetailIcon>
            <Typography variant="body1">
              <a href={company.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </Typography>
          </DetailItem>
          <DetailItem>
            <DetailIcon>
              <LinkedIn />
            </DetailIcon>
            <Typography variant="body1">
              <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Typography>
          </DetailItem>
          <DetailItem>
            <DetailIcon>
              <Home />
            </DetailIcon>
            <Typography variant="body1">{company.address}</Typography>
          </DetailItem>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Screenshot
          </Typography>
          <Screenshot src={company.screenshot} alt="Company Screenshot" />
        </Grid>
      </StyledContainer>
    </div>
  );
};

export default SingleCompany;
