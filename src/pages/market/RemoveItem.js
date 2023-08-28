import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
  } from "@material-ui/pickers";
  import DateFnsUtils from "@date-io/date-fns";
  import { styled } from "@mui/material";
  import { InputControl } from "../../utils/FormControls";
import { ToastContainer, Zoom, toast } from 'react-toastify';

  import { useHistory } from "react-router-dom";
  import { useState } from "react";
  import { connect } from "react-redux";
  import { bindActionCreators } from "redux";
  import * as actions from "../../redux";
  import { configuration, configuration2 } from "../../services/appConfig";
  import { Checkbox, ListItemIcon, ListItemText, Modal, OutlinedInput } from "@material-ui/core";
import { confirmAlert } from "react-confirm-alert";
  
  
  
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
  
  const AddNewItem = (props) => {
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: "100%",
  
      boxShadow: 24,
      p: 4,
    };
  
    const history = useHistory();
  
    const [category, setCategory] = useState([])
    const [selectedItemId, setselectedItemId] = useState([])
    const [categoryvalue, setCategoryvalue] = useState("")
  
    const [itemList, setItemList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedName, setSelectedName] = useState([]);
    const [itemListFlag, setItemListFlag] = useState(false);
    const [selectedItemName, setSelectedItemName] = useState([])
    const user = localStorage.getItem("User");
    const userDetails = JSON.parse(user);
    const [disabled,setDisabled]=useState(false)
    const [items,setItems]=useState([])
  
    useEffect(() => {
  
      if(props.removeId){
        getSelectedcategory(props.removeId)
        getseleteditems(props.removeId)
        console.log("edit")
  
      }
     
    
    }, [])
    // useEffect(() => {
  
    //     if(props.removeId){
    //       getSelectedcategory(props.removeId)
    //       getseleteditems(props.removeId)
    //       console.log("edit")
    
    //     }
       
      
    //   }, [selectedCategory,selectedItemId])


  
    const getseleteditems = async (id) => {
  
      const response = await fetch(`${configuration.apiBaseUrl}/item/categoryBasedItemList?marketId=${id}&companyCode=${userDetails.companyCode}`, {
        headers: {
          Authorization: userDetails.token,
        },
      });
      const body = await response.json();
      let data=body.data.filter((item)=>item.exists===true)
      setItemList(body.data.filter((item)=>item.exists===true))
        props.selectedItem(body.data.filter((item)=>item.exists===true))
        props.itemcount(data.length)
     
    
  
      console.log(body.data, "item")
  
    }
  
    const getSelectedcategory = async (id) => {
      let unmounted = false;
  
      const response = await fetch(`${configuration.apiBaseUrl}/fnv/category?marketId=${id}&companyCode=${userDetails.companyCode}`, {
        headers: {
          Authorization: userDetails.token,
        },
      });
      const body = await response.json();
  
     
  
      if (!unmounted) {
        setCategory(body?.data?.filter((item)=>item.exists===true));
        // setSelectedCategory(body.data.filter((item)=>item.exists===true))
        // let data=selectedCategory.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i)
        
        // getCategoryBasedItemList(data)
        console.log(category, "category")
      }
    }


   
    const handledelete = (categoryId,selecteditem) => {
        console.log(selecteditem,categoryId,"delete item")

        if (props.removeId) {
    
          confirmAlert({
            title: "Confirm to Delete",
            message: "Are you sure you want to delete this item.",
            buttons: [
              {
                label: "Yes",
                onClick: () => {
                  const id = props.removeId;
    
                 
                  fetch(`${configuration2.apiBaseUrl}/market/` + id, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: userDetails.token,
                    },
                    body: JSON.stringify(
    
                      {
    
                        deleteStatus: "ITEM",
                        categories: categoryId,
                        items: selecteditem,
                        deletedBy: userDetails._id,
                      }
    
    
                    ),
                  })
                    .then((res) => {
                      res.json();
                      toast.success("Deleted Successfully")
                     console.log("deleted")
                    //  after(props.removeId)
                    getSelectedcategory(props.removeId)
                     getseleteditems(props.removeId)
                     
    
    
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
      
    
    
      }
  
   
   
  
    const handlesubmit = (type) => {
      if (type === "save") {
       

        // if(props.removeId){
          let category_id=selectedCategory.map((item)=>item._id)
          let selectedItems=selectedItemName.map((item)=>item._id)
         
        //   if(category_id){
            handledelete(category_id,selectedItems)

        //   }else if(selectedItems){
            // handledelete(selectedItems,props.removeId)

        //   }
          console.log(category_id,"selected category")
        
     
         
           
              
          
          props.close()
          setSelectedCategory([])
          setSelectedItemName([])
        
        // }
       
      }
      else {
        props.close()
      }
    }
  
    // const getCategoryBasedItemList = async (data) => {
    //   console.log(data, "function called")
    //   let id = data.map((item)=>item._id)
    //   let string = id.toString()
    //   if(string==""){
    //     getItem(userDetails)
    //   }else{
    //     try {
    //       const response = await fetch(`${configuration.apiBaseUrl}/item/categoryBasedItemList?categories=${string}`, {
    //         headers: {
    //           Authorization: userDetails.token,
    //           // 'Content-Type': 'application/json'
    //         },
    //       });
    
    
    
    //       // console.log(body, typeof id, " id 1 $object")
    
    //       const body = await response.json();
    //       console.log(body, "body")
    //       let bodyData = body.data
    //       let temp
    //       if (!itemListFlag) {
    //         temp = []
    //       }
    //       else {
    //         temp = itemList
    //       }
    //       for (let i = 0; i < bodyData.length; i++) {
    //         temp.push(bodyData[i])
    //       }
    //       setItemList(body.data)
    //       // setSelectedItemName([...selectedItemName, body.data.filter(item=>item.exists===true)])
    //       setItemListFlag(true)
    //       console.log(body.data, "based item")
    //     }
    //     catch (err) {
    //       console.log("Error =>", err)
    //     }
    //   }
    //   console.log(string, "string")
     
  
    
    // }
  
  
    // const handleCheck = (e) => {
  
    //   if (e.target.checked) {
    //     console.log(e.target.checked, "target")
    //     let array = category.map((item) => item._id)
    //     // setSelectedCategory(category.map((option) => option._id));
    //     console.log(array.length, category.length, "length")
    //     setSelectedCategory(array)
    //     setSelectedName(category.map((option) => option.name));
    //     // getCategoryBasedItemList(array)
  
    //   } else {
  
    //     setSelectedCategory([]);
    //     setSelectedName([]);
  
    //   }
    // }
  
    
   
  
  
  
  
    
   
  
    const handlecheckChange = (event) => {
      const {target: { value },} = event;
      console.log(event.target.value,"value is")
  
      if (value[value.length - 1] === "all") {
        let temp=category.map((item)=>item)
        setSelectedCategory(selectedCategory.length === category.length ? [] : temp);
        // getCategoryBasedItemList(temp)
  
        return;
      }
  
      const preventDuplicate = value.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i);
      setSelectedCategory(
        // On autofill we get a the stringified value.
        typeof preventDuplicate === 'string' ? preventDuplicate.split(',') : preventDuplicate
      );
    //   getCategoryBasedItemList(preventDuplicate)
  
  
    };
  
    const handleCheckmultiple=(e)=>{
      if (e.target.checked) {
        console.log(e.target.checked, "target")
        let array = category.map((item) => item)
        // setSelectedCategory(category.map((option) => option._id));
        console.log(array.length, category.length, "length")
        setSelectedCategory(category)
        // getCategoryBasedItemList(array)
        // setSelectedCategory(array)
        // setSelectedName(category.map((option) => option.name));
  
      } else {
        setSelectedCategory([])
        setSelectedName([]);
  
      }
    }
  
     const handleItemChange = (event) => {
      const {target: { value },} = event;
      console.log(event.target.value,"value is")
  
      if (value[value.length - 1] === "all") {
        let temp=itemList.map((item)=>item)
        setSelectedItemName(selectedItemName.length === itemList.length ? [] : temp);
      // getCategoryBasedItemList(temp)
  
      
        return;
      }
  
      const preventDuplicate = value.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i);
      setSelectedItemName(
      
        typeof preventDuplicate === 'string' ? preventDuplicate.split(',') : preventDuplicate
      );
      // setItems(typeof preventDuplicate === 'string' ? preventDuplicate.split(',') : preventDuplicate)
   
  
  
    };
     const handleItemCheckmultiple=(e)=>{
      if (e.target.checked) {
        console.log(e.target.checked, "target")
        let array = itemList.map((item) => item)
        // setSelectedCategory(category.map((option) => option._id));
        console.log(array.length, itemList.length, "length")
        setSelectedItemName(itemList)
       
  
      } else {
        setSelectedItemName([])
  
      }
    }
  
    useEffect(()=>{
      let temp=selectedCategory
      console.log(temp,"variant name")
    },[selectedCategory])
  
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
                <form >
                  <Typography
                    variant="h5"
                    // height="3rem"
                    // margin="0.5rem"
                    textAlign="center"
                    bgcolor="#00416b"
                    color="#fff"
                    p={2}
                  >
                    Remove Existing Item
                  </Typography>
                  <Grid container flexDirection="column" >
                    <Grid item xs={6} style={{ margin: "30px auto 20px auto", width: "50%" }}>
                    <FormControl 
                      fullWidth
                      size ="medium"
                      mt={5}
                      >
                        <InputLabel id="mutiple-select-label">Category</InputLabel>
  
                        {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          label="Category"
                          variant="standard"
                          value={selectedCategory}
                          onChange={handlecheckChange}
                          // input={<OutlinedInput label="Category" />}
                          renderValue={(selected) => selected.map((x) => x.name).join(', ')}
                          MenuProps={MenuProps}
                        >
                           <MenuItem
                            value="all"
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={category?.length > 0 && selectedCategory?.length === category?.length}
                                // indeterminate={selectedItemId.length > 0 && selectedItemId.length < itemList.length}
                                onChange={(e) => { handleCheckmultiple(e) }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Select All"
                            />
                          </MenuItem>
                          {category?.map((variant) => (
                            <MenuItem key={variant.id} value={variant}>
                              <Checkbox checked={
                                selectedCategory?.findIndex(item => item._id === variant._id) >= 0
                              } />
                              <ListItemText primary={variant.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
  
                    
                    </Grid>
                    <Grid item xs={6} style={{ margin: "30px auto 20px auto", width: "50%" }}>
  
  
                    <FormControl 
                      fullWidth
                      size ="medium"
                      mt={5}
                      >
                        <InputLabel id="mutiple-select-label">Item</InputLabel>
  
                       
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          label="Category"
                          variant="standard"
                          value={selectedItemName}
                          onChange={handleItemChange}
                          // input={<OutlinedInput label="Category" />}
                          renderValue={(selected) => selected.map((x) => x.itemName).join(', ')}
                          MenuProps={MenuProps}
                        >
                           <MenuItem
                            value="all"
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={itemList.length > 0 && selectedItemName.length === itemList.length}
                                // indeterminate={selectedItemId.length > 0 && selectedItemId.length < itemList.length}
                                onChange={(e) => { handleItemCheckmultiple(e) }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Select All"
                            />
                          </MenuItem>
                          {itemList.map((variant) => (
                            <MenuItem key={variant.id} value={variant}>
                              <Checkbox  checked={
                                selectedItemName.findIndex(item => item._id === variant._id) >= 0
                              } />
                              <ListItemText primary={variant.material_no + " - " + variant.itemName} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
  
  
                      {/* <FormControl
                        fullWidth
                        size="medium"
                        mt={5}
                      >
                        <InputLabel id="mutiple-select-label">Item</InputLabel>
                        <Select
                          labelId="mutiple-select-label"
                          multiple
                          value={selectedItemName}
                          label="Item"
                          variant="standard"
                          onChange={itemNameChange}
                          // renderValue={selectedName => selectedName}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          <MenuItem
                            value="all"
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={itemList.length > 0 && selectedItemId.length === itemList.length}
                                indeterminate={selectedItemId.length > 0 && selectedItemId.length < itemList.length}
                                onChange={(e) => { handleItemCheck(e) }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Select All"
                            />
                          </MenuItem>
                          {itemList.map((option, key) => (
                            <MenuItem key={option._id} value={option}>
                              <ListItemIcon>
                                <Checkbox checked={selectedItemId.includes(option._id)} />
                              </ListItemIcon>
                              <ListItemText primary={option.material_no + " - " + option.itemName} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}
                    </Grid>
                    <Grid item xs={6} style={{ margin: "30px auto 20px auto", width: "50%" }}>
                      <Button variant="contained" marginLeft="auto" size="medium" style={{ width: "150px", color: "white", backgroundColor: "#00416b" }} onClick={() => handlesubmit("save")} >Save</Button>
                      <Button variant="contained" size="medium" style={{ width: "150px", color: "white", backgroundColor: "#00416b", marginLeft: "20px" }} onClick={() => handlesubmit("Cancel")}>Cancel</Button>
  
                    </Grid>
  
  
                  
                  </Grid>
  
                  <Grid container mt={3} spacing={1} justifyContent="space-between">
                    {/* <Grid ml={2} item lg={5} xs={12}>
  
  
                      <FormControl
                        fullWidth
                        size="medium"
                        mt={5}
                      >
                        <InputLabel id="mutiple-select-label">Category</InputLabel>
                        <Select
                          labelId="mutiple-select-label"
                          multiple
                          value={selectedName}
                          label="Category"
                          onChange={categoryChange}
                          // renderValue={selectedName => selectedName}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          <MenuItem
                            value="all"
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={category.length > 0 && selectedCategory.length === category.length}
                                indeterminate={selectedCategory.length > 0 && selectedCategory.length < category.length}
                                onChange={(e) => { handleCheck(e) }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Select All"
                            />
                          </MenuItem>
                          {category.map((option, key) => (
                            <MenuItem key={option._id} value={option}>
                              <ListItemIcon>
                                <Checkbox checked={selectedCategory.includes(option._id)} />
                              </ListItemIcon>
                              <ListItemText primary={option.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid> */}
                    <Grid item lg={5} md={5} mr={2} xs={10}>
  
                      {/* <FormControl
                        fullWidth
                        size="medium"
                        mt={5}
                      >
                        <InputLabel id="mutiple-select-label">Item</InputLabel>
                        <Select
                          labelId="mutiple-select-label"
                          multiple
                          value={selectedItemName}
                          label="Item"
                          onChange={itemNameChange}
                          // renderValue={selectedName => selectedName}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          <MenuItem
                            value="all"
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={itemList.length > 0 && selectedItemId.length === itemList.length}
                                indeterminate={selectedItemId.length > 0 && selectedItemId.length < itemList.length}
                                onChange={(e) => { handleItemCheck(e) }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary="Select All"
                            />
                          </MenuItem>
                          {itemList.map((option, key) => (
                            <MenuItem key={option._id} value={option}>
                              <ListItemIcon>
                                <Checkbox checked={selectedItemId.includes(option._id)} />
                              </ListItemIcon>
                              <ListItemText primary={option.material_no + " - " + option.itemName} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}
  
  
                    </Grid>
  
  
                    {/* <Grid container mt={3} spacing={1} mb={3} mr={5} justifyContent="end">
  
                      <Grid item xs={6}>
                        <div style={{ marginLeft: "50px" }}>
  
                          <Button variant="contained" marginLeft="auto" size="medium" style={{ width: "150px", color: "white", backgroundColor: "#00416b" }} onClick={() => handlesubmit("save")} >Save</Button>
                          <Button variant="contained" size="medium" style={{ width: "150px", color: "white", backgroundColor: "#00416b", marginLeft: "20px" }} onClick={() => handlesubmit("Cancel")}>Cancel</Button>
  
                        </div>
                      </Grid>
                    </Grid> */}
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
          tagItemDetails: actions.tagItemDetails,
        },
        dispatch
      ),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AddNewItem);
  
  
  
  