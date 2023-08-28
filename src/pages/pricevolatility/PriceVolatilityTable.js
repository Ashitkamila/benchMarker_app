import React, { useState, useEffect } from 'react'
import { makeStyles, Menu, MenuItem, TableBody, TableCell, TableRow, } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import priceVolatilityHeader from './priceVolatilityHeader';
import { CSVLink } from "react-csv";
import { Link, Redirect } from 'react-router-dom';
import PriceVolatility from './PriceVolatility';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import { times } from 'lodash';
import { Paper, ButtonBase, formData } from '@material-ui/core';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import Page404 from './../page404';
import { configuration } from '../../services/appConfig';
const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);

// const stallArray = (timeSlots) => {
//     if (timeSlots && timeSlots.length > 0) {
//         return timeSlots.map((timeSlot) => {
//             return (
//                 <div>{`${timeSlot.from} - ${timeSlot.to}`}</div>
//             )
//         })
//     }
// }



function PriceVolatilityTable(props) {
    const { toggleComponent, priceData, editClickHandler, deleteClickHandler, getPrice } = props;

    const classes = useStyles();
    const [factor, setFactor] = useState();
    const [ids, setIds] = useState([]);
    const [formData, setFormData] = useState({
        factor:'',
        ids:'',
    })

    const [records, setRecords] = useState([]);
    const [dataa, setDataa] = useState([]);
    const [conversionFactor, setConversionFactor] = useState("");
    const [anchorEl, setAnchorE1] = useState(null);
    const [itemName, setItemName] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState('');
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    useEffect(() => {
        setRecords(priceData);
    }, []);

    console.log("me",priceData)
    const data = records?.length > 0
        ? records.map((record) => ({
            ItemMaterialNo: record.material_no,
            ItemName: record.itemName,
            Category: record.category?.name,
            // Active: record.active,
            // Mandatory: record.mandatory,
            Volatility_Factor: record.conversionFactor
  

        }))
        : [];
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(value => value.itemName?.toLowerCase().includes(target.value?.toLowerCase()));
            }
        })
    }

    const handleClick = (event) => {
        setAnchorE1(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorE1(null)
    };


    // const submitHandler = () => {
    //     // e.preventDefault();

    //     // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjNzkyOTdiN2IyZjdjN2YyOTJlMmI3YjJmN2M3ODJiN2U3ODI5NzgyYjc4MmYiLCJpYXQiOjE2Mzg5NTQ1MzYsImV4cCI6MTYzOTU1OTMzNn0.e-8WY90lztPOm30dHEBH-E178_ioq66M82YpKdv5Z1w";


    //     fetch('http://13.70.26.58:8010/api/v1/item/update-conversion-factor', {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': userDetails.token
    //         },

    //         body: JSON.stringify({
    //             ids,
    //             factor,


    //         }),
    //     })
    //         .then((res) => {

    //             res.json();

    //             toast.success('Price Volatility Updated Successfully.', { theme: "colored" });

    //             window.priceData.reload();
    //         })
    //         .then((res) => { res.status(201).json() })
    //         .then((result) => setDataa(result.rows))
    //         .catch((err) => console.log('error'))


    // }





    


    const submitHandler = (e) => {

        
        e.preventDefault();

        const validated = isValidated(formData);
        if(validated){
            fetch(`${configuration.apiBaseUrl}/item/update-conversion-factor`   , {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                   'Authorization': userDetails.token
                },
                
                body: JSON.stringify(formData),
              })
                .then((res) => {
                   
                  res.json();
    
                  if(res.status === 201) {
                    toast.success('Volatility Updated Successfully.', { theme: "colored" });
                    window.location.reload(false)
                    //   getPrice();
               
                    }
                    else if(res.status === 400 ) {
                      toast.error("Price Volatility & Item Name is Must", { theme: "colored" })
                      
                    }
                    else if(res.status === 404 ) {
                  //    alert("User with given credentials already exist")
                  <Link 
                  href="/page404" 
                  >Soft Forecast</Link> 
                    
                  }
                })
                 .then((res) => { res.status(201).json()}  )
            .then((result) => setDataa(result.rows))
            .catch((err) => console.log('error')) 
        }else{
            toast.error("Please fill all the fields")
        }

          
          
         
  }

  const isValidated = () => {
     
 const {factor, ids} = formData;
 if(factor ==='', ids==='') return false;
 else{
    if(factor<=-1) return false;
    else if(factor>100) return false;
    else {
        return true;
    }
    
 }
        
  }
  const handleChange = e => {
      if(e.target.value>100) setError("Price Volatility Factor should be in the range of 0 to 100")
      else if(e.target.value<0)  setError("Price volatility Factor should be in the range of 0 to 100")
      else setError("")
      setFormData({...formData, ['factor']:e.target.value})
        
   }
  
  console.log("Test",records)

  const itemValues = records?.map(record=>({
    label:record.itemName,
    value: record._id
  })) 

    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, priceVolatilityHeader, filterFn);
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
                    {/* <div className="col-11.5  d-flex justify-content-end align-items-center">
                        <Tooltip title="Download" placement="bottom">
                            <GetAppIcon onClick={handleClick} className="download" />
                        </Tooltip>
                    </div> */}
                    <div className="col-11.5  d-flex justify-content-end align-items-center">
                                <Button type="primary" onClick={handleClick} shape="circle" icon={<DownloadOutlined />} />
                            </div>

                </div>
                <div>

                    <Paper className="mt-3 d-flex justify-content-center " >

                        <form className="mt-3 border p-5 mb-3" style={{ backgroundColor: "#f0f0f0" }} >

                            <h5 style={{ width: '500px', textAlign: "center" }}> Price volatility factor is the value which helps in identifying the price level fluctuations.
                                Please enter the percentage value, this value is used by system to generate alert emails for volatility oppurtunity
                            </h5>
                            <div className="mt-5">
                            <div style={{color:"red"}}>{error}</div>
                                <input
                                    className="px-2"
                                    style={{ width: '500px', height: '50px', borderRadius: '5px' }}
                                    type="number"
                                    min="0"
                                    max= "100"
                                    value={formData?.factor}
                                    onChange={handleChange}
                                    placeholder="Enter Price volatility Factor"
                                    required
                                    ></input><br />
                            </div>
                            <div>
                                <select className="mt-5"
                                    onChange={(e)=>setFormData({...formData, ['ids']:e.target.value})}
                                    style={{ width: '500px', height: '50px', borderRadius: '5px' }}
                                    placeholder="Select Item">
                                    <option selected > Select Items </option>
                                    {itemValues.map((item) => (
                                        <option value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-5 ">
                                <button
                                    style={{ width: '500px', height: '50px', borderRadius: '5px', backgroundColor: "#263544", color: "#ffffff" }}
                                    onClick={submitHandler}  > Update Price volatility Factor</button>
                            </div>
                        </form>
                    </Paper>
                </div>
                <TblContainer className="mt-2">
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(record => (
                                <TableRow key={record._id}>
                                    <TableCell style={{ fontWeight: "500" }}>{record.material_no}</TableCell>
                                    <TableCell style={{ fontWeight: "500" }}>{record.itemName}</TableCell>
                                    <TableCell style={{ fontWeight: "500" }}>{record.category?.name}</TableCell>
                                    {/* <TableCell style={{ fontWeight: "500" }}>true</TableCell>
                                    <TableCell style={{ fontWeight: "500" }}>true</TableCell> */}
                                    <TableCell style={{ fontWeight: "500" }}>{record.conversionFactor}%</TableCell>
                                    {/* <TableCell style={{ fontWeight: "500" }}>{record?.imageUrl ? <img src={record?.imageUrl} alt="" style={{ width: '100px', height: '100px', marginLeft: '-26px' }} /> : 'No Data'}</TableCell> */}

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
                            filename={"PriceVolatilityFactor.csv"}
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
            <ToastContainer transition={Zoom} theme="colored"
    />
        </div>
        
    );
    
}

export default PriceVolatilityTable;
