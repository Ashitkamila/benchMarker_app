import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux";
import _ from "lodash";
import { Paper } from "@material-ui/core";
import AgmarkTable from "./AgmarkTable";
import "./style.css";

// import AddTime from './AddTime';
import AddIcon from "@material-ui/icons/Add";
import Spinner from "../../../utils/Spinner";
import { getAgmark, getAllAgmark,getAgmarkFilterData } from "../../../redux/agmark/agmarkAction";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import AgmarkFilter from "./AgmarkFilter";



let runFilter = {
  shouldFilter:false,
};


const agmarkSubmitHandler = (shouldFilter, setShouldFitler, filterData) => {
  setShouldFitler(previous => ({...previous, triggerFilter: !previous.triggerFilter, filterOn: true, filterData: filterData}) );
};




function Agmark(props) {
  const [openForm, setOpenForm] = useState(false);
  const [agmarkDetailData, setAgmarkDetailData] = useState([]);
  const [records, setRecords] = useState([]);
  const [shouldFilter, setShouldFilter] = useState({triggerFilter: false, filterOn: false, filterData: {} });


    

  

  useEffect(() => {
        if(shouldFilter.filterOn) {
      props.actions.getAgmarkByFilter(shouldFilter);
    } else {
      props.actions.getAgmark();
    }
  }, [shouldFilter.triggerFilter]);

  

  console.log("The Agmark data is", props.agmarkData)

  // open form and close form
  const toggleComponent = () => {
    setOpenForm(!openForm);
  };

//   const getFilterAgmarkData = (data) => (e) => {

//     e.preventDefault();
//     console.log('data', data);
//     // const data = {
//     //     from: '2022-01-04',
//     //     to: '2022-01-05'
//     // }
//     props.actions.getAgmarkByFilter(data).then(res => {
//         if (res?.length > 0) {
//             toast.success("success", { theme: "colored" });
//             setNewReportData(res);
//             console.log('res', res);
//         }
//         else {
//             toast.error('No Data available for selected Date', { theme: "colored" })
//             console.log('res', res);
//             setNewReportData([]);
            
//         }
//     })
// }

const onFilterClick = (filterData) => agmarkSubmitHandler(shouldFilter, setShouldFilter, filterData);
  if(shouldFilter.filterOn) {
    return (
      <div
      className="w-100 p-2 pt-3"
      style={{ height: "calc(100% - 64px)", overflow: "auto" }}
    >
      <div className="mt-2 row">
        <div className="col-6">
          <h5 style={{ color: "#676767" }}>Agmark</h5>
        </div>
        <div className="col-6 "></div>
      </div>
      <div style={{ overflow: "auto" }}>
      {/* <AgmarkFilter records={props.agmarkData} submitHandler={onFilterClick}/> */}
          <AgmarkTable records={props.agmarkData} submitHandler={onFilterClick} />

      </div>
    </div>
      );
  } else {
    return (
      <div
      className="w-100 p-2 pt-3"
      style={{ height: "calc(100% - 64px)", overflow: "auto" }}
    >
      <div className="mt-2 row">
        <div className="col-6">
          <h5 style={{ color: "#676767" }}>Agmark</h5>
        </div>
        <div className="col-6 "></div>
      </div>
      <div style={{ overflow: "auto" }}>
      {/* <AgmarkFilter records={props.agmarkData} submitHandler={onFilterClick}/> */}
          <AgmarkTable records={props.agmarkData} submitHandler={onFilterClick}/>

      
    
      </div>
    </div>
      ); 
  }






  
}




const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    agmarkData : state.Agmark.agmarkData,
    agmarkFilter : state.Agmark.AgmarkFilter
    // error: state.agmark.error,
    // reportData: state.report.reportData,
   
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getAgmark: actions.getAllAgmark,
        getAgmarkByFilter : actions.getAgmarkFilterData
              },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Agmark);
