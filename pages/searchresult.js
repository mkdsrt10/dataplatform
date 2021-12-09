import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import AddedFeatureCard from '../components/AddedFeatureCard';
import Modal from '@mui/material/Modal';
import DataSourcesDetails from '../components/datasourcesdetails';
import {getPublicDatasets, createUserDataset, getUser} from '../function/users';
import TopicsCard from '../components/topicsCard';
import FormControl from '@mui/material/FormControl';
import {useRouter} from 'next/router';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mixpanel from 'mixpanel-browser';
import LeftNav from "../components/LeftNav";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {signOut} from "../function/checkAuth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import CachedIcon from "@mui/icons-material/Cached";

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, minWidth:'100%' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Searchresult({
  token, 
  setToken, 
  dataset, 
  dataSources,
  setDataSources,
  setDataset,
  setUserdatasets, 
  title, setTitle, description, setDescription,
  userdatasets,
  addDatasetcatalog,
  removeDatasetcatalog,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [localDataset, setLocalDataset] = useState('');
  const [search, setSearch] = useState(false);
  const [searching4, setSearching4] = useState([]);
  // const [title, setTitle] = React.useState('');
  // const [description, setDescription] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [localdataset, setLocaldataset] = React.useState({title: '', description: '', topic: '', keywords: ''});
  const router = useRouter()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  useEffect(() => {
    setSearching4(dataset.catalog);
    console.log("fetched dataset",searching4);
  }, [dataset]);

    const [user, setuser] = useState({});
    useEffect(async () => {
        console.log('user call token', token);
        const userP = await getUser(token);
        if(userP === null || userP === undefined ){
            setuser({})
        } else{
            setuser(userP)
        }
        console.log('userP', userP);
    }, [token]);

    const [openDetails, setOpenDetails] = useState(false);
    const [dsDetails, setDSDetails] = useState([]);
    const handleOpenDetails = (data) => {
      setOpenDetails(true);
      setDSDetails(data);
    };
    const handleCloseDetails = () => {
      setOpenDetails(false);
    };

  const [keyword, setKeyword] = useState('');
  const [keywordSearch, setKeywordSearch] = useState(false);

  useEffect(() => {
    setLocalDataset(dataset);
    console.log("updated dataset",localDataset);
  }, [dataset]);

  const handleKeywordSearch = async (event) => {
    if(token!==null){
        mixpanel.track('Keyword Search for Catalogs', {
            'source': "Create Dataset Page",
            'action': "keyword search",
            'keyword': keyword,
            'email': user.email,
        });
        const data = await getPublicDatasets(
        token,keyword
      );
        setDataSources(data);
        console.log("fetched data",data);
        console.log("previous dataset",dataset);
    }
};

  const handleSendData = async () => {
      if(token!==null){
        const data = await createUserDataset({
          token,
          dataset
        });
        setUserdatasets(data);
        mixpanel.track('Clicked on Create', {
          'source': "Create Dataset Page",
          'scrolled first': true,
            'email':user.email,
        })
        console.log("created dataset",data);
        router.push('/dataset/'+data.ID);
      }
  };

  useEffect( () => {
    setLocaldataset({title, description,});
    setDataset({...dataset,...localdataset});
    console.log("added details",dataset);
  }, [title, description, topic, keywords]);

  useEffect( () => {
    console.log("added details",dataset);
  }, [dataset]);

  return (
    <Box sx={{display:'flex', flexDirection:'row'}}>
        <Box sx={{width:"18%", display:'flex', flexDirection:'column'}}>
            <LeftNav />
        </Box>

        <Box sx={{width:"82%", bgcolor: '#E5E5E5'}}>

            <Box component="main" sx={{width:'100%', display:'flex'}}>
                <TextField fullWidth id="outlined-basic"
                           value={keyword} onChange={(event)=>setKeyword(event.target.value)}
                           sx={{ bgcolor: '#ffffff', border:0}}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <SearchIcon />
                                   </InputAdornment>
                               ),
                               placeholder:"Search..."
                           }}
                />
                <div style={{display:"flex",flexDirection:'row', width:'30%', backgroundColor:"#fff",paddingLeft:12,
                    alignItems: 'center',cursor: 'pointer', justifyContent:'space-between'}}>
                    <Link href='/login'>
                        <NotificationsIcon />
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link href='/login'>
                        <AccountCircleIcon />
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <p>{user && user.firstname ? user.firstname : 'Account'} </p>
                    &nbsp;&nbsp;&nbsp;
                    <div onClick={()=>signOut({path:router.pathname})}>
                        <ArrowDropDownIcon />
                    </div>
                </div>
            </Box>

            <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:4, bgcolor: '#E5E5E5', justifyContent:'space-between'}}>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18, width:"40%",
                    color:'gray-700', alignItems:'center'}}>
                    <Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                            justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>router.push('/dashboard')}>
                            {"Back"}</Button>
                    <Divider variant="middle" orientation="vertical" />
                    <div style={{paddingLeft:8,paddingRight:2,fontSize:24}}>Create Dataset</div>

                </Box>
                </Box>

            <Box
                sx={{ flexGrow: 1, bgcolor: "background.paper", display: 'flex' , mx:2, my:2, pt:2}}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="1. Dataset Information" {...a11yProps(0)} />
                    <Tab label="2. Add Catalogues" {...a11yProps(1)} />
                    <Tab label="3. Review and Save" {...a11yProps(2)} />

                </Tabs>
                <TabPanel value={value} index={0} sx={{width:'100%',}}>
                    <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto',
                        color:'gray', fontSize:18,pb:2, minWidth:'100%', mr:45}}>
                        <div>BASIC INFO &nbsp;</div>
                        <div style={{fontSize:12, paddingTop:4}}>*Enter a title and description for your signal.</div>
                    </Box>

                    <Box sx={{display:'flex', width:"100%", bgColor:'#fff',color:'#fff'}}>
                        <FormControl fullWidth sx={{width:'100%' }}>
                            {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                            <TextField
                                variant="outlined"
                                value={title}
                                onChange={(event)=>setTitle(event.target.value)}
                                sx={{color:'#fff', bgColor:'#fff',pb:2}}
                                //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Title"
                            />

                            <TextField
                                variant="outlined"
                                value={description}
                                onChange={(event)=>setDescription(event.target.value)}
                                sx={{color:'#fff',pb:2}}
                                rows={4}
                                //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="What this data will be doing for you?"
                                multiline
                            />

                        </FormControl>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography color="inherit" variant="h5" component="h1">
                        <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4}}>
                            <div>Explore Healthcare Data Platform &nbsp;</div>
                            <div><HelpOutlineIcon /></div>
                        </Box>
                    </Typography>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1},
                            display: 'flex', flexDirection: 'row', flex:'1', py: 2,
                            justifyContent: 'space-between',}}
                        noValidate
                        autoComplete="off"
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'row', flex:'1', }}>
                            <Box component="main" sx={{  minWidth: '42vw', px:5}}>
                                <TextField fullWidth id="outlined-basic" variant="outlined"
                                           value={keyword} onChange={(e) => setKeyword(e.target.value)}
                                           label="Keyword" sx={{ bgcolor: '#ffffff'}}
                                           onKeyDown={()=>handleKeywordSearch()}/>
                            </Box>

                            <Box>
                                <Button sx={{minWidth:'225px', height:'55px',  display:'flex', bgcolor: '#009BE5',
                                    alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                                    backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                                        onClick={()=>handleKeywordSearch()}>
                                    {/*onClick={()=>setSearch(!search)}*/}
                                    {/* <SearchIcon sx={{ fontSize: 25, color:'white' }}/> */}
                                    <div style={{color:'#fff',fontSize:18}}>Search</div>
                                </Button>

                            </Box>
                        </Box>

                    </Box>

                    <Box sx={{ width:"100%", display:'flex', flexDirection:'column',
                        justifyContent:"center",alignItems:'center', }}>
                        {dataSources && dataSources.map((data)=><FeatureCard
                            openDetails={openDetails}
                            data={data}
                            token={token}
                            user={user}
                            handleOpenDetails={handleOpenDetails}
                            handleCloseDetails={handleCloseDetails}
                            dataset={dataset.catalog}
                            dataSources={dataSources}
                            removeDatasetcatalog={removeDatasetcatalog}
                            addDatasetcatalog={addDatasetcatalog}
                        />)}
                    </Box>

                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Four
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={value} index={6}>
                    Item Seven
                </TabPanel>
            </Box>
        
      <Box sx={{ display: 'flex' }}>        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <Box component="main" sx={{ flex: 1, bgcolor: '#eaeff1' }}>

            <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', bgcolor:"#fff",
                        color:'gray', fontSize:24, py:2,px:4,}}>
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', bgcolor:"#fff",
                        color:'gray', justifyContent:'space-between',fontSize:24,pl:10, py:2, pr:10}}>
                        <div style={{display:"flex"}}>
                          <div>CREATE DATASET &nbsp;</div>
                          <div><HelpOutlineIcon /></div>
                        </div>

                        <Button variant="contained" size="small" sx={{px:2, py:2.5,
              backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                      startIcon={<ArrowBackIcon />} onClick={()=>router.push('/dashboard')}>
                      {"Back to Dashboard"}</Button>

                </Box>
                
                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:10,pb:2}}>
                    <div>BASIC INFO &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>*Enter a title and description for your signal.</div>
                </Box>

                <Box sx={{display:'flex',px:10, width:"100%", bgColor:'#fff',color:'#fff'}}>
                <FormControl fullWidth sx={{ }}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                    <TextField
                      variant="outlined"
                      value={title}
                      onChange={(event)=>setTitle(event.target.value)}
                      sx={{color:'#fff', bgColor:'#fff',pb:2}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Title"
                    />

                    <TextField
                      variant="outlined"
                      value={description}
                      onChange={(event)=>setDescription(event.target.value)}
                      sx={{color:'#fff',pb:2}}
                      rows={4}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="What this data will be doing for you?"
                      multiline
                    />

                  </FormControl>
                </Box>
              </Box>

            <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:14,pt:4}}>
                      <div>Explore Healthcare Data Platform &nbsp;</div>
                      <div><HelpOutlineIcon /></div>
                  </Box>
              </Typography>
              
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1}, 
              display: 'flex', flexDirection: 'row', flex:'1', py: 2, px: 8, bgcolor: '#eaeff1',
              justifyContent: 'space-between',}}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', flex:'1', }}> 
            <Box component="main" sx={{  minWidth: '42vw', px:5}}>
                <TextField fullWidth id="outlined-basic" variant="outlined" 
                value={keyword} onChange={(e) => setKeyword(e.target.value)}
                label="Keyword" sx={{ bgcolor: '#ffffff'}}
                onKeyDown={()=>handleKeywordSearch()}/>
            </Box>
            
            <Box>
                <Button sx={{minWidth:'225px', height:'55px',  display:'flex', bgcolor: '#009BE5',
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                onClick={()=>handleKeywordSearch()}>
                  {/*onClick={()=>setSearch(!search)}*/}
                    {/* <SearchIcon sx={{ fontSize: 25, color:'white' }}/> */}
                    <div style={{color:'#fff',fontSize:18}}>Search</div>
                </Button>

            </Box>
            </Box>

            <Box>
              <Link >
                <a>
                <Button sx={{minWidth:'225px', height:'55px',
                display:'flex', bgcolor: '#009BE5', mr:5,
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                 onClick={()=>handleSendData()}>
                  {/*onClick={()=>setSearch(!search)}*/}
                    {/* <SearchIcon sx={{ fontSize: 25, color:'white' }}/> */}
                    <div style={{color:'#fff',fontSize:18}}>Create</div>
                </Button>
                </a>
              </Link>

            </Box>
          </Box>
          </Box>
        </Box>
      </Box>

      <Modal open={openDetails} onClose={handleCloseDetails}>
          <Box sx={style2}>            
              <DataSourcesDetails user={user} handleCloseDetails={handleCloseDetails}
              data={dsDetails} addDatasetcatalog={addDatasetcatalog}/>
          </Box>                  
       </Modal>

      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ display:'flex',flexDirection:'row',
            flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Matching Data Sources &nbsp;</div>
                 
                  </Box>
              </Typography>

          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                {dataSources && dataSources.map((data)=><FeatureCard 
                  openDetails={openDetails}
                  data={data}
                  token={token}
                  user={user}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={dataset.catalog}
                  dataSources={dataSources}
                  removeDatasetcatalog={removeDatasetcatalog}
                  addDatasetcatalog={addDatasetcatalog}
                  />)}
          </Box>
          
        </Box>
      </Box>

      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Matching Topics &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                {dataSources && <TopicsCard 
                  openDetails={openDetails}
                  data={dataSources}
                  token={token}
                  user={user}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={dataset.catalog}
                  dataSources={dataSources}
                  removeDatasetcatalog={removeDatasetcatalog}
                  addDatasetcatalog={addDatasetcatalog}
                  />}
          </Box>

          
        </Box>
      </Box>
                
      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Added Data Sources &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                {searching4.map((data)=><AddedFeatureCard 
                  openDetails={openDetails}
                  data={data}
                  token={token}
                  user={user}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={dataset}
                  removeDatasetcatalog={removeDatasetcatalog}
                  addDatasetcatalog={addDatasetcatalog} />)}
          </Box>
        </Box>
      </Box>
    
      {/* <Box sx={{  minHeight: '23vh', }}>        
        <Box component="main" sx={{ flex: 1, pt:6, px: 4, bgcolor: '#ffffff' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>HELP CENTER &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box component="main" sx={{ py:4,bgcolor: '#ffffff' }}>

            <Box sx={{ 
                    minheight:275, my:1, px:16, bgcolor: '#ffffff', display:'flex', flexDirection:'row',
                    alignItems:'center', justifyContent:'space-between', alignSelf:'center' }}>
             <HelpCenterCard 
                title={"GETTING STARTED"}
                description={"Learn about how Data Platform works. Information for new users."}
                linkText={'How to Create a Custom Dataset?'}
                link={'#'}
                all={'See all articles'}/>

              <HelpCenterCard 
                title={"GEOGRAPHIC AND TIME GRAINS"}
                description={"Learn what Geographic and Time grains are and how they work."}
                linkText={'Data Grains Explained'}
                link={'#'}
                all={'See all articles'}/>

              <HelpCenterCard 
                title={"DATA SCIENCE TREATMENTS"}
                description={"Learn about the different data science treatments you can apply to your signals."}
                linkText={'Overview of Data Science Treatments'}
                link={'#'}
                all={'See all articles'}/>

            </Box>
        </Box>
    </Box>   */}
        <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1}, 
              display: 'flex', flexDirection: 'row', flex:'end', 
              justifyContent:'end',py: 2, px: 13, bgcolor: '#eaeff1'

            }}
            noValidate
            autoComplete="off"
          >
          <Box>
              
                <Button sx={{minWidth:'225px', height:'55px', display:'flex', bgcolor: '#009BE5',
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                onClick={()=>handleSendData()}>
                  {/*onClick={()=>setSearch(!search)}*/}
                    {/* <SearchIcon sx={{ fontSize: 25, color:'white' }}/> */}
                    <div style={{color:'#fff',fontSize:18}}>Create</div>
                </Button>
                

            </Box>
          </Box>
       <Footer />
        </Box>
    </Box>
  );
}

