import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

export default function AddedFeatureCard(props){
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const[added, setAdded] = React.useState(false);
    const handleAdd = () => {
        if(added === false){
          props.addDatasetcatalog(props.data);
          setAdded(true);
        } else {
            props.removeDatasetcatalog(props.data);
            setAdded(false);
        }
    }

    const handleRemove = () => {
          props.removeDatasetcatalog(props.data);
  }

    return (

          <div style={{display:"flex", flexDirection:'row', minHeight:'14vh',maxHeight:'125px', width:"100%",
              justifyContent:'space-around', alignItems:'center' ,backgroundColor:'#fff', marginBottom:16,
              textOverflow:'clip',  }}>
      
                    <div style={{fontSize:14, maxWidth:"19%", overflow:'hidden'}}>
                      <p style={{textOverflow:'clip', overflow:'hidden',}}><b>{props.data.title?props.data.title: "Historic Weather"}</b><br></br>
                            {props.data.description?props.data.description.substring(0,40):"Historic Weather"}</p>
                    </div>
                    <div style={{fontSize:14, width:"12%"}}>
                    <p><b>No. of Features:</b>&nbsp;{props.data.features?props.data.features.split(",").length: "0"}<br></br>
                         </p>
                    </div>
                    <div style={{fontSize:14,width:"14%"}}>
                      <p><b>No. of Rows:</b>&nbsp;{props.data.row_count?props.data.row_count: "0"}<br></br>
                         </p>
                    </div>
                    <div style={{fontSize:14,width:"19%"}}>
                      <p><b>Topic:</b>&nbsp;{props.data.topic?props.data.topic.substring(0,30): "FDA Approved Drugs"}<br></br>
                         </p>
                    </div>
                    <div style={{fontSize:14, cursor:'pointer',width:"9%"}} 
                        onClick={()=>props.handleOpenDetails(props.data)}>
                      <p><b>{props.geo?"View Details": "View Details"}</b></p>
                    </div>
                    {router.pathname.includes('/dashboard')?"":
                        router.pathname.includes('/createsignalsecond')?
                        <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleRemove()}>
                          <p><ClearIcon /></p>
                        </div>:
                    <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleRemove()}>
                      <p>{added?<DoneIcon /> :<ClearIcon />}</p>
                    </div>}
        
          </div>
    )

}