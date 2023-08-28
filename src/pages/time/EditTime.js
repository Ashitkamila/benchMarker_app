import React, { useEffect, useState } from 'react'
import { Paper, Button, ButtonBase, formData, FormControl, Checkbox, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import Stack from '@mui/material/Stack';
import * as actions from '../../redux';
import { makeStyles } from '@material-ui/core';
import './style.css';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configuration } from '../../services/appConfig';

const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

const type = userDetails && userDetails.userType;



function EditTime(props) {
    const {  formData } = props
    
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [location, setLocation] = useState("");




    const [market, setMarkets] = useState([]);
    const [from, setFrom] = useState(formData.from);
    
    const [to, setTo] = useState(formData.to);



    const [onemarketid, setOneMarketId] = useState("");
    console.log('dddddd', onemarketid);
    const [data, setData] = useState([])


    const [anchorEl, setAnchorE1] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [items, setItems] = useState([
        { label: "Select Location", value: "" }
    ]);
    const [value, setValue] = useState(items[0].value);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })


    useEffect(() => {
        setRecords(props.marketLocation);
    }, []);

    const saveUserDetails = () => {

        
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'

        const id = formData._id;
        const marketNewId = formData.market._id;
        

        fetch(`${configuration.apiBaseUrl}/timeslot/` + id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
             'Authorization': userDetails.token
          },
          body: JSON.stringify({
            
            market: marketNewId, 
            from,
            to,  
            updatedBy: userDetails._id,
          }),
        })
          
        .then((res) => {
                 
            res.json();
            console.log('hhhhh', res.message);
            if(res.status === 202) {
                toast.success('TimeSlot Updated Successfully.', { theme: "colored" });
                window.location.reload()
            }
            else if(res.status === 404 ) {
                toast.info("timeslot with given credentials already exist", { theme: "colored" })
                window.location.reload()
            }
            else if(res.status === 400 ) {
                toast.warn("market is not allowed to be empty", { theme: "colored" })
                
              }
            else if(res.status === 401 ) {
                toast.error("jwt token is expired", { theme: "colored" })
              
            }
            
            
        })
            .then((result) => setData(result.rows))
            .catch((err) => console.log("error"));
          
       
        
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        saveUserDetails() 
          
        

    }

    const handleChange = (value) => {
        
       
        props.actions.getMarketLocation(value).then( 
            (res) => {
                
                   
                setValue(value);
                setMarkets(res);
                
                
                
            }
            
        )
     }
 
     const handleMarketChange = (value) => {
    
         setValue(value);
                 
         setOneMarketId(value);
     }
   






    return (
      <Paper className="mt-3 d-flex justify-content-flex ">
        <form
          onSubmit={handleSubmit}
          className="mt-3 border p-5 "
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <div className="mt-0">
            <h3 className="mt-0" style={{ color: "#676767" }}>
              Add New Time Slot
            </h3>
            <input
              className="px-2"
              style={{ width: "30vw", height: "50px", borderRadius: "5px" }}
              onChange={(e) => handleChange(e.currentTarget.value)}
              value={formData.market.location.name}
              disabled={true}
            >
              {/* <option class="dropdown-item" value="" disabled={true}>
                {formData.market.location.name}
              </option>
              {records.length &&
                records.map(({ name, _id }) => (
                  <option value={_id}>{name}</option>
                ))} */}
            </input>
            &nbsp;&nbsp;
            <input
              className="px-2"
              style={{ width: "30vw", height: "50px", borderRadius: "5px" }}
              value={formData.market.name}
              onChange={(e) => handleMarketChange(e.currentTarget.value)}
              placeholder="Location"
              type="text"
              autoComplete="off"
              disabled
            >
              {/* <option value="" >Select Market</option>
                            
                        <option class="dropdown-item" value={formData.market._id}>
                            {formData.market.name}
                        </option> */}

              {/* {market.length > 0 && market.map(({ name, _id }) => (
                            <option value={formData._id}  >
                                {name} 
                            </option>
                        ))} */}
            </input>
            <br />
            <div>
              <h4>From</h4>
              <input
                type="time"
                label="from"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.375rem 0.75rem",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  color: "#495057",
                  backgroundColor: " #fff",
                  backgroundClip: "padding-box",
                  border: "1px solid",
                }}
                name="from"
                placeholder="mins:seconds"
                onChange={(event) => setFrom(event.target.value)}
                value={from}
                pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                class="inputs time"
                required
              />

              <h4>To</h4>
              <input
                type="time"
                label="from"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.375rem 0.75rem",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  color: "#495057",
                  backgroundColor: " #fff",
                  backgroundClip: "padding-box",
                  border: "1px solid",
                }}
                name="to"
                placeholder="mins:seconds"
                onChange={(event) => setTo(event.target.value)}
                value={to}
                pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                class="inputs time"
                required
              />
            </div>
            <div className="mt-4">
              <button
                style={{
                  width: "500px",
                  height: "50px",
                  borderRadius: "5px",
                  backgroundColor: "#263544",
                  color: "#ffffff",
                }}
              >
                {" "}
                Submit New Time Slot{" "}
              </button>
            </div>
          </div>
        </form>
        <ToastContainer transition={Zoom} theme="colored" />
      </Paper>
    );
}

const mapStateToProps = state => {
    return {
        timeData: state.time.timeData,
        error: state.time.error,
       
  
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators(
        {
            getTime: actions.getAllTime,
            getLocations: actions.getAllLocation,
            getMarketLocation: actions.getAllMarketLocation
  
        },
        dispatch,
      ),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(EditTime);
