import React, { useState, useEffect } from "react";
import useTable from "../../utils/table/useTable";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Tooltip } from "@material-ui/core";
import { CSVLink } from "react-csv";
import GetAppIcon from "@material-ui/icons/GetApp";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableBody,
  TableCell,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { InputControl } from "../../utils/FormControls";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

import { CcAvailabilityHeader } from "./CcAvailabilityHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#ffffff",
      color: "#828282",
    },
    "& .MuiTab-wrapper": {
      marginLeft: "-10px",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function CcAvailabilityTable(props) {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [anchorEl, setAnchorE1] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);

  // This useEffect will check the data is coming in 5 sec or not if no data within 5 sec it will show no data found
  useEffect(() => {
    if (props.records && props.records.length === 0) {
      setTimeout(() => {
        setNoDataFound(true);
      }, 5000);
    }
  }, []);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(props.records, CcAvailabilityHeader, filterFn);

  // CSV data

  const data =
    props.records && props.records.length > 0
      ? props.records.map((record) => ({
          LocationCode: record.cc_id,
          Location: record.cc_name,
          ItemCode: record.item_code,
          ItemName: record.item_name,
          UOM: record.uom,
          SupplyQuantity: record.supply_qty,
          PricePerUOM: record.price_per_uom,
          DeliveryDate: record.delivery_date,
        }))
      : [];
  const handleClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

 

  return (
    <div className="mt-3">
      <div className="row ">
        <div className="col-md-12 d-flex justify-content-end ">
          <div className="d-flex align-items-center ml-3">
            <Tooltip title="Filter" placement="bottom">
              <div>
                <i
                  class="bi bi-funnel icon-color"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
            </Tooltip>
          </div>
          <div className="d-flex align-items-center mx-3">
            <Tooltip title="Export to CSV" placement="bottom">
              <div>
                <i
                  onClick={handleClick}
                  class="bi bi-download icon-color"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting() !== undefined &&
              recordsAfterPagingAndSorting() !== null &&
              recordsAfterPagingAndSorting().length > 0 ? (
                recordsAfterPagingAndSorting().map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="table-cell">
                      <div className="table-cell">
                        {record && record.cc_name}- {record && record.cc_id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="table-cell">
                        {record && record.item_code}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="table-cell">
                        {record && record.item_name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="table-cell">{record && record.uom}</div>
                    </TableCell>
                    <TableCell>
                      <div className="table-cell d-flex justify-content-center">
                        {record && record.price_per_uom}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="table-cell">
                        {record && record.delivery_date}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <div
                  className="mt-5"
                  style={{ position: "absolute", left: "50%" }}
                >
                  <div>No Data Found!</div>
                </div>
              )}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </div>
      </div>
      {/* export to CSV */}
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
            filename={"ccAvailable.csv"}
            className="btn bg-gray w-100"
            target="_blank"
          >
            <span>
              <GetAppIcon fontSize="small" />
              Download as CSV
            </span>
          </CSVLink>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default CcAvailabilityTable;
