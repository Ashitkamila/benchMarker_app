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
import PriceArbitrageTrackerHeader from "./PriceArbitrageTrackerHeader";
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

// import Time from './Time';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    // margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));
const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);

function PriceArbitrageTable(props) {
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
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const minDate = new Date("2020-01-01T00:00:00.000");
  const maxDate = new Date("2034-01-01T00:00:00.000");

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting,getTotalrecordsAfterSearch } =
    useTable(props.records, PriceArbitrageTrackerHeader, filterFn, searchInput);



  const data =
  getTotalrecordsAfterSearch()?.length > 0
      ? getTotalrecordsAfterSearch().map((rec, index) => ({
        //   SrNo: index + 1,
        date: rec.date,
        count: rec.count,
        positiveResponse: rec.positiveResponse,
        negetiveResponse: rec.negetiveResponse,
        noResponse: rec.noResponse,
          
        }))
      : [];

  // useEffect(() => {
  //   setRecords(props.reportData);
  // }, []);

  //   console.log("the records are", props.reportData )
  //   console.log("New Details are", agmarkDetailData)
  console.log("records are in arbitrage Table are", props.records);

  
  




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
  };

  
  return (
    <div>
      <div className={classes.pageContent} style={{}}>
        <div className="row">
          <div className="">
            <div className="col-md-12 d-flex justify-content-end">
              <nav class="navbar navbar-light ">
                <form class="form-inline border" autoComplete="off">
                  <div class="input-group">
                    {/* <input
                      className="search-input py-1"
                      style={{ width: "15vw", border: "none", padding: "1px" }}
                      type="text"
                      name="searchText"
                      value={searchInput}
                      placeholder=" Search item by name  "
                      onChange={handleSearch}
                    /> */}

                    {/* <IconButton
                      color="primary"
                      type="submit"
                      className={classNames("px")}
                      aria-label="Search"
                      // title="Search Shortfall"
                    //   onClick={}
                    
                    >
                      <SearchIcon style={{ color: "#5078F2" }} />
                    </IconButton> */}
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

            {/* <div>
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="From"
                    inputFormat="MM/dd/yyyy"
                    minDate={minDate}
                    value={value1}
                    onChange={handleFromChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
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
            </div> */}
          </div>
        </div>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().length > 0 ? (
              recordsAfterPagingAndSorting().map((record, index) => (
                <TableRow key={record._id}>
                  {/* <TableCell>{index + 1}</TableCell> */}
              
                  <TableCell style={{ textAlign: "left" }}>{record.date}</TableCell>
                  <TableCell style={{ textAlign: "left" }}>{record.count}</TableCell>
                  <TableCell style={{ textAlign: "left" }}>{record.positiveResponse}</TableCell>
                  <TableCell style={{ textAlign: "left" }}>{record.negetiveResponse}</TableCell>
                  <TableCell style={{ textAlign: "left" }}>
                    {record.noResponse}
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
              filename={"ArbitrageTracker.csv"}
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


