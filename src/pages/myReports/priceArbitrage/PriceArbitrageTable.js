import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  TableBody,
  TableCell,
  TableRow,
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
import useTable from "../../../utils/table/useTable";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PriceArbitrageHeader from "./PriceArbitrageHeader";
import moment from "moment";
import TextField from "@mui/material/TextField";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
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
import {configuration} from "../../../services/appConfig";

// import Time from './Time';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    // margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));
const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
// console.log("Arbitrage user details are", userDetails._id)

const FeedbackSelect = (props) => {
  let disabled = false;
  if (props.feedback === true) {
    disabled = true;
  }
  if (disabled)
  {
    return (<select required className="text" labelName="Select Feedback" value={props.feedback}
                    disabled
                    style={{
                      width: "130px",
                      color: "#dddddd",
                      height: "40px",

                      borderRadius: "5px",
                      marginLeft: "12px",
                    }}
            onChange={(e) => props.handle(e, props.record)} type="text">
                    <option value="">Select option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
    </select>);
  }
  return (<select required className="text" labelName="Select Feedback" value={props.feedback}
                    style={{
                      width: "130px",

                      height: "40px",

                      borderRadius: "5px",
                      marginLeft: "12px",
                    }}
            onChange={(e) => props.handle(e, props.record)} type="text">
                    <option value="">Select option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
  </select>);
}

