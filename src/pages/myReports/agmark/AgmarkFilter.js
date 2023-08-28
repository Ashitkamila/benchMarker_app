// import React,{useState, useEffect} from "react";
// import { Grid, FormGroup, Icon, Divider, Typography } from "@material-ui/core";
// import classNames from "classnames";
// // import { InputControl } from "../../utils/FormControls";
// // import "./styles.scss";
// import Select from "react-select";
// // import { DatePicker } from 'antd';
// import { DatePicker, Space } from 'antd';
// import 'antd/dist/antd.css';
// import axios from 'axios'
// import {
//   KeyboardDatePicker,
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
// } from "@material-ui/pickers";
// // import DateFnsUtils from "@date-io/date-fns";
// // import supplierImage from "./supplierImage.png";
// // import { Multiselect } from "multiselect-react-dropdown";
// // import { formatDate, formatTime } from "../../utils/dateFormat";
// import { TextField } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// // import Autocomplete from "@material-ui/lab/Autocomplete";
// // import { ccAvailabilityActionTypes } from "../../Redux/actionTypes";
// import {
//   GET_AGMARK,
//   ADD_AGMARK,
//   UPDATE_AGMARK,
//   DELETE_AGMARK,
//   AGMARK_ERROR,
// } from "../../../redux/agmark/agmarkActionTypes";
// import moment from 'moment';


// // import { DatePicker, Space } from "antd";
// // const { RangePicker } = DatePicker;

// const { RangePicker } = DatePicker;
// const useStyles = makeStyles((theme) => ({
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     marginTop: theme.spacing(2),
//     //  width: 250,
//   },
// }));

// // Editing started from here

// export default function AgmarkFilter(props) {
//   const classes = useStyles();
//   const {
//     submitHandler,
//     formData,
//     records,
//   } = props;
//   // console.log("accuracy", records);

  
//   const [filterData, setFilterData] = useState({
//      "from":"",
//     "to":""
//   })

  
  
  
//   const onChange = (range) => {
//     // event.preventDefault();
//     const reqformat = "YYYY-MM-DD";
//     let fromDate = null;
//     let toDate = null;
//     if(range) {
//       fromDate = range[0].format(reqformat);
//       toDate = range[1].format(reqformat);
//     }
//     setFilterData({...filterData, 'to':toDate, 'from':fromDate})
//   };


//   ////////////////////////////////
//   var date = new Date();

// // add a day
// date.setDate(date.getDate() + 1);
// ///////////////////////////////
//   const submitForm = (event) => {
//      event.preventDefault();
//       console.log(filterData);
//       var today = new Date();
//       console.log(today);
//     // if((filterData.plant_code == '' || filterData.plant_code == null) && (filterData.from_date =='' || filterData.from_date==null )  &&  (filterData.material_name=='' || filterData.material_name==null )  && (filterData.to_date =="" || filterData.to_date ==null) )
//     // {
//     //  alert("Select a filter option");
//     //   return;
//     // }
//     // if(filterData.from_date && filterData.to_date)
//     // {
//     //   if((moment(filterData.to_date).format("YYYY-MM-DD") > moment(date).format("YYYY-MM-DD")) || (moment(filterData.from_date).format("YYYY-MM-DD") > moment(date).format("YYYY-MM-DD") ) ){

//     //     alert("Select valid date");
//     //   }

//     // }
    
//     submitHandler(filterData);
//   };





//   return (
//         <>
//         <div>
//                     <form className="form" onSubmit={submitForm} id="form">
//             <div className="row" >
              
//               <div className="col-md-3">
              
//               </div>
              
//               <div className="col-sm-6 col-md-4 col-lg-4" style={{ marginTop: "28px" }}>
//                     {/* <div class="dropdown custom-dropdown"> */}
//                      <DatePicker.RangePicker
//                           onChange={onChange}
                         
//                         /> 
//                     {/* </div> */}
//                   {/* <Space direction="vertical" size={12}>
//                   <RangePicker renderExtraFooter={() => 'extra footer'} />
//                 </Space> */}
//                 </div>
//                 <div className=" col-md-2  d-flex align-items-center" style={{marginTop: "20px"}} >
//                 <button variant="outlined" color="primary" type="submit" className="submitButton" >
//                   ApplyFilter </button>
//                 {/* <button variant="outlined" className="backButton" onClick={handleClose}>Cancel</button> */}
//               </div>
//             </div>
//           </form>
//         </div>
//     </>
//   );
// }
