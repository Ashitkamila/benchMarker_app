import { Box, Button, Checkbox, Chip, FormControl, Grid, InputLabel, ListItemIcon, ListItemText, MenuItem, Paper, Select, TextField, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { configuration, configuration2 } from '../../services/appConfig';
import MapContainer from './MapContainer';
import AddNewTimeSlot from './AddNewTimeSlot';
import { useSelector } from 'react-redux';
import AddNewItem from './AddNewItem';
import Cancel from "@mui/icons-material/Cancel";
import { confirmAlert } from 'react-confirm-alert'; // Import
import axios from 'axios';
import RemoveItem from './RemoveItem'



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



function EditMarketDetails(props) {

  const classes = makeStyles((theme) => ({
    icon: {
      color: "white",
      "&:hover": {

        // display: "block"
        color: "white"

      }
    },


  }))();
  console.log(props.formData, 'props are')

  const user = localStorage.getItem("User");
  const userDetails = JSON.parse(user);
  const { formData } = props
  const [formdata, setFormdata] = useState({
    _id: formData._id,
    plants: formData.plants,
    location: formData.location._id,
    // marketName: formData.name,
    // marketcommission: formData.marketCommission,
    // marketaddress: formData.address,
    // radius: formData.radius

  })
  const [marketName, setMarketName] = useState(formData.name)
  const [marketId, setMarketId] = useState(formData._id)
  const [marketcommission, setMarketcommission] = useState(formData.marketCommission)
  const[itemname,setItemname]=useState()
  const [address, setAddress] = useState(formData.address)
  const [radius, setRadius] = useState(formData.radius)
  const [markettype, setMarkettype] = useState(formData.marketType)
  const [location, setLocation] = useState(formData.location._id)
  const [items, setItems] = useState([{ label: "Select Location", value: "" }])
  const [market, setMarket] = useState([])
  const [plant, setPlant] = useState(formData.plants)
  const [plants, setPlants] = useState([])
  const [modalopen, setModalopen] = useState(false)
  const [coordinates, setCoordinates] = useState([null, null, formData.marketaddress ? formData.marketaddress : null])
  const [open, setOpen] = useState(false)
  const [removemodalopen,setRemovemodalopen]=useState(false)
  const [timeslot, setTimeslot] = useState(formData.timeSlots)
  const { newtimeslot,tagcategory, tagitem, marketaddress } = useSelector(state => state.marketLocation)
  const [newtime, setNewtime] = useState(newtimeslot)
  const [category, setCategory] = useState()
  const [selectedItemId, setSelectedItemId] = useState()
  const [selectedItems,setSelectedItems]=useState([])
  const [selectedcoordinates, setSelectedcoordinates] = useState({ latitude: formData.marketGeoLocation.latitude, longitude: formData.marketGeoLocation.longitude })
  console.log(tagitem,newtimeslot, "timeslot")

  useEffect(()=>{
    let temp=newtime
    setTimeslot([...timeslot,...temp])
  },[newtime])


  useEffect(() => {
    console.log(formdata.location, "loc")
    const user = localStorage.getItem("User")
    const userDetails = JSON.parse(user)
    async function getCharacters() {
      const response = await fetch(`${configuration.apiBaseUrl}/location/?companyCode=${userDetails.companyCode}`, {
        headers: {
          Authorization: userDetails.token,
        },
      });
      const body = await response.json();

      // setRecords(body.data)
      setItems(
        body?.data?.map(({ name, _id }) => ({ label: name, value: _id }))
      );

      // setLoading(true);

    }
    getCharacters()
    getPlants(userDetails)
    let co = selectedcoordinates
    console.log(co, "cord")
    // getItemList(marketId)
  }, [])

  // async function getItemList(marketId) {
  //   const response = await fetch(`${configuration.apiBaseUrl}/item/categoryBasedItemList?marketId=${marketId}`, {
  //     headers: {
  //       Authorization: userDetails.token,
  //     },
  //   });
  //   const body = await response.json();
  //   console.log(body,"market item") 

  //   // setRecords(body.data)
  //   // setItems(
  //   //   body.data.map(({ name, _id }) => ({ label: name, value: _id }))
  //   // );

  //   // setLoading(true);

  // }

  useEffect(()=>{
    let range=radius
    console.log(range,"range")
  },[radius])




  const updateMarketDetails = (e) => {
    e.preventDefault()


    console.log(selectedcoordinates, typeof selectedcoordinates.latitude, formdata.marketaddress, radius, address, typeof formdata._id, "button clicked")

    if (selectedcoordinates.latitude == "" ||
      selectedcoordinates.longitude == "" ||
   radius == "" ||
      markettype == "" || marketcommission == "" ||
      formdata.marketName == "" ||
      tagitem.category_id == "" ||
      tagitem.selectedItemId == "" ||
      selectedItems==""||
      address == "" ||
      timeslot == "") {
      toast.warn("Fields cannot be empty");
      console.log("Fields cannot be empty")
    }
    else {
      axios.patch(`${configuration2.apiBaseUrl}/market/` + marketId,
      {
        

          plants: plant,
          radius: Number(radius),
          marketType: markettype,
          marketCommission: marketcommission,
          name: marketName,
          // location:formdata.location,
          categories: tagitem.category_id,
          items: tagitem.selectedItemId,
          marketGeoLocation: {
            latitude: Number(selectedcoordinates.latitude),
            longitude: Number(selectedcoordinates.longitude)
          },
          address: address,
          updatedBy: userDetails._id,
          timeSlots: newtime
        
      },
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: userDetails.token,
      //   }
      // },
      )
      .then((result) => {
        console.log(result, "result")
        if(result.status==202){

          toast.success(result.data.message)
          // window.location.href = "/market";
          window.location.reload();


        }


      })
      .catch((err) =>{
        toast.warn(err.response.data.message)
      }
      )
    };
  }



  useEffect(() => {
   
    const getseleteditems = async (id) => {

      const response = await fetch(`${configuration.apiBaseUrl}/item/categoryBasedItemList?marketId=${id}&companyCode=${userDetails.companyCode}`, {
        headers: {
          Authorization: userDetails.token,
        },
      });
      const body = await response.json();
     let selecteditems=body.data.filter((item)=>item.exists===true)

      setItemname(selecteditems.length)
      // setDisabled(true)
  
      console.log(body.data, "item")
  
    }
    getseleteditems(formData._id)
   

  }, [])


  useEffect(() => {
    let temp = coordinates
    console.log(temp, "tmep")
  }, [coordinates])
  const handleChange = (e) => {
    console.log(e.target.value, "value is ")
    // let temp=items.filter((item)=>item._id===e.target.value)
    // console.log(temp,"temp")
    setLocation(e.target.value)
    setFormdata({ location: e.target.value })
  }
  const isAllSelectedmarket = market?.length > 0 && market?.length === marketType?.length;



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

  const marketChange = (e) => {
    const value = e.target.value
    console.log(e.target.value, "plant value")
    console.log(value, "plant is")
    if (value[value.length - 1] === "all") {
      let temp=marketType.map((item)=>item.name)
      setMarkettype(markettype.length === marketType.length ? [] : temp);
      // setSelectedCategory(selectedCategory.length === category.length ? [] : catid);
      return;
    }
    // setFormdata({marketType:e.target.value})
    // setMarket(event.target.value);
    setMarkettype(e.target.value)

  }

  const handlemarketCheck = (event) => {
    if (event.target.checked) {
      // setFormdata({marketType:marketType.map((option) => option.name)})
      setMarkettype(marketType.map((option) => option.name))
      // setMarket(marketType.map((option) => option.name));

    } else {
      // setFormdata({marketType:[]})

      setMarkettype([])

    }
  }
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

  useEffect(() => {
    let loc = location;
    console.log(loc, "location")

  }, [location])
  useEffect(() => {
    let loc = formdata.marketName;
    console.log(loc, "marketname")

  }, [formdata.marketName])



  const PlantChange = (event) => {
    const value = event.target.value
    console.log(event.target.value, "plant value")
    // const filter_result = plants.filter(item => item.plant == value)
    // console.log(filter_result[0].p, "plant is")
    if (value[value.length - 1] === "all") {
      let temp=plantList.map((item)=>item.plant)
      setPlant(plant.length === plantList.length ? [] : temp);
      // setSelectedCategory(selectedCategory.length === category.length ? [] : catid);
      return;
    }
    setPlant(event.target.value);

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

  const handleCheck = (event) => {

    if (event.target.checked) {

      // setSelected(plants.map((option) => option.plant));
      setPlant(plants.map((option) => option.plant))

    } else {

      setPlant([]);

    }
  }
  const handleopen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleItemModalOpen = () => {
    setModalopen(true)
  }

  const handleRemoveModal=()=>{
    setRemovemodalopen(true)
  }
  const modalclose = () => {
    setModalopen(false)
  }
  
  const removeModalClose = () => {
    setRemovemodalopen(false)
  }

  const commissionhandlechange = (e) => {
    if (e.target.value < 1 || e.target.value > 100) {
      // setFormdata({ marketcommission: "" })
      setMarketcommission("")

    } else {
      // setCommission(e.target.value)
      // setFormdata({ marketcommission: e.target.value })
      setMarketcommission(e.target.value)

    }
  }


  const handledelete = (time, deleteId, index) => {

    if (deleteId) {

      confirmAlert({
        title: "Confirm to Delete",
        message: "Are you sure you want to delete this time slot.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              const id = deleteId;

              // fetch(
              //     `${configuration2.apiBaseUrl}/itemQuestion/delete?deletedBy=${userDetails._id}&id=${id}`,
              //     {
              //         method: "PUT",
              //         headers: {
              //             "Content-Type": "application/json",
              //             Authorization: userDetails.token,
              //         },

              //     }
              // )
              fetch(`${configuration2.apiBaseUrl}/market/` + marketId, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: userDetails.token,
                },
                body: JSON.stringify(

                  {
                    //   "_id": "6469cbc98440590c6a5d0b10",

                    deleteStatus: "TIMESLOT",
                    timeSlots: [id],
                    deletedBy: userDetails._id,
                  }


                ),
              })
                .then((res) => {
                  res.json();
                  const result = timeslot.filter(item => item._id !== deleteId)
                  setTimeslot([...result])
                  // getItemquestion(initialItem._id)
                  // toast.success("Question Deleted Successfully.");


                })
                .catch((err) => console.log("error"));
            },
          },
          {
            label: "No",
            onClick: () => toast.warn("Action Cancelled"),
          },
        ],
      });
    }
    else {


      // console.log(data,"data")
      const result = timeslot.filter(item => item.from !== time.from && item.to !== time.to)
      setTimeslot([...result])
      // props.actions.setTimeSlot(result)
    }


  }

  return (
    <>

      <Box style={{
        width: "85%",
        height: "95%",
        // border: "2px solid black",
        // marginLeft: "12px"
        margin: " 30px auto",
        // marginTop: "30px"
        overflow: "scroll",
        padding: "20px",
        margin: "auto"
        // margin
      }}

      >

        <Paper style={{ height: "100%", backgroundColor: "#f0f0f0" }}>

          <form action="">
            <Grid container spacing={1} style={{ marginBottom: "30px" }} >
              <Grid item lg={4} style={{ marginTop: "30px" }} >
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
                      // value={formdata.location?formdata.location:""}
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

              <Grid item lg={5} style={{ marginTop: "30px" }}>
                <div >

                  <TextField size="medium" id="outlined-basic"
                    //  label="Market Name" 
                    placeholder="Market Name"
                    value={marketName}
                    onChange={(e) => setMarketName(e.target.value)}
                    variant="outlined" fullWidth />
                </div>
              </Grid>

              <Grid item lg={3} style={{ marginTop: "30px" }}>
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
                      value={markettype}
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
                            checked={markettype?.length > 0 && markettype?.length === marketType?.length}
                            indeterminate={
                              markettype.length > 0 && markettype.length < marketType.length
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
                            <Checkbox checked={markettype.includes(option.name)} />
                          </ListItemIcon>
                          <ListItemText primary={option.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={1} style={{ marginTop: "30px" }} >
              <Grid item xs={4}>
                <div style={{ marginLeft: "10px" }}>
                  <TextField size="medium" id="outlined-basic" fullWidth
                    type="number"
                    value={marketcommission}
                    // inputProps={{ min: 1, max: 100}}
                    label="Commission(%)"
                    onChange={(e) => commissionhandlechange(e)}

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
                      value={plant}
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
                            checked={plants?.length > 0 && plant.length === plants?.length}
                            indeterminate={
                              plant?.length > 0 && plant?.length < plants?.length
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
                            <Checkbox disabled={true} checked={plant?.includes(option.plant)} />
                          </ListItemIcon>
                          <ListItemText primary={option.plant + "-" + option.plant_description} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                </div>

              </Grid>

            </Grid>
            <Grid container style={{ marginBottom: "20px", marginTop: "20px" }} justifyContent="space-between"  >
              <Grid xs={3} style={{ marginLeft: "10px" }} item>
                <Button style={{ padding: "10px 30px", boxShadow: "1px 3px 3px purple", color: "black", border: "none" }}
                  // onClick={() => {
                  //   history.push("/addTimeSlot");
                  // }}
                  onClick={handleopen}
                  variant="outlined">Add Time Slot</Button><br />
                <AddNewTimeSlot newtimeslot={setNewtime} open={open} close={handleClose} />



              </Grid>
              <Grid xs={4} alignSelf="end" item>
                <Grid container >
                  <Grid item  xs={6}>
                  <Button style={{ float: "right", padding: "10px 50px", color: "black", border: 'none', boxShadow: "1px 3px 3px purple" }}
                  // onClick={() => {
                  //   history.push("/addNewItems");
                  // }}
                  onClick={handleItemModalOpen}
                  variant="outlined">Tag Items</Button><br />
                <AddNewItem category={tagcategory} itemname={setItemname} marketId={marketId} selectedcategory={setCategory} selecteditem={setSelectedItemId} open={modalopen} close={modalclose} />

                  </Grid>
                  <Grid item xs={6}>
                  <Button style={{ float: "right",backgroundColor:"darkgray" ,fontWeight:"bold", marginRight: "7px", padding: "10px 30px", color: "black", border: 'none', boxShadow: "1px 3px 3px purple" }}
                  // onClick={() => {
                  //   history.push("/addNewItems");
                  // }}
                  onClick={handleRemoveModal}
                  variant="outlined">Remove Items</Button><br />
                <RemoveItem selectedItem={setSelectedItems}  itemcount={setItemname} removeId={marketId}  open={removemodalopen} close={removeModalClose} />

                  </Grid>
                </Grid>
               
              </Grid>
              
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={3}>
                {
                  timeslot && timeslot.map((time, index) => {
                    return (

                      <Chip
                        deleteIcon={<Cancel className={classes.icon} />}
                        onDelete={() => { handledelete(time, time._id, index) }}
                        label={time.from + "-" + time.to} style={{ backgroundColor: "#00416b", color: "white", margin: "6px" }} />
                    )
                  })
                }
              </Grid>
               <Grid item xs={5} >
                {
                 itemname?(
                  <div style={{float:"right",width:"400px"}}>

                    <Chip
                    deleteIcon={<Cancel className={classes.icon} />}
                    // onDelete={() => { handledelete() }}
                    
                      label={"Number of Items: "+ itemname}
                      style={{ backgroundColor: "#00416b",marginLeft:"26%",width:"200px", color: "white",fontWeight:"600",letterSpacing:"1px" }}
                    />
                  </div>
                 ):""
                }
              </Grid>
            </Grid>




            <Grid container >
              <Grid style={{ margin: "0px 10px" }} xs={12} item>
                <MapContainer
                  updateMarket={updateMarketDetails}
                  radius={radius}
                  setradius={setRadius}
                  setaddress={setAddress}
                  address={address}
                  updateCoordinates={setSelectedcoordinates}
                  // address={formdata.marketaddress}
                  selectedcoordinates={selectedcoordinates}
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
  )


}

export default EditMarketDetails