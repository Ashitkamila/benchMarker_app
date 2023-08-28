import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as actions from "../../redux";
import AddIcon from '@material-ui/icons/Add';

import { styled } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Chip, Modal, makeStyles } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
// import { Cancel } from "@material-ui/icons";

import Cancel from "@mui/icons-material/Cancel";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Icon from "@material-ui/core/Icon";


const AddNewTimeSlot = (props) => {
  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
 
  boxShadow: 24,
  p: 4,
};
  const classes = makeStyles((theme) => ({
    icon: {
      color: "white",
      "&:hover": {
     
        // display: "block"
        color:"white"
      
    }
    },
   

  }))();


  const history = useHistory();
  //save button
  const [time, setTime] = useState(new Date())
  const [endtime, setEndtime] = useState(new Date())
  // const [times, setTimes] = useState([])
  const [endTime, setEndTime] = useState([])

  const [timeslot, setTimeslot] = useState([])

  const { newtimeslot } = useSelector(state => state.marketLocation)

  const user = localStorage.getItem("User");
    const userDetails = JSON.parse(user);


  const redirectBack = (type) => {
    if (type === "Save") {
      if(props.timeslot){

        props.timeslot(timeslot)
        props.close()
      }else if(props.newtimeslot){
        props.newtimeslot(timeslot)
        props.actions.setTimeSlot(timeslot)
        setTimeslot([])
        props.close()
      }

      // props.actions.setTimeSlot(timeslot)
      // history.push({
      //   pathname: "/addmarket",
      // })
      

    }
    else {
      props.close()
    }
  }

  const handlechange = (time) => {
    // const startTime = {
    //   startLabel: ` ${(time.getHours() < 10 ? "0" : " ") + time.getHours() + ":" + (time.getMinutes() < 10 ? "0" : " ") + time.getMinutes()}`,
    // }


    setTime(time)






  }

  const handleEndTime = (time) => {
    console.log(time, "time is")


    // const endTime = {
    //   endLabel: ` ${(time.getHours() < 10 ? "0" : " ") + time.getHours() + ":" + (time.getMinutes() < 10 ? "0" : " ") + time.getMinutes()}`,
    // }

    setEndtime(time)
  }

  const handledelete = (data) => {
    const result = timeslot.filter(item => item.from !== data.from && item.to !== data.to)
    setTimeslot([...result])
  }

  const addtime = () => {
    if (time != "" && endtime != "") {
      if(props.newtimeslot){
        const slots = {
          from: `${(time.getHours() < 10 ?"0" :"") + time.getHours() + ":" + (time.getMinutes() < 10 ? "0" : "") + time.getMinutes()}`,
          to: `${(endtime.getHours() < 10 ?"0" :"") + endtime.getHours() + ":" + (endtime.getMinutes() < 10 ? "0" : "") + endtime.getMinutes()}`,
        }
      setTimeslot([...timeslot, slots])

      }
      else{
        const slots = {
          from: `${(time.getHours() < 10 ?"0" :"") + time.getHours() + ":" + (time.getMinutes() < 10 ? "0" : "") + time.getMinutes()}`,
          to: `${(endtime.getHours() < 10 ?"0" :"") + endtime.getHours() + ":" + (endtime.getMinutes() < 10 ? "0" : "") + endtime.getMinutes()}`,
          createdBy:userDetails._id,
          updatedBy:userDetails._id
          
        }
      setTimeslot([...timeslot, slots])

      }
     

    }
    else {
      console.log("enter end time")
    }

  }




  //save button

  return (
    <Modal
    open={props.open}
    onClose={props.close}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >

    <Box sx={style}>
      <Grid conatiner m={3} p={2} spacing={2}>
        <Grid item lg={8} m="auto" mb={10} xs={12}>
          <Paper elevation={2} style={{ backgroundColor: "#f0f0f0" }}>
            <form>
              <Typography
                variant="h5"
                // height="3rem"
                // margin="0.5rem"
                textAlign="center"
                bgcolor="#00416b"
                color="#fff"
                p={2}
              >
                Add Time Slot
              </Typography>
              
             
              <Grid container mt={3} spacing={1} justifyContent="space-between">
                <Grid ml={2} item lg={4} xs={10}>
                  <label htmlFor="" style={{fontSize:"16px",fontWeight:"600"}}>Start Time</label>
                 
                  <MuiPickersUtilsProvider
                   utils={DateFnsUtils}
                
                   > 
                    <KeyboardTimePicker
                      margin="normal"
                      inputVariant="outlined"
                      name="from"
                      disablePast="true"
                      // disabled={activeTab === "View Live Auctions" ? true : false}
                      value={time}
                      onChange={handlechange}
                      ampm={false}
                      openTo="from"
                      format="HH:mm"
                      placeholder="Start Time"
                      keyboardIcon={<AccessTimeIcon />}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                     
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item lg={4} md={5} xs={10}>
                <label htmlFor="" style={{fontSize:"16px",fontWeight:"600"}}>End Time</label>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      inputVariant="outlined"
                      name="from"
                      disablePast="true"
                      value={endtime}
                      onChange={handleEndTime}
                      // disabled={activeTab === "View Live Auctions" ? true : false}
                      ampm={false}
                      openTo="from"
                      format="HH:mm"
                      placeholder="End Time"
                      keyboardIcon={<AccessTimeIcon />}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}

                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item md={5} mr={2} mt={5} lg={2}>
                 
                  <Button variant="contained"
                    onClick={addtime}
                  ><AddIcon /> Add </Button>
                </Grid>


                <Grid container mt={3} spacing={1} mb={3} justifyContent="space-between">
                  <Grid item xs={6} ml={2} >
                    <Stack direction="row" spacing={1}>
                      {
                        timeslot && timeslot.map((data, idx) => {
                          console.log("Data", timeslot)
                          return (
                            <div>
                              <div>

                                {data && <Chip
                                  deleteIcon={<Cancel className={classes.icon} />}
                                  onDelete={() => handledelete(data)} label={data?.from + " - " + data?.to}
                                  style={{ backgroundColor: "#00416b", color: "white" ,paddding:"2px 4px"}}

                                />}
                              </div>


                            </div>
                          )
                        })
                      }


                    </Stack>
                  </Grid>
                  <Grid item xs={4} mr={2} >
                    <div style={{ float: "right" }}>

                      <Button variant="contained" marginLeft="auto" size="medium" style={{ width: "150px", color: "white", backgroundColor: "#00416b" }} onClick={() => redirectBack("Save")}>Save</Button>
                      <Button variant="contained" size="medium" style={{ width: "150px", color: "white", backgroundColor: "#00416b", marginLeft: "20px" }} onClick={() => redirectBack("Cancel")}>Cancel</Button>

                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </Modal>
  );
};


const mapStateToProps = (state) => {
  console.log('asdfghjkl', state);
  return {
    // skuData: state.sku.skuData,
    error: state.sku.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        // getSku: actions.getAllSku,
        // getLocations: actions.getAllMarketLocation,
        setTimeSlot: actions.setTimeSlot,
      },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewTimeSlot);
