import React, { useState, useEffect } from 'react'
import { makeStyles, Menu, MenuItem, TableBody, TableCell, TableRow, IconButton } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import marketHeader from './marketHeader';
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';
import Market from './Market';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import { times } from 'lodash';
import classNames from 'classnames';
import SearchIcon from "@material-ui/icons/Search";
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { EditTwoTone } from "@material-ui/icons";
import moment from "moment";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
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

const useStyles = makeStyles((theme) => ({
  pageContent: {
    // margin: theme.spacing(5),
    padding: theme.spacing(3),
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
}));

const stallArray = (timeSlots) => {
  if (timeSlots && timeSlots.length > 0) {
    return timeSlots.map((timeSlot) => {
      return <div>{`${timeSlot.from} - ${timeSlot.to}`}</div>;
    });
  }
};

function MarketsTable(props) {
  const { toggleComponent, marketData, editClickHandler, deleteClickHandler } =
    props;
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [anchorEl, setAnchorE1] = useState(null);
  const [showActionId, setShowActionId] = useState(-1);
  const [currentData, setCurrentData] = useState({});
  console.log(marketData,'records are')

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  useEffect(() => {
    setRecords(marketData);
   
  }, []);

  const data =
    records?.length > 0
      ? records.map((record) => ({
        Company_Code:record.companyCode,
          Market_Name: record.name,
          Time_Slots: record.timeSlots?.map((timeSlot) => {
            return `${timeSlot.from} - ${timeSlot.to} `;
          }),
          Address:record.address,
          Location:record.location.name,
          Radius:record.radius,
          Commission:record.marketCommission


        }))
      : [];
  console.log('allRecords',records);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((value) =>
            value.name.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };
  const popupClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const handleClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleData = (record) => {
    setCurrentData(record);
    setOpen(true);
  };
  const handleCloseExport = () => {
    setAnchorE1(null);
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, marketHeader, filterFn);
  return (
    <div>
      <div className={classes.pageContent} style={{ marginBottom: "10px" }}>
        <div className="col-md-12 d-flex justify-content-end">
          <span
            className=" d-flex justify-content-start"
            style={{ marginRight: "auto", fontSize: "15px" }}
          >
            &nbsp;&nbsp;&nbsp; (Total Market : {records?.length})
          </span>

          <nav class="navbar navbar-light ">
            <form class="form-inline border" autoComplete="off">
              <div class="input-group">
                <input
                  className="search-input py-1"
                  style={{ width: "20vw", border: "none", padding: "1px" }}
                  type="text"
                  name="searchText"
                  placeholder="Search by Market Name"
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
              recordsAfterPagingAndSorting().map((record) => (
                <TableRow
                  key={record._id}
                 
                  onMouseEnter={() => {
                    setShowActionId(record._id); 
                  }}
                  onMouseLeave={() => setShowActionId(-1)}
                >
                
                  <TableCell style={{ fontWeight: "500" }}>
                    {record.name}
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }}>
                    {record.location.name}
                  </TableCell>
                 
                  <TableCell >
                    {record.timeSlots?.map((timeSlot) => (
                      <div>{`${timeSlot.from} - ${timeSlot.to}`}</div>
                    ))}
                  </TableCell>
                   <TableCell style={{ fontWeight: "500" }}>
                    {/* {record.marketType} */}
                    {record.marketType?.map((market) => (
                      <div>{market}</div>
                    ))}
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }}>
                    {record.marketCommission}
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }}>
                    {record.address}
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }}>
                    {record.radius}
                  </TableCell>
                  <TableCell>
               

                    <div className="d-flex  ">
                      <Tooltip title="Edit Market" placement="bottom">
                        <button
                          onClick={() => editClickHandler(record)}
                          className={`border-0 p-1 action-btn`}
                          style={{
                            marginRight: "10px",
                            borderRadius: "25px",
                            color: "#5078F2",
                            textAlign:"center" 
                          }}
                        >
                  
                          <EditTwoTone />
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete Market" placement="bottom">
                        <button
                          onClick={() => deleteClickHandler(record)}
                          className={`border-0 p-1 action-btn`}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </Tooltip>
                    </div>
                    {/* ) : (
                    ""
                  )} */}
                  </TableCell>
                  <TableCell>
                    
                    {/* <InfoOutlinedIcon
                      onClick={() => handleData(record)}
                      style={{ color: "rgb(85,105,255)", cursor: "pointer" }}
                    /> */}
          
                    <div>
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
                        <Fade in={open}>
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              More Info :{" "}
                              {currentData?.name ? currentData?.name : "N/A"}
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
                              {/* <span>Created By:</span>{" "}
                               {currentData?.createdBy
                                 ? currentData?.createdBy
                                 : "N/A"}{" "}
                               <br /> */}
                              <span>Created At:</span>{" "}
                              {moment(currentData?.createdAt).format("LLL")
                                ? moment(currentData?.createdAt).format("LLL")
                                : "N/A"}{" "}
                              <br />
                              <span>Updated By:</span>{" "}
                              {currentData?.updatedBy?.name
                                ? currentData?.updatedBy?.name
                                : "N/A"}{" "}
                              <br />
                              <span>Updated At:</span>{" "}
                              {moment(currentData?.updatedAt).format("LLL")
                                ? moment(currentData?.updatedAt).format("LLL")
                                : "N/A"}{" "}
                              <br />
                            </Typography>
                          </Box>
                        </Fade>
                      </Modal>
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
              filename={"marketdata.csv"}
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

export default MarketsTable;
