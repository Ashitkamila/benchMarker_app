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
import PriceArbitrageTrackerHeader from "./PriceArbitrageTrackerHeader";
import PriceArbitrageTrackerTable from "./PriceArbitrageTrackerTable";
import axios from "axios";
import { configuration } from "../../../services/appConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux";
import CancelIcon from "@material-ui/icons/Cancel";

function PriceArbitrageTracker(props) {
  const [openForm, setOpenForm] = useState(false);
  const [agmarkDetailData, setAgmarkDetailData] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    props.actions.priceArbitrageTracker();
  }, []);

  console.log("The Arbitrage props are", props.priceArbitrageData);

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
          <h5 style={{ color: "#676767" }}>Price Arbitrage Tracker</h5>
        </div>
        <div className="col-6 "></div>
      </div>
      <div style={{ overflow: "auto" }}>
        
        <PriceArbitrageTrackerTable records={props.priceArbitrageTrackerData} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    priceArbitrageTrackerData:
      state.PriceArbitrageTracker.priceArbitrageTrackerData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        priceArbitrageTracker: actions.getAllPriceArbitrageTracker,
      },
      dispatch
    ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceArbitrageTracker);
