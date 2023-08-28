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

const token = localStorage.getItem("token");
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



function AddTime(props) {
    const { toggleComponent, importedData } = props;

    const classes = useStyles();
    const [records, setRecords] = useState([]);
   
    const [location, setLocation] = useState("");




    const [market, setMarkets] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");



    const [onemarketid, setOneMarketId] = useState("");
    const [data, setData] = useState([])


    const [anchorEl, setAnchorE1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [items, setItems] = useState([
        { label: "Select Location", value: "" }
    ]);
    // const [value, setValue] = useState(items[0].value);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })


    useEffect(() => {
        setRecords(props?.marketLocation);


    }, []);

  
    const saveUserDetails = () => {


        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'


        fetch(`${configuration.apiBaseUrl}/timeslot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userDetails.token
            },
            body: JSON.stringify({

                market: onemarketid,
                from,
                to,
                createdBy: userDetails._id,

            }),
        })

            .then((res) => {

                res.json();

                toast.success('TimeSlot added Successfully.', { theme: "colored" });


                window.location.reload();
            })




            .then((result) => setData(result.rows))
            .catch((err) => console.log('error'))



    }


    const handleSubmit = (event) => {
        event.preventDefault()
        saveUserDetails()



    }

    const[newValue,setNewValue] = useState(null);
    const handleclick=()=>{
        setNewValue(null);
    }
    const handleChange = (value) => {

     
        props.actions.getMarketLocation(value.target.value).then(
            (res) => {

                setNewValue(value.target.value);
                setMarkets(!res?[]:res);

            }

        )
    }

    const handleMarketChange = (value) => {
        // setValue(value);
        
 
        setOneMarketId(value);
    }



    return (
        <div className=" d-flex justify-content-center ">


            <form onSubmit={handleSubmit} className="mt-3  p-4 " style={{ backgroundColor: "#f0f0f0" }} >
                <div className="mt-0" >
                    <h3 className="mt-0" style={{ color: "#676767" }}> Add New Time Slot</h3>

                    <select
                        className="px-2"
                        style={{ width: "30vw", height: "50px", borderRadius: "5px" }}
                        onChange={handleChange}
                        onClick={handleclick}
                        required
                        value={newValue}
                    >
                        <option value="">Select Location</option>
                        {records.length > 0 &&
                            records?.map(({ name, _id }) => (
                                <option key={_id} value={_id}>{name}</option>
                            ))}
                    </select>

                    &nbsp;&nbsp;

                    <select
                        className="px-2"
                        style={{ width: '25vw', height: '50px', borderRadius: '5px' }}


                        onChange={e => handleMarketChange(e.currentTarget.value)}
                        placeholder="Location" type="text" autoComplete="off" required>
                        <option>Select Market / If not available plz add in Market section</option>
                        {/* <option value="item._id" >{item.name}</option> */}

                        {market.length > 0 && market.map(({ name, _id }) => (
                            <option value={_id}  >
                                {console.log('markets',name)}
                                {name}
                            </option>
                        ))}

                    </select>
                    <br />
                    <div>
                        <h4>From</h4>
                        <input type="time" label="from" style={{ display: 'block', width: '100%', padding: '0.375rem 0.75rem', fontSize: '1rem', lineHeight: '1.5', color: '#495057', backgroundColor: ' #fff', backgroundClip: 'padding-box', border: '1px solid' }} name="from" placeholder="mins:seconds" onChange={(event) => setFrom(event.target.value)} pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" class="inputs time" required />


                        <h4>To</h4>
                        <input type="time" label="to" style={{ display: 'block', width: '100%', padding: '0.375rem 0.75rem', fontSize: '1rem', lineHeight: '1.5', color: '#495057', backgroundColor: ' #fff', backgroundClip: 'padding-box', border: '1px solid' }} name="to" placeholder="mins:seconds" onChange={(event) => setTo(event.target.value)} pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" class="inputs time" required />
                    </div>






                    <div className="mt-4" style={{ textAlign: "center" }}>
                        <button
                            style={{ width: '25vw', height: '50px', borderRadius: '5px', backgroundColor: "#00416b", color: "#ffffff" }}  > Submit New Time Slot </button>
                    </div>
                </div>
            </form>
            <ToastContainer transition={Zoom} theme="colored"
            />
        </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(AddTime);
