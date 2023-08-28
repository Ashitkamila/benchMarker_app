import React, { useEffect, useState } from 'react'
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
} from "@coreui/react";
import * as actions from "../../redux";
import CancelIcon from '@mui/icons-material/Cancel';

import { Box, Checkbox, FormControl, Grid, InputLabel, ListItemIcon, ListItemText, MenuItem, Modal, Paper, Select, Typography } from '@mui/material';
import AsyncSelect from 'react-select/async';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddIcon from '@material-ui/icons/Add';
import { ToastContainer, toast, Zoom } from "react-toastify";
import { Button, Card, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core';
import { configuration, configuration2 } from '../../services/appConfig';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import { confirmAlert } from 'react-confirm-alert'; 



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

function EditItemDetails(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "100%",

        boxShadow: 24,
        p: 4,
    };


    const { formData } = props
    const [initialItem, setInitialItem] = useState({
        itemName: formData.itemName,
        value: formData._id,
        material_no: formData.material_no,
        uom: formData.otherUoms,
        category: formData.category.name,
        _id: formData._id
    })
    const [inputvalue, setInputValue] = useState("");
    const [uploadImg, setUploadImg] = useState(false)
    const [removeImg, setRemoveImg] = useState(false);
    const [preview, setPreview] = useState();
    const [itemList, setItemList] = useState([])
    const [material_no, setMaterial_no] = useState(formData.material_no)
    const [selectedFile, setSelectedFile] = useState(null);
    const [questionList, setQuestionList] = useState([])
    const [counter, setCounter] = useState(0)
    const [savedList, setSavedList] = useState([])
    const [questions, setQuestions] = useState([])
    const [category1, setCategory] = useState("");
    const [onBlurImageInput, setOnBlurImageInput] = useState(false);
    const [options, setOptions] = useState(0)
    const [disabled, setDisabled] = useState(true)
    const [msg, setMsg] = useState()
    const [open, setOpen] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [taggedMarket, setTaggedMarket] = useState([])
    const [unTaggedMarket, setUnTaggedMarket] = useState([])
    const [selectedTaggedMarket, setSelectedTaggedMarket] = useState([])
    const [selectedUnTaggedMarket, setSelectedUnTaggedMarket] = useState([])



    const { questiondetails } = useSelector(state => state.fnvcategoryReducer)
    // console.log(questiondetails, "question details")
    const [materialData, setMaterialData] = useState()
    console.log(props.formData, "props data")

    const user = localStorage.getItem("User");
    const userDetails = JSON.parse(user);

    const getItemquestion = async (id) => {
        const Url = configuration.apiBaseUrl + `/itemQuestion/allData?itemId=${id}&companyCode=${userDetails.companyCode}`;

        const response = await fetch(Url, {
            headers: {
                Authorization: userDetails.token,
            },
        })
        const res = await response.json()
        // console.log(res.data, "question")
        // setItemQuestion(res.data)
        setQuestions(res.data)
        let resp = questions


    }

    const submitFormUpdate = () => {



        // console.log("file is", selectedFile);


        if (inputvalue) {
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

        let taggedmarket = selectedUnTaggedMarket?.map(item => item._id)
        console.log(taggedmarket, "taged")
        let updateFormData = new FormData();
        updateFormData.append("image", selectedFile);
        // updateFormData.append("UoM", JSON.stringify(initialItem.uom ? initialItem.uom : ""));
        updateFormData.append("updatedBy", userDetails._id);
        // updateFormData.append("category", formData.category._id);
        updateFormData.append("tagMarkets", JSON.stringify(taggedmarket))
        updateFormData.append("unTagMarkets", JSON.stringify(selectedTaggedMarket?.map(item=>item._id)))

        updateFormData.append("itemQuestions", JSON.stringify(questions.map((item) => {
            return {
                id: item._id,
                body: item
            }
        }),))

        // console.log(selectedFile);
        // console.log("formdata is", formData);

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

    useEffect(() => {
        getTaggedMarket()
        getUntaggedMarket()

    }, [])

    const getTaggedMarket = async () => {
        try {
            const response = await fetch(`${configuration2.apiBaseUrl}/market/marketNameList?companyCode=${userDetails.companyCode}&status=TAGGED&itemId=${initialItem._id}`, {
                headers: {
                    Authorization: userDetails.token,
                },
            })
            const body = await response.json()
            setTaggedMarket(body.data)
            console.log(body.data, "data is")
        } catch (error) {
            console.log(error)
        }
    }

    const getUntaggedMarket = async () => {
        try {
            const response = await fetch(`${configuration2.apiBaseUrl}/market/marketNameList?companyCode=${userDetails.companyCode}&status=UNTAGGED&itemId=${initialItem._id}`, {
                headers: {
                    Authorization: userDetails.token,
                },
            })
            const body = await response.json()
            setUnTaggedMarket(body.data)
            console.log(body.data, "data is")
        } catch (error) {
            console.log(error)
        }
    }



    const updatefinalItemMasterDetails = () => {



        // console.log("file is", selectedFile);


        let taggedmarket = selectedUnTaggedMarket?.map(item => item._id)
        console.log(taggedmarket, "taged")


        let updateFormData = new FormData();
      
        updateFormData.append("updatedBy", userDetails._id);
     
        updateFormData.append("tagMarkets", JSON.stringify(taggedmarket))
        updateFormData.append("unTagMarkets", JSON.stringify(selectedTaggedMarket?.map(item=>item._id)))

        updateFormData.append("itemQuestions", JSON.stringify(questions.map((item) => {
            return {
                id: item._id,
                body: item
            }
        }),))

        // console.log(selectedFile);
        // console.log("formdata is", formData);

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

    useEffect(() => {
        getItemquestion(initialItem._id)
    }, [])
    useEffect(() => {
        let q = questions
        // console.log(q, "q is")
    }, [questions])


    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);


        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    function getExtension(filename) {
        return filename.split(".").pop();
    }

    const onFileSelected = (event) => {

        // setOnBlurImageInput(true);
        setInputValue(event.target.value)

        // console.log("event123", event.target.value);
        if (event.target.value) {
            setOnBlurImageInput(true);
            let ext = getExtension(event.target.value).toLowerCase();
            let extAllowed = ["jpg", "jpeg", "png"];
            // console.log("check is", extAllowed)
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
    const goPrev = (event) => {
        window.location.reload();
    };

    const handlequestion = (e, index) => {
        // console.log(e.target.value, "change value")
        let ques = e.target.value
        let temp = [...questions]
        temp[index].question = ques
        setQuestions(temp)

    }

    const handleoptionchange = (e, key, index) => {
        let opt = e.target.value
        let temp = [...questions]
        temp[index].options[key].option = opt
        setQuestions(temp)
    }


    const handleclick = () => {
        setCounter(1)
        const temp = [...questionList]
        const newObj = {
            question: "",
            options: []
        }
        temp.push(newObj)
        setQuestionList(temp)
    }


    const addoption = (index) => {
        setOptions(options + 1)
        let temp = [...questionList]
        let latestData = temp[index].options
        let newObj = { option: "" }
        latestData.push(newObj)
    }

    const canceloption = (index, key) => {
        let temp = [...questionList]
        temp[index].options.splice(key, 1)
        setQuestionList(temp)
    }
   
    const deletequestion = (deleteId) => {
        confirmAlert({
            title: "Confirm to Delete",
            message: "Are you sure you want to delete this item.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        const id = deleteId;

                        fetch(
                            `${configuration.apiBaseUrl}/itemQuestion/delete?deletedBy=${userDetails._id}&id=${id}`,
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: userDetails.token,
                                },

                            }
                        )
                            .then((res) => {
                                res.json();
                                getItemquestion(initialItem._id)
                                // toast.success("Question Deleted Successfully.");

                                // window.location.reload();
                            })

                            //   .then((res) => { res.status(201).json()}  )
                            //   .then((result) => console.log(result,"result"))
                            .catch((err) => console.log("error"));
                    },
                },
                {
                    label: "No",
                    onClick: () => toast.warn("Action Cancelled"),
                },
            ],
        });



    };

    const saveandsubmit = (index) => {
        if (questionList[index].question == "") {
            // let temp = [...questionList]
            // temp[index].splice(index, 1)
            // setQuestionList(temp)
        } else if (questionList[index].options == "") {
            setMsg("Please enter option")
            console.log("please enter option")
        }
        else {

            let temp = [...savedList]
            temp.push(questionList[0])
            setSavedList(temp)
            setQuestionList([])
            setCounter(0)
            let tempdata = [...questions]
            tempdata.push(questionList[0])
            setQuestions(tempdata)
            props.actions.saveQuestion(temp)
        }



    }
    const handleaddnewquestion = (e, index) => {

        let ques = e.target.value
        let temp = [...questionList]
        temp[index].question = ques
        setQuestionList(temp)
        setDisabled(false)
    }

    const handleaddnewoptionchange = (e, key, index) => {
        let opt = e.target.value
        let temp = [...questionList]
        temp[index].options[key].option = opt
        setQuestionList(temp)

    }
    const deletequestionBox = (index) => {
        console.log(index, "index")
        let temp = [...questionList]
        temp.splice(index, 1)
        setQuestionList(temp)
    }

    const handleopen = () => {
        setOpen(true)

    }
    const handleOpenAdd = () => {
        setOpenAdd(true)
    }
    const handleclose = () => {
        setOpen(false)
    }
    const handlecloseAdd = () => {
        setOpenAdd(false)
    }

    const handleTaggedMarketChange = (event) => {
        const { target: { value }, } = event;
        console.log(event.target.value, "value is")

        if (value[value.length - 1] === "all") {
            let temp = taggedMarket?.map((item) => item)
            setSelectedTaggedMarket(selectedTaggedMarket?.length === taggedMarket?.length ? [] : temp);


            return;
        }

        const preventDuplicate = value.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i);
        setSelectedTaggedMarket(
            // On autofill we get a the stringified value.
            typeof preventDuplicate === 'string' ? preventDuplicate.split(',') : preventDuplicate
        );
    };

    useEffect(() => {
        // let temp = selectedTaggedMarket
        // console.log(temp, "data")
        let market = selectedTaggedMarket
        console.log(market, " untagged")
    }, [selectedTaggedMarket])

    const handleUnTaggedMarketChange = (event) => {
        const { target: { value }, } = event;
        console.log(event.target.value, "value is")

        if (value[value.length - 1] === "all") {
            let temp = unTaggedMarket?.map((item) => item)
            setSelectedUnTaggedMarket(selectedUnTaggedMarket?.length === unTaggedMarket?.length ? [] : temp);


            return;
        }

        const preventDuplicate = value.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i);
        setSelectedUnTaggedMarket(
            // On autofill we get a the stringified value.
            typeof preventDuplicate === 'string' ? preventDuplicate.split(',') : preventDuplicate
        );
    };

    const handleSelectedAllMarket = (e) => {
        if (e.target.checked) {
            console.log(e.target.checked, "target")
            let array = taggedMarket?.map((item) => item)

            // console.log(array.length, taggedMarket?.length, "length")
            setSelectedTaggedMarket(taggedMarket)


        } else {
            setSelectedUnTaggedMarket([])

        }
    }
    const handleAllUntaggedMarket = (e) => {
        if (e.target.checked) {
            console.log(e.target.checked, "target")
            let array = unTaggedMarket?.map((item) => item)

            // console.log(array.length, unTaggedMarket.length, "length")
            setSelectedUnTaggedMarket(unTaggedMarket)


        } else {
            setSelectedUnTaggedMarket([])

        }
    }

   
    return (
        <div>
            <form className="borders">
                <div>
                    &nbsp; &nbsp; &nbsp;{" "}
                    <CButtonGroup role="group" aria-label="Basic example">
                        <CButton color="primary">Manual</CButton>
                        <CButton color="secondary">Upload</CButton>
                        {/* <CButton color="primary">Right</CButton> */}
                    </CButtonGroup>
                    <div className="row gy-2 gx-3 align-items-center ml-10">
                        <CRow
                            className="g-4 col-md-12 d-flex justify-content-center"
                            xs="auto"
                        >


                            <Grid container xs={10} style={{ marginTop: "20px", justifyContent: "center" }} spacing={4}>
                                <Grid item xs={4}>

                                    <Typography component="p" style={{ marginBottom: "5px" }}>Item Name <span style={{ color: "red" }}>*</span></Typography>

                                    <input type="text"
                                        name="Item Name"
                                        labelName="Item Name"
                                        value={initialItem?.itemName}
                                        placeholder="Item Name" style={{
                                            // fontVariant: tabular-nums,
                                            padding: "0px 10px",
                                            lineHeight: 1.5715,
                                            width: "100%", borderRadius: "5px", border: "1px solid #ccc", height: "50px"
                                        }}
                                        required={true}
                                        disabled={true}
                                    />

                                </Grid>
                                <Grid item xs={4}
                                // sx={{ marginTop: "40px" }}
                                >
                                    <Typography component="p" style={{ marginBottom: "4px" }}>Item Code <span style={{ color: "red" }}>*</span></Typography>

                                    <input type="text"
                                        labelName="Item Code"
                                        name="itemId"
                                        value={initialItem?.material_no}
                                        placeholder="Item Code" style={{
                                            // fontVariant: tabular-nums,
                                            padding: "0px 10px",
                                            lineHeight: 1.5715,
                                            width: "100%", borderRadius: "5px", border: "1px solid #ccc", height: "50px"
                                        }}
                                        required={true}
                                        disabled={true}
                                    />


                                </Grid>
                                <Grid item xs={4}>
                                    <Typography component="p" style={{ marginBottom: "5px" }}>UOM <span style={{ color: "red" }}>*</span></Typography>

                                    <input type="text"

                                        name="UoM"
                                        //   value={materialData?.otherUoms.map((item) => { return (item.uom) })} 
                                        value={initialItem?.uom.map((item) => { return (item.uom) })}
                                        placeholder="UOM"
                                        style={{
                                            // fontVariant: tabular-nums,
                                            padding: "0px 10px",
                                            lineHeight: 1.5715,
                                            width: "100%",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                            height: "50px"
                                        }}
                                        disabled={true}
                                        required={true}


                                    />
                                </Grid>

                            </Grid>
                            <Grid container xs={10} style={{ marginTop: "20px" }} spacing={4}>
                                <Grid item xs={4}>
                                    <Typography component="p" style={{ marginBottom: "5px", marginLeft: "3px" }}>Category <span style={{ color: "red" }}>*</span></Typography>

                                    <input type="text"
                                        value={initialItem?.category}
                                        placeholder="Category"
                                        name="category"
                                        style={{
                                            // fontVariant: tabular-nums,
                                            padding: "0px 10px",
                                            lineHeight: 1.5715,
                                            width: "100%",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                            height: "50px",
                                            marginLeft: '5px'
                                        }}
                                        disabled={true}
                                        required={true}


                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Grid container flexDirection="column">
                                        <Grid item>
                                            <Typography component="p" style={{ marginBottom: "5px" }}>Image <span style={{ color: "gray" }}>(Optional)</span></Typography>

                                            <input
                                                id="imageUrl"
                                                labelName="Upload Image"
                                                type="file"
                                                class="form-control"
                                                placeholder="Image Url"
                                                name="image"
                                                // style={{height:"50px"}}
                                                onChange={(event) => onFileSelected(event)}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <label style={{ marginLeft: "12px", marginTop: "10px" }}>
                                                {" "}
                                                <b>Image Status</b>
                                                {/* <span style={{ color: "red" }}>*</span> */}
                                            </label> <br />
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
                                                <span style={{ marginLeft: "10px", color: "red", marginTop: "5vh" }}>No Image Selected</span>

                                            )}
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container justifyContent="space-evenly">
                                        <Grid item >
                                            <Button variant='contained' onClick={handleOpenAdd} style={{ backgroundColor: '#00416b', color: "white", marginTop: "30px" }}>Add New Market</Button>

                                        </Grid>
                                        <Grid item >
                                            <Button variant='contained' onClick={handleopen} style={{ backgroundColor: '#00416b', color: "white", marginTop: "30px" }}>Remove Market</Button>

                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Modal
                                    open={openAdd}
                                    onClose={handlecloseAdd}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Grid container>
                                            <Grid item xs={8} sx={{ border: "2px solid black", margin: "auto" }}>
                                                <Paper elevation={3}
                                                >
                                                    <div>

                                                        <Typography component="p" variant="h5" sx={{ color: "white", textAlign: "center", padding: "10px", backgroundColor: "#00416b" }}>ADD NEW MARKET <span style={{ float: "right" }}><Button><CancelIcon style={{ color: "white" }} onClick={handlecloseAdd} /></Button> </span></Typography>

                                                    </div>
                                                    <form action="">
                                                        <Grid container flexDirection="column" >
                                                            <Grid item xs={10} style={{ margin: "30px auto 20px auto", width: "100%" }}>
                                                                <Grid container xs={12} style={{ justifyContent: "center" }}
                                                                >
                                                                    <Grid item xs={7}>
                                                                        <FormControl
                                                                            fullWidth
                                                                            size="small"
                                                                            mt={5}

                                                                        >
                                                                            <InputLabel id="mutiple-select-label">Add  Market</InputLabel>
                                                                            <Select
                                                                                labelId="demo-multiple-checkbox-label"
                                                                                id="demo-multiple-checkbox"
                                                                                multiple
                                                                                label="Add  Market"
                                                                                variant="outlined"
                                                                                value={selectedUnTaggedMarket}
                                                                                onChange={handleUnTaggedMarketChange}
                                                                                renderValue={(selected) => selected.map((x) => x.name).join(', ')}
                                                                                MenuProps={MenuProps}
                                                                            >
                                                                                <MenuItem
                                                                                    value="all"
                                                                                >
                                                                                    <ListItemIcon>
                                                                                        <Checkbox
                                                                                            checked={unTaggedMarket?.length > 0 && selectedUnTaggedMarket?.length === unTaggedMarket?.length}
                                                                                            onChange={(e) => { handleAllUntaggedMarket(e) }}
                                                                                        />
                                                                                    </ListItemIcon>
                                                                                    <ListItemText
                                                                                        primary="Select All"
                                                                                    />
                                                                                </MenuItem>
                                                                                {unTaggedMarket?.map((variant) => (
                                                                                    <MenuItem key={variant.id} value={variant}>
                                                                                        <Checkbox checked={
                                                                                            selectedUnTaggedMarket?.findIndex(item => item._id === variant._id) >= 0
                                                                                        } />
                                                                                        <ListItemText primary={variant.name} />
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>

                                                                </Grid>
                                                            </Grid>

                                                            <Grid item xs={10} style={{ margin: "10px auto 20px auto", width: "100%" }}>
                                                                <Grid container gap={2} xs={7} style={{ margin: "auto" }}>
                                                                    <Grid item xs={4} >
                                                                        <Button style={{ width: "150px", backgroundColor: "#00416b", color: "white" }} onClick={handlecloseAdd} variant="contained">Add Market</Button>
                                                                    </Grid>

                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                    </form>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                </Modal>


                                <Modal
                                    open={open}
                                    onClose={handleclose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Grid container>
                                            <Grid item xs={8} sx={{ border: "2px solid black", margin: "auto" }}>
                                                <Paper elevation={6}>
                                                    <div>

                                                        <Typography component="p" variant="h5" sx={{ color: "white", textAlign: "center", padding: "10px", backgroundColor: "#00416b" }}>Remove Existing Market <span style={{ float: "right" }}><Button><CancelIcon style={{ color: "white" }} onClick={handleclose} /></Button> </span></Typography>

                                                    </div>
                                                    <form action="">
                                                        <Grid container flexDirection="column" >

                                                            <Grid item xs={10} style={{ margin: "30px auto 20px auto", width: "100%" }}>
                                                                <Grid container xs={12} style={{ justifyContent: "center" }}
                                                                >
                                                                    <Grid item xs={7}>
                                                                        <FormControl
                                                                            fullWidth
                                                                            size="small"
                                                                            mt={5}

                                                                        >
                                                                            <InputLabel id="mutiple-select-label">Remove Existing Market</InputLabel>
                                                                            <Select
                                                                                labelId="demo-multiple-checkbox-label"
                                                                                id="demo-multiple-checkbox"
                                                                                multiple
                                                                                label="Remove Existing Market"
                                                                                variant="outlined"
                                                                                value={selectedTaggedMarket}
                                                                                onChange={handleTaggedMarketChange}
                                                                                renderValue={(selected) => selected.map((x) => x.name).join(', ')}
                                                                                MenuProps={MenuProps}
                                                                            >
                                                                                <MenuItem
                                                                                    value="all"
                                                                                >
                                                                                    <ListItemIcon>
                                                                                        <Checkbox
                                                                                            checked={taggedMarket?.length > 0 && selectedTaggedMarket?.length === taggedMarket?.length}
                                                                                            onChange={(e) => { handleSelectedAllMarket(e) }}
                                                                                        />
                                                                                    </ListItemIcon>
                                                                                    <ListItemText
                                                                                        primary="Select All"
                                                                                    />
                                                                                </MenuItem>
                                                                                {taggedMarket?.map((variant) => (
                                                                                    <MenuItem key={variant.id} value={variant}>
                                                                                        <Checkbox checked={
                                                                                            selectedTaggedMarket?.findIndex(item => item._id === variant._id) >= 0
                                                                                        } />
                                                                                        <ListItemText primary={variant.name} />
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>

                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={10} style={{ margin: "10px auto 20px auto", width: "100%" }}>
                                                                <Grid container gap={2} xs={7} style={{ margin: "auto" }}>
                                                                    <Grid item   >

                                                                        <Button style={{ width: "100px", backgroundColor: "#00416b", color: "white" }} onClick={handleclose} variant="contained">Remove</Button>
                                                                    </Grid>
                                                                   
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                    </form>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Modal>

                            </Grid>
                        </CRow>






                    </div>
                </div>
                <br />

                <Grid container xs={12} flexDirection="column" style={{ margin: "20px" }}>
                    <Grid item xs={6} >
                        <Button variant="contained" style={{ marginBottom: "20px", backgroundColor: "#00416b", color: "white" }} onClick={handleclick} ><AddIcon /> Add Your Questions</Button>

                    </Grid>
                    <Grid item xs={6} >
                        <form action="">
                            {
                                questions?.map((item, index) => {
                                    return (
                                        <>

                                            <Card sx={{ maxWidth: 345 }} style={{ marginBottom: "20px", backgroundColor: "#F7F7F7" }}>
                                                <CardHeader

                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <ClearIcon onClick={() => deletequestion(item._id)} />
                                                        </IconButton>
                                                    }

                                                />

                                                <CardContent>
                                                    <TextField
                                                        variant="standard"
                                                        label="Edit Your Question"
                                                        key={index}
                                                        size="small"
                                                        value={item.question}
                                                        onChange={(e) => { handlequestion(e, index, item._id) }}
                                                        fullWidth
                                                    />
                                                    <Grid container style={{ marginBottom: "20px" }}>
                                                        {
                                                            item.options?.map((option, key) => {
                                                                return (
                                                                    <>
                                                                        <Grid item xs={3} style={{ marginTop: "20px" }}>
                                                                            <TextField
                                                                                variant="standard"
                                                                                label="Edit your option"
                                                                                color="primary"
                                                                                size="small"
                                                                                key={key}
                                                                                value={option.option}
                                                                                onChange={(e) => { handleoptionchange(e, key, index) }}

                                                                            />
                                                                        </Grid>
                                                                    </>
                                                                )
                                                            })
                                                        }

                                                    </Grid>
                                                </CardContent>

                                            </Card>


                                        </>
                                    )
                                })
                            }



                        </form>
                    </Grid>
                    <Grid item xs={6}>
                        {questionList.map((data, index) => {
                            return (
                                <>
                                    <form action="">

                                        <Card key={index} sx={{ maxWidth: 345 }} style={{ marginBottom: "20px", backgroundColor: "#F7F7F7" }}>
                                            <CardHeader

                                                action={
                                                    <IconButton aria-label="settings">
                                                        <ClearIcon onClick={() => deletequestionBox(index)} />
                                                    </IconButton>
                                                }

                                            />

                                            <CardContent>

                                                <Grid container style={{ marginTop: "20px" }}>
                                                    <Grid style={{ margin: "10px 20px" }} item xs={12}>
                                                        <TextField
                                                            variant="standard"
                                                            label="Enter Your Question"
                                                            key={index}
                                                            size="small"
                                                            value={data.question}
                                                            onChange={(e) => { handleaddnewquestion(e, index) }}
                                                            fullWidth
                                                        />
                                                        <Button variant="contained" color="primary" onClick={() => addoption(index)} style={{ marginTop: "10px", backgroundColor: "#00416b", color: "white" }}>Add Options</Button><br />
                                                        {
                                                            msg ? (
                                                                <Typography component="p" style={{ color: "red", marginTop: "5px" }}>{msg}</Typography>
                                                            ) : ""
                                                        }

                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={2} xs={12}>

                                                            {
                                                                data.options.map((item, key) => {
                                                                    console.log("options sg", item)
                                                                    return (
                                                                        <>
                                                                            <Grid style={{ marginLeft: "20px" }} item xs={6}>
                                                                                <TextField
                                                                                    variant="standard"
                                                                                    label="Please Enter Your Text"
                                                                                    color="primary"
                                                                                    size="small"
                                                                                    value={item.option}
                                                                                    onChange={(e) => { handleaddnewoptionchange(e, key, index) }}

                                                                                />
                                                                                <Button variant="filled" style={{ color: "#00416b" }} onClick={() => canceloption(index, key)}><CancelIcon /></Button>
                                                                                {/* <IconButton variant="filled" style={{ color: "#00416b" }} onClick={saveoption}><CheckIcon /></IconButton> */}
                                                                            </Grid>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                    <Button disabled={disabled} variant="contained" onClick={() => saveandsubmit(index)} fullWidth p={2} style={{ backgroundColor: "#00416b", color: "white", margin: "20px" }}>save And Submit </Button>
                                                </Grid>
                                            </CardContent>
                                        </Card>


                                    </form>
                                </>
                            );
                        })}

                    </Grid>
                    <Grid item xs={12}>
                        <Grid container style={{ justifyContent: "end", marginTop: "20px" }}>
                            <Grid item xs={2} style={{ alignSelf: "center", marginRight: "25px" }}>
                                <Button

                                    onClick={() =>
                                        onBlurImageInput || selectedFile || inputvalue
                                            ? submitFormUpdate() : updatefinalItemMasterDetails()}
                                    className="btn add-price-cancel-btn px-4"
                                    size="medium"
                                    style={{
                                        outlineColor: "#3484F0",
                                        backgroundColor: "#5078F2",
                                        float: "right"
                                    }}
                                    fullWidth
                                >
                                    Confirm
                                </Button>


                            </Grid>
                            <Grid item xs={2} >
                                <Button
                                    variant="outlined"
                                    className="btn add-price-cancel-btn px-4 ml-2 "
                                    style={{ marginRight: "25px", float: "right" }}
                                    onClick={goPrev}
                                    size="medium"
                                    fullWidth

                                    backgroundColor="#5078F2"
                                >
                                    cancel
                                </Button>

                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>


              


            </form>
        </div>
    )
}


const mapStateToProps = (state) => {
    console.log('sdfghj', state);
    return {
        // bmManagementData: state.bmManagement.BmManagementData,
        userDetails: state.login,
        error: state.bmManagement.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    console.log('iuytre', actions);

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
                saveQuestion: actions.savequestions,
                getItem: actions.getAllGetItemName,
                //   getCategory: actions.getAllFnvCategory,
                getItemDetails: actions.getItemDetails
            },
            dispatch
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditItemDetails);
