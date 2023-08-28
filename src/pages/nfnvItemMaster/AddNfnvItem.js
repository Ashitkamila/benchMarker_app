import { Paper, Button, ButtonBase, formData } from '@material-ui/core';
import { Space } from 'antd';
import React, { useEffect, useState } from 'react'
// import { InputControl } from '../../utils/FormControls';
import { InputControl } from '../../utils/FormControls';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { pink } from '@mui/material/colors';
import Plus from "./plus.svg";
// import Select from "react-select";
import {
    CButton,
    CButtonGroup,
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

import TextField from '@mui/material/TextField';
import { textAlign, margin } from '@mui/system';
import { bottomNavigationActionClasses, ToggleButton } from '@mui/material';
import Input from '@mui/material/Input';
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import * as actions from "../../redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configuration } from '../../services/appConfig';

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);


function AddNfnvItem(props) {

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const ariaLabel = { 'aria-label': 'description' };
    const [records, setRecords] = useState([]);
    const [categoryrecords, setCategoryRecords] = useState([]);
    const [name123, setName123] = useState("");
    console.log('name 123', name123);
    const [material_desc, setMaterial_desc] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemId, setItemId] = useState("");
    const [variety, setVariety] = useState("");
    const [list, setList] = useState([]);
    const[createdBy,setCreatedBy] = useState("");

    const [material_number, setMaterialno] = useState();
    const [category123, setCategory123] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [UoM, setUoM] = useState();

    const goPrev = (event) => {
        window.location.reload();      
    };



    useEffect(() => {

        props.actions.getItem().then(
            (res) => {

  console.log('oiuytre',res);
                setRecords(res)
                // const marketarray = res.find(ele => ele._id)

                // setValue(value);
                // setMarkets(res);
                // setselectedMarketList([]);


            }

        )
        props.actions.getCategory().then(
            (res) => {

                setCategoryRecords(res)
                // const marketarray = res.find(ele => ele._id)

                // setValue(value);
                // setMarkets(res);
                // setselectedMarketList([]);


            }

        )



    }, []);

    const handleFNVNameChange = (value, e) => {
        // console.log('gggggggg', value)


        const id = value;
        console.log(id,"id")
        const result=records.filter(item=>item._id===id)
        console.log(result.material_no,"result")
        setItemId(result[0].material_no)
        setItemName(result[0].itemName)
        //  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'
        let initProducts = async () => {
            await fetch(`${configuration.apiBaseUrl}/nfnv/itemCode?itemId=` + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: userDetails.token,
                },


            })
                .then(response => response.json())
                .then((response) => {
                  console.log(response,"response")
                    // setItemId(response.data[0].material_no);
                    setMaterial_desc(response.data[0].material_desc);
                    // setItemName(response.data[0].itemName);
                    setVariety(response.data[0].variety);
                    setCreatedBy(response.data[0].createdBy);



                })
                //   .then((result) => setData(result.rows))
                .catch((err) => console.log("error"));
        }
        initProducts();



    }

    const handleCategoryChange = (value) => {

        props.actions.getCategory(value).then(
            (res) => {
                setCategory123(value);
            }
        )
    }
    const updatefinalItemMasterDetails = () => {
        //  alert(name123);
        // alert(category123);
        const categorydata = category123 ? category123 : name123 ? name123.toUpperCase() : ""
        console.log('catdata', categorydata);
        //  const updatedlist = [""] ? [""] : list ? list: [""];
        // console.log('updated list', updatedlist);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmYyZjdlN2E3NDJiN2IyYzc4NzQ3ZjdlNzg3ZDc5N2Q3NTI5MmUyZTc4MmYiLCJpYXQiOjE2NDA4NDU5OTUsImV4cCI6MTY0MTQ1MDc5NX0.KF7LhxiJ_cx4WGMxAn7Ggd2FNnJvkYQMGrcRljrRGyo'
           const validated = checkValidation();
           if (validated) { 
        fetch(`${configuration.apiBaseUrl}/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: userDetails.token,
            },
            body: JSON.stringify({
                itemName: itemName,
                material_no: itemId,
                itemType: "nfnv",
                category: categorydata,
                UoM,
                active: "true",
                mandatory: "true",
                baseQuantity: "1",
                page: '2',
                conversionFactor: "10",
                shortName: null,
                description: null,
                weightGrams: 0,
                appliesOnline: 1,
                itemProductType: 1,
                itemTaxType: "N",
                manufacturer: "NA",
                length: 0,
                breadth: 0,
                height: 0,
                weight: 0,
                shelf: "0",
                box: "0",
                rack: "",
                foodType: 1,
                taxId: 5001,
                decimalsAllowed: 3,
                status: "R",
                variety : list ,
                createdBy: userDetails._id,


                activeOnLocations: [
                    {
                        "locationId": "5d9d9bb30f960110e027e2eb",
                        "active": true,
                        "mandatory": true
                    },
                    {
                        "locationId": "5e0f02ec310f95592258a499",
                        "active": true,
                        "mandatory": true
                    },
                    {
                        "locationId": "5e37c491ab3db43e546bf924",
                        "active": true,
                        "mandatory": true
                    },
                    {
                        "locationId": "5e37c3bf175f213e4ed9aacd",
                        "active": true,
                        "mandatory": true
                    },
                    {
                        "locationId": "5e37c499657c4e3e62d62e96",
                        "active": true,
                        "mandatory": true
                    },
                    {
                        "locationId": "5e37c3b64079403e77392e99",
                        "active": true,
                        "mandatory": true
                    },
                    {
                        "locationId": "5e37c3d2704d663e69cf4214",
                        "active": true,
                        "mandatory": true
                    },
                    {
                        "locationId": "5e37c3ca9d316a3e5b76218b",
                        "active": true,
                        "mandatory": true
                    }
                ],

            }),
        })
            .then((res) => {
                res.json()
                if (res.status === 201) {

                    toast.success('NFnV Items master details added successfully', { theme: "colored" });
                    window.location.reload();


                    // <CToast autohide={false} visible={true} color="primary" className="text-white align-items-center">

                    //   <div className="d-flex">

                    //     <CToastBody>Hello, world! This is a toast message.</CToastBody>

                    //     <CToastClose className="me-2 m-auto" white />

                    //   </div>

                    // </CToast>



                    //  window.location.reload()
                }
                
                else if (res.status === 503) {

                    toast.error("Please fill all the Fields", { theme: "colored" })



                }


                else if (res.status === 404) {

                    toast.info(" Please fill all the Fields or Item Name already exist ", { theme: "colored" })



                }

                else if (res.status === 400) {

                    toast.error("Please fill all the Fields", { theme: "colored" }
                    )



                }

            })
        //    .then((result) => setData(result.rows))
        //    .catch((err) => console.log('error'))
         }    
    };

    const addNewCategory = () => {

        // const validated = checkValidation();

        // if (validated) {
            fetch(`${configuration.apiBaseUrl}/nfnv/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: userDetails.token,
                },
                body: JSON.stringify({
                    // itemName,
                    // baseQuantity,
                    // UoM: formData.UoM,
                    name: name123.toUpperCase(),
                  categoryType: "nfnv",
                //  variety: [""],

                }),
            })
                .then((res) => {
                    res.json();
                  
                    if (res.status === 201) {
                        toast.success('Added Successfully!!', { theme: "colored" });

                        // <CToast autohide={false} visible={true} color="primary" className="text-white align-items-center">
                        //   <div className="d-flex">
                        //     <CToastBody>Hello, world! This is a toast message.</CToastBody>
                        //     <CToastClose className="me-2 m-auto" white />
                        //   </div>
                        // </CToast>

                        //  window.location.reload()
                    }
                    else if (res.status === 404) {

                        toast.info(" Please fill all the Fields or Item Name already exist ")



                    }

                    else if (res.status === 400) {

                        toast.error("Please fill all the Fields", { theme: "colored" })



                    }
                    else if (res.status === 503) {

                        toast.info("Please Enter category name to add category", { theme: "colored" })



                    }
                    //  window.location.reload()
                })
                // .then((result) => setData(result.rows))
                .catch((err) => console.log('error'))

        // }
        // else {
        //     alert('Please add the Category name first to proceed')
        // }
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
            toast.warn('Please add variety first to proceed', { theme: "colored" })
        }
        
    };

    const handleDelete = (deletedIndex) => {
        setList(list.filter((item, index) => index !== deletedIndex));
        toast.success('Variety is removed successfully', { theme: "colored" })
    };


    const checkValidation = () => {
        if (variety?.length > 0) {
            return true
        }
        else {
            toast.warn('Please fill all the Fields', { theme: "colored" })
            return false
        }
    }





    return (
      <div>
        <form className="borders">
          <div>
            {/* <div class="btn-group mt-2 ml-2" role="group" aria-label="Basic example" > &nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-primary" style={{ width: "102px", height: "34px", textAlign: "center" }}>Manual</button>
                        <button type="button" class="btn btn-secondary" style={{ width: "102px", height: "34px" }}>Upload</button>
                    </div> */}
            &nbsp; &nbsp; &nbsp;{" "}
            <CButtonGroup role="group" aria-label="Basic example">
              <CButton color="primary">Manual</CButton>
              <CButton color="secondary">Upload</CButton>
              {/* <CButton color="primary">Right</CButton> */}
            </CButtonGroup>
            <div className="row gy-2 gx-3 align-items-center ml-10">
              <CRow
                className="g-4  col-md-12 d-flex justify-content-center"
                xs="auto"
              >
                <CCol md={4}>
                  <div>
                    <label style={{ marginTop: "" }}>
                      {" "}
                      <b>Item Name</b>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      required
                      //   style={{ width: '500px', height: '50px', borderRadius: '5px' }}

                      style={{
                        width: "21vw",

                        height: "35px",

                        borderRadius: "5px",
                      }}
                      onChange={(e) =>
                        handleFNVNameChange(e.currentTarget.value)
                      }
                    >
                      <option value="">Select Item Name</option>

                      {records?.length > 0 &&
                        records?.map(
                          ({ material_desc, itemName, _id , material_type }) => (
                            <option value={_id}>
                              {material_desc ? material_desc : itemName}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </CCol>
                <CCol md={3}>
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
                    value={itemId}
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
                &nbsp;&nbsp;&nbsp;
                <CCol md={3}>
                  <label>
                    {" "}
                    <b>Select UoM</b>
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  <select
                    required
                    className="mb-3 px-3"
                    labelName="UoM"
                    style={{
                      width: "22vw",
                      height: "35px",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setUoM(e.currentTarget.value)}
                    type="text"

                  >
                    <option value="">Select UoM</option>

                    <option value="KG">KG</option>
                    <option value="EA">EA</option>
                    <option value="PAK">PAK</option>
                  </select>
                </CCol>
              </CRow>
              <CRow
                className="g-4 col-md-12 d-flex justify-content-center"
                xs="auto"
              >
                <CCol md={4}>
                  <div>
                    <label style={{ marginTop: "1vh" }}>
                      {" "}
                      <b>Select Category</b>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      required
                      //   style={{ width: '500px', height: '50px', borderRadius: '5px' }}

                      style={{
                        width: "21vw",

                        height: "35px",

                        borderRadius: "5px",
                      }}
                      onChange={(e) =>
                        handleCategoryChange(e.currentTarget.value)
                      }
                    >
                      <option value="">{name123}</option>

                      {categoryrecords?.length > 0 &&
                        categoryrecords?.map(({ name, _id }) => (
                          <option value={_id}>{name}</option>
                        ))}
                    </select>
                  </div>
                </CCol>

                <CCol md={3} className="mt-auto">
                

                  <label style={{ marginTop: "0vh" }}>
                    {" "}
                    <b> &nbsp;&nbsp; Add New Category</b>
                  </label>

                  <div className="mt-2">
                    <span>
                      <img src={Plus} alt="plus"/>
                    </span>
                    &nbsp;
                    <Input
                      inputProps={ariaLabel}
                      margin="0px"
                      type="text"
                      style={{
                        width: "11vw",
                        height: "35px",
                      }}
                      // labelName="Add New Category"
                      name="itemId"
                      onChange={(e) => setName123(e.currentTarget.value)}
                      //    onChange={onChangeHandler('itemId')}
                      placeholder="Add New Category"
                      maxLength="50"
                      minLength="1"
                      pattern="[a-zA-Z][a-zA-Z0-9\s]*"
                      autoComplete="off"
                      //     required={true}
                      //       value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}
                      // disabled={true}
                    />
                    <CheckIcon
                      onClick={addNewCategory}
                      color="success"
                      className="pointer"
                    />
                    {/* <ClearIcon sx={{ color: pink[500] }} className='pointer' type="reset" defaultValue="Reset" /> */}
                  </div>
                </CCol>

                <CCol md={3}>
                  <label style={{ marginTop: "" }}>
                    {" "}
                    <b>Add Variety</b>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="mt-2">
                    <span>
                      <img src={Plus} alt="plus"/>
                    </span>
                    <Input
                      required
                      inputProps={ariaLabel}
                      // margin="200px"
                      type="text"
                      // labelName="Add New Category"
                      name="itemId"
                      style={{
                        width: "11vw",
                        height: "35px",
                      }}
                      onChange={(e) => setVariety(e.currentTarget.value)}
                      // onChange={(e) => setName123(e.currentTarget.value)}
                      //    onChange={onChangeHandler('itemId')}
                      placeholder="Add Variety"
                      maxlength="50"
                      minLength="1"
                      pattern="[a-zA-Z][a-zA-Z0-9\s]*"
                      autoComplete="off"
                      //     required={true}
                      //     value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}
                      //     disabled={true}
                    />
                    <CheckIcon
                      color="success"
                      className="pointer"
                      onClick={() => handleAddItem()}
                    />
                    {/* <ClearIcon sx={{ color: pink[500] }} className='pointer' type="reset" defaultValue="Reset" /> */}
                  </div>
                </CCol>
                <div className="col-md-9 d-flex justify-content-end  p-0">
                  {/* <div>
            List: {list.length} total items.
            </div>
          <button onClick={handleAddItem}>Add</button> */}

                  {list.map((item, index) => (
                    <li key={index}>
                      <div>
                        <Stack flexDirection="row" spacing={3}>
                          <Chip
                            label={item}
                            onDelete={(e) => handleDelete(index)}
                          />
                        </Stack>
                      </div>
                    </li>
                  ))}
                </div>
              </CRow>

              <CRow
                className="g-3  col-md-12 d-flex justify-content-center"
                xs="auto"
              >
                <CCol md={4}>
                  {/* <label style={{ marginTop: "1vh" }} > <b>Add New Category</b></label>

                            <div className="mt-2">
                            <span><img src={Plus} /> 
                            </span>&nbsp;
                            <Input inputProps={ariaLabel}
                                        className="myInput"
                                margin="200px"
                                type="text"
                                // labelName="Add New Category"
                                name="itemId"
                                onChange={(e) => setName123(e.currentTarget.value)}
                                //    onChange={onChangeHandler('itemId')}
                                placeholder="Add New Category"
                                required={true}
                            //       value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}

                            // disabled={true}
                            />
                                    <CheckIcon onClick={addNewCategory} color="success" className='pointer' />
                                    <ClearIcon sx={{ color: pink[500] }} className='pointer' type="reset" defaultValue="Reset" />
                            </div> */}
                </CCol>
                <CCol md={2}></CCol>
                <CCol md={2}></CCol>
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

          {/* <div class="form-group  col-lg-3 ml-n3 col-md-10 col-xl-3 mt-4 " >
          <span><img src={Plus} />
          </span>
          <span className="pl-1 new-item" onClick={ToggleButton}>Add New Item</span>
        </div> */}

          <div className="row ">
            <div className="col-md-6  d-flex align-items-center"></div>
            <div className="col-md-6 d-flex justify-content-end  p-0">
              <div>
                <Button
                // type='submit'
                  onClick={ updatefinalItemMasterDetails}
                  className="btn add-price-cancel-btn px-4"
                  size="medium"
                  style={{
                    outlineColor: "#3484F0",
                    backgroundColor: "#5078F2",
                  }}
                >
                  Confirm
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
        </form>
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
                getItem: actions?.getAllNfnvItem,
                getCategory: actions?.getAllNFnvCategory,

            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNfnvItem);
