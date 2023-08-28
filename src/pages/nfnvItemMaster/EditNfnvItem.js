import React, { useEffect, useState } from "react";
import {
  Paper,
  Button,
  ButtonBase,
  FormControl,
  Checkbox,
} from "@material-ui/core";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react"
import * as actions from "../../redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
// import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
import "./style.css";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Input from '@mui/material/Input';
import Plus from "./plus.svg";
import { InputControl } from './../../utils/FormControls';
import { pink } from '@mui/material/colors';
import { getAllNFnvCategory } from '../../redux/nfnvitemmaster/nfnvitemAction'
import { map } from "lodash";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configuration } from "../../services/appConfig";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
  },
}));


//  const usertoken = userDetails.token;

// const type = userDetails && userDetails.userType;

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);


function EditNfnvItem(props) {
  const { importedData, formData, itemData } = props;
  console.log('edit non', formData)


  const classes = useStyles();
  const ariaLabel = { 'aria-label': 'description' };


  const [records, setRecords] = useState([]);
  const [name, setName ] = useState(""); // null
  const [anchorEl, setAnchorE1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [UoM, setUoM] = useState("");
  const [baseQuantity, setBasequantity] = useState("");
  const [category, setCategory123] = useState("");
  const [variety, setVariety] = useState([]);
  console.log('variety', variety);
  const [imageUrl, setImageUrl] = useState("");
  const [list, setList] = useState([]);
  const [list1, setList123] = useState([]);
  console.log('list1', list1);
  const [showChip, setShowChip] = useState(false);
  console.log('list', list);
  const [data, setData] = useState([]);



  const goPrev = (event) => {
    window.location.reload();
  };


  useEffect(() => {
    setList(...list, formData?.variety);
    props.actions.getCategory().then(
      (res) => {
        
         console.log('category', res )
         setRecords(res)
          // const marketarray = res.find(ele => ele._id)

          // setValue(value);
          // setMarkets(res);
          // setselectedMarketList([]);
      }

      

    
    )
  }, []);





  const updateNonFnVDetails = () => {
    const user = localStorage.getItem("User");
    const userDetails = JSON.parse(user);
    const id = formData._id
    console.log('bnbnbnb', id)
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmYyZjdlN2E3NDJiN2IyYzc4NzQ3ZjdlNzg3ZDc5N2Q3NTI5MmUyZTc4MmYiLCJpYXQiOjE2NDA4NDU5OTUsImV4cCI6MTY0MTQ1MDc5NX0.KF7LhxiJ_cx4WGMxAn7Ggd2FNnJvkYQMGrcRljrRGyo'
    let updatedcategory =  name?.toUpperCase() ? name?.toUpperCase() : category.toUpperCase() ? category.toUpperCase() : formData?.category?.name;
    console.log('updated category', updatedcategory);
    // const validated = checkValidation();
    setList123(list1);
    console.log('list1', list1);


    fetch(`${configuration.apiBaseUrl}/item/` + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userDetails.token,
      },
      body: JSON.stringify({
        // baseQuantity,
        UoM: UoM ? UoM : formData.UoM,
        category :  updatedcategory,
        // imageUrl,
        variety:  list 
      }),
    })
      .then((res) => {
        res.json()
        if (res.status === 201) {
          toast.success('Nfnv Item master details updated Successfully.', { theme: "colored" })


           window.location.reload()
        }

        else if (res.status === 503) {

          toast.warn("Please edit UoM or category first to proceed", { theme: "colored" })



        }


        else if (res.status === 404) {

          toast.warn("Category already exist. Please Choose from dropdown", { theme: "colored" })



        }

        else if (res.status === 400) {

          toast.warn("Category name is not allowed to be empty ", { theme: "colored" })



        }


      })
      .then((result) => setData(result.rows))
      .catch((err) => console.log('error'))
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   updatefinalItemMasterDetails();

  // };

  const handleCategoryChange = (value) => {
    console.log('gggggggg', value)

    props.actions.getCategory(value).then(
        (res) => {
            setCategory123(value);
        }
    )
  }

  const addNewCategory = () => {



    //  const validated = checkValidation();
    
      const user = localStorage.getItem("User");
      const userDetails = JSON.parse(user);
    
      
    
       fetch(`${configuration.apiBaseUrl}/fnv/category` , {
    
         method: 'POST',
    
         headers: {
    
             'Content-Type': 'application/json',
    
              Authorization: userDetails.token,
    
         },
    
         body: JSON.stringify({
    
           // itemName,
    
             // baseQuantity,
    
             // UoM: formData.UoM,
    
              name: name.toUpperCase(),
    
              categoryType:"nfnv"
    
            
    
          
    
         }),
    
     })
    
         .then((res) => {
    
           res.json();
    
           console.log('hhhhh', res.message);
    
           if (res.status === 201) {
    
             toast.success('New Category is Added. Choose Added Category from the dropdown list ', { theme: "colored", autoClose: 9000 });

    
           }
           else if (res.status === 503) {

             toast.warn("Please add category to proceed", { theme: "colored" })


    
           }


           else if (res.status === 404) {

             toast.warn("Category already exist. Please Choose from dropdown", { theme: "colored" })



           }
    
    
           
    
           //  window.location.reload()
    
         })
    
         .then((result) => setData(result.rows))
    
         .catch((err) => console.log('error'))
    
    
    
    
    
    // alert('Now select Category from list.')
    
          
    
            
    
    // window.location.reload()
    
    
    
    };
    
    const handleAddItem = () => {
      // const newList = 
      
       const newItem = variety;
      console.log('item', newItem);
      // setList([...items]);
      if(variety.length > 0 ){
        setList((items) => [...items, newItem]);
        toast.success('New Variety has been added successfully', { theme: "colored" })
      } 
      
      else {
        toast.warn('Please add variety to proceed', { theme: "colored" })
      }
      
    };
    
    
    
    
    
    // const handleSave = (list1) => {
    
    //   console.log('sssssssssss', list1)
    // }

  const handleDelete = (deletedIndex) => {
    setList(list.filter((item, index) => index !== deletedIndex));
    toast.success('Variety removed successfully', { theme: "colored" })
  };






  return (
    <div>
      <form className="borders">
      <div className='row gy-2 gx-3 align-items-center ml-10'>
                        <CRow className="g-4  col-md-12 d-flex justify-content-center" xs="auto"  >
                        <CCol md={4} >
                        <InputControl

                              type="text"



                              labelName="Item Name"



                              name="itemId"



                              //    onChange={onChangeHandler('itemId')}



                              placeholder="Item Name"



                                value={formData.itemName}



                              required={true}



                              disabled={true}



                        />
                                


                            </CCol>
                            <CCol md={3} >
                                <InputControl
                                    type="text"

                                style={{

                                    width: "22vw",

                                    height: "35px",

                                    borderRadius: "5px",



                                }}
                                    labelName="Item Code"
                                    name="itemId"
                                    //    onChange={onChangeHandler('itemId')}
                                    placeholder="Item Code"
                                    value={formData?.material_no}
                                    required={true}
                                    disabled={true}
                                />
                            </CCol>

                            &nbsp;&nbsp;&nbsp;
{/* 
                        <CCol md={3}>

                            <label > <b>Select UoM</b><span style={{ color: "red" }}>*</span></label>

                            <select required

                                className="mb-3 px-3"
                                labelName="UoM"

                                style={{
                                    width: "22vw",
                                    height: "35px",
                                    borderRadius: "5px",

                                }}
                onChange={(e) => setUoM(e.currentTarget.value)}
                                type="text"
                                
                                    // defaultValue={formData.UoM}

                            >
                                <option value="">{formData?.UoM}</option>

                                <option value="KG">KG</option>
                                <option value="EA">EA</option>
                              <option value="PAK">PAK</option>

                            </select>
                        </CCol> */}
                        <CCol md={3}>
                <InputControl
                  type="text"
                  labelName="Select UoM"
                  name="itemId"
                  //    onChange={onChangeHandler('itemId')}

                  placeholder="Select UoM"
                  value={formData.UoM}
                  required={true}
                  disabled={true}
                />
              </CCol>
                        </CRow>


                    <CRow className="g-4  col-md-12 d-flex justify-content-center" xs="auto"  >

                            <CCol md={4} >
                            <div>
                                <label style={{ marginTop: "" }} > <b>Select Category</b><span style={{ color: "red" }}>*</span></label>
                                <select required


                                        //   style={{ width: '500px', height: '50px', borderRadius: '5px' }}

                                    style={{

                                        width: "21vw",

                                        height: "35px",

                                        borderRadius: "5px",



                                    }}
                                    onChange={(e) => handleCategoryChange(e.currentTarget.value)}

                                >
                                  <option defaultValue="de">{formData.category.name} </option>
                                    <option value="">{name}</option>

                                    {records?.length > 0 && records?.map(({ name, _id, }) => (
                                            <option value={_id}  >
                                        {name} 
                                      </option>
                                        ))}

                                </select></div>
                        </CCol>

                        <CCol md={3} className='mt-auto'>
                            <label style={{ marginTop: "1vh" }}><b> &nbsp;&nbsp; Add New Category</b></label>
                                <div className="mt-2">
                                    <span><img src={Plus} />
                                </span>
                                    <Input inputProps={ariaLabel}
                                        // margin="200px"
                                        type="text"
                                        // labelName="Add New Category"
                                        name="itemId"
                                    style={{
                                        width: "11vw",
                                        height: "35px",
                                    }}
                                           onChange={(e) => setName(e.currentTarget.value)}
                                        //    onChange={onChangeHandler('itemId')}
                                        placeholder="Add New Category"
                                    maxlength="50" minLength="2" pattern="[a-zA-Z][a-zA-Z0-9\s]*"
                                    autoComplete="off"
                                //     required={true}
                                //     value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}
                                //     disabled={true}
                                />
                                <CheckIcon onClick={addNewCategory} color="success" className='pointer' />
                                {/* <ClearIcon sx={{ color: pink[500] }} className='pointer' type="reset" defaultValue="Reset" /> */}
                            </div>
                        </CCol>&nbsp;&nbsp;



                        <CCol md={3} >

                        <label style={{ marginTop: "" }} > <b>Add Variety</b><span style={{ color: "red" }}>*</span></label>
                          <div className="mt-2">
                              <span><img src={Plus} />
                              </span>
                              <Input inputProps={ariaLabel}
                                  // margin="200px"
                                  type="text"
                                  // labelName="Add New Category"
                                  name="itemId"
                                    style={{
                                        width: "11vw",
                                        height: "35px",
                                    }}
                                    onChange={(e) => {
                                      const selectedTimeSlotId = e.currentTarget.value;
                                      console.log('fffff', selectedTimeSlotId)
                                      // const timeSlotById =variety.find(
                                      //   (item) => item === selectedTimeSlotId
                                      // );
                                      // console.log('time slot by id', timeSlotById)
                                      setVariety(selectedTimeSlotId);
                                    }}
                                      
                                  //    onChange={onChangeHandler('itemId')}
                                  placeholder="Add Variety"
                                  maxlength="50" minLength="2" pattern="[a-zA-Z][a-zA-Z0-9\s]*"
                                  autoComplete="off"
                              //     required={true}
                              //     value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}
                              //     disabled={true}
                              />
                              <CheckIcon color="success" className='pointer' onClick={() => handleAddItem()}/>
                {/* <ClearIcon sx={{ color: pink[500] }} className='pointer' type="reset" defaultValue="Reset" /> */}
                          </div>

            </CCol>


            <div className="col-md-9 d-flex justify-content-end  p-0">
            <div>
            
              
            
             {/* { formData?.variety?.map((list1, index) => <li key={index}>
              
              <div>
                <Stack flexDirection="row" spacing={3}>
                  <Chip
                      label={list1}
                       onDelete={(e) => handleDelete(index)}
                       
                  />
                </Stack>
                
              </div>
              
              
            </li>)}  */}
              
             
            
                
                
              
              
            </div>
          
        
          
            { list.map((item, index) => <li key={index}>
              
              <div>
                <Stack flexDirection="row" spacing={3}>
                  <Chip
                      label={item}
                       onDelete={(e) => handleDelete(index)}
                  />
                </Stack>
                </div>     
            </li>)}
          
        </div>

          </CRow>
        </div>

        <br />
      </form>
      {/* <div class="form-group  col-lg-3 ml-n3 col-md-10 col-xl-3 mt-4 " >
        <span><img src={Plus} />
        </span>
        <span className="pl-1 new-item" onClick={ToggleButton}>Add New Item</span>
      </div> */}

      <div className="row " >
        <div className="col-md-6  d-flex align-items-center">



        </div>

        <div className="col-md-6 d-flex justify-content-end  p-0">


          <div>
            <Button
               className="btn add-price-cancel-btn px-4" onClick={() => updateNonFnVDetails()} size="medium" style={{ outlineColor: "#3484F0", backgroundColor: "#5078F2" }}>Save</Button>
          </div>
          &nbsp;&nbsp;&nbsp;
          <Button variant="outlined" className="btn add-price-cancel-btn px-4 ml-2 " style={{ marginRight: "25px" }} onClick={goPrev} size="medium" backgroundColor="#5078F2">
            cancel
          </Button>
        </div>
      </div>
    </div>

  );
  <ToastContainer transition={Zoom} />

}

const mapStateToProps = state => {

  return {
  
     // bmManagementData: state.bmManagement.BmManagementData,
  
     userDetails: state.login,
  
     error: state.bmManagement.error,
  
  
  
  
  };
  
  };
  
  
  
  const mapDispatchToProps = dispatch => {
  
  return {
  
     actions: bindActionCreators(
  
         {
  
             // getAllBmManagement: actions.getAllBmManagement,
  
  
  
             // addNewUser: actions.addNewUser,
  
             // updateUser: actions.updateUser,
  
             // getLocations: actions.getAllLocation,
  
             // getMarketLocation: actions.getAllMarketLocation,
  
             // getTimeSlotMarkets: actions.getAllTimeslotsMarket,
  
             // getLogin: actions.signInUser,
  
             getCategory: actions.getAllNFnvCategory,
  
  
  
         },
  
         dispatch,
  
     ),
  
  };
  
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditNfnvItem);
  
