import React, { useState, useEffect } from 'react'
import { makeStyles, Menu, MenuItem, Paper, TableBody, TableCell, TableRow, FormControlLabel, Checkbox, FormGroup, IconButton } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import timeHeader from './timeHeader';
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import Time from './Time';
import classNames from 'classnames';
import SearchIcon from "@material-ui/icons/Search";
 import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
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

function TimesTable(props) {
  const { toggleComponent, timeData, editClickHandler, deleteClickHandler } =
    props;
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [anchorEl, setAnchorE1] = useState(null);
  const [showActionId, setShowActionId] = useState(-1);
  const [currentData, setCurrentData] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  useEffect(() => {
    setRecords(props.timeData);
  }, []);

  const handleSearch = (e) => {
    let target = e.target;

    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (value) =>
              value.market?.location?.name
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              value.market?.name
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              value.from.toLowerCase().includes(target.value.toLowerCase()) ||
              value.to.toLowerCase().includes(target.value.toLowerCase())
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

  const data =
    records?.length > 0
      ? records.map((record) => ({
          Location: record?.market?.location?.name,
          Market: record?.market?.name,
          From: record?.from,
          To: record?.to,
        }))
      : [];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, timeHeader, filterFn);
    console.log('oiuytrew',records);
  return (
    <div>
      <div className={classes.pageContent} style={{ marginBottom: "10px" }}>
        <div className="col-md-12 d-flex justify-content-end">
          {/* <span className=" d-flex justify-content-start" style={{ marginRight: "auto", fontSize: "15px", }} >&nbsp;&nbsp;&nbsp;  (Total Market : {records?.length})</span> */}

          <nav class="navbar navbar-light ">
            <form class="form-inline border" autoComplete="off">
              <div class="input-group">
                <input
                  className="search-input py-1"
                  style={{ width: "20vw", border: "none", padding: "1px" }}
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
            { recordsAfterPagingAndSorting()?.length > 0 ? (
              recordsAfterPagingAndSorting().map((record, index) => (
                <TableRow key={record?._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{record?.market?.location?.name}</TableCell>
                  <TableCell>{record?.market?.name}</TableCell>
                  <TableCell>{`${record?.from}`}</TableCell>
                  <TableCell>{`${record?.to}`}</TableCell>

                  <TableCell>
                    <div className="d-flex  ">
                      <Tooltip title="Edit TimeSlot" placement="bottom">
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
                      <Tooltip title="Delete TimeSlot" placement="bottom">
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
                      style={{
                        color: "rgb(85,105,255)",
                        border: "none",
                        cursor: "pointer",
                      }} />
                   
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
                              More Info : {currentData?.market?.location?.name}{" "}
                              - {currentData?.market?.name}
                            </Typography>

                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              <span>Created By:</span>{" "}
                              {currentData?.createdBy?.name
                                ? currentData?.createdBy?.name
                                : "N/A"}{" "}
                              <br />
                              <span>Created At:</span>{" "}
                              {moment(currentData?.createdAt ? currentData?.createdAt : "N/A").format(
                                "LLL"
                              )}{" "}
                              <br />
                              <span>Updated By:</span> {currentData?.updatedBy ?  currentData?.updatedBy : "N/A"}{" "}
                              <br />
                              <span>Updated At:</span>{" "}
                              {moment(currentData?.updatedAt).format("LLL")}{" "}
                              <br />
                              {/* <h1>qhfwdhgq</h1> */}
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
              filename={"timeslotdata.csv"}
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

export default TimesTable;
