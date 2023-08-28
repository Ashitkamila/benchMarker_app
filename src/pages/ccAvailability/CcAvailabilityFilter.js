import React,{useState, useEffect} from "react";
import { Grid, FormGroup, Icon, Divider, Typography } from "@material-ui/core";
import classNames from "classnames";
import { InputControl } from "../../utils/FormControls";
import Select from "react-select";
// import { DatePicker } from 'antd';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GET_CC_AVAILABILITY } from "../../redux/ccAvailability/ccAvailabilityActionTypes";
import moment from 'moment';
import { CButton } from "@coreui/react";


// import { DatePicker, Space } from "antd";
// const { RangePicker } = DatePicker;

const { RangePicker } = DatePicker;
const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    //  width: 250,
  },
}));



export default function CCAvailabilityFilter(props) {
  const classes = useStyles();
  const {
    submitHandler,
    formData,
    records,
  } = props;
  // console.log("accuracy", records);

  const[plantList, setPlantList] = useState([]);
  const [materialList, setMaterialList] = useState([]);

  const [filterData, setFilterData] = useState({
    'material_name':'',
    'plant_code':'',
    "to_date":"",
    "from_date":""
  })

  
  plantList.sort((a,b) => a.plant_code - b.plant_code);
  
  const plantValues = plantList && plantList.map(record => ({
              value: record.plant_code,
              label: record.plant_name
          }));

  const materialValues = materialList && materialList.map(record => ({
  
    
            value: record.material_code,
            label: record.material_name,    
        }));
  console.log('allvalues', materialValues);
  const onChange = (range) => {
    // event.preventDefault();
    const reqformat = "YYYY-MM-DD";
    let fromDate = null;
    let toDate = null;
    if(range) {
      fromDate = range[0].format(reqformat);
      toDate = range[1].format(reqformat);
    }
    setFilterData({...filterData, 'to_date':toDate, 'from_date':fromDate})
  };


  ///////////////////////////////
  var date = new Date();

// add a day
date.setDate(date.getDate() + 1);
///////////////////////////////
  const submitForm = (event) => {
     event.preventDefault();
      var today = new Date();
      console.log(today);
    if((filterData.plant_code == '' || filterData.plant_code == null) && (filterData.from_date =='' || filterData.from_date==null )  &&  (filterData.material_name=='' || filterData.material_name==null )  && (filterData.to_date =="" || filterData.to_date ==null) )
    {
     alert("Select a filter option");
      return;
    }
    if(filterData.from_date && filterData.to_date)
    {
      if((moment(filterData.to_date).format("YYYY-MM-DD") > moment(date).format("YYYY-MM-DD")) || (moment(filterData.from_date).format("YYYY-MM-DD") > moment(date).format("YYYY-MM-DD") ) ){

        alert("Select valid date.");
      }

    }
    
    submitHandler(filterData);
  };


const plantDetails = async () =>{
  const incomingPlantData = await axios.get(`https://api-myprice.censanext.com/api/v1/LocationDetail`).then((response)=>{
    
    if(response){
  
setPlantList(response.data.filter)
    }
  })
}
const materialDetails = async () =>{
  const incomingMaterialData = await axios.get(`https://api-myprice.censanext.com/api/v1/getItem`).then((response)=>{
    if ( response){
      setMaterialList(response.data)
    }
  })
}

useEffect(()=>{
  plantDetails()
  materialDetails()
},[])

const handleInputChangeForPlant = name => (e,value) => {
  if(value) {
    setFilterData({...filterData, [name]:value.value});
  } else {
    setFilterData({...filterData, [name]:null});
    
  }
}

const handleInputChangeForMaterial = name => (e,value) => {
  if(value) {
    setFilterData({...filterData, [name]:value.label});
  } else {
    setFilterData({...filterData, [name]:null});
  }
}

  return (
        <>
        <div>
                    <form className="form" onSubmit={submitForm} id="form">
            <div className="row" >
              <div className="col-md-2">
                <Autocomplete
                  style={{ marginTop: "28px" }}
                  id="size-small-standard"
                  size="small"
                  options={plantValues}
                  getOptionLabel={(option) => (option.label? option.label+"-"+option.value : "")}
                  classes={{option: classes.option}}
                 onChange={handleInputChangeForPlant('plant_code')}
                  autoHighlight
                  name="name"
                  renderInput={(params) => (
                    <TextField
                    {...params}
                      label="Select CC Code"
                      labelName="Item Name"
                      variant="outlined"
                            />
                  )}
                />
              </div>
              <div className="col-md-2">
              <Autocomplete
                  style={{ marginTop: "28px" }}
                  id="size-small-standard"
                  size="small"
                  options={materialValues}
                  getOptionLabel={(option) => (option.label? option.label+"-"+option.value : "")}
                  classes={{option: classes.option}}
                  onChange={handleInputChangeForMaterial('material_name')}
                  autoHighlight
                  name="name"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Item Name"
                      labelName="Item Name"
                      variant="outlined"
                            />
                  )}
                />
              </div>
              
              <div className="col-sm-4 col-md-4 col-lg-4" style={{ marginTop: "28px" }}>
                    {/* <div class="dropdown custom-dropdown"> */}
                     <DatePicker.RangePicker
                          onChange={onChange}
                         
                        /> 
                    {/* </div> */}
                  {/* <Space direction="vertical" size={12}>
                  <RangePicker renderExtraFooter={() => 'extra footer'} />
                </Space> */}
                </div>
                <div className=" col-md-1  d-flex align-items-center" style={{marginTop: "20px"}} >
                {/* <button variant="outlined" color="primary" type="submit" className="submitButton"  disabled={formData == ""}>
                  ApplyFilter </button> */}
                  <CButton
                         
                          type="submit"
                          style={{
                            marginBottom: "57px",
                            width: "120px",
                            height: "45px",
                            borderRadius: "1rem",
                            cursor:"pointer"
                          }}
                          disabled={formData == ""}
                          color="success"
                        >
                          Filter
                        </CButton>
                {/* <button variant="outlined" className="backButton" onClick={handleClose}>Cancel</button> */}
              </div>
            </div>
          </form>
        </div>
    </>
  );
}
