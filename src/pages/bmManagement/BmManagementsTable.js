import React, { useState, useEffect } from 'react'
import {
    makeStyles, Paper, Menu, MenuItem, TableBody, TableCell, TableRow, Checkbox, FormControlLabel, FormGroup, IconButton,
} from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import classNames from 'classnames';
import SearchIcon from "@material-ui/icons/Search";
import bmManagementHeader from './bmManagementHeader';
import { Link } from 'react-router-dom';
import BmManagement from './BMManagement';
import { CSVLink } from "react-csv";
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
 import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { EditTwoTone } from "@material-ui/icons";
import moment from "moment";
import Box from "@mui/material/Box";
// import Button from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { RecordVoiceOver } from "@mui/icons-material";
import CancelIcon from "@material-ui/icons/Cancel";

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

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(2),
   padding: theme.spacing(0),
 },
 modal: {
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   overflowY: "auto",
 },
 paper: {
   backgroundColor: "unset",
   border: "0px solid #000",
   padding: "0px",
   borderRadius: "2px",
   boxShadow: "theme.shadows[3]",
   outline: "none !important",
 },
}))


function BmManagementTable(props) {
  // console.log('asdfgh',props);
    const { toggleComponent, bmManagementData, editClickHandler, openForm, deleteClickHandler, } = props;

    const [BmManagementData, setBmManagementData] = useState([]);
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [anchorEl, setAnchorE1] = useState(null);
    const [showActionId, setShowActionId] = useState(-1);
    const [currentData, setCurrentData] = useState({});
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setRecords(bmManagementData);
        console.log("aaaaa", bmManagementData)
    }, []);
