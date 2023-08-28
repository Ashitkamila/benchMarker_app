import React, { useState, useEffect } from 'react'
import { makeStyles, Menu, MenuItem, TableBody, TableCell, TableRow, } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import locationMatrixHeader from './locationMatrixHeader';
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import { times } from 'lodash';
import { Paper, Button, ButtonBase, formData } from '@material-ui/core';
import LocationMatrix from './LocationMatrix';
import transportationMatrixData from './transportationMatrixData';

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



function LocationMatixTable(props) {
    const { toggleComponent, locationMatrixData, editClickHandler, deleteClickHandler } = props;
    console.log('hhhhhhhh', locationMatrixData);

    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [anchorEl, setAnchorE1] = useState(null);

    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    useEffect(() => {
        setRecords(locationMatrixData);
    }, []);

    const transportationMatrixData1 = records && records.length > 0
        ? records.map((record) => ({
            SourceCode: record.SourceCode,
            Source: record.Source,
            DestinationCode: record.DestinationCode,
            Destination: record.Destination,
            TransportationCost: record.TransportationCost
        }))
        : [];


    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(value => value.name.toLowerCase().includes(target.value.toLowerCase()));
            }
        })
    }

    const handleClick = (event) => {
        setAnchorE1(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorE1(null)
    };

    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, locationMatrixHeader, filterFn);

    return (
        <div>
            <div className={classes.pageContent} style={{ marginBottom: "10px" }}>
                <div className="row">
                    {/* <div className="col-11 px-0">
                        <input
                            className="search-input py-1"
                            type="text"
                            placeholder="Search..."
                            onChange={handleSearch}
                        />
                    </div> */}
                    <div className="col-11.5  d-flex justify-content-end align-items-center">
                        {/* <Tooltip title="Download" placement="bottom">
                            <GetAppIcon onClick={handleClick} className="download" />
                        </Tooltip> */}
                    </div>

                </div>

                <TblContainer className="mt-2">
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((record, index) => (

                                <TableRow key={index}>
                                    <TableCell style={{ fontWeight: "500" }}>{record?.startLocation}</TableCell>
                                    <TableCell >{record?.Chennai}</TableCell>
                                    <TableCell >{record?.Hyderabad}</TableCell>
                                    <TableCell >{record?.Coimbatore}</TableCell>
                                    <TableCell >{record?.Padapai}</TableCell>
                                    <TableCell >{record?.Malur}</TableCell>
                                    <TableCell >{record?.Chickballapur}</TableCell>
                                    <TableCell >{record?.Hosur}</TableCell>
                                    <TableCell >{record?.Bangalore}</TableCell>
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
                            data={transportationMatrixData1}
                            filename={"transportationMatrix.csv"}
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
    )
}

export default LocationMatixTable;
