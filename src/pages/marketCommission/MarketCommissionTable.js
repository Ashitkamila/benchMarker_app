import React, { useState, useEffect } from "react";
import * as actions from "../../redux";
import {
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  
} from "@material-ui/core";
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import useTable from "../../utils/table/useTable";
import { InputControl } from "../../utils/FormControls";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import marketCommissionHeader from "./marketCommissionHeader";
import moment from "moment";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import GetAppIcon from "@material-ui/icons/GetApp";
import axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Radio } from "antd";
import classNames from "classnames";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddIcon from '@material-ui/icons/Add';


// import Time from './Time';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    // margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));
const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
console.log("user is",userDetails?._id )

function MarketCommissionTable(props) {
  const { toggleComponent, reportData, submitHandler } = props;
  const classes = useStyles();
  const [records, setRecords] = useState([]);

  const [anchorEl, setAnchorE1] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const label = { inputProps: { "aria-label": "controlled" } };
  const [value1, setValue1] = React.useState(new Date(""));
  const [value2, setValue2] = React.useState(new Date(""));
  const [usertype, setUserType] = useState("");
  const [value, setValue] = React.useState(new Date(""));
  const [date, setDate] = React.useState(new Date());
  const [searchInput, setSearchInput] = useState ('')
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);
  const [marketCommValue, setMarketCommValue] = useState("");
  const [updateTransCost, setUpdateTransCost] = useState("");
  const [editRowData, setEditRowData] = useState({});
  const [isaddTransportDetailOpen, setisaddTransportDetailOpen] =
  useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
 

  const sortAlphaOrder = (items) => {
    let tempArr = [...items];
    tempArr.sort(function (a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return tempArr;
  };

  console.log("records are in MC Table are", props.records);


  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting,getTotalrecordsAfterSearch } =
    useTable((props.records), marketCommissionHeader, filterFn, searchInput);



  const data =
  getTotalrecordsAfterSearch()?.length > 0
      ? getTotalrecordsAfterSearch().map((rec, index) => ({
        //   SrNo: index + 1,
        MarketName: rec.name,
        MarketCommission: rec.marketCommission,
        
          
        }))
      : [];

 
  
  
  




  const handleSearch = (e) => {
  setSearchInput(e.target.value)
  let searchValue = e.target.value;
e.preventDefault()
    setFilterFn({
      fn: (items) => {
        if (searchValue == "") return items;
        else
          return items.filter((value) => {
            console.log(value)
            // console.log(target.value)¿¿
            return value?.name
              ?.toLowerCase()
              .includes(searchValue.toLowerCase())
              
          });
      },
    });
  };

  const handleClick = (event) => {
    setAnchorE1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };

  const handleEditCloseDialog = () => {
    setEditDialogOpen(!isEditDialogOpen);
    resetUpdateData();
  };

  const openTransportUpdateDialog = () => {
    setEditDialogOpen(!isEditDialogOpen);
  };

  const updateTransport = (record) => {
     setEditRowData(record);
    openTransportUpdateDialog();
    //  setRowData(record)
  };

  
  const openAdddialogue = () => {
    setisaddTransportDetailOpen(true);
  };
  const addTransportation = (record) => {
    openAdddialogue();
    //  setRowData(record)
  };
  
  const addhandleCloseDialog = () => {
    setisaddTransportDetailOpen(!isaddTransportDetailOpen);
    // resetAddData();
  };

   /////////////FORM SUBMIT FOR ADD//////////////////
// const resetAddData = () =>{
//   setRate("");
//   setWeight("");
//   setSelectedDate(moment(today).format("YYYY-MM-DD"));
// }
  
  const addFormSubmitHandler = (e) => {
    e.preventDefault();

    console.log("new add value");
    // console.log(source, "source");
    // console.log(destination, "destination");

    // console.log(rate, "rate");
    // console.log(weight, "weight");

    // if (!selectedDate) {
    //   alert("Select Date");
    //   return;
    // }

    // // if(source && Object.keys(source).length > 0)
    // if (!Object.keys(source).length) {
    //   alert("Select Source Value");
    //   return;
    // }

    // // if (
    // //   (source && source.value == "") ||
    // //   source.value == undefined ||
    // //   source.value == null
    // // ) {
    // //   alert("Select Source Value");
    // // }

    // if (!Object.keys(destination).length) {
    //   alert("Select destination Value");
    //   return;
    // }

    // if (source.value == destination.value) {
    //   alert("source and destination are same");
    //   return;
    // }
    // if (rate == "" || rate == undefined || rate == null) {
    //   alert("Enter Transportation Cost");
    //   return;
    // }
    // if (rate ==0 || rate<0) {
    //   alert("Enter Valid Transportation Cost");
    //   return;
    // }

    // if (weight == "" || weight == undefined || weight == null) {
    //   alert("Enter Minimum weight Required (Kg)");
    //   return;
    // }

    // if (weight == 0 || weight <0) {
    //   alert("Enter Valid Minimum weight Required (Kg)");
    //   return;
    // }



    //  console.log("records are", records)
    
    // for(var i=0;i<records.length;i++)
    // {
    //   if( moment(records[i].effective_date).format("DD-MM-YYYY")==moment(selectedDate).format("DD-MM-YYYY") && records[i].SourceName==source.label && records[i].DestinationName==destination.label)
    // {
    //   alert("Data Already exists for given date and location")
    //   addhandleCloseDialog();
    //   resetAddData();
    //   return;
    // }

    // }
  
    // const data = {
    //   SourceCode: source.value,
    //   SourceName: source.label,
    //   DestinationCode: destination.value,
    //   DestinationName: destination.label,
    //   price_per_uom: rate,
    //   minimum_wt: weight,
    //   effective_date: moment(selectedDate).format("YYYY-MM-DD"),
    // };
    // props.actions.addTransMat(data);
    // resetAddData();
    // setisaddTransportDetailOpen(false);

    
  };

  ///////////////FORM SUBMIT FOR UPDATE///////////////////////////////////

  const updateTransCostChangeHandler = (e) => {
    setMarketCommValue(e.target.value);
  };
  const resetUpdateData = ()=>{
    setMarketCommValue("")
    
  }  
  
  const updateFormSubmitHandler = (e) => {
    e.preventDefault();

    if (marketCommValue == "" || marketCommValue == undefined || marketCommValue == null) {
      toast.info("Enter valid Market Commission value", { theme: "colored" });
      return;
    }

    if (marketCommValue > 100 || marketCommValue<0) {
      toast.info("Enter value between 0 and 100", { theme: "colored" });
            return;
    }

    

    const data = {

      marketCommission: marketCommValue,
     updatedBy: userDetails._id
   
  }


  props.actions.updateMcData(data, editRowData);
resetUpdateData();
   
    handleEditCloseDialog()

    // const data = {
    //   price_per_uom: marketCommValue,
    //   minimum_wt: updateWeight,
    // };
    // props.actions.updateTransMat(data, editRowData);

    // resetUpdateData();
   
    // handleEditCloseDialog()

    // console.log("MC Update data", data)
    console.log("check",editRowData)
  };

  
  return (

    <div>
    <div className={classes.pageContent} style={{}}>
      <div className="row">
        <div className="">
          <div className="col-md-12 d-flex ">
            <nav class="navbar navbar-light ">
              <form class="form-inline border" autoComplete="off">
                <div class="input-group">
                {/* <input
                      className="search-input py-1"
                      style={{ width: "15vw", border: "none", padding: "1px" }}
                      type="text"
                      name="searchText"
                      placeholder=" Search item by name  "
                      onChange={handleSearch}
                    />

                    <IconButton
                      color="primary"
                      type="submit"
                      className={classNames("px")}
                      aria-label="Search"
                      // title="Search Shortfall"
                      disabled
                    >
                      <SearchIcon style={{ color: "#5078F2" }} />
                    </IconButton> */}
                </div>
              </form>
            </nav>
            {/* <button
                // onClick={toggleComponent}
                type="button"
                class="btn btn-primary"
                backgroundcolor="#5078F2"
                style={{marginLeft:"78%"}}
                onClick={() => addTransportation()}
              >
                {" "}
                <AddIcon
                  style={{
                    backgroundcolor: "#5078F2",
                    fontSize: "16px",
                    borderRadius: "20px",
                   
                   
                  }}
                />
                &nbsp;Add New
              </button> */}
            <div className="d-flex align-items-center ml-9 px-4 col-1">
              <Button
                type="primary"
                style={{marginLeft:"1200px", marginBottom:"10px"}}
                onClick={handleClick}
                shape="circle"
                icon={<DownloadOutlined />}
              />
            </div>
          </div>

         
        </div>
      </div>
      <div className="col-sm-6 d-flex justify-content-end">
              {/* <Button
                // style={{ height: "30px", width: "100px" }}
                // className={classNames("addButton p-3 ")}
                // // onClick={() => addTransportation()}
                variant="contained"
                backgroundcolor="#5078F2"
                // color="primary"
                // size="small"
                style={{marginLeft:"10px"}}
                  type="submit"
                  className="btn btn-primary"
                  // onClick={updateFormSubmitHandler}
              >
                Add New
              </Button> */}
              
            </div>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().length > 0 ? (
            recordsAfterPagingAndSorting().map((record, index) => (
              <TableRow key={record._id}>
                {/* <TableCell>{index + 1}</TableCell> */}

                
                {/* <TableCell style={{ textAlign: "left" }}>{record._id}</TableCell> */}
                <TableCell style={{ textAlign: "left" }}>{record.name}</TableCell>
                <TableCell style={{ textAlign: "left" }}>{record.marketCommission}</TableCell>
                <TableCell>
                    <div className="d-flex  ">
                      <Tooltip title="Edit Market Comission" placement="bottom">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            updateTransport(record);
                          }}
                          // onClick={() => editClickHandler(record)}
                          className={`border-0 p-1 action-btn`}
                          style={{ marginRight: "10px" }}
                          // disabled
                        >
                          <OpenInNewIcon />
                        </button>
                      </Tooltip>
                      {/* <Tooltip title="Delete Market Comission" placement="bottom">
                        <button
                          //  onClick={() => deleteClickHandler(record)}
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   DeleteConfirm();
                          // }}
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   DeleteConfirm();
                          //   // deleteHandler(record);
                          //   setMatDelete(record)
                          //     }}
                          className={`border-0 p-1 action-btn`}
                          // disabled
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </Tooltip> */}
                    </div>
                  </TableCell>
                
              
              </TableRow>
            ))
          ) : (
            <div
              className="mt-5"
              style={{
                position: "absolute",
                left: "50%",
                color: "purple",
                fontSize: "15px",
              }}
            >
              <b> Data Not Found...</b>
            </div>
          )}
        </TableBody>
      </TblContainer>
      <TblPagination />
      
       {/* Popup for ADD Transportation  CONFIRMATION ->popupadd */}
       <Dialog open={isaddTransportDetailOpen} style={{ maxHeight: "100vh" }}>
        <DialogTitle
          id="form-dialog-title"
          className={classNames("text-capitalize")}
        >
          {" "}
          Add Market Commission Details
        </DialogTitle>

        <DialogContent>
          <form className="row  p-0">
           

           

           
            <div className="col-6" style={{ marginTop: "20px" }}>
              <InputControl
                type="text"
                labelName="Enter Market Name"
                name="entername"
                placeholder=""
                // onChange={rateChangeHandler}
                required={true}
                // value={rate}
              />
            </div>
            <div className="col-6" style={{ marginTop: "20px" }}>
              <InputControl
                type="text"
                labelName="Enter Market Commission"
                name="entermarketcommission"
                placeholder=""
                // onChange={weightChangeHandler}
                required={true}
                // value={weight}
              />
            </div>
            <div className="col-12 d-flex justify-content-end">
              <div>
                <button
                  // onClick={addhandleCloseDialog}
                  type="button"
                  class="btn btn-outline-dark"
                >
                  Cancel
                </button>
              </div>
              <div className="ml-3">
                <button
                  // type="submit"
                  className="btn btn-primary"
                  onClick={(e) => addFormSubmitHandler(e)}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      

        {/* Popup for Editing or updating market commission Details */}
        <Dialog open={isEditDialogOpen} style={{ maxHeight: "100vh" }}>
        <DialogTitle
          id="form-dialog-title"
          className={classNames("text-capitalize")}
        >
          {" "}
          Update market commission 
        </DialogTitle>
        <DialogContent>
          <form className="row  p-0">
          <div className="col-6">
              <InputControl
                type="text"
                labelName="Market Name"
                name="marketname"
                // placeholder="1999"
                // value={rowData && rowData.price_per_uom}
                 value={editRowData.name}
                disabled={true}
              />
            </div>
            <div className="col-6">
              
            </div>
           <div className="col-6">
              <InputControl
                type="number"
                labelName="Current Market Commission (%)"
                name="currentmarketcommissionpercent"
                // placeholder="1999"
                // value={rowData && rowData.price_per_uom}
                 value={editRowData.marketCommission}
                disabled={true}
              />
            </div>

            <div className="col-6">
              <InputControl
                type="number"
                labelName="New Market Commission (%)"
                name="newmarketcommissionpercent"
                placeholder=""
                onChange={updateTransCostChangeHandler}
                value={marketCommValue}
                required={true}
              />
            </div>
           <div className="col-12 d-flex justify-content-end" style={{marginTop:"20px"}}>
              <div>
                <button
                  onClick={handleEditCloseDialog}
                  type="button"
                  class="btn btn-outline-dark"
                >
                  Cancel
                </button>
              </div>
              <div className="ml-3">
                <button
                style={{marginLeft:"10px"}}
                  type="submit"
                  className="btn btn-primary"
                  onClick={updateFormSubmitHandler}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <CSVLink
            data={data}
            filename={"MarketCommission.csv"}
            className="btn bg-gray w-100"
            target="_blank"
          >
            <span>
              <GetAppIcon fontSize="small" />
              Export
            </span>
          </CSVLink>
        </MenuItem>
      </Menu>
    </div>
    <ToastContainer transition={Zoom} theme="colored" />
  </div>
);

   

    
  
}


const mapStateToProps = (state) => {
  console.log("new", state)
return {
  marketCommData:state.MarketCommission.marketCommData,
  
};
};

const mapDispatchToProps = (dispatch) => {
return {
  actions: bindActionCreators(
    {
      marketCommission: actions.getAllMarketcommissionData,
      updateMcData: actions.updateMcData
    },
    dispatch
  ),
};
};
export default connect(
mapStateToProps,
mapDispatchToProps
)(MarketCommissionTable);







// export default MarketCommissionTable;