// console.log('allRecords',records);
    const marketArray = (markets) => {
        if (markets && markets.length > 0) {
            return markets.map((market) => {
                return market.name
            })
        }
    }

    const stallArray = (stallTypes) => {
        if (stallTypes && stallTypes.length > 0) {
            return stallTypes.map((stallType) => {
                return stallType
            })
        }
    }
    const data = records?.length > 0
        ? records.map((BmManagement) => ({

            Benchmarker: BmManagement.name,
            User_Type: BmManagement.userType,
            Phone_Number: BmManagement.phoneNumber,
            location: BmManagement.location?.name,
            Market_Name: marketArray(BmManagement.markets),
            Stall_Type: stallArray(BmManagement.stallTypes)


        }))
        : [];




    const handleSearch = e => {

        let target = e.target;

        setFilterFn({

            fn: items => {

                if (target.value == "")

                    return items;

                else

                    return items.filter(value => value.name.toLowerCase().includes(target.value.toLowerCase())

                        // || value.phoneNumber.includes(target.value)

                        // || value.location?.name.includes(target.value)

                        // || value.userType.includes(target.value)

                    );

            }

        })

    }

    const popupClose = (e) => {
      e.preventDefault();
      setOpen(false);
    };

    const handleClick = (event) => {
        setAnchorE1(event.currentTarget);
    };
    const handleCloseExport = () => {
        setAnchorE1(null)
    };

    const handleData = (record) => {
      setCurrentData(record);
      setCurrentData({
        name:record.name,
        createdBy:record.createdBy.name,
        updatedAt:record.updatedAt,
        updatedBy:record.createdBy.name,
        createdAt:record.createdAt
       });
      console.log(record,"records is ")
      setOpen(true);
    };
  

    const getRole = (role) => {
        if (role === "imports")
            return <div >
                <span style={{ color: "#FF4B6C", fontWeight: "500", background: "#FFE8EC", borderRadius: "5px" }} className="px-3 py-1">{role} </span>
            </div>
        else if (role === "processor")
            return <div>
                <span style={{ color: "#e23bff", background: "#f0e4f2", borderRadius: "5px", fontWeight: "500" }} className="px-3 py-1">{role}</span>
            </div>
        else if (role === "fnv")
            return <div>
                <span style={{ color: "#FFA928", background: "#FEF5E7", borderRadius: "5px", fontWeight: "500" }} className="px-3 py-1">{role}</span>
            </div>
        else if (role === "nfnv")
            return <div>
                <span style={{ color: "#00ff00", background: "#FEF5E7", borderRadius: "5px", fontWeight: "500" }} className="px-3 py-1">{role}</span>
            </div>
        else if (role === "User")
            return <div>
                <span style={{ color: "#3BC4FF", background: "#EAF9FF", borderRadius: "5px", fontWeight: "500" }} className="px-3 py-1">{role}</span>
            </div>

    }

    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, bmManagementHeader, filterFn);
    return (
      <div>
        {/* <span style={{ margin: "10px", fontSize: "15px" }} >&nbsp;&nbsp;&nbsp;  (Total Item : {bmManagementData?.length})</span> */}

        <div className={classes.pageContent} style={{ marginBottom: "10px" }}>
          <div className="col-md-12 d-flex justify-content-end">
            <span
              className=" d-flex justify-content-start"
              style={{ marginRight: "auto", fontSize: "15px" }}
            >
              (Total BenchMarker : {bmManagementData?.length})
            </span>

            <nav class="navbar navbar-light ">
              <form class="form-inline border" autoComplete="off">
                <div class="input-group">
                  <input
                    className="search-input py-1"
                    style={{ width: "18vw", border: "none", padding: "1px" }}
                    type="text"
                    name="searchText"
                    placeholder=" Search by Name  "
                    onChange={handleSearch}
                  />

                  <IconButton
                    color="primary"
                    // type="submit"
                    // className={classNames("px")}
                    aria-label="Search"
                    // title="Search Shortfall"
                    disabled
                  >
                    <SearchIcon style={{ color: "#5078F2" }} />
                  </IconButton>
                </div>
              </form>
            </nav>
            <div className="d-flex align-items-center ml-7 px-4 col-1">
              <Button
                type="primary"
                onClick={handleClick}
                shape="circle"
                icon={<DownloadOutlined />}
              />
            </div>
          </div>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().length > 0 ? (
                recordsAfterPagingAndSorting().map((record, index) => (
                  <TableRow
                    key={record._id}
                    onMouseEnter={() => {
                      setShowActionId(record._id); // set id here
                    }}
                    onMouseLeave={() => setShowActionId(-1)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell style={{ fontWeight: "500" }}>
                      {record.name}
                    </TableCell>
                    {/* <TableCell>{getRole(record.userType)}</TableCell> */}
                    <TableCell>{record.dialingCode}-{record.phoneNumber}</TableCell>
                    <TableCell>{record.location?.name}</TableCell>
                    <TableCell>
                      {record.markets?.map((market) => (
                        <div>{`${market.name}`}</div>
                      ))}
                    </TableCell>
                    {/* <TableCell>
                      {record.stallTypes?.map((stallType) => (
                        <div>{`${stallType}`}</div>
                      ))}
                    </TableCell> */}
                    <TableCell>
                      <div className="d-flex  ">
                        <Tooltip title="Edit User" placement="bottom">
                          <button
                            onClick={() => editClickHandler(record)}
                            className={`border-0 p-1 action-btn`}
                            style={{
                              marginRight: "10px",
                              borderRadius: "25px",
                              color: "#5078F2",
                            }}
                          >
                            {/* <OpenInNewIcon /> */}
                            <EditTwoTone />
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete User" placement="bottom">
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
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>
                      <InfoOutlinedIcon
                        onClick={() => handleData(record)}
                        style={{ color: "rgb(85,105,255)", cursor: "pointer" }}
                      />

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
                        // BackdropProps={{
                        //   timeout: 1,
                        // }}
                      >
                        <Fade in={open}>
                          <Box sx={style}>
                      
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                            
                              More Info : {currentData?.name}
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
                              <span>Created By:</span>{" "}
                              {currentData?.createdBy
                                ? currentData?.createdBy
                                : "N/A"}{" "}
                              <br />
                              <span>Created At:</span>{" "}
                              {moment(currentData?.createdAt).format("LLL")}{" "}
                              <br />
                              <span>Updated By:</span>{" "}
                              {currentData?.updatedBy
                                ? currentData?.updatedBy
                                : "N/A"}{" "}
                              <br />
                              <span>Updated At:</span>{" "}
                              {moment(currentData?.updatedAt).format("LLL")
                                ? moment(currentData?.updatedAt).format("LLL")
                                : "N/A"}{" "}
                              <br />
                              <span>Last Time Login on:</span>{" "}
                              {moment(currentData?.lastLoggedIn).format("LLL")
                                ? moment(currentData?.lastLoggedIn).format(
                                    "LLL"
                                  )
                                : "N/A"}{" "}
                            </Typography>
                          </Box>
                        </Fade>
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
            onClose={handleCloseExport}
          >
            <MenuItem onClick={handleCloseExport}>
              <CSVLink
                data={data}
                filename={"BmManagementdata.csv"}
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
      </div>
    );
}

export default BmManagementTable;