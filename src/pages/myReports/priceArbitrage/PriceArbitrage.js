import React, { useState, useEffect } from "react";
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
import useTable from "../../../utils/table/useTable";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import GetAppIcon from "@material-ui/icons/GetApp";
import { InputAdornment } from "@material-ui/core/InputAdornment";
import classNames from "classnames";
import SearchIcon from "@material-ui/icons/Search";
import { Button, Radio } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
// import BasicDateRangePicker from './../date/date'
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
import "antd/dist/antd.css";
import PriceArbitrageHeader from "./PriceArbitrageHeader";
import PriceArbitrageTable from './PriceArbitrageTable'
import axios from "axios";
import { configuration } from "../../../services/appConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux";
import CancelIcon from "@material-ui/icons/Cancel";


let runFilter = {
  shouldFilter:false,
};


const arbitrageSubmitHandler = (shouldFilter, setShouldFitler, filterData) => {
  setShouldFitler(previous => ({...previous, triggerFilter: !previous.triggerFilter, filterOn: true, filterData: filterData}) );
};




function PriceArbitrage(props) {
  const [openForm, setOpenForm] = useState(false);
  const [agmarkDetailData, setAgmarkDetailData] = useState([]);
  const [records, setRecords] = useState([]);
  const [shouldFilter, setShouldFilter] = useState({triggerFilter: false, filterOn: false, filterData: {} });


    

  

  useEffect(() => {
        if(shouldFilter.filterOn) {
      props.actions.getArbitrageByFilter(shouldFilter);
    } else {
      props.actions.getPriceArbitrage();
    }
  }, [shouldFilter.triggerFilter]);

   

  // useEffect(() => {

  // props.actions.getPriceArbitrage()
  // },[])


  

  console.log("arbitrageData", props.priceArbitrageData)

  // open form and close form
  const toggleComponent = () => {
    setOpenForm(!openForm);
  };
  const onFilterClick = (filterData) => arbitrageSubmitHandler(shouldFilter, setShouldFilter, filterData);
//   const getFilterAgmarkData = (data) => (e) => {

//     e.preventDefault();
//     console.log('data', data);
//     // const data = {
//     //     from: '2022-01-04',
//     //     to: '2022-01-05'
//     // }
//     props.actions.getAgmarkByFilter(data).then(res => {
//         if (res?.length > 0) {
//             toast.success("success", { theme: "colored" });
//             setNewReportData(res);
//             console.log('res', res);
//         }
//         else {
//             toast.error('No Data available for selected Date', { theme: "colored" })
//             console.log('res', res);
//             setNewReportData([]);
            
//         }
//     })
// }


  if(shouldFilter.filterOn) {
    return (
      <div
      className="w-100 p-2 pt-3"
      style={{ height: "calc(100% - 64px)", overflow: "auto" }}
    >
      <div className="mt-2 row">
        <div className="col-6">
          <h5 style={{ color: "#676767" }}>Price Arbitrage</h5>
        </div>
        <div className="col-6 "></div>
      </div>
      <div style={{ overflow: "auto" }}>
      {/* <AgmarkFilter records={props.agmarkData} submitHandler={onFilterClick}/> */}
          <PriceArbitrageTable records={props.priceArbitrageData} submitHandler={onFilterClick} />

      </div>
    </div>
      );
  } else {
    return (
      <div
      className="w-100 p-2 pt-3"
      style={{ height: "calc(100% - 64px)", overflow: "auto" }}
    >
      <div className="mt-2 row">
        <div className="col-6">
          <h5 style={{ color: "#676767" }}>Price Arbitrage</h5>
        </div>
        <div className="col-6 "></div>
      </div>
      <div style={{ overflow: "auto" }}>
      {/* <AgmarkFilter records={props.agmarkData} submitHandler={onFilterClick}/> */}
          <PriceArbitrageTable records={props.priceArbitrageData} submitHandler={onFilterClick}/>

      
    
      </div>
    </div>
      ); 
  }






  
}




// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 10,
//   p: 4,
// };
// const useStyles = makeStyles((theme) => ({
//   pageContent: {
//     // margin: theme.spacing(5),
//     padding: theme.spacing(3),
//   },
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     overflowY: "auto",
//   },
//   paper: {
//     backgroundColor: "unset",
//     border: "0px solid #000",
//     padding: "0px",
//     borderRadius: "2px",
//     boxShadow: "theme.shadows[3]",
//     outline: "none !important",
//   },
// }));

// function PriceArbitrage(props) {
//   const {
//     toggleComponent,
//     locationData,
//     editClickHandler,
//     deleteClickHandler,
//   } = props;
//   const classes = useStyles();
//   const [records, setRecords] = useState([]);
//   const [anchorEl, setAnchorE1] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const label = { inputProps: { "aria-label": "controlled" } };
//   const [value, setValue] = React.useState(null);
//   const [showActionId, setShowActionId] = useState(-1);
//   const [icon_val, setIcon_val] = useState([]);
//   const [count, setCount] = useState([]);
//   const [updatedRecords, setUpdatedRecords] = useState([]);
//   const [filterFn, setFilterFn] = useState({
//     fn: (items) => {
//       return items;
//     },
//   });

//   console.log("123", count);
//   useEffect((token) => {
//     axios
//       .get(configuration.apiBaseUrl + "/transportation/arbitrage/result?to=2022-08-09&from=2022-08-09", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         alert("new action")
//         setCount(response.data.data);
//         console.log("krunal card 123", response.data.data);
//         console.log("line 22", response.data.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     setRecords(props.locationData);
//   }, []);

