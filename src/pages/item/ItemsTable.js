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
  Checkbox,
  IconButton,
  FormGroup,
} from "@material-ui/core";
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react"
import useTable from "../../utils/table/useTable";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import itemHeader from "./itemHeader";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import GetAppIcon from "@material-ui/icons/GetApp";
// import Time from './Time';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import SearchIcon from "@material-ui/icons/Search";
import { margin, padding } from '@mui/system';
import AddItem from "./AddItem";
import { Radio } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { EditTwoTone, Filter } from "@material-ui/icons";
import moment from "moment";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { RecordVoiceOver } from "@mui/icons-material";
import { Button } from "antd";
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
    margin: theme.spacing(5),
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

function ItemsTable(props) {
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
  const [selectedFnvItems, setSelectedFnvItems] = useState([]);
  // const [checked, setChecked ] = useState(false);
  const [showActionId, setShowActionId] = useState(-1);
  const [currentData, setCurrentData] = useState({});
  // console.log("123",currentData);
  const [filterFn, setFilterFn] = useState({
    fn: (data) => {
      console.log(data,"itemsis")
      return data;
    },
  });
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setRecords2(props.marketLocation);
    setRecords(props.itemData);

    let unmounted = false;

    

  }, []);

  useEffect(()=>{
    let temp=filterFn
    console.log(temp,"filter data")
  },[filterFn])

  const handleSearch = (e) => {
    let target = e.target;



    
    setFilterFn({
      fn: (items) => {
        console.log("check items", items)
        // console.log("target is", target.value)
        if (target.value == "") return items;
        
        else
          return items.filter(
            (value) =>
            value?.material_desc?.toLowerCase()
                .includes(target?.value?.toLowerCase()) ||
              value?.material_no
                .toLowerCase()
                .includes(target?.value?.toLowerCase()) ||
              value?.category?.name
                .toLowerCase()
                .includes(target?.value?.toLowerCase())

            // || value.userType.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  // const handleChange = (event, record) => {
  //   // setChecked(event.target.checked);
  //   if (event.target.checked) {
  //     const newSelecteds = record.map((record) => record._id);
  //     setSelectedFnvItems(newSelecteds)
  //      setChecked(event.target.checked);
  //     // this.setState({
  //     //   // selectedvendorRowData: this.props.vendorsData,
  //     //   selectedFnvItems: newSelecteds,
  //     // });
  //   } else {
  //     setSelectedFnvItems()
  //   }
  // };
  const handleChange = (event, records) => {
    // console.log("check", records);
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

  const popupClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const data =
    records?.length > 0
      ? records.map((record) => ({
          Material_No: record?.material_no,
          Item_Name: record?.itemName,
          Category: record?.category?.name,
          UoM: record?.UoM,
          //  Base_Quantity: record?.baseQuantity,
        }))
      : [];

  // const onmouseover = () => {
  //   setIsShown(true);
  //   console.log('is shown', isShown);
  // }

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, itemHeader, filterFn);

  return (
    <div>
      <span style={{ margin: "10px", fontSize: "15px" }}>
        &nbsp;&nbsp;&nbsp; (Total Item : {itemData.length})
      </span>
      <div className="row col-12 ">
        <div className="col-md-5 "></div>
        <div className="col-md-5 d-flex justify-content-end">
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
        </div>

        <div className="d-flex align-items-center ml-6 px-4 col-1"></div>

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
            recordsAfterPagingAndSorting().sort((a,b)=>a.material_desc>b.material_desc?1:-1).map((record, index) => (
              <TableRow
                key={record._id}
                onMouseEnter={() => {
                  setShowActionId(record._id); // set id here
                }}
                onMouseLeave={() => setShowActionId(-1)}
                // aria-checked={isItemSelected}
                // tabIndex={-1}
                // selected={isItemSelected}
              >
                <TableCell >{index + 1}</TableCell>
                {/* <TableCell>{record._id}</TableCell> */}
                {/* <TableCell>
                  <Checkbox
                    checked={checked}
                    onChange={(e) => handleChange(e, record)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </TableCell> */}

                {/* <TableCell>{record?.imageUrl ? <img src={record?.imageUrl} alt="" style={{ width: '40px', height: '40px' }} /> : 'No Data'}</TableCell> */}
                <TableCell>{record?.material_no}</TableCell>
                <TableCell>{record?.material_desc} </TableCell>
                <TableCell>{record?.category?.name}</TableCell>
                <TableCell>  {record.otherUoms?.map((item) => (
                        <div>{`${item.uom}`}</div>
                      ))}</TableCell>
                <TableCell style={{ fontWeight: "200" }}>
                  {record?.imageUrl ? (
                    <img
                      src={record?.imageUrl}
                      alt="waycool"
                      style={{
                        width: "60px",
                        height: "60px",
                        opacity : "100%",
                        borderRadius: "3px",
                        marginLeft: "-26px",
                      }}
                    />
                  ) : (
                    "No Data"
                  )}
                </TableCell>
                {/* <TableCell style={{ textAlign: "center" }}>{record?.baseQuantity}</TableCell> */}
                <TableCell>
                  {/* {record._id === showActionId ? ( */}
                    <div className="d-flex">
                      <Tooltip title="Edit" placement="bottom">
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
                  {/* ) : (
                    ""
                  )} */}
                </TableCell>
                {/* <TableCell>{moment(record?.updatedAt).format("lll")}</TableCell> */}
                <TableCell>
                  {/* <Button > */}{" "}
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
                    style={{ color: "rgb(85,105,255)", cursor: "pointer" }}
                  />
                  {/* </Button> */}
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
                            More Info :{" "}
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
              <b> Data Not Found...Search by Item Name</b>
            </div>
            // <center> <b className="d-flex justify-content-center " style={{ color: "red" }}>
            //   Data Not Found
            // </b> </center>
          )}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <div>
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
              filename={"FnvItemMaster.csv"}
              className="btn bg-gray"
              target="_blank"
            >
              <span>
                <GetAppIcon />
                Export
              </span>
            </CSVLink>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default ItemsTable;
