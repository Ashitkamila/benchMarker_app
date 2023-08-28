import { Paper, Button, ButtonBase, formData } from "@material-ui/core";
import { Space } from "antd";
import React, { useEffect, useState } from "react";
// import { InputControl } from '../../utils/FormControls';
import { InputControl } from "./../../utils/FormControls";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Plus from "./plus.svg";
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
import * as actions from "../../redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { textAlign, margin } from "@mui/system";
import { ToggleButton } from "@mui/material";
import Input from "@mui/material/Input";
import {
  getAllGetItemName,
  getAllFnvCategory,
} from "./../../redux/fnvcategory/fnvcategoryAction";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { pink } from "@mui/material/colors";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { configuration } from "../../services/appConfig";

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);

function EditTransportationcommission(props) {
  const { importedData, formData, itemData } = props;
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
  const [updatedRecords, setUpdatedRecords] = useState([]);
  const [material_number, setMaterial_desc] = useState();
  const [transporatiocost, setTransportationCost] = useState();
  const [category123, setCategory123] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [UoM, setUoM] = useState();

  const goPrev = (event) => {
    window.location.reload();
  };

  useEffect(() => {
    props.actions.getItem().then((res) => {
      const fetchoneiddata = res.find((ele) => ele.uom === "PAK");
      console.log("green pees", fetchoneiddata);
      console.log("vvvvvvvvvvv", res);
      setRecords(res);
      // const marketarray = res.find(ele => ele._id)

      // setValue(value);
      // setMarkets(res);
      // setselectedMarketList([]);
    });
    props.actions.getCategory().then((res) => {
      //    console.log('vinay123', res )
      setCategoryRecords(res);
      // const marketarray = res.find(ele => ele._id)

      // setValue(value);
      // setMarkets(res);
      // setselectedMarketList([]);
    });
  }, []);

  // const handleFNVNameChange = (value, e) => {
  //   // console.log('gggggggg', value)

  //   const id = value;

  //   //  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'
  //   let initProducts = async () => {
  //     await fetch("http://13.70.26.58:8010/api/v1/fnv/itemCode?itemId=" + id, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: userDetails.token,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((response) => {
  //         setItemId(response.data[0].itemId);
  //         setMaterial_desc(response.data[0].material_number);
  //         setItemName(response.data[0].item);
  //         // console.log('ddssasasa', response.data[0].itemName)
  //       })
  //       //   .then((result) => setData(result.rows))
  //       .catch((err) => console.log("error"));
  //   };
  //   initProducts();
  // };

  const handleCategoryChange = (value) => {
    // console.log('gggggggg', value)

    props.actions.getCategory(value).then((res) => {
      setCategory123(value);
    });
  };
  // const updatefinalItemMasterDetails = () => {
  //   //  alert(name123);
  //   // alert(category123);
  //   const categorydata = category123
  //     ? category123
  //     : name123
  //     ? name123.toUpperCase()
  //     : "";
  //   // console.log('catdata', categorydata);
  //   // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmYyZjdlN2E3NDJiN2IyYzc4NzQ3ZjdlNzg3ZDc5N2Q3NTI5MmUyZTc4MmYiLCJpYXQiOjE2NDA4NDU5OTUsImV4cCI6MTY0MTQ1MDc5NX0.KF7LhxiJ_cx4WGMxAn7Ggd2FNnJvkYQMGrcRljrRGyo'
  //   //    const validated = checkValidation();
  //   //    if (validated) {
  //   fetch("http://13.70.26.58:8010/api/v1/item", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: userDetails.token,
  //     },
  //     body: JSON.stringify({
  //       itemName: itemName,
  //       material_no: itemId,
  //       itemType: "fnv",
  //       category: categorydata,
  //       UoM,
  //       active: "true",
  //       mandatory: "true",
  //       baseQuantity: "1",
  //       page: "2",
  //       conversionFactor: "10",
  //       shortName: null,
  //       description: null,
  //       weightGrams: 0,
  //       appliesOnline: 1,
  //       itemProductType: 1,
  //       itemTaxType: "N",
  //       manufacturer: "NA",
  //       length: 0,
  //       breadth: 0,
  //       height: 0,
  //       weight: 0,
  //       shelf: "0",
  //       box: "0",
  //       rack: "",
  //       foodType: 1,
  //       taxId: 5001,
  //       decimalsAllowed: 3,
  //       status: "R",
  //       // variety: [""],

  //       activeOnLocations: [
  //         {
  //           locationId: "5d9d9bb30f960110e027e2eb",
  //           active: true,
  //           mandatory: true,
  //         },
  //         {
  //           locationId: "5e0f02ec310f95592258a499",
  //           active: true,
  //           mandatory: true,
  //         },
  //         {
  //           locationId: "5e37c491ab3db43e546bf924",
  //           active: true,
  //           mandatory: true,
  //         },
  //         {
  //           locationId: "5e37c3bf175f213e4ed9aacd",
  //           active: true,
  //           mandatory: true,
  //         },
  //         {
  //           locationId: "5e37c499657c4e3e62d62e96",
  //           active: true,
  //           mandatory: true,
  //         },
  //         {
  //           locationId: "5e37c3b64079403e77392e99",
  //           active: true,
  //           mandatory: true,
  //         },
  //         {
  //           locationId: "5e37c3d2704d663e69cf4214",
  //           active: true,
  //           mandatory: true,
  //         },
  //         {
  //           locationId: "5e37c3ca9d316a3e5b76218b",
  //           active: true,
  //           mandatory: true,
  //         },
  //       ],
  //     }),
  //   }).then((res) => {
  //     res.json();
  //     if (res.status === 201) {
  //       toast.success("FnV Items master details added successfully ", {
  //         theme: "colored",
  //       });
  //       window.location.reload();
  //     } else if (res.status === 503) {
  //       toast.warn("Please fill all the Fields", { theme: "colored" });
  //     } else if (res.status === 404) {
  //       toast.warn(" Please fill all the Fields or Item Name already exist ", {
  //         theme: "colored",
  //       });
  //     } else if (res.status === 400) {
  //       toast.warn("Please fill all the Fields ", { theme: "colored" });
  //     }
  //   });
  //   //    .then((result) => setData(result.rows))
  //   //    .catch((err) => console.log('error'))
  //   // }
  // };

  // const addNewCategory = () => {
  //   // const validated = checkValidation();

  //   // if (validated) {
  //   fetch("http://13.70.26.58:8010/api/v1/transportation/cost/update", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: userDetails.token,
  //     },
  //     body: JSON.stringify({
  //       // itemName,
  //       // baseQuantity,
  //       // UoM: formData.UoM,
  //       // name: name123.toUpperCase(),
  //       // categoryType: "fnv",
  //       // item: formData.item,
  //       _id: formData?._id,
  //       price: transporatiocost ? transporatiocost : formData?.price,
  //       // item_code: formData.item_code,
  //       // uom: formData.uom,
  //     }),
  //   })
  //     .then((res) => {
  //       res.json();
  //       console.log("hhhhh", res.message);
  //       if (res.status === 200) {
  //         toast.success(" Added Successfully!!", { theme: "colored" });
  //         // } else if (res.status === 503) {
  //         //   toast.warn("Please add name to proceed", {
  //         //     theme: "colored",
  //         //   });
  //         // } else if (res.status === 404) {
  //         //   toast.warn("Category already exist. Please Choose from dropdown", {
  //         //     theme: "colored",
  //         //   });
  //       }
  //       // window.location.reload();
  //     })
  //     // .then((result) => setData(result.rows))
  //     .catch((err) => console.log("error"));

  //   //   }
  //   //   else {
  //   //       alert('Please add the Category name first to proceed')
  //   //   }
  //   alert("value should be in between 0 and 1");

  //   //  window.location.reload()
  // };

  //   const checkValidation = () => {
  //       if (name123?.length > 0 && UoM?.length > 0 && category123?.length > 0) {
  //         return true
  //     }
  //     else {
  //         alert('Please add the category name to proceed')
  //         return false
  //     }
  //   }

  const addNewCategory = (event) => {
    event.preventDefault();
    (async () => {
      try {
        const data = {
          id: formData?._id,
          price: transporatiocost ? transporatiocost : formData?.price,
          uom: UoM,
          updatedBy: userDetails._id,
        };
        await axios
          .put(
            `${configuration.apiBaseUrl}/transportation/arbitrage/cost/update`,
            data
          )
          .then((response) => {
            console.log("responselogin");
            if (response.data.status == 200 && response.data.message) {
              console.log(response.data);
              toast.error(response.data.message, {
                position: "top-center",
                autoClose: 8000,
                theme: "colored",
              });
            } else {
              toast.success(response.data.data, {
                position: "top-center",
                autoClose: 10000,
                theme: "colored",
              });
            }
            window.location.reload();
          });
      } catch (err) {
        console.log(err);
        if (err.response) {
          console.log("aaaaa", err.response.data.message);
          toast.error({
            icon: "warning",
            text: err.response.data.message
              ? err.response.data.message
              : err.response.data.error,
          });
        } else {
          toast.error({
            icon: "warning",
            text: "something went wrong",
          });
        }
      }
    })();
  };

  return (
    <div>
      <form className="borders">
        <div>
          <div className="row">
            <div className="row p-5 g-3 align-items-center ml-10">
              <CRow
                className="g-4  col-md-12 d-flex justify-content-center"
                xs="auto"
              >
                <CCol md={4}>
                  <InputControl
                    type="text"
                    labelName="Item Name"
                    name="itemId"
                    //    onChange={onChangeHandler('itemId')}

                    placeholder="Item Name"
                    value={formData?.item}
                    required={true}
                    disabled={true}
                  />
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
                    onChange={(e) => setName123(e.currentTarget.value)}
                    // onChange={onChangeHandler('itemId')}
                    placeholder="Item Code"
                    value={formData?.item_code}
                    required={true}
                    disabled={true}
                  />
                </CCol>

                <CCol md={3}>
                  <InputControl
                    type="text"
                    style={{
                      width: "22vw",
                      height: "35px",
                      borderRadius: "5px",
                    }}
                    labelName="UOM"
                    name="itemId"
                    onChange={(e) => setName123(e.currentTarget.value)}
                    // onChange={onChangeHandler('itemId')}
                    placeholder="Item Code"
                    value={formData.uom}
                    required={true}
                    disabled={true}
                  />
                </CCol>
      
              </CRow>

              <CRow
                className="g-2 col-md-12 d-flex justify-content-center"
                md={8}
              >
                <CCol md={4}>
                  <div>
                    {" "}
                    <label
                      style={{
                        width: "20vw",
                        height: "35px",
                        borderRadius: "5px",
                        border: "black",
                      }}
                    >
                      <b>Enter Price/km(₹)</b>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input
                      prefix="₹"
                      type="tel"
                      placeholder={formData?.price}
                      onChange={(e) =>
                        setTransportationCost(e.currentTarget.value)
                      }
                      // onBlur={true}
                    />
                  </div>
                </CCol>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <CCol md={4}>
                  <Button
                    onClick={addNewCategory}
                    className="btn add-price-cancel-btn px-3 mt-4"
                    size="medium"
                    style={{
                      padding: "5px",
                      height: "6vh",
                      borderRadius: "4px",
                      outlineColor: "#3484F0",
                      backgroundColor: "#5078F2",
                    }}
                  >
                    Confirm
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    variant="outlined"
                    className="btn add-price-cancel-btn px-4 mt-4"
                    style={{
                      marginRight: "25px",
                      padding: "5px",
                      height: "6vh",
                      borderRadius: "4px",
                      outlineColor: "#3484F0",
                      // backgroundColor: "#5078F2",
                    }}
                    onClick={goPrev}
                    size="medium"
                    backgroundColor="#5078F2"
                  >
                    cancel
                  </Button>
                </CCol>
              </CRow>
            </div>
          </div>
        </div>
        <br />
      </form>
      <ToastContainer transition={Zoom} />;
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
        getItem: actions.getAllGetItemName,
        getCategory: actions.getAllFnvCategory,
      },
      dispatch
    ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTransportationcommission);
