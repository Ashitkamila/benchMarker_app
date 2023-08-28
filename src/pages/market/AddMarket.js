import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import * as actions from "../../redux";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { styled } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { Checkbox, Chip, FormHelperText, ListItemText, Modal, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { configuration, configuration2, } from "../../services/appConfig";
import { useState } from "react";
import Cancel from "@mui/icons-material/Cancel";
import MapContainer from "./MapContainer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import AddNewTimeSlot from "./AddNewTimeSlot"
import AddNewItem from "./AddNewItem"




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddNewMarket = (props) => {
  const classes = makeStyles((theme) => ({
    icon: {
      color: "white",
      "&:hover": {

        // display: "block"
        color: "white"

      }
    },


  }))();
  console.log('allprops', props);
  const [personName, setPersonName] = React.useState([]);
  const [items, setItems] = useState([{ label: "select location", value: " " }])
  const [plants, setPlants] = useState([])
  const [radius, setRadius] = useState();
  const [coordinates, setCoordinates] = useState([null, null, null]);
  const [selectedmarket, setSelectedMarket] = useState({});
  const [data, setData] = useState([]);
  const [commission, setCommission] = useState()
  const { toggleComponent, importedData, userDetails, setNewTimeSlot } = props;
  const [marketname, setMaarketname] = useState("")
  const { newtimeslot, tagitem, marketaddress } = useSelector(state => state.marketLocation)
  const [location, setLocation] = useState("")
  const [market, setMarket] = useState([])
  const [selected, setSelected] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedItemId, setSelectedItemId] = useState()
  const [locationmarket, setLocationmarket] = useState(marketaddress)
  const [timeslot, setTimeslot] = useState()
  const history = useHistory()
  const [open,setOpen]=useState(false)
  const [itemmodalopen,setItemmodalopen]=useState(false)


  console.log(newtimeslot, tagitem, marketaddress, "showing time")
  console.log(typeof coordinates[2],coordinates[2],"button clicked")

  const users = localStorage.getItem("User");
  const userDetail = JSON.parse(users);
  const updateGeoFencing = (e) => {
    e.preventDefault()
    const marketid = selectedmarket?._id;
    const user = localStorage.getItem("User");
    const userDetails = JSON.parse(user);
    let locations = marketaddress
    console.log(locations, "location")
    // if (selected=="" || marketname=="" || location=="" || coordinates[0] == "" || coordinates[1] == "" || selectedCategory == "" || selectedItemId == "" || timeslot == "" || market=="" || coordinates[2]=="" || marketaddress=="" || commission=="" ) {
     
    //   toast.warn("Please fill the fields", { theme: "colored" });

    // }else{
      try{
        fetch(`${configuration2.apiBaseUrl}/market`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: userDetails.token,
          },
          body: JSON.stringify(
    
            {
              companyCode: userDetail.companyCode,
              plants: selected,
              name: marketname,
              location: location,
              categories: selectedCategory,
              items: selectedItemId,
              marketGeoLocation: { "latitude": coordinates[0], "longitude": coordinates[1] },
              timeSlots: timeslot,
              marketType: market,
              address: coordinates[2],
              radius: marketaddress,
              // address:"hsr layout market",
              marketCommission: commission,
              createdBy: userDetails._id,
              updatedBy: userDetails._id
            },
    
            // console.log(" updated radius", selectedmarket?.radius)
          ),
        })
          .then((res) => {
            res.json();
            // setRadius(res.value);
            console.log(res,"res is")
            if (res.status === 201) {
              toast.success("Market Updated Successfully", { theme: "colored" });
              // window.location.reload();
              window.location.href = "/market";
              // <Redirect to="/market" />
    
            }
            // window.location.reload()
            else if (res.status === 200) {
              toast.warn("Market already exists", { theme: "colored" });
              // window.location.reload()
              // console.log(res,"response")
            }
            else if(res.status===400){
              toast.warn("Please fill all the fields", { theme: "colored" });
              console.log(res,"reponse")
  
            }
          })
    
          .then((result) => {
            // setData(result.rows)
            console.log(result, "result")
          })
          // .catch((err) => toast.warn("Please try after sometime", { theme: "colored" }));
      // }

      }catch(err){
         toast.warn(err, { theme: "colored" });

      }


      
    
   
  };


  useEffect(() => {
    console.log("Props for time", props)

    let markt = coordinates[0]
    console.log(typeof markt, markt, "selected")

  }, [coordinates[0]])

  const commissionhandlechange = (e) => {
    if (e.target.value < 1 || e.target.value > 100) {
      setCommission(" ")
    } else {
      setCommission(e.target.value)
    }
  }

  const handleChange = (e) => {
    console.log(e.target.value, "value is ")
    setLocation(e.target.value)
  }



  const marketType = [
    {
      name: "WholeSale",
      value: "1"
    },
    {
      name: "SemiWholeSale",
      value: "2"
    },
    {
      name: "Retail",
      value: "3"
    }
  ]
  const isAllSelectedmarket = market?.length > 0 && market?.length === marketType?.length;

 
  useEffect(() => {
    if (selected != "") {
      let sel = selected
      console.log(sel, "selected plant")
    }
    let unmounted = false;

    const user = localStorage.getItem("User");
    const userDetails = JSON.parse(user);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjNzkyOTdiN2IyZjdjN2YyOTJlMmI3YjJmN2M3ODJiN2U3ODI5NzgyYjc4MmYiLCJpYXQiOjE2NDI4NTA5NjMsImV4cCI6MTY0MzQ1NTc2M30.gCdRgpGemadVHn_w3QQeACY3Z_vh610tmKp7cM5ENF0'

    async function getCharacters() {
      const response = await fetch(`${configuration.apiBaseUrl}/location/?companyCode=${userDetails.companyCode}`, {
        headers: {
          Authorization: userDetails.token,
        },
      });
      const body = await response.json();

      // setRecords(body.data);

      if (!unmounted) {
        setItems(
          body.data.map(({ name, _id }) => ({ label: name, value: _id }))
        );

        // setLoading(true);
      }
    }
    getPlants(userDetails)
    getCharacters();
    return () => {
      unmounted = true;
    };
  }, [selected]);


  async function getPlants(userDetails) {
    const response = await fetch(`${configuration.apiBaseUrl}/plant/allPlants/?companyCode=${userDetails.companyCode}`, {
      headers: {
        Authorization: userDetails.token,
      },
    });
    const body = await response.json();
    console.log(body.data, "plants")
    setPlants(body.data);


    // setPlants(
    //   body.data.map(({ name, _id }) => ({ label: name, value: _id }))


    // setLoading(true);
  }




  const isAllSelected = plants?.length > 0 && selected?.length === plants?.length;

  const PlantChange = (event) => {
    const value = event.target.value
    console.log(event.target.value, "plant value")
    const filter_result = plants.filter(item => item.plant == value)
    // console.log(filter_result[0].p, "plant is")

     if (value[value.length - 1] === "all") {
      let temp=plantList.map((item)=>item.plant)
      setSelected(selected.length === plantList.length ? [] : temp);
      // setSelectedCategory(selectedCategory.length === category.length ? [] : catid);
      return;
    }

    setSelected(event.target.value);

  }

  function compareFn(a, b) {
    if (Number(a.plant) < Number(b.plant)) {
      return -1;
    }
    else if (Number(a.plant) > Number(b.plant)) {
      return 1;
    }
    else {
      return 0;
    }
  }

  let plantList = plants?.sort(compareFn)
  console.log("plantList", plantList)


  const marketChange = (event) => {
    const value = event.target.value
    console.log(event.target.value, "plant value")
    //  const filter_result=plants.filter(item=>item.region==value)

    if (value[value.length - 1] === "all") {
      let temp=marketType.map((item)=>item.name)
      setMarket(market.length === marketType.length ? [] : temp);
      // setSelectedCategory(selectedCategory.length === category.length ? [] : catid);
      return;
    }
    console.log(value, "plant is")
    setMarket(event.target.value);

  }

  const handlemarketCheck = (event) => {
    if (event.target.checked) {

      setMarket(marketType.map((option) => option.name));

    } else {

      setMarket([]);

    }
  }
  const handleCheck = (event) => {

    if (event.target.checked) {

      setSelected(plants.map((option) => option.plant));

    } else {

      setSelected([]);

    }
  }


  const handledelete = (data) => {
    const result = newtimeslot.filter(item => item.from !== data.from && item.to !== data.to)
    setTimeslot([...result])
    props.actions.setTimeSlot(result)

  }

  const handleopen=()=>{
  setOpen(true)
  }
  const handleItemModalOpen=()=>{
    setItemmodalopen(true)
    }
  const handleClose=()=>{
    setOpen(false)
  }
  const handleItemModalClose=()=>{
    setItemmodalopen(false)
  }

  return (
    <>

      <Box sx={{
        width: "85%",
        height: "95%",
        // border: "2px solid black",
        // marginLeft: "12px"
        margin: " 30px auto",
        // marginTop: "30px"
        overflow: "scroll"
        // margin
      }}
        p={3}
        m={3}
      >

        <Paper sx={{ height: "100%", backgroundColor: "#f0f0f0" }}>

          <form action="">
            <Grid container spacing={1} mb={2} >
              <Grid item lg={4} mt={5} >
                <div style={{ marginLeft: "10px" }}>
                  <FormControl
                    fullWidth
                    size="medium"
                    mt={5}
                  >
                    <InputLabel id="demo-select-medium">Location</InputLabel>
                    <Select
                      labelId="demo-select-medium"
                      id="demo-select-medium"
                      value={location}
                      label="Location"
                      onChange={handleChange}
                      MenuProps={MenuProps}
                    >
                      {
                        items?.map(({ label, value }) => {
                          return (
                            <MenuItem value={value}><ListItemText primary={label} /></MenuItem>
                          )
                        })
                      }

                    </Select>
                  </FormControl>
                </div>
              </Grid>

              <Grid item lg={5} mt={5}>
                <div >

                  <TextField size="medium" id="outlined-basic" label="Market Name" value={marketname} onChange={(e) => setMaarketname(e.target.value)} variant="outlined" fullWidth />
                </div>
              </Grid>

              <Grid item lg={3} mt={5}>
                <div >
                  <FormControl
                    fullWidth
                    size="medium"
                    mt={5}
                  >
                    <InputLabel id="mutiple-select-label">Market Type</InputLabel>
                    <Select
                      labelId="mutiple-select-label"
                      multiple
                      value={market}
                      onChange={marketChange}
                      label="market type"
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      <MenuItem
                        value="all"
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={isAllSelectedmarket}
                            indeterminate={
                              market?.length > 0 && market?.length < marketType?.length
                            }
                            onChange={handlemarketCheck}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="Select All"
                        />
                      </MenuItem>
                      {marketType.map((option) => (
                        <MenuItem key={option.value} value={option.name}>
                          <ListItemIcon>
                            <Checkbox checked={market.includes(option.name)} />
                          </ListItemIcon>
                          <ListItemText primary={option.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2} >
              <Grid item xs={4}>
                <div style={{ marginLeft: "10px" }}>
                  <TextField size="medium" id="outlined-basic" fullWidth
                    type="number"
                    value={commission}
                    // inputProps={{ min: 1, max: 100}}
                    label="Commission(%)" variant="outlined"
                    onChange={commissionhandlechange}

                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div >



                  <FormControl
                    fullWidth
                    size="medium"
                    mt={5}
                  >
                    <InputLabel id="mutiple-select-label">Plants</InputLabel>
                    <Select
                      labelId="mutiple-select-label"
                      multiple
                      value={selected}
                      onChange={PlantChange}
                      label="Plants"
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      <MenuItem
                        value="all"
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={isAllSelected}
                            indeterminate={
                              selected?.length > 0 && selected?.length < plants?.length
                            }
                            onChange={handleCheck}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="Select All"
                        />
                      </MenuItem>
                      {plantList?.map((option) => (
                        <MenuItem key={option._id} value={option.plant}>
                          <ListItemIcon>
                            <Checkbox checked={selected.includes(option.plant)} />
                          </ListItemIcon>
                          <ListItemText primary={option.plant + "-" + option.plant_description} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                </div>

              </Grid>
            </Grid>
            <Grid container mt={3} mb={3} justifyContent="space-between"  >
              <Grid xs={3} ml={1} item>
                {/* <Button sx={{ padding: "10px 30px", boxShadow: "1px 3px 3px purple", color: "black", border: "none" }}
                  onClick={() => {
                    history.push("/addTimeSlot");
                  }}
                  variant="outlined">Add Time Slot</Button><br /> */}
                   <Button sx={{ padding: "10px 30px", boxShadow: "1px 3px 3px purple", color: "black", border: "none" }}
                  onClick={handleopen}
                  variant="outlined">Add Time Slot</Button><br />
                 
                  <AddNewTimeSlot timeslot={setTimeslot} open={open} close={handleClose}/>


              </Grid>
              <Grid xs={3} alignSelf="end" item>
                <Button sx={{ float: "right", mr: 1, padding: "10px 50px", color: "black", border: 'none', boxShadow: "1px 3px 3px purple" }}
                  onClick={handleItemModalOpen}
                  variant="outlined">Tag Items</Button>
                  {/* <Button onClick={handleItemModalOpen}>tag item</Button> */}
                  <AddNewItem category={setSelectedCategory} item={setSelectedItemId} open={itemmodalopen} close={handleItemModalClose}/>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" >
              <Grid item xs={3}>
                {
                 timeslot?(timeslot.map((time) => {
                  return (

                    <Chip
                      deleteIcon={<Cancel className={classes.icon} />}
                      onDelete={() => { handledelete(time) }}
                      label={time?.from + "-" + time?.to} style={{ backgroundColor: "#00416b", color: "white", margin: "6px" }} />
                  )
                }))  :""
                }
              </Grid>
              <Grid item xs={3} >
                {
                 selectedItemId?(
                  <div style={{float:"right"}}>

                    <Chip
                    deleteIcon={<Cancel className={classes.icon} />}
                    // onDelete={() => { handledelete() }}
                      label={"Number of Items: "+ selectedItemId.length}
                      style={{ backgroundColor: "#00416b", color: "white", margin: "6px",fontWeight:"600",letterSpacing:"1px" }}
                    />
                  </div>
                 ):""
                }
              </Grid>
            </Grid>




            <Grid container >
              <Grid style={{ margin: "0px 10px" }} xs={12} item>
                <MapContainer
                  updateGeoFencing={updateGeoFencing}
                  updateLatLong={setCoordinates}

                  coordinates={selectedmarket?.marketGeoLocation?.coordinates}
                  google={props.google}
                  // center={{ lat: 12.9716, lng: 77.5946 }}
                  height="435px"
                  // width="600px"
                  width="100%"
                  zoom={15}

                />
              </Grid>

            </Grid>

          </form>
        </Paper>

      </Box>
      <ToastContainer transition={Zoom} theme="colored" />
     


    </>
  );
};

/** @type {import("@mui/material").SxProps}*/


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
export default connect(mapStateToProps, mapDispatchToProps)(AddNewMarket);

// export default AddNewMarket;
