import { Paper, Button, ButtonBase, formData, Grid, Typography, Divider, IconButton, Card, CardContent, CardHeader } from "@material-ui/core";
import { Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
// import { InputControl } from '../../utils/FormControls';
import { InputControl } from "./../../utils/FormControls";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import Plus from "./plus.svg";
import ImageUploading from "react-images-uploading";
// import Select from "react-select";
import "./style.css";
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
import TextField from "@mui/material/TextField";
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import * as actions from "../../redux";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { textAlign, margin } from "@mui/system";
import { Checkbox, ListItemIcon, ListItemText, Select, ToggleButton } from "@mui/material";
import Input from "@mui/material/Input";
import {
  getAllGetItemName,
  getAllFnvCategory,
  getItemDetails
} from "./../../redux/fnvcategory/fnvcategoryAction";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { pink } from "@mui/material/colors";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { configuration, configuration2 } from "../../services/appConfig";
import Multiselect from "multiselect-react-dropdown";
import AsyncSelect from "react-select/async";
// import CheckIcon from '@mui/icons-material/Check';

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
// console.log("token is",userDetails.token )


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

function AddItem(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const ariaLabel = { "aria-label": "description" };
  const [records, setRecords] = useState([]);
  console.log("records", records);
  const [categoryrecords, setCategoryRecords] = useState([]);
  const [name123, setName123] = useState("");
  console.log("name 123", name123);
  // const [material_desc, setMaterial_desc] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [material_number, setMaterial_desc] = useState();
  const [category123, setCategory123] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [UoM, setUoM] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = React.useState([]);
  const [onBlurImageInput, setOnBlurImageInput] = useState(false);
  const [inputvalue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState()
  const [materialData, setMaterialData] = useState()
  // const [option, setOption] = useState([{ value: "", label: "" }])
  const maxNumber = 69;

  const [counter, setCounter] = useState(0)
  const [options, setOptions] = useState(0)
  const [question, setQuestion] = useState()
  const [option, setOption] = useState()
  const [optionfield, setOptionfield] = useState([])

  const [questionList, setQuestionList] = useState([])
  const [savedList, setSavedList] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [msg, setMsg] = useState()
  const [disableButton, setDisableButton] = useState(false)
  const [marketList, setMarketList] = useState([])
  const [selectedMarket, setSelectedMarket] = useState([])
  const [marketId,setMarketId]=useState([])
  const { itemdetails, questiondetails } = useSelector(state => state.fnvcategoryReducer)
  // console.log(questiondetails, "question details")

  const user = localStorage.getItem("User")
  const userDetails = JSON.parse(user)
  const inputref = useRef(null)

  useEffect(() => {
    getmarketlist()
  }, [])

  async function getmarketlist() {
    try {

      const response = await fetch(`${configuration2.apiBaseUrl}/market/marketNameList?companyCode=${userDetails.companyCode}&status=ALL`, {
        headers: {
          Authorization: userDetails.token,
        },
      });
      const body = await response.json();
      console.log(body, "body")
      setMarketList(body.data)
      // setRecords(body.data);
    }
    catch (error) {
      console.log(error, "error")
    }



  }



  function getExtension(filename) {
    return filename.split(".").pop();
  }

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const goPrev = (event) => {
    window.location.reload();
  };


  const submitformdetails = (e) => {
    e.preventDefault()

    console.log(savedList, selectedFile, "data is")
    if (materialData?.otherUoms == "" || materialData?.otherUoms == undefined || materialData?.otherUoms == null) {
      {
        toast.warn("select UOM ", {
          theme: "colored",
        });
      }
      return;
    }
    // else if (materialData?.sub_category == "" || materialData?.sub_category == undefined || materialData?.sub_category == null) {
    //   {
    //     toast.warn("select category ", {
    //       theme: "colored",
    //     });
    //   }
    //   return;
    // }


    else if (
      materialData?.material_desc == "" ||
      materialData?.material_desc == undefined ||
      materialData?.material_desc == null
    ) {
      {
        toast.warn("select Item ", {
          theme: "colored",
        });
      }
      return;
    } else if (selectedMarket == "" ||
      selectedMarket == undefined ||
      selectedMarket == null) {
      {
        toast.warn("select market", {
          theme: "colored",
        })
      }
    }

    else {
      if (inputvalue) {
        console.log("selected")
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
      let market = selectedMarket.map(item => item._id)
      console.log(market,typeof market,"market")
      let formData = new FormData()
      formData.append("itemName", materialData?.material_desc);
      formData.append("material_desc", materialData?.material_desc);
      formData.append("material_no", materialData?.itemId);
      formData.append("itemType", "fnv");
      formData.append("category", materialData?.material_group);
      formData.append("otherUoms", JSON.stringify(materialData?.otherUoms))
      formData.append("UoM", materialData?.uom);
      formData.append("active", "true");
      formData.append("mandatory", "true");
      formData.append("baseQuantity", "1");
      formData.append("page", "2");
      formData.append("conversionFactor", "10");
      formData.append("shortName", null);
      formData.append("description", null);
      formData.append("weightGrams", 0);
      formData.append("appliesOnline", 1);
      formData.append("itemProductType", 1);
      formData.append("itemTaxType", "N");
      formData.append("manufacturer", "NA");
      formData.append("length", 0);
      formData.append("breadth", 0);
      formData.append("height", 0);
      formData.append("weight", 0);
      formData.append("shelf", 0);
      formData.append("box", 0);
      formData.append("rack", "");
      formData.append("foodType", 1);
      formData.append("taxId", 5001);
      formData.append("decimalsAllowed", 3);
      formData.append("status", "R");
      formData.append("createdBy", userDetails._id);
      formData.append("companyCode", userDetails.companyCode)
      formData.append("image", selectedFile);
      formData.append("itemQuestions", JSON.stringify(savedList))
      formData.append("marketIds", JSON.stringify(market))
      formData.append(
        "activeOnLocations",
        JSON.stringify([
          {
            locationId: "5d9d9bb30f960110e027e2eb",
            active: true,
            mandatory: true,
          },
          {
            locationId: "5e0f02ec310f95592258a499",
            active: true,
            mandatory: true,
          },
          {
            locationId: "5e37c491ab3db43e546bf924",
            active: true,
            mandatory: true,
          },
          {
            locationId: "5e37c3bf175f213e4ed9aacd",
            active: true,
            mandatory: true,
          },
          {
            locationId: "5e37c499657c4e3e62d62e96",
            active: true,
            mandatory: true,
          },
          {
            locationId: "5e37c3b64079403e77392e99",
            active: true,
            mandatory: true,
          },
          {
            locationId: "5e37c3d2704d663e69cf4214",
            active: true,
            mandatory: true,
          },
          {
            locationId: "5e37c3ca9d316a3e5b76218b",
            active: true,
            mandatory: true,
          },
        ])
      );
      console.log("formdata is", formData);

      axios.post(`${configuration.apiBaseUrl}/item`, formData)
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
        // .then(res=>{console.log(res,"response is")})
        .catch(err => { console.log(err, "error is") })
    }


  }



  const updateformdetails = (e) => {
    e.preventDefault()

    console.log(materialData?.material_group, "data is")
   
    if (materialData?.otherUoms == "" || materialData?.otherUoms == undefined || materialData?.otherUoms == null) {

      toast.warn("select UOM ", {
        theme: "colored",
      });


    }
    else if (materialData?.material_group == "" || materialData?.material_group == undefined || materialData?.material_group == null) {
      {
        toast.warn("select category ", {
          theme: "colored",
        });
      }
    }
    // else if (materialData?.sub_category == "" || materialData?.sub_category == undefined || materialData?.sub_category == null) {
    //   {
    //     toast.warn("select category ", {
    //       theme: "colored",
    //     });
    //   }

    // }

    else if (
      materialData?.material_desc == "" ||
      materialData?.material_desc == undefined ||
      materialData?.material_desc == null
    ) {
      {
        toast.warn("select Item ", {
          theme: "colored",
        });
      }
      return;
    } else if (selectedMarket == "" ||
      selectedMarket == undefined ||
      selectedMarket == null) {
      {
        toast.warn("select market", {
          theme: "colored",
        })
      }
    }

    else {
    //  setMarketId(selectedMarket.map((item)=>item._id))
        let market = selectedMarket.map(item => item._id)

      let formData = new FormData()
      formData.append("marketIds", JSON.stringify(market))
      formData.append("itemName", materialData?.material_desc);
      formData.append("material_desc", materialData?.material_desc);
      formData.append("material_no", materialData?.itemId);
      formData.append("itemType", "fnv");
      formData.append("category", materialData?.material_group);
      formData.append("UoM", materialData?.uom);
      formData.append("otherUoms", JSON.stringify(materialData?.otherUoms))
      formData.append("active", "true");
      formData.append("mandatory", "true");
      formData.append("baseQuantity", "1");
      formData.append("page", "2");
      formData.append("conversionFactor", "10");
      formData.append("shortName", null);
      formData.append("description", null);
      formData.append("weightGrams", 0);
      formData.append("appliesOnline", 1);
      formData.append("itemProductType", 1);
      formData.append("itemTaxType", "N");
      formData.append("manufacturer", "NA");
      formData.append("length", 0);
      formData.append("breadth", 0);
      formData.append("height", 0);
      formData.append("weight", 0);
      formData.append("shelf", 0);
      formData.append("box", 0);
      formData.append("rack", "");
      formData.append("foodType", 1);
      formData.append("taxId", 5001);
      formData.append("decimalsAllowed", 3);
      formData.append("status", "R");
      formData.append("createdBy", userDetails._id);
      formData.append("companyCode", userDetails.companyCode)
      //  formData.append("image", selectedFile);
      formData.append("itemQuestions", JSON.stringify(savedList))

      console.log("formdata is", formData);

      axios.post(`${configuration.apiBaseUrl}/item`, formData)
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
        //  .then(res=>{console.log(res,"response is")})
        .catch(err => { console.log(err, "error is") })

    }


  }


  const handleFNVNameChange = (value, e) => {
 
    const id = value;

    //  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'
    let initProducts = async () => {
      await fetch(`${configuration.apiBaseUrl}/fnv/itemCode?itemId=` + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userDetails.token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setItemId(response.data[0].itemId);
          console.log("item_ID_is", response.data[0].itemId);
          setMaterial_desc(response.data[0].material_desc);
          console.log("material Desc is", response.data[0].material_desc);
          setItemName(response.data[0].itemName);
          console.log("Item name is", response.data[0].itemName);
          console.log("user is ", userDetails._id);

          // console.log('ddssasasa', response.data[0].itemName)
        })
        //   .then((result) => setData(result.rows))
        .catch((err) => console.log("error"));
    };
    initProducts();
  };


  const handleCategoryChange = (value) => {
    // console.log('gggggggg', value)
console.log(value,"onchange")
    props.actions.getCategory(value).then((res) => {
      setCategory123(value);
    });
  };

  console.log(selectedFile);

  const onFileSelected = (event) => {

    // setOnBlurImageInput(true);
    setInputValue(event.target.value)

    if (event.target.value) {
      setOnBlurImageInput(true);
      let ext = getExtension(event.target.value).toLowerCase();
      let extAllowed = ["jpg", "jpeg", "png"];
  
      // const noFile = event.target.value.trim() === '';
      if (extAllowed.findIndex((ex) => ex == ext) < 0) {
        toast.warn("select Png or JPEG Image only ", {
          theme: "colored",
        });
        return;
      }
      setSelectedFile(event.target.files[0]);
    } else {
      setOnBlurImageInput(false);
    }

  };






  const addNewCategory = () => {
    // const validated = checkValidation();

    // if (validated) {
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
        name: name123.toUpperCase(),
        categoryType: "fnv",
      }),
    })
      .then((res) => {
        res.json();
        if (res.status === 201) {
          toast.success("Category added Successfully!!", { theme: "colored" });
        } else if (res.status === 503) {
          toast.warn("Please add category name to proceed", {
            theme: "colored",
          });
        } else if (res.status === 404) {
          toast.warn("Category already exist. Please Choose from dropdown", {
            theme: "colored",
          });
        }
        //  window.location.reload()
      })
      // .then((result) => setData(result.rows))
      .catch((err) => console.log("error"));


    // window.location.reload()
  };




  const loadOptions = (searchvalue, callback) => {
    setTimeout(
      () => {
        if (searchvalue.length >= 3) {
          props.actions.getItem(searchvalue).then(res => {
            let data = res
            setRecords(data)
            console.log(res, "response")

            // const array=[]
            let array = data.map((item) => {
              return { value: item._id, label: item.material_desc }
            })
            console.log(array, "array list")
            const filter = array.filter(options => options.label.toLowerCase().includes(searchvalue.toLowerCase()))
            // console.log(filter, searchvalue, "searchvalue")
            callback(filter)
          })
        }
      }
    )

    // if(searchvalue.length>3){

    // }else{
    //   console.log("length is not much")

    // }

  }

  const handlechange = (selected) => {
    const itemid = selected.value
    // setSelectedOptions(selected)
    console.log(itemid, "item id is")
    props.actions.getItemDetails(itemid).then(res => {
      setMaterialData(res)
      // console.log(res, "asdfe")
    })

    // console.log(itemid, "selected")
  }

  // console.log("material code", itemId);

  const handleclick = () => {
    setCounter(1)
    setDisableButton(true)
    const temp = [...questionList]
    const newObj = {
      question: "",
      options: []
    }
    temp.push(newObj)
    setQuestionList(temp)
    setDisabled(true)
  }

  const addoption = (index) => {
    setOptions(options + 1)
    let temp = [...questionList]
    let latestData = temp[index].options
    let newObj = { option: "" }
    latestData.push(newObj)
  }


  const saveandsubmit = (index) => {
    if (questionList[index].question == "") {
      // let temp = [...questionList]
      // temp[index].splice(index, 1)
      // setQuestionList(temp)
      // setMsg("Please enter question")


    } else if (questionList[index].options == "") {
      setMsg("Please enter option")
      console.log("please enter option")
    } else if (questionList[index].options.length < 2) {
      setMsg("Please enter atleast two option")
    } else {

      let temp = [...savedList]
      temp.push(questionList[0])
      setSavedList(temp)
      setQuestionList([])
      setCounter(0)
      props.actions.saveQuestion(temp)
      setDisableButton(false)
    }



  }
  const canceloption = (index, key) => {
    let temp = [...questionList]
    temp[index].options.splice(key, 1)
    setQuestionList(temp)
  }


  const handlequestion = (e, index) => {

    let ques = e.target.value
    let temp = [...questionList]
    temp[index].question = ques
    setQuestionList(temp)
    setDisabled(false)
  }

  const handleoptionchange = (e, key, index) => {
    let opt = e.target.value
    let temp = [...questionList]
    temp[index].options[key].option = opt
    setQuestionList(temp)
    setMsg("")

  }
  const deletequestionBox = (index) => {
    console.log(index, "index")
    let temp = [...questionList]
    temp.splice(index, 1)
    setQuestionList(temp)
    setDisableButton(false)
  }


  const handlemarketChange = (event) => {
    const { target: { value }, } = event;
    console.log(event.target.value, "value is")

    if (value[value.length - 1] === "all") {
      let temp = marketList?.map((item) => item)
      setSelectedMarket(selectedMarket?.length === marketList?.length ? [] : temp);


      return;
    }

    const preventDuplicate = value?.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i);
    setSelectedMarket(
      // On autofill we get a the stringified value.
      typeof preventDuplicate === 'string' ? preventDuplicate.split(',') : preventDuplicate
    );
  };
  const handleCheckmultiple = (e) => {
    if (e.target.checked) {
      console.log(e.target.checked, "target")
      let array = marketList?.map((item) => item)

      // console.log(array.length, marketList.length, "length")
      setSelectedMarket(marketList)


    } else {
      setSelectedMarket([])

    }
  }
  useEffect(() => {
    let temp = selectedMarket
    console.log(temp, "data")
    let market =marketId
    console.log(market,typeof market,"market")
  }, [selectedMarket])
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
                  <AsyncSelect
                    // cacheOptions
                    classNamePrefix="testSelect"
                    // options={{label:"hello", value:"world"}}
                    loadOptions={loadOptions}
                    //  value="selected"
                    placeholder="Search..."
                    onChange={handlechange}
                    style={{fontSize:"20px",fontWeight:"900"}}

                  />


                </Grid>
                <Grid item xs={4} sx={{ marginTop: "40px" }}>
                  <Typography component="p" style={{ marginBottom: "4px" }}>Item Code <span style={{ color: "red" }}>*</span></Typography>

                  {/* <input type="text" value={materialData?.itemId} placeholder="Item Code" style={{
                    // fontVariant: tabular-nums,
                    padding: "0px 10px",
                    lineHeight: 1.5715,
                    width: "100%", borderRadius: "5px", border: "1px solid #ccc", height: "50px"
                  }}
                    required={true}
                    disabled={true}
                  /> */}
                  <TextField
                    size="small"
                    fullWidth
                    value={materialData?.itemId}
                    placeholder="Item Code"
                    sx={{
                      '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled ': {
                      
                        "-webkit-text-fill-color": "black"
                     
                      
                      }
                    }}
                    required={true}
                    disabled={true}

                  />


                </Grid>
                <Grid item xs={4}>
                  <Typography component="p" style={{ marginBottom: "5px" }}>UOM <span style={{ color: "red" }}>*</span></Typography>

                  {/* <input type="text" value={materialData?.otherUoms.map((item) => { return (item.uom) })} placeholder="UOM"
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
                    required={true} /> */}

                  <TextField
                    size="small"
                    fullWidth
                    value={materialData?.otherUoms.map((item) => { return (item.uom) })}
                    placeholder="Item Code"
                    sx={{
                      '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled ': {
                      
                        "-webkit-text-fill-color": "black"
                     
                      
                      }
                    }}
                  
                  
                   
                    required={true}
                    disabled={true}

                  />
                </Grid>

              </Grid>
              <Grid container xs={10} style={{ marginTop: "20px" }} spacing={4}>
                <Grid item xs={4}>
                  <Typography component="p" style={{ marginBottom: "5px", marginLeft: "3px" }}>Category <span style={{ color: "red" }}>*</span></Typography>

                  {/* <input type="text" value={materialData?.material_group} placeholder="Category"
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
                  /> */}
                   <TextField
                    size="small"
                    fullWidth
                    value={materialData?.material_group}
                    placeholder="Category"
                    sx={{
                      '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled ': {
                      
                        "-webkit-text-fill-color": "black"
                     
                      
                      }
                    }}
                    required={true}
                    disabled={true}

                  />
                </Grid>
                <Grid item xs={4} >
                  <Typography component="p" style={{ marginBottom: "5px", marginLeft: "3px" }}>Market <span style={{ color: "red" }}>*</span></Typography>

                  <FormControl
                    fullWidth
                    size="small"
                    mt={5}
                  >
                    <InputLabel id="mutiple-select-label">Market</InputLabel>


                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      label="Select"
                      variant="outlined"
                      value={selectedMarket}
                      onChange={handlemarketChange}

                      renderValue={(selected) => selected.map((x) => x.name).join(', ')}
                      MenuProps={MenuProps}
                    >
                      <MenuItem
                        value="all"
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={marketList?.length > 0 && selectedMarket?.length === marketList?.length}

                            onChange={(e) => { handleCheckmultiple(e) }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="Select All"
                        />
                      </MenuItem>
                      {marketList?.map((variant) => (
                        <MenuItem key={variant._id} value={variant}>
                          <Checkbox checked={
                            selectedMarket?.findIndex(item => item._id === variant._id) >= 0
                          } />
                          <ListItemText primary={variant.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                
                </Grid>
                <Grid item xs={4}>
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
            
              </Grid>
            </CRow>


          </div>
        </div>
        <br />





        <Grid container style={{
          marginTop: "20px",
          height: "auto"
        }}>
          <Grid item xs={6}
          //  style={{border:"2px solid black"}}
          >
            <Button disabled={disableButton} variant="contained" style={{ margin: "20px", backgroundColor: "#00416b", color: "white" }} onClick={handleclick} ><AddIcon /> Add Your Questions</Button>

            {questionList.map((data, index) => {
              return (
                <>
                  <form action="">

                    <Card style={{ margin: "20px" }} elevation={6}>
                      <CardHeader
                        // style={{height:"20px"}}
                        action={
                          <IconButton color="primary" aria-label="settings">
                            <ClearIcon style={{ fontSize: "30px" }} onClick={() => deletequestionBox(index)} />
                          </IconButton>
                        }
                      />
                      <CardContent>
                        <Grid container >
                          <Grid style={{ margin: "0px 20px" }} item xs={12}>
                            <TextField
                              variant="standard"
                              label="Enter Your Question"
                              key={index}
                              size="small"
                              value={data.question}
                              onChange={(e) => { handlequestion(e, index) }}
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
                                      <Grid style={{ margin: "10px 20px" }} item xs={6}>
                                        <TextField
                                          variant="standard"
                                          label="Please Enter Your Text"
                                          color="primary"
                                          size="small"
                                          value={item.option}
                                          onChange={(e) => { handleoptionchange(e, key, index) }}

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
          <Grid item xs={6}
          //  style={{border:"2px solid black "}}
          >
            <Grid container xs={12} direction="column">
              {
                questiondetails && questiondetails.map((item) => {
                  return (
                    <>
                      <div marginTop="30px">

                        <Typography style={{ backgroundColor: "#00416b", padding: "10px", fontSize: "20px", color: "white" }} component='p'> <span style={{ fontWeight: '600' }}>Question : </span>{item.question} </Typography>
                        <Grid container xs={12} style={{ marginTop: "10px" }}>
                          {
                            item.options.map((option, index) => {
                              return (
                                <Grid item xs={4} >
                                  <div>
                                    <Typography style={{ fontSize: "20px", padding: "10px" }} component='p'><span style={{ fontWeight: "600" }}>Option  {index + 1}:</span> {option.option}</Typography>
                                  </div>
                                </Grid>
                              )
                            })
                          }



                        </Grid>
                      </div>
                    </>
                  )
                })
              }


            </Grid>
          </Grid>
          <Grid container style={{ justifyContent: "end", marginTop: "20px" }}>
            <Grid item xs={2} style={{ alignSelf: "center", marginRight: "25px" }}>
              <Button
                onClick={(e) =>
                  // updatefinalItemMasterDetails()
                  onBlurImageInput || selectedFile || inputvalue
                    // ? submitForm(e)
                    ? submitformdetails(e)
                    : updateformdetails(e)
                }
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

      </form>
    </div>
  );
  <ToastContainer transition={Zoom} />;
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
        getCategory: actions.getAllFnvCategory,
        getItemDetails: actions.getItemDetails
      },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
