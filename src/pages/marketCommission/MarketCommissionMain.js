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
import useTable from "../../utils/table/useTable";
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
import marketCommissionHeader from "./marketCommissionHeader";
import MarketCommissionTable from "./MarketCommissionTable";
import axios from "axios";
import { configuration } from "../../services/appConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux";
import CancelIcon from "@material-ui/icons/Cancel";

function MarketCommissionMain(props) {
  const [openForm, setOpenForm] = useState(false);
    const [records, setRecords] = useState([]);


console.log("mc props are", props)
const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);

  useEffect(() => {
    props.actions.marketCommission();
         }, []);

         console.log("The MCCC props are", props.marketCommData);




// new

// const getmarketdata = async () => {
//     const res = await axios
//       .get("http://13.70.26.58:8010/api/v1/market/commission/lists/3/100")
//       .then((res) => {
//         console.log("temp",res.data.data.marketCommissionList )
//         const temp = res.data.data.marketCommissionList
//         setRecords(temp)
        
        
//                       })
//         };
//   useEffect(() => {
//     getmarketdata();
//   }, []);

//   console.log("newsww", records )

// let getmarketdata = async () => {
//     await fetch("http://13.70.26.58:8010/api/v1/market/commission/lists/3/100", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: userDetails.token,
//       },
//     })
//       .then((response) => response.json())
//       .then((response) => {
// setOpenForm(true)
//         let result = response && response.data && response.data.marketCommissionList;
//         console.log("result is", result)
//                console.log("temp",response.data.marketCommissionList )
//                setRecords(result)
       
        
//       })
//             .catch((err) => console.log("error"));
//   };
  
//   useEffect(() => {
//     getmarketdata()
//      }, []);
//      console.log("mc records", records, openForm) 

    

// new



//          console.log("marketcomm",props.marketCommData)

  // open form and close form
  const toggleComponent = () => {
    setOpenForm(!openForm);
  };
 
  return (
    <div
      className="w-100 p-2 pt-3"
      style={{ height: "calc(100% - 64px)", overflow: "auto" }}
    >
      <div className="mt-2 row">
        <div className="col-6">
          <h5 style={{ color: "#676767" }}>Market Commission</h5>
        </div>
        <div className="col-6 "></div>
      </div>
      <div style={{ overflow: "auto" }}>
        
        <MarketCommissionTable records={props.marketCommData}  />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
    console.log("new", state)
  return {
    marketCommData:state.MarketCommission.marketCommData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        marketCommission: actions.getAllMarketcommissionData,
      },
      dispatch
    ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketCommissionMain);

// export default MarketCommission;
