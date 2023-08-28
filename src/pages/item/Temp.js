import React, { useEffect, useState } from "react";
import {
  Paper,
  Button,
  ButtonBase,
  FormControl,
  Checkbox,
  Icon,
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
import { InputControl } from './../../utils/FormControls';
import { ToggleButton } from '@mui/material';
import Input from '@mui/material/Input';
import Plus from "./plus.svg";
import { getAllFnvCategory } from './../../redux/fnvcategory/fnvcategoryAction';
import { margin } from '@mui/system';
// import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { CToast, CToastBody, CToastClose } from '@coreui/react'
import { pink } from "@mui/material/colors";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { configuration } from "../../services/appConfig";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
    
  },
}));

const ariaLabel = { "aria-label": "description" };

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);

//  const usertoken = userDetails.token;

// const type = userDetails && userDetails.userType;

function EditItem(props) {
  const { importedData, formData, itemData } = props;
  console.log("form data", formData);

  const classes = useStyles();

  const [name, setName] = useState(""); // null
  console.log("name", name);
  const [records, setRecords] = useState([]);

  const [items, setItems] = useState([{ label: "Select Location", value: "" }]);
  const [list, updateList] = useState(name);

  const [value, setValue] = useState(items[0].value);

  const [anchorEl, setAnchorE1] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [UoM, setUOM] = useState("");
  const [baseQuantity, setBasequantity] = useState("");
  const [category1, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [data, setData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null)
  const [UoM, setUoM] = useState("");
  console.log("uom", UoM);

  useEffect(() => {
    props.actions.getCategory(value).then((res) => {
      console.log("category", res);
      setRecords(res);
      // const marketarray = res.find(ele => ele._id)

      // setValue(value);
      // setMarkets(res);
      // setselectedMarketList([]);
    });
  }, []);

  const handleCategoryChange = (value) => {
    console.log("gggggggg", value);

    props.actions.getCategory(value).then((res) => {
      setCategory(value);
    });
  };

 /////Form submit for Edit/////////////////////

  const submitFormUpdate = () => {
    ///validation for form submit/////

    // if (UoM == "" || UoM == undefined || UoM == null) {
    //   {
    //     toast.warn("select UOM ", {
    //       theme: "colored",
    //     });
    //   }
    //   return;
    // }

    if (
      selectedFile == "" ||
      selectedFile == undefined ||
      selectedFile == null
    ) {
      {
        toast.warn("select Image ", {
          theme: "colored",
        });
      }
      return;
    }

    // if (category123 == "" || category123 == undefined || category123 == null) {
    //   {
    //     toast.warn("select category ", {
    //       theme: "colored",
    //     });
    //   }
    //   return;
    // }

    // if (
    //   material_number == "" ||
    //   material_number == undefined ||
    //   material_number == null
    // ) {
    //   {
    //     toast.warn("select Item ", {
    //       theme: "colored",
    //     });
    //   }
    //   return;
    // }

    // if (itemId == "" || itemId == undefined || itemId == null) {
    //   alert("Select a Item");
    //   return;
    // }

    //  alert(name123);
    // alert(category123);
    // const categorydata = category123
    //   ? category123
    //   : name123
    //   ? name123.toUpperCase()
    //   : "";
    // console.log('catdata', categorydata);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmYyZjdlN2E3NDJiN2IyYzc4NzQ3ZjdlNzg3ZDc5N2Q3NTI5MmUyZTc4MmYiLCJpYXQiOjE2NDA4NDU5OTUsImV4cCI6MTY0MTQ1MDc5NX0.KF7LhxiJ_cx4WGMxAn7Ggd2FNnJvkYQMGrcRljrRGyo'
    //    const validated = checkValidation();
    //    if (validated) {
    let updateFormData = new FormData();
    updateFormData.append("image", selectedFile);
    console.log(selectedFile);
    
    axios
      .patch(`${configuration.apiBaseUrl}/item/` + formData._id, updateFormData)
      .then((res) => {
        if (res.status === 201) {
          toast.success("FnV Items master details added successfully !!", {
            theme: "colored",
          });
          window.location.reload();
        } else if (res.status === 503) {
          toast.warn("Please fill all the Fields", { theme: "colored" });
        } else if (res.status === 404) {
          toast.warn(
            " Please fill all the Fields or Item Name already exist ",
            {
              theme: "colored",
            }
          );
        } else if (res.status === 400) {
          toast.warn("Please fill all the Fields ", { theme: "colored" });
        }

        //  else if (res.status === 503) {
        //   toast.warn("Please fill all the Fields", { theme: "colored" });
        // } else if (res.status === 404) {
        //   toast.warn(" Please fill all the Fields or Item Name already exist ", {
        //     theme: "colored",
        //   });
        // } else if (res.status === 400) {
        //   toast.warn("Please fill all the Fields ", { theme: "colored" });
        // }
        // alert("File Upload success");
      })
      .catch((err) => {
        toast.warn("Error ", {
          theme: "colored",
        });
      });
  };


  const updatefinalItemMasterDetails = () => {
    const id = formData._id;

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmYyZjdlN2E3NDJiN2IyYzc4NzQ3ZjdlNzg3ZDc5N2Q3NTI5MmUyZTc4MmYiLCJpYXQiOjE2NDA4NDU5OTUsImV4cCI6MTY0MTQ1MDc5NX0.KF7LhxiJ_cx4WGMxAn7Ggd2FNnJvkYQMGrcRljrRGyo'
    const validated = checkValidation();

    //  if (validated) {
    fetch(`${configuration.apiBaseUrl}/item/` + id, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",

        Authorization: userDetails.token,
      },

      body: JSON.stringify({
        category: category1
          ? category1
          : name?.toUpperCase()
          ? name?.toUpperCase()
          : formData.category._id,

        UoM: UoM ? UoM : formData.UoM,
        updatedBy: userDetails._id,
      }),
    })
      .then((res) => {
        res.json();

        if (res.status === 201) {
          toast.success("FnV Items master details updated successfully ", {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          window.location.reload();

          // <CToast autohide={false} visible={true} color="primary" className="text-white align-items-center">

          //   <div className="d-flex">

          //     <CToastBody>Hello, world! This is a toast message.</CToastBody>

          //     <CToastClose className="me-2 m-auto" white />

          //   </div>

          // </CToast>

          //  window.location.reload()
        } else if (res.status === 503) {
          toast.warn("Please edit UoM or category first to proceed");
        } else if (res.status === 404) {
          toast.warn("Category already exist. Please Choose from dropdown");
        } else if (res.status === 400) {
          toast.warn("Category name is not allowed to be empty ");
        }
      })

      .then((result) => setData(result.rows))

      .catch((err) => console.log("error"));
    // }
  };

  const goPrev = (event) => {
    window.location.reload();
  };

  const addNewCategory = () => {
    //  const validated = checkValidation();

    fetch(`${configuration.apiBaseUrl}/fnv/category`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: userDetails.token,
      },

      body: JSON.stringify({
        // itemName,

        // baseQuantity,

        // UoM: formData.UoM,

        name: name.toUpperCase(),

        categoryType: "fnv",

        updatedBy: userDetails._id,
      }),
    })
      .then((res) => {
        res.json();

        console.log("hhhhh", res.message);

        if (res.status === 201) {
          toast.success(
            "New Category is Added. Choose new Added Category from the dropdown list ",
            {
              position: "top-right",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
            
          );
          // window.location.reload();
          // <CToast autohide={false} visible={true} color="primary" className="text-white align-items-center">

          //   <div className="d-flex">

          //     <CToastBody>Hello, world! This is a toast message.</CToastBody>

          //     <CToastClose className="me-2 m-auto" white />

          //   </div>

          // </CToast>

         
        } else if (res.status === 404) {
          toast.warn("Category Already Available");
        }

        //  window.location.reload()
      })

      .then((result) => setData(result.rows))

      .catch((err) => console.log("error"));

    // alert('Now select Category from list.')

    // window.location.reload()
  };

  const checkValidation = () => {
    if ("") {
      return true;
    }

    // else if ( UoM?.length === 0){
    //     alert('Please edit UoM to proceed')
    //    return false

    // }
    // else if ( category1?.length === 0){
    //  alert('Please edit category to proceed')
    //  return false

    // }
  };

  return (
    <div>
      <form className="borders">
        <div>
          <div className="row gy-2 gx-3 align-items-center ml-10">
            <CRow
              className="g-4  col-md-12 d-flex justify-content-center"
              xs="auto"
            >
              <CCol md={3}>
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

              <CCol md={3}>
                <InputControl
                  type="text"
                  labelName="Item Code"
                  name="itemId"
                  //    onChange={onChangeHandler('itemId')}

                  placeholder="Item Code"
                  value={formData.material_no}
                  required={true}
                  disabled={true}
                />
              </CCol>

              {/* <CCol md={3} >

             <InputControl

               type="text"

               labelName="UoM"

               name="itemId"

               //    onChange={onChangeHandler('itemId')}

               placeholder="UoM"

               //       value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}

               required={true}

             // disabled={true}

             />

           </CCol> */}

              {/* <label >Select Category</label> */}
              {/* 
              <CCol md={3}>
                <label>
                  {" "}
                  <b>Select UoM</b>
                  <span style={{ color: "red" }}>*</span>
                </label>

                <select
                  className="mb-3 px-3"
                  labelName="UoM"
                  style={{
                    width: "22vw",

                    height: "35px",

                    borderRadius: "5px",
                  }}
                  onChange={(e) => setUoM(e.currentTarget.value)}
                  type="text"
                 

                  required
                >
                  <option value="defaultValue" selected>
                    {formData.UoM}
                  </option>

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

            <CRow
              className="g-2 col-md-12 d-flex justify-content-center"
              xs="auto"
            >
              {/* <CCol md={4}>
                <div>
                  <label style={{ marginTop: "1vh" }}>
                    {" "}
                    <b>Select Category</b>
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  <select
                    //   style={{ width: '500px', height: '50px', borderRadius: '5px' }}

                    style={{
                      width: "25vw",

                      height: "35px",

                      borderRadius: "5px",
                    }}
                    onChange={(e) =>
                      handleCategoryChange(e.currentTarget.value)
                    }
                  >
                    <option defaultValue="defaultValue1">
                      {formData.category?.name || name}{" "}
                    </option>

                    <option value="">{name}</option>

                    {records?.length > 0 &&
                      records?.map(({ name, _id }) => (
                        <option value={_id}>{name}</option>
                      ))}
                  </select>
                </div>
              </CCol> */}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <CCol sm={4} className="mt-auto">
                {/* <label style={{ marginTop: "1vh" }} > <b>Upload Image</b></label>



             <input

               id="imageUrl"

               labelName="Upload Image"

               type="file"

               class="form-control"

               placeholder="Image Url"

               name="imageUrl"

               onChange={(event) => setImageUrl(event.target.value)}

             /> */}

                {/* <label style={{ marginTop: "1vh" }}>
                  {" "}
                  <b> &nbsp;&nbsp; Add New Category</b>
                </label> */}

                <div className="mt-2">
                  {/* <span>
                    <img src={Plus} />
                  </span> */}
                  &nbsp;
                  {/* <Input
                    inputProps={ariaLabel}
                    margin="200px"
                    type="text"
                    // labelName="Add New Category"

                    name="itemId"
                    onChange={(e) => setName(e.currentTarget.value)}
                    //    onChange={onChangeHandler('itemId')}

                    placeholder="Add New Category"
                    required={true}

                    //       value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}

                    // disabled={true}
                  /> */}
                  {/* <CheckIcon
                    onClick={addNewCategory}
                    color="success"
                    className="pointer"
                  /> */}
                  {/* <ClearIcon sx={{ color: pink[500] }} className='pointer' type="reset" defaultValue="Reset" /> */}
                </div>
              </CCol>

       
              
            </CRow>


            <CRow
              className="g-4  col-md-12 d-flex justify-content-center"
              xs="auto"
            >

            <CCol sm={3} className="mt-auto">
                <label style={{ marginTop: "1vh" }}>
                  {" "}
                  <b>Upload Image</b>
                </label>
                <input
                  id="imageUrl"
                  labelName="Upload Image"
                  type="file"
                  class="form-control"
                  placeholder="Image Url"
                  name="imageUrl"
                  onChange={(event) => setSelectedFile(event.target.files[0])}
                />

                <label style={{ marginTop: "1vh" }}>
                  {" "}
                  {/* <b> &nbsp;&nbsp; Add New Category</b> */}
                </label>
              </CCol>
              </CRow>

            {/* <div className="g-4  col-md-12 d-flex justify-content-center" onClick={ToggleButton}>

                     <span><img src={Plus} />

                         Add New Category</span> */}

            {/* <Input placeholder="Placeholder" inputProps={ariaLabel} /> */}

            {/* </div> */}

            <div></div>
          </div>
        </div>

        <br />
      </form>

      {/* <div class="form-group  col-lg-3 ml-n3 col-md-10 col-xl-3 mt-4 " >

     <span><img src={Plus} />

     </span>

     <span className="pl-1 new-item" onClick={ToggleButton}>Add New Item</span>

   </div> */}

      <div className="row ">
        <div className="col-md-4  d-flex align-items-center"></div>

        <div className="col-md-4 d-flex justify-content-end  p-0" style={{marginLeft: "450px"}}>
          <div>
            <Button
              type="submit"
              className="btn add-price-cancel-btn px-4"
              onClick={submitFormUpdate}
              size="medium"
              style={{ outlineColor: "#3484F0", backgroundColor: "#5078F2" }}
            >
              Save
            </Button>
          </div>
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="outlined"
            className="btn add-price-cancel-btn px-4 ml-2 "
            style={{ marginRight: "25px" }}
            onClick={goPrev}
            size="medium"
            backgroundColor="#5078F2"
          >
            cancel
          </Button>
        </div>
      </div>
      <ToastContainer transition={Zoom} theme="colored" />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // bmManagementData: state.bmManagement.BmManagementData,

    userDetails: state.login,

    error: state.bmManagement.error,
  };
};

const mapDispatchToProps = (dispatch) => {
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

        getCategory: actions.getAllFnvCategory,
      },

      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
