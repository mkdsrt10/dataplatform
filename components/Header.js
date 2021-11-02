import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
  const { onDrawerToggle } = props;

  return (
    <React.Fragment>
      
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0, minHeight: '12vh', display: 'flex', pl:11,
            flexDirection:'row' , justifyContent: 'space-between',
            backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)',}}
      >
        <Toolbar sx={{width:'50%'}}>
            <Grid item xs>
            <Button
                sx={{ borderColor: lightColor, fontSize:20}}
                color="inherit"
                size="large"
                href="/"
              >
                Data Platform
              </Button>
            </Grid>
        </Toolbar>

        <Toolbar component="nav" variant="dense" className="flex-row"
          sx={{justifyContent:'space-between', width:'50%'}}>
            <Grid item sx={{display:'flex', justifyContent: 'space-around' , width:'80%'}}>
              <Button
                sx={{ borderColor: lightColor }}
                color="inherit"
                size="large"
                href="/dashboard"
              >
                MY DATASETS
              </Button>
              <Button
                sx={{ borderColor: lightColor }}
                color="inherit"
                size="large"
                href="/explore"
              >
                EXPLORE
              </Button>
              <Button
                sx={{ borderColor: lightColor }}
                href="/helpcenter"
                color="inherit"
                size="large"
              >
                SUPPORT
              </Button>

              
                <div style={{fontSize:24, paddingTop:8}}>|
                </div>
            
            <Link href='/login'>
             <div style={{display:"flex",flexDirection:'row', 
                alignItems: 'center',cursor: 'pointer'}}>
                      <PersonIcon />
                      &nbsp;&nbsp;
                      <p>Kaushik </p> 
                      &nbsp;&nbsp;
                      <ArrowDropDownIcon />
              </div>
            </Link>    

            </Grid>
        </Toolbar>
      </AppBar>
      
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;