//   const [currentData, setCurrentData] = useState({});
//   const data =
//     records?.length > 0
//       ? records.map((location) => ({
//           Location: location.name,
//         }))
//       : [];

//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // const handleSearch = (e) => {
//   //   let target = e.target;
//   //   setFilterFn({
//   //     fn: (items) => {
//   //       if (target.value == "") return items;
//   //       else
//   //         return items.filter((value) =>
//   //           value.name.toLowerCase().includes(target.value.toLowerCase())
//   //         );
//   //     },
//   //   });
//   // };

//   const handleData = (record) => {
//     setCurrentData(record);
//     setOpen(true);
//   };

//   const handleClick = (event) => {
//     setAnchorE1(event.currentTarget);
//   };

//   const handleCloseExport = () => {
//     setAnchorE1(null);
//   };
//   const popupClose = (e) => {
//     e.preventDefault();
//     setOpen(false);
//   };

//   const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
//     useTable(count, PriceArbitrageHeader, filterFn);
//   return (
//     <div className="w-100 p-2 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
//       <div className={classes.pageContent} style={{ marginBottom: "10px" }}>
//         <div className="col-md-12 d-flex justify-content-end">
//           <h5 style={{ color: "#676767", margin: "2px" }}>Price Arbitrage</h5>

//           <span
//             className=" d-flex justify-content-start"
//             style={{ marginRight: "auto", fontSize: "15px" }}
//           >
//             {/* &nbsp;&nbsp;&nbsp; (Total Location : {records?.length}) */}
//           </span>

//           <nav class="navbar navbar-light ">
//             <form class="form-inline border" autoComplete="off">
//               {/* <div class="input-group">
//                 <input
//                   className="search-input py-1"
//                   style={{ width: "20vw", border: "none", padding: "1px" }}
//                   type="text"
//                   name="searchText"
//                   placeholder=" Search item by name  "
//                   onChange={handleSearch}
//                 />

//                 <IconButton
//                   color="primary"
//                   type="submit"
//                   className={classNames("px")}
//                   aria-label="Search"
//                   title="Search Shortfall"
//                   disabled
//                 >
//                   <SearchIcon style={{ color: "#5078F2" }} />
//                 </IconButton>
//               </div> */}
//             </form>
//           </nav>
//           {/* 
//           <div className="d-flex align-items-center ml-7 px-4 col-1">
//             <Button
//               type="primary"
//               onClick={handleClick}
//               shape="circle"
//               icon={<DownloadOutlined />}
//             />
//           </div> */}
//         </div>
//         <TblContainer>
//           <TblHead />
//           <TableBody>
//             {recordsAfterPagingAndSorting().length > 0 ? (
//               recordsAfterPagingAndSorting().map((record, index) => (
//                 <TableRow
//                   key={record._id}
//                   onMouseEnter={() => {
//                     setShowActionId(record._id); // set id here
//                   }}
//                   onMouseLeave={() => setShowActionId(-1)}
//                   style={{ textAlign: "auto" }}
//                 >
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell style={{ fontWeight: "500" }}>
//                     {record.item}
//                   </TableCell>
//                   <TableCell>{record.source}</TableCell>
//                   <TableCell>{record.destination}</TableCell>
//                   <TableCell>{record.distance}</TableCell>
//                   <TableCell>{record.arbitary_price}</TableCell>
//                   <TableCell style={{ textAlign: "center" }} >{record.destinationFinalPrice}</TableCell>
//                   <TableCell>
//                     {moment(record?.date).format("DD/MM/YYYY")}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <div
//                 className="mt-5"
//                 style={{
//                   position: "absolute",
//                   left: "50%",
//                   color: "purple",
//                   fontSize: "15px",
//                 }}
//               >
//                 <b> Data Not Found...</b>
//               </div>
//             )}
//           </TableBody>
//         </TblContainer>
//         <TblPagination />

//         <Menu
//           id="simple-menu"
//           anchorEl={anchorEl}
//           keepMounted
//           open={Boolean(anchorEl)}
//           onClose={handleCloseExport}
//         >
//           <MenuItem onClick={handleCloseExport}>
//             <CSVLink
//               data={data}
//               filename={"locationdata.csv"}
//               className="btn bg-gray w-100"
//               target="_blank"
//             >
//               <span>
//                 <GetAppIcon fontSize="small" />
//                 Export
//               </span>
//             </CSVLink>
//           </MenuItem>
//         </Menu>
//       </div>
//   </div>
//   );
// }

const mapStateToProps = (state) => {
  return {
    priceArbitrageData: state.PriceArbitrage.priceArbitrageData,
    arbitrageFilter: state.PriceArbitrage.arbitrageFilter

    // itemData: state.item.itemData,
    // error: state.item.error,
    // marketLocation: state.marketLocation.marketLocation
    // PriceArbitrageData : state.priceArbitrage.PriceArbitrageData,
    // error: state.priceArbitrageData.error,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getPriceArbitrage: actions.getAllPriceArbitrage,
        getArbitrageByFilter: actions.getArbitrageFilterData
        // getLocations: actions.getAllMarketLocation,
        // addNewLocation: actions.addNewLocation,
        // updateLocation: actions.updateLocation
        // getitemname: actions.getAllGetItemName,
      },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PriceArbitrage);
