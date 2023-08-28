import React, { useState, Fragment, useEffect } from 'react'
import { makeStyles, Menu, MenuItem, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import useTable from '../../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import Button from '@mui/material/Button';
import BMreportHeader from './BMReportHeader';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import moment from 'moment';
import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import { KeyboardDatePicker } from "@material-ui/pickers";
// import DatePicker from '@mui/lab/DatePicker';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
// import Time from './Time';
import { Row, Toast } from 'reactstrap';
import { Spinner } from './../../../utils/Spinner';
import classNames from 'classnames';
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import {
    CButton,
    CCol,
    CContainer,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from "@coreui/react"
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles(theme => ({
  pageContent: {
      // margin: theme.spacing(5),
      padding: theme.spacing(3)
  }
}))


const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);


function BMReportsTable(props) {
    const { toggleComponent, reportData } = props;
    console.log('dddddddddd', props);
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    console.log('records', records);
    const [users, setUsers] = useState([]);
    const [anchorEl, setAnchorE1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updatedRecords, setUpdatedRecords] = useState([]);
    console.log("ghy", updatedRecords)
    const [selectedDate, handleDateChange] = useState(new Date());
    const label = { inputProps: { 'aria-label': 'controlled' } };
    // const [value, setValue] = React.useState(null);
    const [loadingData, setLoadingData] = useState(true);
//    const [updatedData, setUpdatedData] = useState([]);
    const [value1, setValue1] = React.useState(new Date(''));
    const [value2, setValue2] = React.useState(new Date(''));
    const handleFromChange = (newValue) => {
        newValue = newValue.format("YYYY-MM-DD")
        setValue1(newValue);
      
    //   console.log('jhhhhhhhh', newValue);
    };

    

    const handleToChange = (newValue1) => {
        newValue1 = newValue1.format("YYYY-MM-DD")
        setValue2(newValue1);
        
        // console.log('lllllllllllllll', newValue1);
      };


    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })

    const data = users?.length > 0
        ? users.map((Report) => ({
            Date: moment(Report.date).format("YYYY-MM-DD "),
            PriceCount: Report.count,
            Name: Report?.user[0]?.name,
            phoneNumber: Report?.user[0]?.phoneNumber,
        }))
        : [];

    useEffect(() => {
        // setUpdatedRecords(props.reportData);
         console.log('props', props.reportData);
        let recordarray = [];
        var res = props.reportData;
        
                    
                    for(let i = 0; i < res?.length; i++){
                            // console.log('yyyyyyyyyyyyyyy', props.reportData)
                            let users = res[i].data;
                            users.map((user) => {
                                let object = {...user, date : res[i].date}
                                recordarray.push(object)
                            })

                    }
                    setUsers(recordarray);
                    // console.log('records array', recordarray);
                    

    }, [props])


            


    // console.log("test record", props.reportData)


    


    const handleFilterClick = () => {
        Toast.warn('Filter Click');
        // getPrices();
    }
    const blankPrice = () => {
        const prices = [];
    }

    // const handleFromTo = (newValue, newValue1) => {
    //     alert("asdjaskjd")
    //     let from = newValue
    //     console.log('from', from)
    //     let to = newValue1
    //     console.log('to', to)
    //     // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'authorization': userDetails.token, 
    //     };
    //     async function getData() {

    //         await axios.get('http://uat.apps.waycool.in:8010/api/v1/dashboard/bm-performance-report?from=' + newValue + '&to=' + newValue1, { headers })
    //             .then((response) => {
    //                 console.log('response data', response.data);
    //                 setRecords(response.data.data);
    //                 if (response.data === null) {
    //                     alert('No Data Found');
    //                 }
    //                 setLoadingData(false);

    //             });
    //     }    
    //     if (loadingData) {
    //         // if the result is not ready so you make the axios call
    //         getData();
    //     }
    // }

    const handleSearch = (e, user) => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(user => user?.user[0]?.name.toLowerCase().includes(target.value.toLowerCase())) 
                    || user?.count.toLowerCase().includes(target.value.toLowerCase()) 
                    || user?.date.toLowerCase().includes(target.value.toLowerCase()) 
            }
        })
    }
   


    const handleClick = (event) => {
        setAnchorE1(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorE1(null)
    };
    var filterDateData = {

        from: moment(value1).format("YYYY-MM-DD"),
        
        to: moment(value2).format("YYYY-MM-DD"),

       
    }



    let dt = new Date() ;
    console.log("11111", dt)
    const maxDate = dt.setDate(dt.getDate() );
    // const minDate = new Date("YYYY-MM-DD");
    //  const maxDate = new Date("YYYY-MM-DD");
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(users, BMreportHeader, filterFn);
    // console.log("user", res);
    // console.log("abcd", updatedData);
    const corectDate = (data) => {
        const date = new Date(data);
        date.setDate(date.getDate() - 1)
        console.log("testDtate", date);
        return date;
    }
    return (
      <div className={classes.pageContent} style={{ marginBottom: "10px" }}>
        <div>
          <div>
            <div className="row">
              {/* <div className="col-11 px-0 mb-4">
                            <input
                                className="search-input py-1"
                                type="text"
                                placeholder="Search by Name "
                                onChange={handleSearch}
                            />
                        </div> */}
              <div className="col-md-12 d-flex justify-content-end">
                <nav class="navbar navbar-light ">
                  <form class="form-inline border" autoComplete="off">
                    <div class="input-group">
                      <input
                        className="search-input py-1"
                        style={{
                          width: "20vw",
                          border: "none",
                          padding: "1px",
                        }}
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
              <div className="row">
                <div className="  p-0 justify-content-between">
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    style={{ marginRight: "10px" }}
                  >
                    <DatePicker
                      label="From"
                      // inputFormat="MM/dd/yyyy"
                      value={value1}
                      onChange={handleFromChange}
                      maxDate={maxDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    &nbsp;&nbsp;
                    <DatePicker
                      label="To"
                      // inputFormat="MM/dd/yyyy"
                      value={value2}
                      onChange={handleToChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <CButton
                    onClick={props?.getFilterReportData(filterDateData)}
                    style={{
                      marginLeft: "50px",
                      width: "100px",
                      height: "50px",
                      marginTop: "-2px",
                    }}
                    color="success"
                  >
                    Filter
                  </CButton>
                  {/* <Tooltip title="Download" placement="bottom">
                                    <GetAppIcon onClick={handleClick} className="download" />
                            </Tooltip> */}
                </div>
              </div>
            </div>
          </div>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().length > 0 ? (
                recordsAfterPagingAndSorting().map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      {moment(user?.date).format("YYYY-MM-DD")}
                    </TableCell>
                    {/* { console.log('user', user)} */}
                    <TableCell>{user?.count} </TableCell>
                    <TableCell>{user?.user[0]?.name}</TableCell>
                    <TableCell>{user?.user[0]?.phoneNumber}</TableCell>
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
                  <b>No Data Available</b>
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
                filename={"reportdata.csv"}
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

export default BMReportsTable;
