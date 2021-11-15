import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SignalCardOut from '../../components/SignalCardOut';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FeatureDetails from '../../components/FeatureDetails';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Output from '../../components/output';
import {useRouter} from 'next/router';
import { getDatasetsId, downloadDatasetsId } from '../../function/users';
import { Theme } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 256;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ManageDataset({
  token,
  setToken,
  user,
  dataset,
  setDataset,
  // userdatasets,
  // setUserDatasets,
  dataSources,
  setDataSources,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industry, setIndustry] = React.useState('');
  const [analysis, setAnalysis] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true); handleDownloadButton();};
  const handleClose = () => setOpen(false);
  const [userdatasets, setUserDatasets] = useState([]);

  const handleChangeIndustry = (event) => {
    setIndustry(event.target.value);
  };

  const handleChangeAnalysis = (event) => {
    setAnalysis(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [downloadLink, setDownloadLink] = React.useState('');
  const router = useRouter();
  const dataset_id = router.query.did;
  
  useEffect(async ()=>{
    const dataset = await getDatasetsId(token, dataset_id);
    setUserDatasets(dataset);
    console.log("fetched dataset data",userdatasets);
  }, [token, dataset_id]);

  const styles = theme => ({
    disabledButton: {
      backgroundColor: 'white'
    }
  });

  const handleDownloadButton = async() => {
    const downloadLink = await downloadDatasetsId(token, dataset_id);
    setDownloadLink(downloadLink.url);
  }

  return (
    
    <Box>
      <Navbar />
        <Box sx={{ display: 'flex', flexDirection:'column',py: 6, px: 14, bgcolor: '#3e3e33'}}>
          <Box sx={{ display: 'flex', flexDirection:'row', py: 2, bgcolor: 'gray-900', justifyContent:'space-between'}}>
            <Typography color="inherit" variant="h5" component="h1">
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'white',justifyContent:'space-around'}}>
                    <div>MANAGE DATASET &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>
                
            </Typography>

          </Box>

          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
          <Box>
            <Box>{
              userdatasets !== null && userdatasets !== undefined
              && <SignalCardOut token={token}
              data={userdatasets}/>
            }
            </Box>
              
            <Box sx={{ display: 'flex',pt:4}}>
          
        
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
              mb:4, maxHeight:'8vh', minWidth:'24ch',justifyContent:'end',color:"#fff"}}>
                <Button href="/managesignaloutput" variant="contained" size="large" 
                sx={{mx:2, py:4,backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)',
                    }}
                disabled
                classes={{ disabled: styles }}
                    startIcon={<CheckIcon />} >
                    {"Refresh Data"}</Button>
                <Button variant="contained" size="large" sx={{mx:2, py:4,
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                    startIcon={<ExitToAppIcon />} onClick={handleOpen}>
                    Output</Button>
            </Box>
            </Box>
          </Box>
          
      
      </Box>

      {/* <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',pt:4}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', justifyContent:'space-between',font:'roboto',px:10}}>
                      <div>SELECTED CATALOGS &nbsp;</div>
                      <Button variant="contained" size="large" sx={{mx:2, py:2,
                      backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                          startIcon={<AddIcon />} onClick={handleOpen}>
                          Add Catalog</Button>
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ minWidth: 275, bgcolor: '#eaeff1', display:'flex', flexDirection:'column',pt: 6, px: 14, 
              alignItems:'center' }}>
                <FeatureDetails />
                <FeatureDetails />
                <FeatureDetails />
                <FeatureDetails />

          </Box>            
        </Box>

        
      </Box>

      <Box sx={{ display: 'flex', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
          mb:4, maxHeight:'8vh', minWidth:'24ch',justifyContent:'end',px:14}}>
            <Button href="/dashboard" variant="contained" size="large" sx={{mx:2, py:4,
            backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                    startIcon={<CheckIcon />} onClick={handleOpen}>
                    {"Refresh Data"}</Button>
            <Button variant="contained" size="large" sx={{mx:2, py:4,
            backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                    startIcon={<ExitToAppIcon />} onClick={handleOpen}>
                    Output</Button>
        </Box>
      </Box> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={{ position: 'absolute', bgColor:'#fff',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:'70%'}}>  
        <Output data={dataset} downloadLink={downloadLink}/>
      </Box>
      </Modal>


      
       <Footer />
    </Box>
  );
}