function PriceArbitrageTable(props) {
  const { toggleComponent, reportData, submitHandler } = props;
  const classes = useStyles();


  const [anchorEl, setAnchorE1] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const label = { inputProps: { "aria-label": "controlled" } };
  const [value1, setValue1] = React.useState(new Date(""));
  const [value2, setValue2] = React.useState(new Date(""));
  const [usertype, setUserType] = useState("");
  const [value, setValue] = React.useState(new Date(""));
  const [date, setDate] = React.useState(new Date());
  const [searchInput, setSearchInput] = useState('')
  const [feedback, setFeedback] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const minDate = new Date("2020-01-01T00:00:00.000");



  let today = moment(new Date()).format("DD/MM/YYYY");


  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting, getTotalrecordsAfterSearch } =
    useTable(props.records, PriceArbitrageHeader, filterFn, searchInput);

  const data =
    getTotalrecordsAfterSearch()?.length > 0
      ? getTotalrecordsAfterSearch().map((rec, index) => ({
        //   SrNo: index + 1,
        Item: rec.item,
        Source: rec.source,
        Destination: rec.destination,
        Distance_Meter: rec.distance.toFixed(2),
        Arbitrage_Price_Rupees: rec.arbitary_price.toFixed(2),
        Destination_Final_Price_Rupees: rec.destinationFinalPrice.toFixed(2),
        Date: moment(rec?.createdAt).format("DD/MM/YYYY"),
        Provide_FeedBack: (today !== moment(rec?.createdAt).format("DD/MM/YYYY") ?
          rec?.feedback === true ? "YES" :
            (rec.feedback === "" || !rec?.feedback) ? "NO"
              : "NO"
          : rec?.feedback === true ? "YES" : rec?.feedback === false ? "NO" : "")

      }))
      : [];

  // const [records, setRecords] = useState([recordsAfterPagingAndSorting()]);

  // useEffect(() => {
  //   setRecords(props.reportData);
  // }, []);

  //   console.log("the records are", props.reportData )
  //   console.log("New Details are", agmarkDetailData)
  console.log("records ", props.records);
  console.log("records ", props.records);



  const handleSearch = (e) => {
    setSearchInput(e.target.value)
    let searchValue = e.target.value;
    e.preventDefault()
    setFilterFn({
      fn: (items) => {
        if (searchValue === "") return items;
        else
          return items.filter((value) => {
            console.log(value)
            // console.log(target.value)¿¿
            return value?.state
              ?.toLowerCase()
              .includes(searchValue.toLowerCase()) ||
              value?.item
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              value?.source
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              value?.destination
                .toLowerCase()
                .includes(searchValue.toLowerCase());
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

  const handleFromChange = (newValue1) => {
    setValue1(newValue1);
    console.log("new1", value1);
    let fromnew = moment(newValue1).format("YYYY-MM-DD");
    console.log("converted value is", fromnew);
    setFilterData({ ...filterData, from: fromnew });
  };

  const handleToChange = (newValue2) => {
    setValue2(newValue2);
    console.log("new2", value2);
    let tonew = moment(newValue2).format("YYYY-MM-DD");
    setFilterData({ ...filterData, to: tonew });
  };

  const [filterData, setFilterData] = useState({
    from: "",
    to: "",
  });

  //   var filterDateData = {

  //     from: moment(value1).format("YYYY-MM-DD"),

  //     to: moment(value2).format("YYYY-MM-DD"),

  // }

  ///////////////////////////////
  //   var date = new Date();

  // // add a day
  // date.setDate(date.getDate() + 1);
  ///////////////SUBMIT FILTER////////////////
  const submitForm = (event) => {
    event.preventDefault();
    console.log(filterData);
    var today = new Date();
    console.log(today);
    // if((filterData.from =='' || filterData.from==null )  || (filterData.to =="" || filterData.to  ==null) )
    // {
    //  alert("Select a filter option");
    //   return;
    // }
    submitHandler(filterData);
    // setRecords(recordsAfterPagingAndSorting());
  };

  const submitFeedbackToServer = (feedback, record) => {
    const feedBackData = {
      userId: record._id,
      feedback: JSON.parse(feedback)
    }
    try {
      axios.patch(
        configuration.apiBaseUrl + `/transportation/arbitrage/feedback/${record._id}`,
        // "http://13.70.26.58:8010/api/v1/transportation/arbitrage/feedback/" + record._id,
        feedBackData
      ).then((res) => {
        toast.success(res.data.message, { theme: "colored" });
        window.location.reload();
      });
    }
    catch (err) {
      toast.error(err.data.message);
    }
  }


  // const feedbackSubmitHandler = (e, record) => {
  //   console.log("recordsOfFeedback", e);
  //   const selectedValue = e.currentTarget.value === true ? true : false;
  //   if (selectedValue) {
  //     let confirm = window.confirm('Are you sure you want to select yes. It Cannot be changed later');
  //     console.log(confirm);
  //     if (confirm) {
  //       submitFeedbackToServer(true, record);
  //     }
  //   }
  //   else {
  //     submitFeedbackToServer(false, record);
  //   }
  // }





  return (
    <div>
      <div className={classes.pageContent}>
        <div className="row">
          <div className="">
            <div className="col-md-12 d-flex justify-content-end">
              <nav class="navbar navbar-light ">
                <form class="form-inline border" autoComplete="off">
                  <div class="input-group">
                    <input
                      className="search-input py-1"
                      style={{ width: "15vw", border: "none", padding: "1px" }}
                      type="text"
                      name="searchText"
                      value={searchInput}
                      placeholder=" Search item by name  "
                      onChange={handleSearch}
                    />

                    <IconButton
                      color="primary"
                      type="submit"
                      className={classNames("px")}
                      aria-label="Search"
                    // title="Search Shortfall"
                    //   onClick={}

                    >
                      <SearchIcon style={{ color: "#5078F2" }} />
                    </IconButton>
                  </div>
                </form>
              </nav>
              <div className="d-flex align-items-center ml-9 px-4 col-1">
                <Button
                  type="primary"
                  onClick={handleClick}
                  shape="circle"
                  icon={<DownloadOutlined />}
                />
              </div>
            </div>

            <div>
              <form onSubmit={submitForm}>
                <div className="mt-2">
                  <span
                    style={{
                      color: "#DC143C",
                      fontWeight: 500,
                      fontSize: "18px",
                    }}
                  >
                    * Select atleast two dates.
                  </span>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DatePicker
                    label="From"
                    // inputFormat="MM/dd/yyyy"
                    minDate={minDate}
                    value={value1}
                    onChange={handleFromChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="To"
                    inputFormat="MM/dd/yyyy"
                    minDate={minDate}
                    value={value2}
                    onChange={handleToChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <CButton
                  // onClick={() => handleFilterClick()}
                  // onClick={props.getFilterAgmarkData(filterDateData)}
                  type="submit"
                  style={{
                    marginBottom: "6px",
                    width: "80px",
                    height: "57px",
                    borderRadius: "1rem",
                  }}
                  color="success"
                >
                  Filter
                </CButton>
              </form>
            </div>
          </div>
        </div>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().length > 0 ? (
              recordsAfterPagingAndSorting().map((record, index) => {
                console.log('testAshit', record.feedback);
                return (

                  <TableRow key={record?._id}>
                    {/* <TableCell>{index + 1}</TableCell> */}
                    {/* <TableCell>{record?._id}</TableCell> */}
                    <TableCell style={{ fontWeight: "500" }}>
                      {record?.item}
                    </TableCell>
                    <TableCell>{record?.source}</TableCell>
                    <TableCell>{record?.destination}</TableCell>
                    <TableCell>{record?.distance?.toFixed(2)}</TableCell>
                    <TableCell>{record?.arbitary_price?.toFixed(2)}</TableCell>
                    <TableCell>{record?.destinationFinalPrice?.toFixed(2)}</TableCell>
                    <TableCell style={{ textAlign: "left" }}>
                      {record?.destinationFinalPrice?.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {moment(record?.createdAt).format("DD/MM/YYYY")}
                    </TableCell>

                    {/* { (moment(record?.createdAt).format("DD/MM/YYYY"))==today?
                  <TableCell>
                    <FeedbackSelect feedback={record?.feedback} handle={feedbackSubmitHandler} record={record}/>
                  </TableCell>
                  :null
                  } */}
                    <TableCell>

                      {
                     (moment(record.createdAt).format("DD/MM/YYYY")) === today ?
                     
                        (record.feedback===true ?
                        
                        <select
                        disabled
                        style={{
                          width: "130px",
                          color: "black",
                          height: "40px",
                          borderRadius: "5px",
                          marginLeft: "12px",
                        }}

                        onChange={(e) => submitFeedbackToServer(e.target.value, record)}
                      >
                        <option value="true">Yes</option>
                      </select> : record.feedback===false ?
                     ( <select
                     defaultValue={false}
                     disabled={false}
                      style={{
                        width: "130px",
                        color: "black",
                        height: "40px",
                        borderRadius: "5px",
                        marginLeft: "12px",
                      }}

                      onChange={(e) => submitFeedbackToServer(e.target.value, record)} 
                    >
                      <option >select option</option> 
                      <option value="true">Yes</option> 
                      <option value="false">No</option> 
                      
                    </select>)
                  
                    :

                          <select required className="text" labelName="Select Feedback"
                            style={{
                              width: "130px",
                              color: "black",
                              height: "40px",

                              borderRadius: "5px",
                              marginLeft: "12px",
                            }}

                            onChange={(e) => submitFeedbackToServer(e.target.value, record)}

                          >
                            <option value="">select option</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                           
                          </select> )
                          :(
                            record.feedback===true ?
                        
                        <select
                        disabled
                        style={{
                          width: "130px",
                          color: "black",
                          height: "40px",
                          borderRadius: "5px",
                          marginLeft: "12px",
                        }}

                        onChange={(e) => submitFeedbackToServer(e.target.value, record)}
                      >
                        <option value="true">Yes</option>
                      </select> : record.feedback===false ?
                     ( <select
                     disabled
                      style={{
                        width: "130px",
                        color: "black",
                        height: "40px",
                        borderRadius: "5px",
                        marginLeft: "12px",
                      }}

                      onChange={(e) => submitFeedbackToServer(e.target.value, record)} 
                    >
                     
                      <option value="false">No</option> 
                      
                    </select>)
                  
                    :

                          <select className="text" labelName="Select Feedback"
                          disabled
                          defaultValue={false}
                            style={{
                              width: "130px",
                              color: "black",
                              height: "40px",

                              borderRadius: "5px",
                              marginLeft: "12px",
                            }}

                            onChange={(e) => submitFeedbackToServer(e.target.value, record)}

                          >
                    
                
                    <option value="">select option</option>
                            <option value={false}>No</option>
                           
                          </select>
                          )
                          
                            
                                


                      }
                    </TableCell>

                  </TableRow>
                )
              })
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
              filename={"Arbitrage.csv"}
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

export default PriceArbitrageTable;

