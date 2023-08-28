import { Paper, Button, ButtonBase, formData } from '@material-ui/core';
import { Space } from 'antd';
import React, { useEffect, useState } from 'react'
// import { InputControl } from '../../utils/FormControls';
import { InputControl } from './../../utils/FormControls';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Plus from "./plus.svg";
// import Select from "react-select";
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
import TextField from '@mui/material/TextField';
import { textAlign, margin } from '@mui/system';
import { ToggleButton } from '@mui/material';
import Input from '@mui/material/Input';
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';


function CardItem(props) {




    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const ariaLabel = { 'aria-label': 'description' };
    const [imageUrl, setImageUrl] = useState("");
    return (
        <div>
            <form className="borders">
                <div>
                    <div className='row gy-2 gx-3 align-items-center ml-10'>
                        <CRow className="g-4  col-md-12 d-flex justify-content-center" xs="auto"  >
                            {/* <CCol md={3} > 
                            <CFormLabel htmlFor="inputState">Item Name</CFormLabel>  <span style={{ color: "red" }}>*</span>
                          
                        </CCol> */}
                            <CCol md={3} >
                                <InputControl
                                    type="text"
                                    labelName="Item Name"
                                    name="itemId"
                                    //    onChange={onChangeHandler('itemId')}
                                    placeholder="Item Name"
                                    //       value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}
                                    // required={true}
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
                                    //       value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}
                                    // required={true}
                                    disabled={true}
                                />
                            </CCol>
                            <CCol md={3}>
                                <InputControl
                                    type="text"
                                    labelName="UOM"
                                    name="itemId"
                                    //    onChange={onChangeHandler('itemId')}
                                    placeholder="UOM"
                                    //       value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}
                                    // required={true}
                                    disabled={true}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="g-3  col-md-12 d-flex justify-content-center" xs="auto" >
                            <CCol md={4} className='mt-3'>
                                <InputControl
                                    type="text"
                                    labelName="Choose from Item Category"
                                    name="itemId"
                                    //    onChange={onChangeHandler('itemId')}
                                    placeholder="Choose from Item Category"
                                    //       value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}
                                    // required={true}
                                    disabled={true}
                                />
                            </CCol>


                            <CCol sm={4} className='mt-3'>
                                <InputControl
                                    type="text"
                                    labelName="Choose from Item Category"
                                    name="itemId"
                                    //    onChange={onChangeHandler('itemId')}
                                    placeholder="Choose from Item Category"
                                    //       value={formData.item === undefined ? "" : (formData.item.material_no == undefined ? '' : formData.item.material_no)}
                                    // required={true}
                                    disabled={true}
                                />
                            </CCol>

                        </CRow>
                        <div className="g-4  col-md-12 d-flex justify-content-center" onClick={ToggleButton}>
                            <span><img src={Plus} />
                                Add New Category</span>
                            {/* <Input placeholder="Placeholder" inputProps={ariaLabel} /> */}
                        </div>
                        <div>

                        </div>

                    </div>
                </div>
            </form>

        </div>

    )
}


export default CardItem;