import React, { useState, Fragment, useEffect } from "react";
import {
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@material-ui/core";
import classNames from "classnames";
import SearchIcon from "@material-ui/icons/Search";
import useTable from "../../utils/table/useTable";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

//  import Button from '@mui/material/Button';
 import { Button, Radio } from "antd";
// import locationwiseHeader from './locationwiseHeader';
import axios from "axios";
import Stack from "@mui/material/Stack";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DatePicker from "@mui/lab/DatePicker";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import GetAppIcon from "@material-ui/icons/GetApp";
// import Time from './Time';
import { Row } from "reactstrap";
import { Spinner } from "./../../utils/Spinner";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { DownloadOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import { ConsoleSqlOutlined, SettingOutlined } from "@ant-design/icons";
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import moment from "moment";
import transportationHeader from "./transportationHeader";
import { Input } from "antd";
import { InputControl } from "../../utils/FormControls";
import { EditTwoTone } from "@material-ui/icons";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { RecordVoiceOver } from "@mui/icons-material";
import "antd/dist/antd.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { configuration } from "../../services/appConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 10,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  pageContent: {
     margin: theme.spacing(0),
    padding: theme.spacing(3),
  },
}));

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);

function TransportationTable(props) {
  const { toggleComponent, reportData, editClickHandler, deleteClickHandler } =
    props;
  console.log("dddddddddd", props);
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [itemId, setItemId] = useState("");
  console.log("records", records);
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorE1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatedRecords, setUpdatedRecords] = useState([]);
  console.log("ghy", updatedRecords);
  const [selectedDate, handleDateChange] = useState(new Date());
  const label = { inputProps: { "aria-label": "controlled" } };
  // const [value, setValue] = React.useState(null);
  const [loadingData, setLoadingData] = useState(true);
  //    const [updatedData, setUpdatedData] = useState([]);
  const [value1, setValue1] = React.useState(new Date(""));
  const [value2, setValue2] = React.useState(new Date(""));
  const [material_number, setMaterial_desc] = useState();
  const [itemName, setItemName] = useState("");
  const [open, setOpen] = React.useState(false);
  
  const [showActionId, setShowActionId] = useState(-1);
  const [currentData, setCurrentData] = useState({});
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFromChange = (newValue) => {
    newValue = moment(newValue).format("YYYY-MM-DD");
    setValue1(newValue);

    //   console.log('jhhhhhhhh', newValue);
  };
  const handleToChange = (newValue1) => {
    newValue1 = moment(newValue1).format("YYYY-MM-DD");
    setValue2(newValue1);

    // console.log('lllllllllllllll', newValue1);
  };
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const data =
    updatedRecords?.length > 0
      ? updatedRecords.map((record) => ({
          // Material_No: record?.material_no,
          Item_Name: record?.item,
          Material_Number: record?.item_code,
          UoM: record?.uom,
          Transportationcost: record?.price,
        }))
      : [];

  useEffect(() => {
    //    setUpdatedRecords(props.reportData);
    console.log("props", props.reportData);
    let recordarray = [];
    var res = props.reportData;
    console.log("res", res);

    for (let i = 0; i < res; i++) {
      console.log("yyyyyyyyyyyyyyy", props.reportData);
      // let users = res[i].data;
      updatedRecords.map(() => {
        let object = { ...user, date: res[i].date };
        recordarray.push(object);
      });
    }
    setUpdatedRecords(res);
    // setItemId(updatedRecords.itemId);
  }, [props]);

  useEffect(() => {
    setItemId(updatedRecords?.itemId);
    console.log("records array", itemId);
  }, [props]);

  // console.log("test record", props.reportData)

  const handleFilterClick = () => {
    toast.info("Filter Click", { theme: "colored" });
    // getPrices();
  };
  const blankPrice = () => {
    const prices = [];
  };

  const handleFNVNameChange = (value, e) => {
    // console.log('gggggggg', value)

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
          setMaterial_desc(response.data[0].material_number);
          setItemName(response.data[0].itemName);
          // console.log('ddssasasa', response.data[0].itemName)
        })
        //   .then((result) => setData(result.rows))
        .catch((err) => console.log("error"));
    };
    initProducts();
  };

  const handleSearch = (e) => {
    let target = e.target;

    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (value) =>
              //  value.material_no.includes(target.value.toLowerCase())

              value?.item.toLowerCase().includes(target.value.toLowerCase()) ||
              value?.item_code
                .toLowerCase()
                .includes(target.value.toLowerCase())
            // value.marketName
            //   .toLowerCase()
            //   .includes(target.value.toLowerCase())

            // || value.userType.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const handleClick = (event) => {
    setAnchorE1(event.currentTarget);
  };
  const handleCloseExport = () => {
    setAnchorE1(null);
  };

  const handleData = (record) => {
    setCurrentData(record);
    setOpen(true);
  };

  const popupClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  
  var filterDateData = {
    from: moment(value1).format("YYYY-MM-DD"),

    to: moment(value2).format("YYYY-MM-DD"),
  };

  let dt = new Date();
  const maxDate = dt.setDate(dt.getDate());
  // const minDate = new Date("YYYY-MM-DD");
  //  const maxDate = new Date("YYYY-MM-DD");
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(updatedRecords, transportationHeader, filterFn);
  console.log("user", users);
  // console.log("abcd", updatedData);
  // const corectDate = (data) => {
  //   const date = new Date(data);
  //   date.setDate(date.getDate() + 1);
  //   console.log("testDtate", date);
  //   console.log("111", updatedRecords.itemId);
  //   return date;
  // };
  return (
    <div className={classes.pageContent} style={{ marginBottom: "10px" }}>
      <span style={{ fontSize: "15px", marginBottom: "10px" }}>
        {" "}
        (Total Item : {updatedRecords?.length ? updatedRecords?.length : 0})
      </span>
      <div className="col-md-12 d-flex justify-content-end">
        <form class="form-inline border" autoComplete="off">
          <div class="input-group">
            <input
              className="search-input"
              style={{
                width: "15vw",
                height: "35px",
                border: "none",
                padding: "10px",
              }}
              type="text"
              name="searchText"
              placeholder="Search by Item Name"
              onChange={handleSearch}
            />
            <IconButton
              color="primary"
              style={{
                // width: "15vw",
                height: "35px",
                border: "none",
                padding: "3px",
                cursor : "pointer"
              }}
              type="submit"
               className={classNames("px")}
              aria-label="Search"
              // title="Search Shortfall"
              disabled
            >
              <SearchIcon style={{ color: "#5078F2", cursor : "pointer" }} />
            </IconButton>
          </div>
        </form>

        {/* <div className="d-flex align-items-center ml-3 px-4 col-1"></div> */}
        <div className="d-flex align-items-center ml-7 px-4 col-1">
          <Button
            type="primary"
            onClick={handleClick}
            shape="circle"
            icon={<DownloadOutlined />}
          />
        </div>
      </div>
      <div>
        {/* paste code here for dropdown func */}
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().length > 0 ? (
              recordsAfterPagingAndSorting().map((record, index) => (
                <TableRow key={record._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{record?.item}</TableCell>
                  <TableCell>{record?.item_code}</TableCell>
                  <TableCell>{record?.uom}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {record?.price}
                  </TableCell>
                  <TableCell>
                    <div className="d-flex">
                      <Tooltip title="Edit Cost" placement="bottom">
                        <button
                          onClick={() => editClickHandler(record)}
                          className={`border-0 p-1 action-btn`}
                          style={{
                            marginRight: "10px",
                            borderRadius: "25px",
                            color: "#5078F2",
                          }}
                        >
                          <EditTwoTone />
                        </button>
                      </Tooltip>
                      {/* <Tooltip title="Delete Cost" placement="bottom">
                        <button
                          onClick={() => deleteClickHandler(record)}
                          className={`border-0 p-1 action-btn`}
                          style={{
                            marginRight: "10px",
                            borderRadius: "25px",
                            color: "#5078F2",
                          }}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </Tooltip> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* <div class="hdg-label-info">
                      <svg
                        class="icon"
                        viewBox="0 0 24 24"
                        height="20"
                        width="20"
                        aria-hidden="true"
                        // className="r-1fmj7o5 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                      >
                        <g>
                          <path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z"></path>
                        </g>
                      </svg>
                      <div class="hdg-label-popup">
                        <span>created by:anil</span>
                        <span>created by:anil</span>
                        text Tooltip
                      </div>
                    </div> */}

                    
                      {/* <Button style={{border : "none"}}> */}
                        {" "}
                        {/* <svg
                          class="icon"
                          viewBox="0 0 24 24"
                          height="20"
                          width="20"
                          aria-hidden="true"
                          className="r-1fmj7o5 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                        >
                          <g>
                            <path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z"></path>
                          </g>
                        </svg> */}
                        <InfoOutlinedIcon
                        onClick={() => handleData(record)}
                          style={{ color: "rgb(85,105,255)"  , cursor: "pointer"}}
                     
                        />
                      {/* </Button> */}
                      <Modal
                        hideBackdrop={true}
                        props={currentData}
                        open={open}
                        onClose={handleClose}
                        className={classes.modal}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="modal-modal-description"
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            More Info : {currentData?.item ? currentData?.item : "N/A"}
                            <div style={{}}>
                              <CancelIcon
                                id="cancelicon"
                                style={{
                                  cursor: "pointer",
                                  float: "right",
                                  position: "relative",
                                  left: "1rem",
                                  bottom: "3rem",
                                }}
                                onClick={popupClose}
                              />
                            </div>
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <span>Created By:</span> {currentData?.createdBy?.name}{" "}
                            <br />
                            <span>Created At:</span>{" "}
                            {moment(currentData?.createdAt).format("LLL")}{" "}
                            <br />
                            <span>Updated By:</span> {currentData?.updatedBy?.name}{" "}
                            <br />
                            <span>Updated At:</span>{" "}
                            {moment(currentData?.updatedAt).format("LLL")}{" "}
                            <br />
                            {/* <h1>qhfwdhgq</h1> */}
                          </Typography>
                        </Box>
                      </Modal>
                    
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
                <div>
                  <p>No Data Found....</p>
                  {/* <Spinner /> */}
                </div>
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
          onClose={handleCloseExport}
        >
          <MenuItem onClick={handleCloseExport}>
            <CSVLink
              data={data}
              filename={"Transportation Cost.csv"}
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

export default TransportationTable;
