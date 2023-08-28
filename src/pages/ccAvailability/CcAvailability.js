import React, {useState, useEffect} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux";
import CcAvailabilityTable from './CcAvailabilityTable';
import CcAvailabilityFilter from './CcAvailabilityFilter';
// import { filterReportCCAvailability } from '../../redux/ccAvailability/ccAvailabilityActions';
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
const userType = userDetails && userDetails.role;

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

let runFilter = {
  shouldFilter:false,
};


const CcavailabilitySubmitHandler = (shouldFilter, setShouldFitler, filterData) => {
  setShouldFitler(previous => ({...previous, triggerFilter: !previous.triggerFilter, filterOn: true, filterData: filterData}) );
};

const CcAvailability = (props) => {
  const classes = useStyles();
  const [predictedRecords, setPredictedRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [shouldFilter, setShouldFilter] = useState({triggerFilter: false, filterOn: false, filterData: {} });
  // const{accuracyReportData}=props
  
  // console.log("accuracy", accuracyReportData);

  
  useEffect(() => {
    if(shouldFilter.filterOn) {
      props.actions.filterReportCCAvailability(shouldFilter);
    } else {
      props.actions.getReportListCCAvailability();
    }
  }, [shouldFilter.triggerFilter]);

  // console.log("res2",props.accuracyReportData)

  const onFilterClick = (filterData) => CcavailabilitySubmitHandler(shouldFilter, setShouldFilter, filterData);
  if(shouldFilter.filterOn) {
    return (
        <div
          className=" m-4 "
          style={{ height: "calc(100% - 88px)",
          //  width: "950px" 
          }}
        >
               <div>
            <h4 className="module-title">
            CC-Availability
            </h4>
          </div>
              
          <CcAvailabilityFilter records={props.ccAvailability} submitHandler={onFilterClick}/>
          <CcAvailabilityTable records={props.ccAvailability} />
        </div>
      );
  } else {
    return (
        <div
          className=" m-4 "
          style={{ height: "calc(100% - 88px)",
          //  width: "950px" 
          }}
        >
          <div>
            <h5 className="module-title">
            CC-Availability
            </h5>
          </div>
    
          <CcAvailabilityFilter records={props.ccAvailability} submitHandler={onFilterClick}/>
          <CcAvailabilityTable records={props.ccAvailability} />
          <ToastContainer transition={Zoom} />
        </div> 
      ); 
  }
};

const mapStateToProps = (state) => {
  console.log('allStateToProps', state);
  return {
    ccAvailability: state.ccAvailability.ccAvailability,
    ccAvailabilityFilter: state.ccAvailability.ccAvailabilityFilter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getReportListCCAvailability: actions.fetchAllCCAvailabilityData,
        filterReportCCAvailability: actions.filterReportCCAvailability,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CcAvailability);



