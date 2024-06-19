import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { LuMailSearch, LuPhoneCall, LuGlobe2, LuLinkedin } from "react-icons/lu";
import { CiCamera } from "react-icons/ci";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { SlSocialInstagram } from "react-icons/sl";
import { Typography, Grid, Paper, Divider, CircularProgress } from '@mui/material';
import Navbar from "../components/Navbar";
import { styled } from '@mui/system';
import axios from 'axios';
import { ArrowRight } from '@mui/icons-material';

const StyledContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const Header = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),

  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column', // Changed to column layout for responsive description placement
  alignItems: 'flex-start', // Align items to start for responsive layout
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
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
}));

const DetailIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  fontFamily:'Helvetica-Oblique', 
  color:"#64748B"
}));

const DetailText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const DetailBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const ScreenshotBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
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
      <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
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
    <div style={{fontFamily:"Helvetica-Light"}}>
      <Navbar show={false} />
      <StyledContainer container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            <Link to="/">Home</Link> 
            <ArrowRight style={{ fontSize: 24, color: 'green' }} /> 
            {company.name}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Header elevation={3}>
            <Logo src={company.logo} alt="Company Logo" />
            <div>
              <Typography variant="h5" gutterBottom style={{fontFamily:"Helvetica-Bold"}}>
                {company.name}
              </Typography>
            
              <DetailItem>
              <DetailIcon>
              <IoMdInformationCircleOutline   style={{ fontSize: '1.5rem' }} />
              <DetailText variant="subtitle2">Description</DetailText>
            </DetailIcon>
            <Typography variant="body1">{company.description}</Typography>
            </DetailItem>
            </div>
            <DetailItem>
              <DetailIcon>
                <LuPhoneCall style={{ fontSize: '1.5rem' }} />
                <DetailText variant="subtitle2">Phone</DetailText>
              </DetailIcon>
              <Typography variant="body1">{company.phone}</Typography>
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <LuMailSearch style={{ fontSize: '1.5rem' }} />
                <DetailText variant="subtitle2">Email</DetailText>
              </DetailIcon>
              <Typography variant="body1">{company.email}</Typography>
            </DetailItem>
          </Header>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <DetailBox elevation={3}>
            <Typography variant="h5" gutterBottom style={{fontFamily:"Helvetica-Bold"}}>
              Company Details
            </Typography>
            <DetailItem>
              <DetailIcon>
                <LuGlobe2 style={{ fontSize: '1.5rem' }} />
                <DetailText variant="subtitle2">Website</DetailText>
              </DetailIcon>
              <Typography variant="body1">
                <a href={company.domain} target="_blank" rel="noopener noreferrer">
                  {company.domain}
                </a>
              </Typography>
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <IoMdInformationCircleOutline style={{ fontSize: '1.5rem' }} />
                <DetailText variant="subtitle2">Description</DetailText>
              </DetailIcon>
              <Typography variant="body1">
                {company.description}
              </Typography>
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <HiOutlineLocationMarker style={{ fontSize: '1.5rem' }} />
                <DetailText variant="subtitle2">Address</DetailText>
              </DetailIcon>
              <Typography variant="body1">{company.address}</Typography>
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FiFacebook style={{ fontSize: '1.5rem' }} />
                <DetailText variant="subtitle2">Facebook</DetailText>
              </DetailIcon>
              <Typography variant="body1">
                <a href={company.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </Typography>
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <SlSocialInstagram style={{ fontSize: '1.5rem' }} />
                <DetailText variant="subtitle2">Instagram</DetailText>
              </DetailIcon>
              <Typography variant="body1">
                <a href={company.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </Typography>
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <FiTwitter style={{ fontSize: '1.5rem' }} />
                <DetailText variant="subtitle2">Twitter</DetailText>
              </DetailIcon>
              <Typography variant="body1">
                <a href={company.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </Typography>
            </DetailItem>
            <DetailItem>
              <DetailIcon>
                <LuLinkedin style={{ fontSize: '1.5rem' }} />
                <DetailText variant="subtitle2">LinkedIn</DetailText>
              </DetailIcon>
              <Typography variant="body1">
                <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </Typography>
            </DetailItem>
          </DetailBox>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <ScreenshotBox elevation={3}>
            <Typography variant="h5" gutterBottom style={{ display: "flex", gap: "10px", alignItems: "center",fontFamily:"Helvetica-Light" }}>
              <CiCamera style={{ color: "#64748B", fontSize: "2rem" }} />
              <span style={{fontFamily:"Helvetica-Bold"}}>Screenshot of Webpage</span>
            </Typography>
            <Screenshot src={company.screenshot} alt="Company Screenshot" />
          </ScreenshotBox>
        </Grid>
      </StyledContainer>
    </div>
  );
};

export default SingleCompany;
