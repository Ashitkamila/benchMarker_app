import React, { useState, Fragment, useEffect } from 'react'
import { makeStyles, Menu, MenuItem, Paper, TableBody, TableCell, TableRow, IconButton } from '@material-ui/core';
import classNames from 'classnames';
import SearchIcon from "@material-ui/icons/Search";
import useTable from '../../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import Button from '@mui/material/Button';
import { Button, Radio } from 'antd';
// import locationwiseHeader from './locationwiseHeader';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { KeyboardDatePicker } from "@material-ui/pickers";
// import DatePicker from '@mui/lab/DatePicker';
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
// import Time from './Time';
import { Row } from 'reactstrap';
import { Spinner } from './../../../utils/Spinner';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';
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
import marketwiseHeader from './marketwiseHeader';

const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))


const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);


function MarketwiseTable(props) {
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
    const data = updatedRecords?.length > 0
        ? updatedRecords.map((record) => ({
            Material_No: record?.material_no,
            Item_Name: record?.itemName,
            UoM: record?.UoM,
            Market: record?.marketName,
            Mean: record?.finalResult,
            Successful: record?.succesfulDataPoint,
            unsuccesful: record?.unsuccesfulDataPoint,
            TimeStamp: record?.date
        }))
        : [];

    useEffect(() => {
        //    setUpdatedRecords(props.reportData);
        console.log('props', props.reportData);
        let recordarray = [];
        var res = props.reportData;
        console.log('res', res);

        for (let i = 0; i < res; i++) {
            console.log('yyyyyyyyyyyyyyy', props.reportData)
            // let users = res[i].data;
            updatedRecords.map(() => {
                let object = { ...user, date: res[i].date }
                recordarray.push(object)
            })

        }
        setUpdatedRecords(res);
        console.log('records array', res);


    }, [props])





    // console.log("test record", props.reportData)





    const handleFilterClick = () => {
        toast.info('Filter Click', { theme: "colored" });
        // getPrices();
    }
    const blankPrice = () => {
        const prices = [];
    }





    const handleSearch = e => {

        let target = e.target;

        setFilterFn({

            fn: items => {

                if (target.value == "")

                    return items;

                else

                    return items.filter((value) =>
                        //  value.material_no.includes(target.value.toLowerCase())


                        value.itemName.toLowerCase().includes(target.value.toLowerCase())

                        // || value.itemName.toLowerCase().includes(target.value.toLowerCase())
                         || value.marketName.toLowerCase().includes(target.value.toLowerCase())

                        // || value.userType.toLowerCase().includes(target.value.toLowerCase())

                    );

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

    let dt = new Date();
    const maxDate = dt.setDate(dt.getDate());
    // const minDate = new Date("YYYY-MM-DD");
    //  const maxDate = new Date("YYYY-MM-DD");
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(updatedRecords, marketwiseHeader, filterFn);
    console.log("user", users);
    // console.log("abcd", updatedData);
    const corectDate = (data) => {
        const date = new Date(data);
        date.setDate(date.getDate() + 1)
        console.log("testDtate", date);
        return date;
    }
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
                className="search-input py-10"
                style={{ width: "15vw", border: "none", padding: "2px" }}
                type="text"
                name="searchText"
                placeholder=" Search item by ItemName or Market  "
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

          <div className="d-flex align-items-center ml-6 px-4 col-1"></div>
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
          <div>
            <div className="row">
              <div className="p-0 justify-content-between">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  style={{ marginRight: "10px", width: "10vw" }}
                >
                  <DatePicker
                    label="From"
                    // inputFormat="MM/dd/yyyy"
                    value={value1}
                    onChange={handleFromChange}
                    maxDate={maxDate}
                    renderInput={(params) => <TextField {...params} />}
                  />{" "}
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
                  onClick={props.getFilterReportData(filterDateData)}
                  style={{ marginTop: "5px", width: "80px", height: "50px" }}
                  color="success"
                >
                  Filter
                </CButton>
              </div>
            </div>
          </div>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().length > 0 ? (
                recordsAfterPagingAndSorting().map((record, index) => (
                  <TableRow key={record._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{record?.material_no}</TableCell>
                    <TableCell>{record?.itemName}</TableCell>
                    <TableCell>{record?.UoM}</TableCell>
                    <TableCell>{record?.marketName}</TableCell>
                    <TableCell>{record?.finalResult}</TableCell>
                    <TableCell>{record?.succesfulDataPoint}</TableCell>
                    <TableCell>{record?.unsuccesfulDataPoint}</TableCell>
                    <TableCell>
                      {moment(record?.date).format("DD/MM/YYYY")}
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
                  <b> Data Not Found for a day...</b>
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
                filename={"marketwise.csv"}
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

export default MarketwiseTable;
