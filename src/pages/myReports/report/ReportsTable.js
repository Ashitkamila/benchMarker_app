import React, { useState, useEffect } from 'react'
import { makeStyles, Menu, MenuItem, Paper, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import {
    CButton,
    CCol,
    CContainer,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from "@coreui/react"
import useTable from '../../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import reportHeader from './reportHeader';
import moment from 'moment';
import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import classNames from 'classnames';
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
// import { format } from 'date-fns'

// import Time from './Time';


const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))
const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);


function ReportsTable(props) {
    const { toggleComponent, reportData } = props;
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [anchorEl, setAnchorE1] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const label = { inputProps: { 'aria-label': 'controlled' } };
    const [value1, setValue1] = React.useState(new Date(''));
    const [value2, setValue2] = React.useState(new Date(''));
    const [usertype, setUserType] = useState('fnv');
    const [value, setValue] = React.useState(new Date(''));
    const [date, setDate] = React.useState(new Date());
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    const minDate = new Date('2020-01-01T00:00:00.000');
    const maxDate = new Date('2034-01-01T00:00:00.000');

    console.log('recordsInReport', records);
    const data = records?.length > 0
        ? records.map((Report) => ({
            
            Benchmarker_Name: Report.benchmarkerName,
            material_no: Report.material_no,
            itemName: Report.itemName,
            UoM: Report.uom,
            price: Report.price,
            itemQuestions: Report.itemQuestions.map((item) => item.question + ":" + item.selectedOption),
            Location: Report.locationName,
            marketName: Report.marketName,

            // From: Report.timefromdetails,
            // To: Report.timetodetails,
            stallType: Report.stallType,
            ShopNumber: Report.shopNumber,
            typeOfPack: Report.typeOfPack,
            categoryName: Report.categoryName,
            //  Image: 'Image',
             date: moment(Report?.createdAt).format('DD/MM/YYYY'),
             updatedAt: moment(Report?.updatedAt).format('lll'),
        }))
        : [];
    console.log(data, "data is ")



    useEffect(() => {
        setRecords(props.reportData);

    }, []);

    // const handleFilterClick = () => {
    //     // alert('Filter Click');
    //     // getPrices();
    // }

    const handleFilterClick = () => {
        const validated = checkValidation();
        console.log('filter user type', usertype);
        let from = value1.format("YYYY-MM-DD");
        console.log('from', from)
        let to = value2.format("YYYY-MM-DD");
        console.log('to', to)

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'
        const headers = {
            'Content-Type': 'application/json',
            'authorization': userDetails.token,
        };
        if (validated) {
            async function getData() {

                await axios.get('/price?size=100&from=' + from + '&to=' + to + '&userType=' + usertype+`&companyCode=${userDetails.companyCode}`, { headers })
                    .then((response) => {
                        console.log('response data', response.data);
                        setRecords(response.data.data);
                        setLoadingData(true);

                        if (response.status === 200) {
                            toast.success('Loading Data....', { theme: "colored" });
                            // window.location.reload()
                        }
                        else if (response.status === 404) {
                            toast.info("Data Not Available", { theme: "colored" })
                            // window.location.reload()
                        }
                        else if (response.status === 503) {
                            toast.info("Invalid From or To date ", { theme: "colored" })

                        }




                    })
                    .catch((err) => toast.error('Invalid From/To date OR Data not available for selected dates Select Maximum 10 days of Range between From and To', err));
            }
            if (loadingData) {
                // if the result is not ready so you make the axios call
                getData();
            }
        } else {
            toast.warn('Please fill all the fields', { theme: "colored" })
        }

    }

    const checkValidation = () => {
        if (value1 && value2 && usertype?.length > 0) {
            return true
        }
        else {
            return false
        }
    }


    const userTypeChange = (e) => {

        setUserType(e.target.value);

    }

    const handleFromChange = (newValue) => {
        setValue1(newValue);

        console.log('jhhhhhhhh', newValue);
    };
    
    useEffect(()=>{
        let from=value1
        console.log(from,"from time")
    },[value1])

    const handleToChange = (newValue) => {
        setValue2(newValue);

        console.log('lllllllllllllll', newValue);
    };



    // const handleSearch = e => {
    //     let target = e.target;
    //     setFilterFn({
    //         fn: items => {
    //             if (target.value == "")

    //                 return items;
    //             else
    //                 return items.filter(value => value.benchmarkerName.toLowerCase().includes(target.value.toLowerCase()) ||
    //                     value.itemName.toLowerCase().includes(target.value.toLowerCase()) ||
    //                     // value.pricePerUom.int(target.value) ||
    //                     value.location?.name.toLowerCase().includes(target.value.toLowerCase()) ||
    //                     value.marketName.toLowerCase().includes(target.value.toLowerCase()) ||
    //                     value.stallType.toLowerCase().includes(target.value.toLowerCase()) ||
    //                     value.typeOfPack.toLowerCase().includes(target.value.toLowerCase()) ||
    //                     value.variety.toLowerCase().includes(target.value.toLowerCase()) ||
    //                     value.item?.material_no.toLowerCase().includes(target.value.toLowerCase()) ||
    //                     value.categoryName.toLowerCase().includes(target.value.toLowerCase())


    //                 );
    //         }
    //     })
    // }

    const handleSearch = e => {

        let target = e.target;

        setFilterFn({

            fn: items => {

                if (target.value == "")

                    return items;

                else

                    return items.filter(value => value.benchmarkerName.toLowerCase().includes(target.value.toLowerCase()) ||
                        value.location?.name.toLowerCase().includes(target.value.toLowerCase()) ||
                        value.itemName.toLowerCase().includes(target.value.toLowerCase()) ||
                        value.marketName.toLowerCase().includes(target.value.toLowerCase()) ||
                        value.stallType.toLowerCase().includes(target.value.toLowerCase()) ||
                        value.typeOfPack.toLowerCase().includes(target.value.toLowerCase()) ||
                        //    value.variety.toLowerCase().includes(target.value.toLowerCase()) ||
                        value.categoryName.toLowerCase().includes(target.value.toLowerCase())
                        //    value.material_no.toLowerCase().includes(target.value.toLowerCase()) 
                    );

            }

        })

    }



    const handleClick = (event) => {
        setAnchorE1(event.currentTarget);
        console.log(event.currentTarget, "target is ")
    };
    const handleClose = () => {
        setAnchorE1(null)
    };

    function add3Dots(string, limit) {
        var dots = ".....";
        if (string.length > limit) {
            // you can also use substr instead of substring
            string = string.substring(0, limit) + dots;
        }

        return string;
    }

    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, reportHeader, filterFn);
    return (
        <div>
            <div className={classes.pageContent} style={{}}>
                <div className="row">


                    <div className="">
                        <div className="col-md-12 d-flex justify-content-end" >
                            <nav class="navbar navbar-light " >
                                <form class="form-inline border" autoComplete="off" >
                                    <div class="input-group" >
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
                            <div className="d-flex align-items-center ml-9 px-4 col-1">
                                <Button type="primary" onClick={handleClick} shape="circle" icon={<DownloadOutlined />} />
                            </div>
                        </div>

                        <div>
                        <div className='mt-2'>
                        <span style={{ color:'red',fontSize:"20px"}}>* Select atleast two dates.</span>
                        </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    label="From"
                                    // inputFormat="MM/dd/yyyy"
                                    minDate={minDate}
                                    value={value1}
                                    onChange={handleFromChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="To"
                                    // inputFormat="MM/dd/yyyy"
                                    minDate={minDate}
                                    value={value2}
                                    onChange={handleToChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    style={{ width: '120px', marginLeft: '215px', height: '35px' }}
                                    value={value}
                                    // inputFormat="MM/dd/yyyy"
                                    onChange={(value) => {

                                        setValue(value);
                                        console.log('hhhhhhh', value);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider> */}
                            {/* <select className="form-select123 form-select-sm mt-2 " style={{ marginLeft: '160px' }} /> */}
                            {/* <option value="FnV">FnV</option>
                            <option value="Imports">Imports</option> */}

                            {/* <select name="priceType" defaultValue={usertype} placeholder="Price Type" style={{ marginLeft: "20px", width: '130px', height: '56px', fontSize: "18px" }} className="select" onChange={(e) => userTypeChange(e)}>
                                <option value="" selected>Select Items</option>
                                <option value="fnv" >FnV</option>
                                <option value="nfnv">NFnV</option>
                                <option value="imports">Imports</option>
                            </select> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                            <CButton onClick={() => handleFilterClick()} style={{ marginBottom: "6px", width: '80px', height: '57px', borderRadius: "1rem" }} color="success">
                                Filter
                            </CButton>

                        </div>
                    </div>
                </div>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().length > 0 ? (
                                recordsAfterPagingAndSorting().map((record, index) => (
                                    <TableRow key={record._id} >
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell >{record?.benchmarkerName}</TableCell>
                                        <TableCell >{record?.material_no}</TableCell>
                                        <TableCell >{record?.itemName}</TableCell>
                                        <TableCell >{record?.uom}</TableCell>
                                        <TableCell >{record?.price}</TableCell>
                                        <TableCell>
                                            {
                                                record?.itemQuestions[0]?(

                                                <>
                                                    <Tooltip title={record?.itemQuestions.map((item) => {
                                                        return (
                                                            <Typography component="p">{item.question + " : " + item.selectedOption}</Typography>
                                                        )
                                                    })}>

                                                        <Typography>{add3Dots(record?.itemQuestions[0]?.question, 3)}</Typography>
                                                    </Tooltip>
                                                </>
                                                ):""

                                            }
                                        </TableCell>
                                        {/* <TableCell>
                                            {
                                                record?.itemQuestions.map((item) => {
                                                    return (
                                                        <>
                                                            <Tooltip title={<Typography component="p">{item.question + " : " + item.selectedOption}</Typography>}>

                                                                <Typography>{add3Dots(item.question, 3)}<hr /> </Typography>
                                                            </Tooltip>
                                                        </>
                                                    )
                                                })
                                            }

                                        </TableCell> */}
                                        {/* <TableCell >{record?.variety ? record?.variety : 'N/A'}</TableCell> */}
                                        <TableCell >{record?.locationName}</TableCell>
                                        <TableCell >{record?.marketName}</TableCell>
                                        {/* <TableCell >{`${record?.timefromdetails}`}</TableCell>
                                             <TableCell >{`${record?.timetodetails}`}</TableCell> */}
                                        <TableCell >{record?.stallType}</TableCell>
                                        <TableCell >{record?.shopNumber}</TableCell>
                                        <TableCell >{record?.typeOfPack}</TableCell>
                                        <TableCell >{record?.categoryName}</TableCell>
                                        <TableCell>{record?.imageUrl ? <img src={record?.imageUrl} alt="" style={{ width: '50px', height: '50px', marginLeft: '-26px' }} /> : 'No Data'}</TableCell>
                                        <TableCell >{moment(record?.createdAt).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell >{moment(record?.updatedAt).format('lll')}</TableCell>
                                        <TableCell >{record?.remark}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <div className="mt-5" style={{ position: "absolute", left: "50%", color: "purple", fontSize: "15px" }}>
                                    <b>  Data Not Found...</b>
                                </div>
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
                            filename={"reportdata.csv"}
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
            <ToastContainer transition={Zoom} theme="colored" />

        </div>
    );

}

export default ReportsTable;
