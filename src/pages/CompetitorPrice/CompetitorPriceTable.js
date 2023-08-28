import React from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import "../CompetitorPrice/competitorPrice.css"
import { RequestPayload, fetchData, postData, patchData } from '../../redux/baseAPIService'
import {
  CButton,
  CCol,
  CContainer,

} from "@coreui/react"
import "antd/dist/antd.css"
import classNames from 'classnames';
import SearchIcon from "@material-ui/icons/Search";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { configuration } from '../../services/appConfig';
import competitorPriceHeader from './competitorPriceHeader';
import useTable from '../../utils/table/useTable';
import { message } from 'antd';
import { Pagination, TablePagination } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles, Menu, MenuItem, Paper, TableBody, TableCell, TableRow, IconButton } from '@material-ui/core';

import moment from 'moment';
import { Dayjs } from 'dayjs';
import { CSVLink } from "react-csv";
import { DownloadOutlined } from "@ant-design/icons";
import GetAppIcon from "@material-ui/icons/GetApp";
import { getAllCompetitorPrice_all } from '../../redux';
import { Button, Divider, Radio, Upload, Space } from 'antd';





const useStyles = makeStyles(theme => ({
  pageContent: {
    // margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

const CompetitorPriceTable = (props) => {
  let date123 = moment().format("YYYY-MM-DD");


  const classes = useStyles();
  const [spin, setSpin] = useState(true);
  const [records, setRecords] = useState([]);
  const [value1, setValue1] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const [uploadData, setUploadData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [newCount, setNewCount] = useState();
  const [anchorEl, setAnchorE1] = useState(null);
  const [searchInput, setSearchInput] = useState([]);

  const [get_record, setGet_record] = useState([]);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleClick = (event) => {
    getData_All();
    setAnchorE1(event.currentTarget);

    // getAllCompetitorPrice_all(newCount);
    console.log('ashit_test_down', event);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };
  //upload data save in local storage

  let from = moment(value1 === null ? date123 : value1).format("YYYY-MM-DD");
  let to = moment(value2 === null ? date123 : value2).format("YYYY-MM-DD");


  const [dateFilter, setDateFilter] = useState(false);
  const getData_All = async () => {
    console.log('from123', from, to);
    console.log('value1', value1);
    const headers = {
      'Content-Type': 'application/json',
      'authorization': userDetails.token,
    };
    await axios.get(
      `${configuration.apiBaseUrl}/competitivePrice?page=1&limit=${newCount}&from=${from}&to=${to}`, { headers })
      .then((response) => {
        console.log('all_response', response);
        if (response.status === 200) {
          setGet_record(response.data.data.competitivePrice)

        }

        else if (response.status === 503) {


        }

      })
      .catch((err) => console.log(err));
  }


  const { TblContainer, TblHead, } =
    useTable(props.records, competitorPriceHeader);

  const minDate = new Date("2020-01-01T00:00:00.000");
  console.log('poiuytr',);

  useEffect(() => {
    setRecords(props.allData?.competitivePrice);
    setNewCount(props.allData?.count);
    getData_All();

  }, [props]);

  console.log("mathura", props.allData?.count
  );
  // console.log("barshani",props.records.count);

  //get data from local storage
  // let getDataFromLocalStorage = localStorage.getItem("uploadData");
  // const newDatafromLocal = JSON.parse(getDataFromLocalStorage);
  // console.log("sham", newDatafromLocal);

  //search buttons handle



  // const handleSearch = (e) => {


  //   setSearchInput(e.target.value);
  //   console.log('test_1234',records,get_record);
  //   let filter_result = records.filter((val) => {
  //     console.log('test789', val);
  //     return val.item_name.toLowerCase().includes(e.target.value.toLowerCase())
  //   }
  //   );
  //   setRecords(filter_result)

  // }





  //for filtering data

  const handleFilterClick = (event) => {
    setDateFilter(true);
    event.preventDefault();


    const headers = {
      'Content-Type': 'application/json',
      'authorization': userDetails.token,
    };

    const getData = async () => {


      await axios.get(
        `${configuration.apiBaseUrl}/competitivePrice?page=${props?.page}&limit=${props?.rowsPerPage}&from=${moment(value1).format("YYYY-MM-DD")}&to=${moment(value2).format("YYYY-MM-DD")}`, { headers })
        .then((response) => {

          if (response.status === 200) {
            toast.success('Loading Data....', { theme: "colored" });
            setRecords(response?.data?.data?.competitivePrice);
            setNewCount(response?.data?.data?.count);

          }
          else if (response.status === 404) {
            toast.info("Data Not Available", { theme: "colored" })
            // window.location.reload()
          }
          else if (response.status === 503) {
            toast.info("Invalid From or To date ", { theme: "colored" })

          }

        })
        .catch((err) => toast.error('Invalid From/To date OR Data not available for selected dates Select Maximum 7 days of Range between From and To', err));
    }

    getData();
  }
  console.log('propsasd', newCount);


  // after aupload api call


  const Url = `${configuration.apiBaseUrl}/competitivePrice/upload`;

  const user = localStorage.getItem("User");
  const userDetails = JSON.parse(user);
  console.log('userDetails', userDetails);
  //upload file function
  const propsOfUpload = {
    name: 'file',
    action: (Url),
    accept: ".csv",
    showUploadList: { showRemoveIcon: true },
    headers: {
      Authorization: userDetails.token
    },

    onChange(info) {
      const validExtensions = ['png', 'jpeg', 'jpg'];
    
      if (info.file.status !== 'uploading') {
        console.log("checkFile", info.file);
        message.loading(`${info.file.name} file is uploading....`);
      }
      if (info.file.status === 'done') {

        message.success(`${info.file.name} file uploaded successfully`);

        // setUploadData(info.fileList[0].response.data);
        window.location.reload();

      } else if (info.file.status === 'error') {

        message.error(`${info.file.name} file upload failed.`);
      } else if (validExtensions.includes(info.file.name)) {
        message.warning(`${info.file.name}  upload file is not a valid`);
      }
    },
  };
  console.log('get_record', get_record);

  // expert CSv file
  const data =

    typeof get_record !== "undefined" && get_record?.length > 0 ?
      get_record?.map((rec, index) => ({

        "Material Code": rec?.item_code,
        "Material Name": rec?.item_name,
        "Competitor Name": rec?.competitor_name,
        "Market Name": rec?.market_name,
        "Price": rec?.price,
        "UOM": rec?.item_uom,
        "Date": moment(rec?.date).format('YYYY-MM-DD'),

      })) : [];


  return (
    <>
      <div className={classes.pageContent} style={{ marginBottom: "10px" }}>
        <div className="row">
          <div className="">
            <div className="col-md-12 d-flex justify-content-start">

              <span
                className=" d-flex justify-content-start"
                style={{ marginRight: "auto", fontSize: "15px" }}
              >
                &nbsp;&nbsp;&nbsp; (Total Data : {records?.length})
              </span>

              <nav className="navbar navbar-light ">
                <form className="form-inline border" autoComplete="off" >
                  {/* <div className="input-group d-flex">
                    <input
                      className="search-input py-1"
                      style={{ width: "20vw", border: "none", padding: "1px" }}
                      type="text"
                      name="searchText"
                      placeholder=" Search item by name  "
                      // value={records}
                      onChange={handleSearch}
                    />

                    <IconButton
                      color="primary"
                      type="submit"
                      className={classNames("px")}
                      aria-label="Search"
                      title="Search Shortfall"
                      disabled
                    >
                      <SearchIcon style={{ color: "#5078F2" }} />
                    </IconButton>
                  </div> */}


                </form>
                <span className="d-flex align-items-center ml-4 fw-5 px-4 " >
                  <Button type="primary" shape="circle" icon={<DownloadOutlined />} style={{ height: "50px", width: "50px" }} onClick={handleClick} />
                </span>
              </nav>
            </div>

            <div>
              <form  >
                <div className="mt-4">
                  <span style={{ color: "#DC143C", fontWeight: 500, fontSize: "18px" }}>
                    * Select atleast two dates.
                  </span>

                  <div className='cotainer-fluid mt-4'>
                    <div className='row'>
                      <div className='col-lg-12 col-md-6 d-flex'>
                        <div className='row'>
                          <div className='col-lg-12 col-sm-3 d-flex'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="From"
                                value={value1}
                                minDate={minDate}
                                onChange={(newValue) => {
                                  console.log("dataa", moment(new Date(newValue)).format("YYYY-MM-DD"))
                                  setValue1(moment(new Date(newValue)).format("YYYY-MM-DD"));
                                }}
                                // onChange={handleFromChange}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="To"
                                value={value2}
                                minDate={minDate}
                                onChange={(newValue) => {

                                  setValue2(moment(new Date(newValue)).format("YYYY-MM-DD"));
                                }}
                                // onChange={handleToChange}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                          </div>
                        </div>


                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <CButton
                          onClick={(event) => handleFilterClick(event)}
                          type="submit"
                          style={{
                            marginBottom: "57px",
                            width: "100px",
                            height: "57px",
                            borderRadius: "1rem",
                          }}
                          color="success"
                        >
                          Filter
                        </CButton>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <Upload.Dragger
                        multiple
                        action={`${configuration.apiBaseUrl}/competitivePrice/upload`}
                        showUploadList={{ showRemoveIcon: true }}
                        accept=".csv"
                        onChange={handleUpload}
                        defaultFileList={[
                          {
                            uid: 'abc',
                            name: 'page.csv',
                            status: 'uploading',
                            percent: 100,
                            // url: `${configuration.apiBaseUrl}/competitivePrice/upload`
                          }
                        ]}
                        //  iconRender={()=>{
                        //   return <Spin></Spin>
                        //  }}
                        progress={{
                          strokeWidth: 3,
                          strokeColor: {
                            "0%": "yellow",
                            "50%": "orange",
                            "100%": "green",
                          }
                        }}
                        style={{ display: "flex", alignItems: 'center', width: "300px", justifyContent: "center", marginTop: "-30px" }}>
                        Drag files here
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or
                        <br />
                        <Button icon={<UploadOutlined />} className='upload_btn'>Upload File</Button>
                      </Upload.Dragger> */}
                        <Upload {...propsOfUpload}>
                          <Space className="site-button-ghost-wrapper" wrap>
                            <Button icon={<UploadOutlined />} type="ghost">Click to Upload <br /> <span style={{ color: "red" }}>*CSV file only</span> </Button>
                          </Space>

                        </Upload>
                      </div>
                    </div>
                  </div>
                </div>

              </form>

            </div>
          </div>
        </div>
        <TblContainer>
          <TblHead />
          <TableBody>
            {/* {
              newDatafromLocal &&
              newDatafromLocal.map((value, idx) => {


                return (
                  <TableRow key={value?._id}>
                    <TableCell style={{ fontWeight: "500" }}>
                      {value["Material Code"]}
                    </TableCell>
                    <TableCell>{value["Material Name"]}</TableCell>
                    <TableCell>{value?.UOM}</TableCell>
                    <TableCell>{value?.Price}</TableCell>
                    <TableCell>{value?.Date}</TableCell>
                    <TableCell>{value["Competitor Name"]}</TableCell>
                    <TableCell>{value["Market Name"]}</TableCell>

                  </TableRow>
                );
              })

            } */}
            {records && records?.length > 0 ? (
              records?.map((record) => {
                console.log('testAshit', record);
                return (

                  <TableRow key={record?._id}>
                    <TableCell style={{ fontWeight: "500" }}>
                      {record?.item_code}
                    </TableCell>
                    <TableCell>{record?.item_name}</TableCell>
                    <TableCell>{record?.competitor_name}</TableCell>
                    <TableCell>{record?.market_name}</TableCell>
                    <TableCell>{record?.price}</TableCell>
                    <TableCell>{record?.item_uom}</TableCell>
                    <TableCell>{record?.date}</TableCell>
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
        {/* <TblPagination /> */}
        <TablePagination
          component="div"
          count={newCount}
          page={props?.page}
          onPageChange={props?.handleChangePage}
          rowsPerPage={props?.rowsPerPage}
          onRowsPerPageChange={props?.handleChangeRowsPerPage}
        />

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
              filename={"CompetitorPrice.csv"}
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
        <ToastContainer transition={Zoom} theme="colored" />
      </div>
    </>
  )
}

export default CompetitorPriceTable
