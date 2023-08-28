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
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux";
import { configuration } from "../../services/appConfig";
import { Checkbox, ListItemIcon, ListItemText, Modal, OutlinedInput } from "@material-ui/core";



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
  const [disabled,setDisabled]=useState(true)
  const [items,setItems]=useState([])

  useEffect(() => {

    if(props.marketId){
      getSelectedcategory(props.marketId)
      // getseleteditems(props.marketId)
      console.log("edit")

    }
    else{
      getcategory()
      // getItem(userDetails)
      console.log("add")


    }
   
  }, [])

  const getseleteditems = async (id) => {

    const response = await fetch(`${configuration.apiBaseUrl}/item/categoryBasedItemList?marketId=${id}/&companyCode=${userDetails.companyCode}`, {
      headers: {
        Authorization: userDetails.token,
      },
    });
    const body = await response.json();
    // let data=body.data.filter((item)=>item.exists===true)
    setItemList(body.data)
    setDisabled(false)
    setSelectedItemName(body.data.filter((item)=>item.exists===true))
    props.itemname(selectedItemName.length)

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

    console.log(body.data, "selected category")

    if (!unmounted) {
      setCategory(body.data);
      let data=body.data.filter((item)=>item.exists===true)
      setSelectedCategory(data)
      getSelectedCategoryBasedItemList(data)

      // let data=selectedCategory.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i)
      
      // getCategoryBasedItemList(data)
      console.log(category, "category")
    }
  }

  const getcategory = async () => {
    let unmounted = false;

    const response = await fetch(`${configuration.apiBaseUrl}/fnv/category/?companyCode=${userDetails.companyCode}`, {
      headers: {
        Authorization: userDetails.token,
      },
    });
    const body = await response.json();

    console.log(body.data, "category")

    if (!unmounted) {
      setCategory(body.data);
     
    }
  }

  const getItem = async (userDetails) => {

    const response = await fetch(`${configuration.apiBaseUrl}/item/categoryBasedItemList/?companyCode=${userDetails.companyCode}`, {
      headers: {
        Authorization: userDetails.token,
      },
    });
    const body = await response.json();
    setItemList(body.data)
    console.log(body.data, "item")

  }

  // const isAllSelectedItem = itemList.length > 0 && item.length === itemList.length;


  // const isAllSelected = category.length > 0 && selectedCategory.length === category.length;

  const handlesubmit = (type) => {
    if (type === "save") {
      if(props.marketId){
        let category_id=selectedCategory?.map((item)=>item._id)
        // props.itemname(selectedItemName.length)
        let temp=selectedItemName.filter((item)=>item.exists===false)
        let  selectedItemId=temp.map((item)=>item._id)
       
        // let selectedItemId=selectedItemName.map((item)=>item._id)
       
        console.log(selectedItemId,"selected items")
        const data = {
          category_id, selectedItemId
        }
        props.actions.tagItemDetails(data)
        // props.itemname(selectedItemName.length)
        props.close()
      }else{
        let category_id=selectedCategory?.map((item)=>item._id)
        let selectedItemId=selectedItemName.map((item)=>item._id)
        const data = {
          category_id, selectedItemId
        }
        props.category(category_id)
        props.item(selectedItemId)
        props.close()
        props.actions.tagItemDetails(data)

        console.log(data, "itemdetails")
      }
     
     
    }
    else {
      props.close()
    }
  }

  const getSelectedCategoryBasedItemList = async (data) => {
    console.log(data, " called")
    let id = data.map((item)=>item._id)
    let string = id.toString()
    if(string==""){
      getItem(userDetails)
    }else{
      try {
        const response = await fetch(`${configuration.apiBaseUrl}/item/categoryBasedItemList?marketId=${props.marketId}&categories=${string}&all=true&companyCode=${userDetails.companyCode}`, {
          headers: {
            Authorization: userDetails.token,
            // 'Content-Type': 'application/json'
          },
        });
  
  
  
        // console.log(body, typeof id, " id 1 $object")
  
        const body = await response.json();
        console.log(body, "body item")
        let bodyData = body.data
        let temp
        if (!itemListFlag) {
          temp = []
        }
        else {
          temp = itemList
        }
        for (let i = 0; i < bodyData.length; i++) {
          temp.push(bodyData[i])
        }
        let data=body.data.filter((item)=>item.exists===false)
        
        setItemList(data)
      
        setItemListFlag(true)
        console.log(body.data, "based item")
      }
      catch (err) {
        console.log("Error =>", err)
      }
    }
    console.log(string, "string")
   

  
  }


  const getCategoryBasedItemList = async (data) => {
    console.log(data, " getCategoryBasedItemList called")
    let id = data.map((item)=>item._id)
    let string = id.toString()
    if(string==""){
      getItem(userDetails)
    }else{
      try {
        const response = await fetch(`${configuration.apiBaseUrl}/item/categoryBasedItemList?categories=${string}&companyCode=${userDetails.companyCode}`, {
          headers: {
            Authorization: userDetails.token,
            // 'Content-Type': 'application/json'
          },
        });
  
  
  
        // console.log(body, typeof id, " id 1 $object")
  
        const body = await response.json();
        console.log(body, "body")
        let bodyData = body.data
        let temp
        if (!itemListFlag) {
          temp = []
        }
        else {
          temp = itemList
        }
        for (let i = 0; i < bodyData.length; i++) {
          temp.push(bodyData[i])
        }
       
        setItemList(body.data)
        
        setItemListFlag(true)
      }
      catch (err) {
        console.log("Error =>", err)
      }
    }
    console.log(string, "string")
   

  
  }


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

  const handleItemCheck = (event) => {

    if (event.target.checked) {
      console.log(event.target.checked, "target")
      let itemArray = itemList.map((item) => item._id)
      console.log(itemArray.length, itemList.length, "itemlength")
      setselectedItemId(itemArray)
      setSelectedItemName(itemList.map((item) => item.itemName))
      // setItem(itemList.map((option) => option.name));

    } else {
      setselectedItemId([])
      setSelectedItemName([])

    }
  }

  // const itemNameChange = (event) => {
  //   console.log(event.target.value, "change")
  //   let data = event.target.value
  //   let length = data.length
  //   let nameTemp = [...selectedItemName]
  //   let valueTemp = [...selectedItemId]
  //   console.log("category data", data)
  //   console.log("initial nameTemp =>", nameTemp)
  //   console.log("initial valueTemp =>", valueTemp)
  //   let idExist = valueTemp.includes(data[data.length - 1]._id)
  //   console.log("idExist =>", idExist)
  //   if (idExist) {
  //     let idx = valueTemp.indexOf(data[data.length - 1]._id)
  //     valueTemp.splice(idx, 1)
  //     nameTemp.splice(idx, 1)
  //     console.log("valueTemp", valueTemp)
  //     console.log("nameTemp", nameTemp)
  //     setselectedItemId(valueTemp)
  //     setSelectedItemName(nameTemp)
  //     // getCategoryBasedItemList(valueTemp)
  //   }
  //   else {
  //     nameTemp.push(data[length - 1].itemName)
  //     console.log("nameTemp =>", nameTemp)
  //     valueTemp.push(data[length - 1]._id)
  //     console.log("valueTemp =>", valueTemp)
  //     setselectedItemId(valueTemp)
  //     setSelectedItemName(nameTemp)
  //     // getCategoryBasedItemList(valueTemp)
  //   }


  // }





  
 

  const handlecheckChange = (event) => {
    const {target: { value },} = event;
    console.log(event.target.value,"value is")

    if (value[value.length - 1] === "all") {
      let temp=category.map((item)=>item)
      setSelectedCategory(selectedCategory?.length === category?.length ? [] : temp);
      getCategoryBasedItemList(temp)

      return;
    }

    const preventDuplicate = value.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i);
    setSelectedCategory(
      // On autofill we get a the stringified value.
      typeof preventDuplicate === 'string' ? preventDuplicate.split(',') : preventDuplicate
    );
    if(props.marketId){
      getSelectedCategoryBasedItemList(preventDuplicate)
    }else{

      getCategoryBasedItemList(preventDuplicate)
    }


  };

  const handleCheckmultiple=(e)=>{
    if (e.target.checked) {
      console.log(e.target.checked, "target")
      let array = category.map((item) => item)
      // setSelectedCategory(category.map((option) => option._id));
      console.log(array.length, category.length, "length")
      setSelectedCategory(category)
      getCategoryBasedItemList(array)
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
    
    
    
      return;
    }

    const preventDuplicate = value.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i);
    setSelectedItemName(
    
      typeof preventDuplicate === 'string' ? preventDuplicate.split(',') : preventDuplicate
    );
   
 


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
                  Add New Item
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
                            <Checkbox   checked={
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



