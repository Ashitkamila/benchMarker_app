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
} from "@coreui/react";
import * as actions from "../../redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
// import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
import "./style.css";
import { InputControl } from "./../../utils/FormControls";
import { ToggleButton } from "@mui/material";
import Input from "@mui/material/Input";
import Plus from "./plus.svg";
import { getAllFnvCategory } from "./../../redux/fnvcategory/fnvcategoryAction";
import { margin } from "@mui/system";
// import '@coreui/coreui/dist/css/coreui.min.css'
import "bootstrap/dist/css/bootstrap.min.css";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { CToast, CToastBody, CToastClose } from "@coreui/react";
import { pink } from "@mui/material/colors";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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
  const [UoM, setUoM] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadImg, setUploadImg] = useState(false);
  const [removeImg, setRemoveImg] = useState(false);
  const [preview, setPreview] = useState();
  const [onBlurImageInput, setOnBlurImageInput] = useState(false);
  const [inputvalue, setInputValue] = useState("");
  const [btn,setBtn]= useState()
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

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  const btnHandler=()=>{
if (formData.imageUrl || selectedFile) {
  setBtn(false)
}


  }

  const removeImageHandler = () => {
    // setSelectedFile(null);
    setRemoveImg(true)
    setUploadImg(false);
    // toast.success("Image Removed", { theme: "colored" });



      // .then((result) => setData(result.rows))

      
    







    
  };

  const updateImageHandler = (event) => {
    setUploadImg(true);
    setSelectedFile(event.target.files[0]);
  };



  ////new logic update image///
    useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    console.log(objectUrl,"url")

    
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  

  const onFileSelected = (event) => {

    // setOnBlurImageInput(true);
    setInputValue(event.target.value)
    
    console.log("event123",event.target.value);
    if(event.target.value){
      setOnBlurImageInput(true);
      let ext = getExtension(event.target.value).toLowerCase();
      let extAllowed = ["jpg", "jpeg", "png"];
      console.log("check is", extAllowed)
      // const noFile = event.target.value.trim() === '';
      if (extAllowed.findIndex((ex) => ex == ext) < 0) {
        toast.warn("select Png or JPEG Image only ", {
          theme: "colored",
        });
              return;
      }
      setSelectedFile(event.target.files[0]);
      setUploadImg(true)
    } else {
      setOnBlurImageInput(false);
    }

   
  };


  /////////////////////////////////////////

  /////Form submit for Edit/////////////////////
  console.log("userID", userDetails._id);

  const submitFormUpdate = () => {
   


      console.log("file is", selectedFile);
   

      if  (inputvalue) {
        if (!selectedFile) {
          toast.warn("select Png or JPEG Image only...  ", {
            theme: "colored",
          });
          return;
        } else {
          let ext = getExtension(selectedFile["name"]).toLowerCase();
          let extAllowed = ["jpg", "jpeg", "png"];
          if (extAllowed.findIndex((ex) => ex == ext) < 0) {
            toast.warn("select Png or JPEG Image only!!!  ", {
              theme: "colored",
            });
    
            return;
          }
        }
      }

    let updateFormData = new FormData();
    updateFormData.append("image", selectedFile);
    updateFormData.append("UoM", UoM ? UoM : formData.UoM);
    updateFormData.append("updatedBy", userDetails._id);
    updateFormData.append(
      "category",
      category1
        ? category1
        : name?.toUpperCase()
        ? name?.toUpperCase()
        : formData.category._id
    );

    console.log(selectedFile);
    console.log("formdata is", formData);

    axios
      .patch(
        `${configuration.apiBaseUrl}/item/` + formData._id,
        updateFormData
      )
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

      
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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


      ////calling API for Remove Image///


// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmYyZjdlN2E3NDJiN2IyYzc4NzQ3ZjdlNzg3ZDc5N2Q3NTI5MmUyZTc4MmYiLCJpYXQiOjE2NDA4NDU5OTUsImV4cCI6MTY0MTQ1MDc5NX0.KF7LhxiJ_cx4WGMxAn7Ggd2FNnJvkYQMGrcRljrRGyo'

console.log("checking api...")

if (removeImg){

fetch(`${configuration.apiBaseUrl}/item/` + id, {
  method: "PATCH",

  headers: {
    "Content-Type": "application/json",

    Authorization: userDetails.token,
  },

  body: JSON.stringify({
    image: null
  }),
})
  .then((res) => {
    res.json();

  
  }).catch((err) => console.log("error",{err}));
  
  }
}

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

             
             

            
            </CRow>

            <div className="row gy-2 gx-3 align-items-center ml-10">
              <CRow
                className=" col-md-12 d-flex justify-content-center"
                xs="auto"
              >
                <CCol md={3}>
                  {/* <label>
                  {" "}
                  <b>Select UoM</b>
                  <span style={{ color: "red" }}>*</span>
                </label> */}

                  <label style={{ marginTop: "3vh", marginLeft: "12px" }}>
                    {" "}
                    <b>Select UoM</b>
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  <select
                    required
                    className="text"
                    labelName="UoM"
                    // style={{
                    //   width: "15vw",
                    //   height: "35px",
                    //   borderRadius: "5px",
                    // }}
                    style={{
                      width: "250px",

                      height: "40px",

                      borderRadius: "5px",
                      marginLeft: "12px",
                    }}
                    onChange={(e) => setUoM(e.currentTarget.value)}
                    type="text"
                    defaultValue={formData.UoM}
                  >
                    <option value="">Select UoM</option>

                    <option value="KG">KG</option>
                    <option value="EA">EA</option>
                    <option value="PAK">PAK</option>
                  </select>
                </CCol>
                <CCol md={3}>
                  <div>
                    <label style={{ marginTop: "3vh", marginLeft: "16px" }}>
                      {" "}
                      <b>Select Category</b>
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <select
                      //   style={{ width: '500px', height: '50px', borderRadius: '5px' }}

                      style={{
                        width: "300px",

                        height: "40px",

                        borderRadius: "5px",
                        marginLeft: "16px",
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
                </CCol>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </CRow>
            </div>

            <div className="row gy-2 gx-3 align-items-center ml-10">
              <CRow
                className=" col-md-12 d-flex justify-content-center"
                xs="auto"
              >
                <CCol sm={4} className="mt-auto">
                  <label style={{ marginTop: "3vh", marginLeft: "110px" }}>
                    {" "}
                    <b> &nbsp;&nbsp; Add New Category</b>
                  </label>

                  <div className="mt-2" style={{ marginLeft: "110px" }}>
                    <span>
                      <img src={Plus} />
                    </span>
                    &nbsp;
                    <Input
                      inputProps={ariaLabel}
                      margin="200px"
                      type="text"
                      // labelName="Add New Category"

                      name="itemId"
                      onChange={(e) => setName(e.currentTarget.value)}
                      //    onChange={onChangeHandler('itemId')}

                      placeholder="Add New Category"
                      required={true}

                    
                    />
                    <CheckIcon
                      onClick={addNewCategory}
                      color="success"
                      className="pointer"
                    />
                    {/* <ClearIcon sx={{ color: pink[500] }} className='pointer' type="reset" defaultValue="Reset" /> */}
                  </div>
                </CCol>

                <CCol sm={4} className="mt-auto">
                  <label style={{ marginTop: "3vh", marginLeft: "8px" }}>
                    {" "}
                    <b>Upload new Image</b>
                  </label>
                  <input
                    style={{ width: "300px", marginLeft: "8px" }}
                    id="imageUrl"
                    labelName="Upload Image"
                    type="file"
                    class="form-control"
                    placeholder="Image Url"
                    name="image"
                    onChange={(event) => onFileSelected(event)}
                  />
                </CCol>
              </CRow>
            </div>

            <div className="row gy-2 gx-3 align-items-center ml-10">
              <CRow
                className=" col-md-12 d-flex justify-content-center"
                xs="auto"
              >
                <CCol md={3}>
                

                  <label style={{ marginTop: "3vh", marginLeft: "12px" }}>
                    {" "}
                    <b>Image Status</b>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />

               



                  {!(uploadImg || removeImg) ? (
                    <img
                    src={formData.imageUrl}
                    alt="waycool"
                    width="100"
                    height="100"
                    style={{ marginTop: "1vh", marginLeft: "20px" }}
                  />
                    
                  ) : uploadImg ? (
                    <img
                      src={preview}
                      alt="waycool"
                      width="100"
                      height="100"
                      style={{ marginTop: "1vh", marginLeft: "20px" }}
                    />
                    
                  ) : (
                    <span style={{marginLeft:"10px",color: "red", marginTop:"5vh"}}>No Image Selected</span>
                    
                  )}
                </CCol>
                <CCol md={3}>
                  <div>
                    <label style={{ marginTop: "3vh", marginLeft: "16px" }}>
                      {" "}
                      <b>Remove Image</b>
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <div>
                     
                      <Button
                        // type="submit"
                        className="btn add-price-cancel-btn px-4"
                        onClick={removeImageHandler}
                        size="medium"
                        disabled={!(formData.imageUrl|| selectedFile)}


                        style={{
                          outlineColor: "#3484F0",
                          backgroundColor: "#5078F2",
                          marginLeft: "10px",
                          marginTop: "3vh",
                          
                       
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  </div>
                </CCol>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </CRow>
            </div>

          
          </div>
        </div>

        <br />
      </form>

    

      <div className="row ">
        <div className="col-md-6  d-flex align-items-center"></div>

        <div className="col-md-6 d-flex justify-content-end  p-0">
          <div>
            <Button
              type="submit"
              className="btn add-price-cancel-btn px-4"
              // onClick={submitFormUpdate}
              onClick={() => 
                onBlurImageInput || selectedFile || inputvalue
                ?submitFormUpdate(): updatefinalItemMasterDetails()}
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
      {/* <ToastContainer transition={Zoom} theme="colored" /> */}
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
