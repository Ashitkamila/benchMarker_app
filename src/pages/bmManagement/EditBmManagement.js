import {
  Paper,
  Button,
  ButtonBase,
  FormControl,
  Checkbox,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import * as actions from "../../redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
// import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./style.css";
import useTable from "../../utils/table/useTable";
import {
  getAllMarketLocation,
  getOneUserById,
} from "./../../redux/marketLocation/marketLocationAction";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configuration } from "../../services/appConfig";
import PhoneInput from "react-phone-input-2";
import ReactPhoneInput from 'react-phone-input-2';
import { getSelectedCountryData } from 'react-phone-input-2';

/**
 *
 * Time slots needs to have time slot object + Market
 * All of that data needs to be posted.
 * map timeslots : dataArray  (store the necessary obj here)
 * same object for rendering
 *
 */

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
  },
}));

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
// const usertoken = userDetails.token;

// const type = userDetails && userDetails.userType;

function EditBmManagement(props) {
  const history = useHistory();
  const { toggleComponent, importedData, formData } = props;
  console.log("form_data1234", formData.timeSlots[0]);
  

  const classes = useStyles();

  const [records, setRecords] = useState([]);

  const [anchorEl, setAnchorE1] = useState(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(formData.name);
  const [email, setEmail] = useState(formData.email);
  // const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber);
  // const [dialingCode, setDialingCode] = useState(formData.dialingCode);

  // console.log("alltesting", dialingCode);
  const [newFormVal, setNewFormVal] = useState({
    phoneNumber: formData.phoneNumber,
    dialingCode: formData.dialingCode,
    countryCode: formData.countryCode
  })
  // console.log('allformValues', newFormVal.countryCode,newFormVal.dialingCode,newFormVal.phoneNumber);
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState("");
  const [stallTypes, setStallTypes] = useState([]);

  const [oneuserId, setOneUserId] = useState([]);

  const [data, setData] = useState([]);
  const [onemarketid, setOneMarketId] = useState("");

  const [checked, setChecked] = useState(true);
  const [oneslotid, setOneSlotId] = useState("");

  const [markets, setMarkets] = useState([]);
  const [timeSlots, setTimeSlots] = useState(formData.timeSlots);

  // const [formData, setFormData] = useState({});

  const [items, setItems] = useState([{ label: "Select Location", value: "" }]);

  const [value, setValue] = useState(items[0].value);

  const [selectedMarket, setSelectedMarket] = useState(null);

  const [selectedtimeslot, setSelectedTimeSlot] = useState({ _id: null });

  const [dataArray, setDataArray] = useState([]);



  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    fetchUserDetails();

    setRecords(props.marketLocation);

    setDataArray(formData.timeSlots);
  }, []);

  const extractSelectedMarketsList = () => {
    const result = dataArray.map(({ market: { _id } }) => _id);
    return result;
  };

  const fetchUserDetails = () => {
    props.actions.getOneUserId().then((res) => {
      setOneUserId(formData);

      setValue();
    });
  };


  // console.log('newFormValue', newFormVal);
  const updatefinalUserDetails = () => {
    const id = formData._id;

    //  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'

    fetch(`${configuration.apiBaseUrl}/user/` + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: userDetails.token,
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber: newFormVal?.phoneNumber,
        countryCode: newFormVal?.countryCode,
        // dialingCode: newFormVal?.dialingCode,
        // dialCode,
        location: value,
        // userType,
        markets: extractSelectedMarketsList(),
        // stallTypes: stallTypes,
        timeSlots: dataArray,
        updatedBy: userDetails._id,
      }),
    })
      .then((res) => {
        res.json();
        console.log("hhhhh234567", res);
        if (res.status === 202) {
          toast.success("User updated Successfully.", { theme: "colored" });
          window.location.reload();
        } else if (res.status === 404) {
          toast.warn("User with given credentials already exist", {
            theme: "colored",
          });
          window.location.reload();
        } else if (res.status === 400) {
          toast.warn("Choose User Type again to update", { theme: "colored" });
        } else if (res.status === 401) {
          toast.warn("jwt token is expired", { theme: "colored" });
        }
      })
      .then((result) => setData(result.rows))
      .catch((err) => console.log("error"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updatefinalUserDetails();
  };

  // console.log('propsAction',props.actions.getLocations());
  const handleChange = (value) => {


    props.actions.getLocations(value).then((res) => {
      // const marketarray = res.find((ele) => ele._id);


      setValue(value);
      setMarkets(res);
    });
  };

  const handleMarketChange = (value) => {
console.log('market val',value);
props.actions
.getTimeSlotMarkets(value).then((res)=>{
  console.log('market val1',location);
    setTimeSlots(res)   
})
    props.actions.getLocations().then((res, i) => {
      const location = res.find((ele) => ele._id === value);
      console.log('market val1',location);
      
      setSelectedMarket(location);
      setOneMarketId(value);
      setOneSlotId(formData.location._id);
    });
  };

 
  const goPrev = (event) => {
    window.location.reload();
  };

  // let updatedRetailIndex = formData.stallTypes.indexOf("Retail");


  const addEntryClick = () => {
    const newItem = { ...selectedtimeslot, market: selectedMarket };

    if (dataArray.length >= 0) setDataArray((items) => [...items, newItem]);
    toast.success("New Market and Timeslot added");
    // if (newItem.length > 0) {
    //   toast.success("New Market and Timeslot added")
    // }
    // else  (newItem.length === 0) {
    //   toast.warn("please choose market and time slot ")
    // }
  };

  const handleDelete = (deletedIndex) => {
    setDataArray(dataArray.filter((item, index) => index !== deletedIndex));
    toast.success("Removed successfully", { theme: "colored" });
  };
  // console.log('alltest',newFormVal);
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        formGroup="editBenchmarkerForm"
        className="mt-3 border p-1 mx-2"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <h3 className="mt-0" style={{ color: "#676767" }}>
          Personal Details
        </h3>
        <Grid container style={{ justifyContent: "space-between" }} >
          <Grid item xs={6}>
            <input
              className="px-2"
              style={{
                width: "30vw",
                height: "50px",
                borderRadius: "5px",
              }}
              value={name}
              placeholder="Name"
              type="text"
              onChange={(event) => setName(event.target.value)}
              maxlength="50"
              minLength="2"
              autoComplete="off"
              required
            ></input>
          </Grid>
          <Grid item xs={6}>
            <input
              className="px-2"
              style={{
                width: "30vw",
                height: "50px",
                borderRadius: "5px",
              }}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxlength="30"
              minLength="2"
              autoComplete="off"
              required
            ></input>
          </Grid>
          <Grid item xs={6}>
            <PhoneInput
              inputStyle={{
                width: "30vw",
                height: "50px",
                marginTop: "10px",
                borderRadius: "5px",
                border: "1px solid gray",
              }}
              inputProps={{
                name: "phone",
                required: true,
                // autoFocus: true,
              }}
              isValid={true}
              placeholder={"Enter phone number"}
              country={newFormVal.countryCode.toLowerCase()}
              enableAreaCodes={true}
              enableSearch={true}
              value={`${newFormVal.dialingCode}` + `${newFormVal.phoneNumber}`}
              // value={newFormVal?.phoneNumber}
              onChange={(phone, country) => {
                //  console.log('dialingCode',phone);
                setNewFormVal({
                  countryCode: country?.countryCode,
                  phoneNumber: phone,
                  // dialingCode: e.target.value
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <select
              // className="px-2"
              style={{
                width: "30vw",
                height: "50px",
                borderRadius: "5px",
                marginTop: "10px"

              }}
              onChange={(e) => handleChange(e.currentTarget.value)}
            >


              <option value="value">{formData.location.name}</option>

              {records?.length &&
                records?.map(({ name, _id, i }) => (
                  <option value={_id} key={i}>
                    {" "}
                    {name}
                  </option>
                ))}
            </select>
          </Grid>
          <Grid item xs={6}>
            <select
              className="px-2"
              style={{
                width: "30vw",
                height: "50px",
                borderRadius: "5px",
                marginTop:"10px"
              }}
              onChange={(e) => handleMarketChange(e.currentTarget.value)}
              placeholder="Location"
              type="text"
              autoComplete="off"
            >
              <option option class="dropdown-item" value="">
                Select Market / If not available plz add in Market section
              </option>
              {/* <option value="item._id" >{item.name}</option> */}

              {markets?.length > 0 &&
                markets?.map(({ name, _id }) => (
                  <option value={_id}>{name}</option>
                ))}
            </select>
          </Grid>
          <Grid item xs={6}>
          <select
            className="px-2"
            style={{
              width: "30vw",
              height: "50px",
              borderRadius: "5px",
              marginTop:"10px"
            }}
            value={selectedtimeslot._id}
            onChange={(e) => {
              const selectedTimeSlotId = e.currentTarget.value;
              const timeSlotById = timeSlots.find(
                (item) => item._id === selectedTimeSlotId
              );
              setSelectedTimeSlot(timeSlotById);
            }}
          >
            <option option class="dropdown-item" value="">
              Select Time Slot
            </option>
            {timeSlots?.length > 0 &&
              timeSlots?.map((timeSlot, index) => {
               console.log('timeSlots',timeSlot);
                return (
                  <option value={timeSlot?._id}>{`${timeSlot.from} - ${timeSlot.to}`}</option>
                );
              })}
          </select>
          </Grid>
          <Grid item xs={6}>
          <input
            type="button"
            onClick={addEntryClick}
            style={{
              width: "30vw",
              height: "50px",
              borderRadius: "5px",
              backgroundColor: "#00416B",
              color: "#ffffff",
              marginTop:"10px"
            }}
            value="Click here to add Selected Market and Time Slot"
          />
           <div style={{marginTop:"10px"}}>
            {dataArray.map((selectedtimeslot, index) => (
              <div >
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${selectedtimeslot?.market?.name} : ${selectedtimeslot?.from}-${selectedtimeslot?.to}`}
                    onDelete={(e) => handleDelete(index)}
                  />
                </Stack>
              </div>
            ))}
          </div>
          <div className="mt-4" >
          <button
            type="submit"
            style={{
              width: "500px",
              height: "50px",
              borderRadius: "5px",
              backgroundColor: "#00416B",
              color: "#ffffff",
             
            }}
          >
            {" "}
            Update BM Details
          </button>
          <button
            type="submit"
            style={{
              width: "100px",
              height: "50px",
              borderRadius: "5px",
              backgroundColor: "#00416B",
              color: "#ffffff",
              marginLeft:'10px'
             
            }}
            onClick={goPrev}
          >
            Back
          </button>
          {/* <Button
            variant="outlined"
            className="btn add-price-cancel-btn px-4 "
            style={{
              // marginLeft: "22vw",
              backgroundColor: "#00416B",
              color: "white",
             
            }}
            onClick={goPrev}
            size="medium"
          //   backgroundColor="#5078F2"
          >
            Back
          </Button> */}
        </div>
          </Grid>
        </Grid>
        {/* <div className="mt-0"> */}




          {/* <select
            className=" mt-3"
            style={{
              width: "30vw",
              height: "50px",
              borderRadius: "5px",
            }}
            onChange={(e) => setUserType(e.currentTarget.value)}
            type="text"
            autoComplete="off"
            required
          >
            <option value="defaultvalue" selected>
              {formData.userType}
            </option>
            <option value="fnv">fnV</option>
            <option value="nfnv">nfnV</option>
            <option value="imports">Imports</option>
            <option value="processor">Processor</option>
          </select> */}
          <br />
          {/* <h3 className="mt-2 " style={{ color: "#676767" }}>
            Field Work Details
          </h3>
          <div
            className="px-2 mt-3"
            style={{ width: "30vw", height: "50px", borderRadius: "5px" }}
            required
          >
            <input
              type="checkbox"
              defaultChecked={
                formData.stallTypes[0] === "WholeSale" ? checked : ""
              }
              value="WholeSale"
              onChange={(e) => handleStallTypeChange(e)}
            />{" "}
            WholeSale <br />
            <input
              type="checkbox"
              defaultChecked={
                formData.stallTypes[0] === "Retail" ? checked : ""
              }
              value="Retail"
              onChange={(e) => handleStallTypeChange(e)}
            />{" "}
            Retail <br />
            <input
              type="checkbox"
              defaultChecked={
                formData.stallTypes[0] === "SemiWholeSale" ? checked : ""
              }
              value="SemiWholeSale"
              onChange={(e) => handleStallTypeChange(e)}
            />{" "}
            Semi Whole Sale
           
          </div>
          <br /> */}

        
        {/* </div> */}
       
      </form>
      <ToastContainer transition={Zoom} theme="colored" />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bmManagementData: state.bmManagement.BmManagementData,
    error: state.bmManagement.error,
    //   marketLocation: state.marketLocation.marketLocation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getAllBmManagement: actions.getAllBmManagement,
        addNewUser: actions.addNewUser,
        updateUser: actions.updateUser,
        getLocations: actions.getAllMarketLocation,
        getTimeSlotMarkets: actions?.getAllTimeslotsMarket,

        getOneUserId: actions.getOneUserById,
      },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditBmManagement);
