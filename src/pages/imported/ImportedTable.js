import React, { useState, useEffect } from 'react'
import { makeStyles, Menu, MenuItem, Paper, TableBody, TableCell, TableRow, FormGroup, Select, FormControlLabel, Checkbox, FormControl, InputLabel, IconButton } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import importedHeader from './importedHeader';
import classNames from 'classnames';
import SearchIcon from "@material-ui/icons/Search";
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))


function ImportedTable(props) {
  console.log('importedProps', props);
    const { toggleComponent, importedData, editClickHandler, deleteClickHandler } = props;
    console.log('importedData', importedData)
    const classes = useStyles();
    const [record, setRecord] = useState([]);
    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [anchorEl, setAnchorE1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([
        { label: "Select Location", value: "" }
    ]);
    const [value, setValue] = useState(items[0].value);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    useEffect(() => {
        setRecords2(props.marketLocation);
        setRecords(props.importedData);

    }, []);

    const data = records?.length > 0
        ? records.map((record) => ({
            Item_Name: record && record.itemName,
        }))
        : [];
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(value => value.itemName.toLowerCase().includes(target.value.toLowerCase()));
            }
        })
    }

    const handleClick = (event) => {
        setAnchorE1(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorE1(null)
    };


    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, importedHeader, filterFn);
    // useEffect(() => {
    //     let unmounted = false;
    //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ODI4NzkyODdiMmMyZjdhMjg3ODdkMjk3NTdjN2Y3YTdhN2Q3OTc1N2U3NDdkN2IiLCJpYXQiOjE2Mzg3Njk0NzUsImV4cCI6MTYzOTM3NDI3NX0.Cw6LJuq6vy1WUHbGBXFWrvjh9fPjANmWK8DdTeklRLg'
    //     async function getCharacters() {
    //         const response = await fetch(
    //             "http://13.70.26.58:8010/api/v1/market?location?", {
    //             headers: {
    //                 'Authorization': token
    //             }
    //         }
    //         );
    //         const body = await response.json();
    //         console.log('body', body);

    //         console.log('response', response);
    //         // if (!unmounted) {
    //         //     setItems(
    //         //         body.data.map(({ location }) => ({ label: location.name, value: location.name }))
    //         //     );

    //         //     setLoading(true);
    //         // }

    //     }
    //     getCharacters();
    //     return () => {
    //         unmounted = true;
    //     };
    // }, []);


    // console.log("efg", props.marketLocation[0]?.location)
    return (
      <div>
        <span style={{ margin: "10px", fontSize: "15px" }}>
          &nbsp;&nbsp;&nbsp; (Total Item : {records?.length})
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
            {/* <select
                            style={{ width: '200px', height: '33px', borderRadius: '5px' }}
                            value={value}
                            onChange={e => setValue(e.currentTarget.value)}
                        >

                            {items.map(({ label, value }) => (
                                <option key={label.id} value={value}>
                                    {label}

                                </option>
                            ))}
                        </select> */}

            {/* <select
                            className="px-2"
                            autoFocus
                            style={{ width: '20vw', height: '35px', borderRadius: '5px' }}
                            value={value}

                            onChange={e => setValue(e.currentTarget.value)}>
                            <option value='' > Select Location </option>
                            {props.marketLocation?.map((record) => (
                                <option value={record?.location?._id}>
                                    {record?.location?.name}
                                </option>
                            ))}
                        </select> */}
          </div>

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
              recordsAfterPagingAndSorting().map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell style={{ textAlign: "flex", fontWeight: "400" }}>
                    {record && record.itemName}
                  </TableCell>
                  {/* <TableCell >{record.images}</TableCell> */}
                  {/* <TableCell style={{ fontWeight: "500" }}>{record?.imageUrl ? <img src={record?.imageUrl} alt="" style={{ width: '100px', height: '100px', marginLeft: '-26px' }} /> : 'No Data'}</TableCell> */}
                  <TableCell style={{ fontWeight: "200" }}>
                    {record?.imageUrl ? (
                      <img
                        src={record?.imageUrl}
                        alt=""
                        style={{
                          width: "100px",
                          height: "100px",
                          marginLeft: "-26px",
                        }}
                      />
                    ) : (
                      "No Data"
                    )}
                  </TableCell>

                  {/* <TableCell >
                                        <div className="d-flex  ">
                                            <Tooltip title="Edit " placement="bottom">
                                                <button
                                                    // onClick={() => editClickHandler(record)}
                                                    className={`border-0 p-1 action-btn`}
                                                    style={{ marginRight: "10px" }}>

                                                    <OpenInNewIcon />
                                                </button>
                                            </Tooltip>
                                            <Tooltip title="Delete " placement="bottom">
                                                <button
                                                    // onClick={() => deleteClickHandler(record)}
                                                    className={`border-0 p-1 action-btn`}>
                                                    <DeleteOutlineIcon />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </TableCell> */}
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
            )}
          </TableBody>
        </TblContainer>
        <TblPagination />

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
              filename={"importeditemdata.csv"}
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

export default ImportedTable;
