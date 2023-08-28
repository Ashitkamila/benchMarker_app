import React, { useState, useEffect } from 'react'
import { makeStyles, Menu, MenuItem, TableBody, TableCell, TableRow, } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ConversionMasterHeader from './ConversionMasterHeader';
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';
import ConversionMaster from './ConversionMaster';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import { times } from 'lodash';
import { Paper, Button, ButtonBase, formData } from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configuration } from '../../services/appConfig';

var locations = [
    {
        code: 'CHN',
        name: 'Chennai'
    },
    {
        code: 'BLR',
        name: 'Bangalore'
    },
    {
        code: 'HYD',
        name: 'Hyderabad'
    },
    {
        code: 'CBE',
        name: 'Coimbatore'
    },
    {
        code: 'PDP',
        name: 'Padappai'
    }
];

const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

// const stallArray = (timeSlots) => {
//     if (timeSlots && timeSlots.length > 0) {
//         return timeSlots.map((timeSlot) => {
//             return (
//                 <div>{`${timeSlot.from} - ${timeSlot.to}`}</div>
//             )
//         })
//     }
// }



function ConversionMasterTable(props) {
    const { toggleComponent, conversionData, editClickHandler, deleteClickHandler } = props;
    const [dataa, setDataa] = useState([]);
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [anchorEl, setAnchorE1] = useState(null);
    const [itemList, setItemList] = useState([]);
    const data = records?.length > 0
        ? records.map((record) => ({
            Location: record.location.name,
            FromId: record.from_item_code,
            FromItemName: record.from_item_name,
            ToId: record.to_item_code,
            ToItemName: record.to_item_name,
            ConversionRatio: record.conversion_ratio



        }))
        : [];


    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    useEffect(() => {
        setRecords(conversionData);
    }, []);


    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(value => value.location.name.toLowerCase().includes(target.value.toLowerCase())
                        || value.from_item_name.toLowerCase().includes(target.value.toLowerCase())

                    );
            }
        })
    }

    const handleClick = (event) => {
        setAnchorE1(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorE1(null)
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjNzkyOTdiN2IyZjdjN2YyOTJlMmI3YjJmN2M3ODJiN2U3ODI5NzgyYjc4MmYiLCJpYXQiOjE2Mzg5NTQ1MzYsImV4cCI6MTYzOTU1OTMzNn0.e-8WY90lztPOm30dHEBH-E178_ioq66M82YpKdv5Z1w";


        fetch(`${configuration.apiBaseUrl}/item-conversion-factor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },

            body: JSON.stringify({
                // name,
                // code,


            }),
        })
            .then((res) => {

                res.json();

                toast.success('Mapping Done Successfully.', { theme: "colored" });

                window.priceData.reload();
            })
            .then((res) => { res.status(201).json() })
            .then((result) => setDataa(result.rows))
            .catch((err) => console.log('error'))


    }
    
    const filterItems = e => {
        const test = records?.map(record => {
            if (e.target.value === record.location.name) {
                return record;
            }
        });
        console.log("recordt", test);
    }
    // console.log("item", itemList);
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, ConversionMasterHeader, filterFn);
    return (
        <div>
            <div className={classes.pageContent} style={{ marginBottom: "10px" }}>

                <div>


                    <Paper className="mt-3 d-flex justify-content-center " >

                        <form className="mt-3 border p-5 mb-3" style={{ backgroundColor: "#f0f0f0" }} >

                            <h5 style={{ width: '500px', textAlign: "center" }}> Conversion master is used to calculate Price per Piece by defining the respective From and To SKUs with respective Conversion Factor.
                            </h5>
                            <div>
                                {/* <select className="mt-5"
                                    onChange={filterItems}
                                    style={{ width: '500px', height: '50px', borderRadius: '5px' }}
                                    placeholder="Select Item" value="i" tabIndex="i"  >
                                    {locations?.map((location, index) => (
                                        <option value={location.name, location.code}  >
                                            {location.code} -  {location.name}
                                        </option>
                                    ))}
                                </select> */}
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        //multiple
                                        // value=
                                        onChange={filterItems}
                                        input={<OutlinedInput label="Name" />}
                                    // MenuProps={MenuProps}
                                    >
                                        {locations?.map((location, index) => (
                                            <MenuItem
                                                key={index}
                                                value={location.name}
                                            >
                                                {location.code} -  {location.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <select className="mt-5"
                                    style={{ width: '500px', height: '50px', borderRadius: '5px' }}
                                    placeholder="Select Item">
                                    {records.map(({ from_item_code, from_item_name }) => (
                                        <option value={from_item_code ,from_item_name}>
                                            {from_item_code} -  {from_item_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className="mt-5"
                                    style={{ width: '500px', height: '50px', borderRadius: '5px' }}
                                    placeholder="Select Item">
                                    {records.map(({ to_item_name, to_item_code, conversion_ratio }) => (
                                        <option value={to_item_name, to_item_code, conversion_ratio}>
                                            {to_item_name} -  {to_item_code} - {conversion_ratio}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-5 ">
                                <button
                                    style={{ width: '500px', height: '50px', borderRadius: '5px', backgroundColor: "#263544", color: "#ffffff" }}
                                    onClick={(e) => submitHandler}    > Submit</button>
                            </div>
                        </form>


                    </Paper>
                    <div className=" mt-5 row" >
                        <div className="col-11 px-0">
                            <input
                                className="search-input py-1"
                                type="text"
                                placeholder="Search..."
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="col-12   d-flex justify-content-end align-items-center">
                            <Tooltip title="Download" placement="bottom">
                                <GetAppIcon onClick={handleClick} className="download" />
                            </Tooltip>
                        </div>

                    </div>

                </div>
                <TblContainer className="mt-2">
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(record => (
                                <TableRow key={record._id}>
                                    <TableCell style={{ fontWeight: "500" }}>{record.location.name}</TableCell>
                                    <TableCell style={{ fontWeight: "500" }}>{record.from_item_code}</TableCell>
                                    <TableCell style={{ fontWeight: "500" }}>{record.from_item_name}</TableCell>
                                    <TableCell style={{ fontWeight: "500" }}>{record.to_item_code}</TableCell>
                                    <TableCell style={{ fontWeight: "500" }}>{record.to_item_name}</TableCell>
                                    <TableCell style={{ fontWeight: "500" }}>{record.conversion_ratio}</TableCell>
                                    <TableCell >
                                        <div className="d-flex  ">
                                            <Tooltip title="Edit User" placement="bottom">


                                                <button
                                                    onClick={() => editClickHandler(record)}
                                                    className={`border-0 p-1 action-btn`}
                                                    style={{ marginRight: "10px" }}>

                                                    <OpenInNewIcon />
                                                </button>
                                            </Tooltip>
                                            <Tooltip title="Delete User" placement="bottom">
                                                <button
                                                    // onClick={() => deleteClickHandler(record)}
                                                    className={`border-0 p-1 action-btn`}>
                                                    <DeleteOutlineIcon />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
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
                            filename={"ConversionMaster.csv"}
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
    < ToastContainer transition={Zoom} theme="colored"
    />
}

export default ConversionMasterTable;
