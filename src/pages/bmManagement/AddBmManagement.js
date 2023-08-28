import {
  Paper,
  Button,
  ButtonBase,
  formData,
  FormControl,
  Checkbox,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import * as actions from "../../redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
// import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
import "./style.css";
import useTable from "../../utils/table/useTable";
import {
  getAllMarketLocation,
  getAllTimeslotsMarket,
} from "./../../redux/marketLocation/marketLocationAction";
import { signInUser } from "../../redux/auth/loginActions";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configuration } from "../../services/appConfig";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
  },
}));

// const user = localStorage.getItem("User");
// const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

// const type = userDetails && userDetails.userType;

function AddBmManagement(props) {
  const history = useHistory();
  const { toggleComponent, importedData, userDetails } = props;

  const classes = useStyles();
  const [submitDisabled, setSubmitdisabled] = useState(true);

  const [records, setRecords] = useState([]);

 
 

  const [color, setColor] = useState("#3c3c3c");
  const [textColor, setTextColor] = useState("white");
  const [anchorEl, setAnchorE1] = useState(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [formValue, setFormValue] = useState({
    countryCode: "",
    mobileNumber: "",
  });
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState("");
  const [stallTypes, setStallTypes] = useState([]);
  // console.log("stall types", stallTypes);

  const [data, setData] = useState([]);

  const [isTimeSlotAvalilable, setIsTimeSlotAvailable] = useState(false);
  const [markets, setMarkets] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const [showChip, setShowChip] = useState(false);

  const [items, setItems] = useState([{ label: "Select Location", value: "" }]);
  const [value, setValue] = useState(items[0].value);
  const [onemarketid, setOneMarketId] = useState("");
  const [selectedMarket, setSelectedMarket] = useState([]);
  const [selectedMarketList, setselectedMarketList] = useState([]);
  const [onemarketname, setOneMarketName] = useState();
  const [selectedtimeslot, setSelectedTimeSlot] = useState({ _id: null });
  const [oneslotid, setOneSlotId] = useState("");
  const [dataArray, setDataArray] = useState([]);
  // const [mobileNumber, setMobileNumber] = useState("");

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  // console.log('ashit_test',formValue.mobileNumber);
  useEffect(() => {
    setRecords(props.marketLocation);
  }, []);

  const saveUserDetails = () => {
    const user = localStorage.getItem("User");
    const userDetails = JSON.parse(user);

    let marketIds = selectedMarketList.map((market) => market.id);
    // console.log("marketIds", marketIds);
    let slotIds = selectedMarketList.map((slot) => slot.slotid);
    // console.log("slotIds", slotIds);
    setSubmitdisabled(false);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmM3ODI4NzU3ZjJmNzQ3YjdmNzk3ZjI5N2QyOTJmNzkyZjI5N2U3OTJiN2MiLCJpYXQiOjE2NDY5NzQyNDksImV4cCI6MTY0NzU3OTA0OX0.nC9W0hVFpv3rNDZbmFt1_vPMBFM-P5PFv7by3RT-0co'
    fetch(`${configuration.apiBaseUrl}/user/?companyCode=${userDetails.companyCode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userDetails.token,
      },

      body: JSON.stringify({
        companyCode:userDetails.companyCode,
        name,
        email,
        countryCode:formValue?.countryCode,
        phoneNumber:formValue?.mobileNumber,
        location: value,
        // userType: userType,
        markets: marketIds,
        // stallTypes: stallTypes,
        createdBy: userDetails._id,
        timeSlots: slotIds,
      }),
    
    })
      .then((res) => {
        res.json();
      // console.log('alltests',res);
        if (res.status === 201) {
          toast.success("User added Successfully.", { theme: "colored" });
          window.location.reload();
        } else if (res.status === 404) {
          toast.info("User with given credentials already exist", {
            theme: "colored",
          });
          window.location.reload();
        } else if (res.status === 400) {
          toast.warn("Please enter valid mobile number!", {
            theme: "colored",
          });
        }
      })

      .then((result) => setData(result.rows))
      .catch((err) => console.log("error", err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    saveUserDetails();
  };

  const handleChange = (value) => {
    
    props.actions.getMarketLocation(value).then((res) => {
    
      // const marketarray = res.find(ele => ele._id)

      setValue(value);
      setMarkets(res);
      // setselectedMarketList([]);
    });
  };

  const handleStallTypeChange = (e, i) => {
    let stallarray = stallTypes;

    if (e.target.checked) {
      stallarray.push(e.target.value);
      setStallTypes(stallarray);
    }
    if (!e.target.checked) {
      let updatedstall = stallarray.filter((stall) => stall !== e.target.value);
      setStallTypes(updatedstall);
    }
  
  };

  const handleMarketChange = (value) => {
    // setColor('#263544')

    props.actions
      .getTimeSlotMarkets(value)
      .then((res, i) => {
        // console.log("success", res);
        const fetchoneiddata = res.find((ele) => ele._id);
       
        setTimeSlots(res);
        if (res === undefined) {
          setIsTimeSlotAvailable(true);
        }
        //   setSubmitdisabled(false );
        setSelectedMarket([
          ...selectedMarket,
          { name: fetchoneiddata.market.name, marketid: value },
        ]);
        //
        // setValue(value);
        setOneMarketName(fetchoneiddata.market.name);
        let marketarray = onemarketid;
        let updatedarray = [...marketarray, value];
        setOneMarketId(value);
        setOneSlotId(fetchoneiddata._id);

        // setTimeSlots(res[2].timeSlots);
      })

      .catch((err) => {
        setTimeSlots([]);
      });
  };

  const addEntryClick = (e) => {
    // console.log('lllllllllllll', e);

    const validated = checkValidation();

    if (validated) {
      if (!isTimeSlotAvalilable) {
        const item = ` ${onemarketid} ${onemarketname}  - ${selectedtimeslot}`;
        
        let marketobject = {
          id: onemarketid,
          name: onemarketname,
          slots: selectedtimeslot,
          slotid: oneslotid,
        };
        setselectedMarketList([...selectedMarketList, marketobject]);

        setDataArray((items) => [...items, `${item}`]);
        setShowChip(true);
      } else {
        toast.info("No time slot available for this market", {
          theme: "colored",
        });
      }
    } else {
      toast.info("Please select market having timeslot", {
        theme: "colored",
      });
    }
  };

  const checkValidation = () => {
    if (value && markets?.length > 0 && selectedtimeslot?.length > 0) {
      return true;
    } else {
      return false;
    }
  };



  const goPrev = (event) => {
    window.location.reload();
  };

  const handleDelete = (market) => {
    // let marketId = onemarketid;
    // console.log('kkkkkkkk', marketId);

    const items = selectedMarketList;
    // console.log("fdddddd", selectedMarketList);
    // console.log("eeeeee", market);

    // if (items.length > 0) {
    // const lastIndex = items.length - 1;
    // setDataArray(items.filter((item, index) => index !== lastIndex));
    setselectedMarketList(items.filter((item, index) => item.id !== market.id));
    // }
  };
  const countryCodeRegex = /^(\+?\d{1,3}[\s-]?)?\(?(\d{2,3})\)?[\s-]?(\d{2,4})[\s-]?(\d{4})$/; 
  return (
    <div className="mt-3 d-flex justify-content-center ">
      <form
        onSubmit={handleSubmit}
        className="mt-3 border p-4 "
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <div className="mt-0">
          <h3 className="mt-0" style={{ color: "#676767" }}>
            Personal Details
          </h3>
          <input
            className="px-2"
            style={{ width: "30vw", height: "50px", borderRadius: "5px" }}
            value={name}
            placeholder="Name"
            type="text"
            onChange={(event) => setName(event.target.value)}
            maxlength="50"
            minLength="2"
            pattern="[a-zA-Z][a-zA-Z0-9\s]*"
            autoComplete="off"
            required
          ></input>
          &nbsp;&nbsp;
          <input
            className="px-2"
            style={{ width: "30vw", height: "50px", borderRadius: "5px" }}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            // maxlength="30"
            minLength="2"
            autoComplete="off"
            required
          ></input>
          <div className="row">
            <div className="col-md-6">
              <PhoneInput
                inputStyle={{
                  width: "30vw",
                  height: "50px",
                  marginTop: "10px",
                  borderRadius: "5px",
                  border:"1px solid gray",
                }}
                inputProps={{
                  name: 'phone',
                  required: true,
                  // autoFocus: true
                }}
                
                placeholder={"Enter phone number"}
                country={"in"}
                enableAreaCodes={true}
                enableSearch={true}
                value={formValue?.mobileNumber}
                onChange={(phone, country) => {
                  // console.log('123456',phone.replace(regex, ''));
                  setFormValue({
                    countryCode: country.countryCode,
                    mobileNumber: phone,
                  });
                }}
              />
            </div>
            <div className="col-md-6">
              <select
                // className="px-2"
                style={{
                  width: "30vw",
                  height: "50px",
                  borderRadius: "5px",
                  marginTop: "8px",
                  marginLeft: "-9px",
                }}
                onChange={(e) => handleChange(e.currentTarget.value)}
                required
              >
                <option value="">Select Location</option>
                {records?.length &&
                  records?.map(({ name, _id }) => (
                    <option value={_id}>{name}</option>
                  ))}
              </select>
            </div>
          </div>
          {/* <input
            className="px-2 mt-3"
            style={{ width: "30vw", height: "50px", borderRadius: "5px" }}
            placeholder="Phone Number"
            type="PhoneNumber"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            maxlength="10"
            minLength="10"
            pattern="[0-9]+"
            autoComplete="off"
            required
          ></input> */}
          {/* <select
            // className="px-2 mt-3"
            style={{
              width: "30vw",
              height: "50px",
              borderRadius: "5px",
              marginTop: "8px",
              marginLeft: "-1px",
            }}
            onChange={(e) => setUserType(e.currentTarget.value)}
            type="text"
            autoComplete="off"
            required
          >
            <option value="">Select UserType</option>
            <option value="fnv">fnV</option>
            <option value="nfnv">nfnV</option>
            <option value="imports">Imports</option>
            <option value="processor">Processor</option>
          </select> */}
          {/* <br /> */}
          {/* <h3 className="mt-2 " style={{ color: "#676767" }}>
            Field Work Details
          </h3> */}
          {/* <div
            className=" checkbox-group"
            style={{ width: "500px", height: "50px", borderRadius: "5px" }}
            required
          >
            <input
              type="checkbox"
              name="checkbox_name[]"
              value="WholeSale"
              onChange={(e) => handleStallTypeChange(e)}
            />{" "}
            WholeSale <br />
            <input
              type="checkbox"
              name="checkbox_name[]"
              value="Retail"
              onChange={(e) => handleStallTypeChange(e)}
            />{" "}
            Retail <br />
            <input
              type="checkbox"
              name="checkbox_name[]"
              value="SemiWholeSale"
              onChange={(e) => handleStallTypeChange(e)}
            />{" "}
            Semi Whole Sale
          </div> */}
          <br />
          <select
            className="px-2"
            style={{ width: "30vw", height: "50px", borderRadius: "5px" }}
            name="markets"
            onChange={(e) => handleMarketChange(e.currentTarget.value)}
            placeholder="Location"
            type="text"
            autoComplete="off"
            required
          >
            <option value="">
              Select Market / If not available plz add in Market section
            </option>
            {/* <option value="item._id" >{item.name}</option> */}
            {markets?.length > 0 &&
              markets?.map(({ name, _id }) => (
                <option value={_id}>{name}</option>
              ))}{" "}
            {markets?.length === 0 && records?.length > 0 && (
              <option value="">Please add timeslot for this market</option>
            )}
          </select>
          &nbsp;&nbsp;
          <select
            className="px-2"
            style={{ width: "30vw", height: "50px", borderRadius: "5px" }}
            value={selectedtimeslot._id}
            onChange={(e) => setSelectedTimeSlot(e.currentTarget.value)}
            required
          >
            <option value="">Select TimeSlot</option>
            {timeSlots?.length > 0 &&
              timeSlots?.map(({ from, to }) => (
                <option value={timeSlots?._id}>{`${from} - ${to}  `}</option>
              ))}{" "}
            {timeSlots?.length === 0 && markets?.length > 0 && (
              <option value="">Please add timeslot for this market</option>
            )}
          </select>
          <br />
        </div>
        <div className="mt-4">
          <input
            type="button"
            // disabled={checkforClickheretoaddMarketandTimeslot()}
            onClick={(e) => addEntryClick(e)}
            style={{
              width: "30vw",
              height: "50px",
              borderRadius: "5px",
              backgroundColor: "#00416B",
              color: "white",
              justifyContent: "space-evenly",
            }}
            value="Click here to add Selected Market and Time Slot"
            required
          />
          <div>
            {/* <pre>{JSON.stringify(dataArray)}</pre> */}
            {/* {dataArray.map(selectedtimeslot => 
                         
                            <div>
                                <Stack direction="row" spacing={1}>
                                  <Chip label =  {selectedtimeslot} onDelete={handleDelete} />
                                </Stack>
                              
                            </div>
                        )} */}
            {showChip &&
              selectedMarketList.map((selectedtimeslot) => (
                <div>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={
                        selectedtimeslot?.name + "-" + selectedtimeslot?.slots
                      }
                      onDelete={() => handleDelete(selectedtimeslot)}
                    />
                  </Stack>
                </div>
              ))}
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            //  disabled={checkSubmitValidation()}
            style={{
              width: "30vw",
              height: "50px",
              borderRadius: "5px",
              backgroundColor: "#00416b",
              color: "#ffffff",
              justifyContent: "space-evenly",
            }}
          >
            {" "}
            Submit BM{" "}
          </button>

          <Button
            variant="outlined"
            className="btn add-price-cancel-btn px-4 "
            style={{
              marginLeft: "22vw",
              backgroundColor: "#00416B",
              color: textColor,
            }}
            onClick={goPrev}
            size="medium"
            //   backgroundColor="#5078F2"
          >
            Back
          </Button>
        </div>
        {/* <div className="mt-4">
                    <input type="button"
                        style={{ width: '500px', height: '50px', borderRadius: '5px', backgroundColor: "#263544", color: "#ffffff" }}  > Back </input>
                        
                </div> */}
      </form>
      <ToastContainer transition={Zoom} theme="colored" />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bmManagementData: state?.bmManagement?.BmManagementData,
    userDetails: state.login,
    error: state.bmManagement.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getAllBmManagement: actions?.getAllBmManagement,

        addNewUser: actions?.addNewUser,
        updateUser: actions.updateUser,
        getLocations: actions?.getAllLocation,
        getMarketLocation: actions?.getAllMarketLocation,
        getTimeSlotMarkets: actions?.getAllTimeslotsMarket,
        getLogin: actions.signInUser,
        getUser: actions?.getAllBmManagement,
      },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddBmManagement);
