import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  FormControlLabel,
  IconButton,
  Checkbox,
  FormGroup,
} from "@material-ui/core";
import useTable from "../../utils/table/useTable";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import itemNfnvHeader from "./itemNfnvHeader";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import GetAppIcon from "@material-ui/icons/GetApp";
//import Spinner from '../../utils/Spinner';
import Spinner from '../../utils/Spinner';
import classNames from 'classnames';
import SearchIcon from "@material-ui/icons/Search";
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { EditTwoTone } from "@material-ui/icons";
import 'antd/dist/antd.css';
// import Time from './Time';
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
  // border: "2px solid #000",

  boxShadow: 5,
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
    // border: "0px solid #000",
    padding: "0px",
    borderRadius: "2px",
    boxShadow: "theme.shadows[1]",
    outline: "none !important",
  },
}));

function NfnvItemsTable(props) {
  const { toggleComponent, itemData, editClickHandler, deleteClickHandler } =
    props;
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [records2, setRecords2] = useState([]);
  const [anchorEl, setAnchorE1] = useState(null);
  const [loading, setLoading] = useState(false);
  const label = { inputProps: { "aria-label": "controlled" } };
  const [items, setItems] = useState([{ label: "Select Location", value: "" }]);
  const [value, setValue] = useState(items[0].value);
  const [checked, setChecked] = useState(false);
  const [showActionId, setShowActionId] = useState(-1);
  const [currentData, setCurrentData] = useState({});
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, records) => {
    console.log("chiku", records);
    // const recordId = records.map((record) => record._id);
    // const recordId = records.find(ele => ele._id)
    // console.log('record id', recordId);
    // setChecked(event.target.checked);
    if (event.target.checked) {
      setChecked(records._id);
    } else {
      setChecked(!event.target.checked);
    }
  };

  useEffect(() => {
    //   setRecords2(props.marketLocation);
    setRecords(props.itemData);
    console.log("itemdataa", itemData);
    let unmounted = false;
  }, []);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (value) =>
              value?.itemName?.toLowerCase().includes(target.value.toLowerCase())

            //   || value.material_no.toLowerCase().includes(target.value.toLowerCase())

            // || value.category.toLowerCase().includes(target.value.toLowerCase())

            // || value.UoM.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const popupClose = () => {
    setOpen(false);
  };

  const handleData = (record) => {
    setCurrentData(record);
    setOpen(true);
  };

  const handleClick = (event) => {
    setAnchorE1(event.currentTarget);
  };
  const handleCloseExport = () => {
    setAnchorE1(null);
  };
  const data =
    props.records?.length > 0
      ? props.records.map((record) => ({
          Material_No: record?.material_no,
          Item_Name: record?.itemName,
          variety: record?.variety,
          Category: record?.category?.name,
          UoM: record?.UoM,
        }))
      : [];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(props.records, itemNfnvHeader, filterFn);
  console.log("yuy", props.records);
  return (
    <div>
      <span style={{ margin: "10px", fontSize: "15px" }}>
        &nbsp;&nbsp;&nbsp; (Total Item : {props.records.length})
      </span>

      <div className="row col-12 ">
        <div className="col-md-5 "></div>
        <div className="col-md-5 d-flex justify-content-end">
          <nav class="navbar navbar-light ">
            <form class="form-inline border" autoComplete="off">
              <div class="input-group">
                <input
                  className="search-input py-1"
                  style={{ width: "20vw", border: "none", padding: "2px" }}
                  type="text"
                  name="searchText"
                  placeholder="   Search item by name... "
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
        </div>
        <div className="d-flex align-items-center ml-6 px-4 col-1">
          {/* <Tooltip title="Filter" placement="bottom">
            <div><i class="bi bi-funnel-fill" style={{ color: "#5078F2", fontSize: "25px" }}></i></div>
          </Tooltip> */}
        </div>
        {/* <div className="d-flex align-items-center ml-3 px-3" > 
          <Tooltip title="Export in Excel">
            <GetAppIcon onClick={handleClick} className="download" />
          </Tooltip>
        </div> */}
        <div className="d-flex align-items-center ml-5 px-4 col-1">
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
            recordsAfterPagingAndSorting().map((record, index) => {
              return (
                <TableRow
                  key={record._id}
                  onMouseEnter={() => {
                    setShowActionId(record._id); // set id here
                  }}
                  onMouseLeave={() => setShowActionId(-1)}
                >
                  {/* <TableCell>
              <Checkbox
                checked={checked}
                onChange={(e) => handleChange(e, record)}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </TableCell> */}
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{record?.material_no}</TableCell>
                  <TableCell>{record?.itemName}</TableCell>
                  {/* <TableCell>
                    {record?.variety?.map((variety) => (
                      <div>{`${variety}`}</div>
                    ))}
                  </TableCell> */}
                  <TableCell>{record?.category?.name}</TableCell>
                  <TableCell>{record?.UoM}</TableCell>

                  {/* <TableCell>{record?.baseQuantity}</TableCell> */}
                  {/* <TableCell>{ record?.imageUrl ? <img src={record?.imageUrl} alt="" style={{width:'100px', height:'100px', marginLeft: '-26px'}}/> : 'No Data' }</TableCell> */}

                  <TableCell>
                    {record._id === showActionId ? (
                      <div className="d-flex">
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
                            <EditTwoTone />
                            {/* <OpenInNewIcon /> */}
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete" placement="bottom">
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
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>
                    <InfoOutlinedIcon
                      onClick={() => handleData(record)}
                      style={{
                        color: "rgb(85,105,255)",
                        border: "none",
                        cursor: "pointer",
                      }}
                    />

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
                              More Info:{" "}
                              {currentData?.material_desc
                                ? currentData?.material_desc
                                : "N/A"}
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
                              {currentData?.createdBy?.name
                                ? currentData?.createdBy?.name
                                : "N/A"}{" "}
                              <br />
                              <span>Created At:</span>{" "}
                              {moment(
                                currentData?.createdAt
                                  ? currentData?.createdAt
                                  : "N/A"
                              ).format("LLL")}{" "}
                              <br />
                              <span>Updated By:</span>{" "}
                              {currentData?.updatedBy?.name
                                ? currentData?.updatedBy?.name
                                : "N/A"}{" "}
                              <br />
                              <span>Updated At:</span>{" "}
                              {moment(
                                currentData?.updatedAt
                                  ? currentData?.updatedAt
                                  : "N/A"
                              ).format("LLL")}{" "}
                              <br />
                            </Typography>
                          </Box>
                        </Fade>
                      </Modal>
                    </div>
                  </TableCell>
                </TableRow>
              );
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
              <b> Data Not Found...Search by Item Name</b>
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
            filename={"NfnvItemsTable.csv"}
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
  );
}

export default NfnvItemsTable;
