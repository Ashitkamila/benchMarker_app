import React, { useState, useEffect } from 'react'
import { makeStyles, Menu, MenuItem, TableBody, TableCell, TableRow, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import skuHeader from './skuHeader';
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
// import Sku from './Sku';
import { times } from 'lodash';

const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))



function SkuTable(props) {
    const { toggleComponent, skuData } = props;
    console.log("sku", skuData);
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [anchorEl, setAnchorE1] = useState(null);

    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    useEffect(() => {
        setRecords(skuData);
    }, []);

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


    const data = records?.length > 0
        ? records.map((record) => ({

            Benchmarker: record?.requestBenchmarkerId?.name,
            Location: record.requestLocation.name,
            SKU: record.name,
            Market: record.requestMarket?.name,
            Status: record.requestStatus,




        }))
        : [];

    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, skuHeader, filterFn);
    return (
        <div>
            <div className={classes.pageContent} style={{ marginBottom: "10px" }}>
                <div className="row">
                    <div className="col-11 px-0">
                        <input
                            className="search-input py-1"
                            type="text"
                            placeholder="Search..."
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="col-1  d-flex justify-content-end align-items-center">
                        <Tooltip title="Download" placement="bottom">
                            <GetAppIcon onClick={handleClick} className="download" />
                        </Tooltip>
                    </div>

                </div>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((record, index) => (

                                <TableRow key={record._id}>

                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "500" }} >{record?.requestBenchmarkerId?.name}</TableCell>
                                    <TableCell >{record.requestLocation.name}</TableCell>
                                    <TableCell >{record.name}</TableCell>
                                    <TableCell >{record.requestMarket.name}</TableCell>
                                    <TableCell >{record.requestStatus}</TableCell>

                                </TableRow>
                            )
                            )
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
                            filename={"sku.csv"}
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

export default SkuTable;
