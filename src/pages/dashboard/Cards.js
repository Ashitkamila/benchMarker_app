import React, { useEffect, useState } from "react";
import { configuration } from '../../services/appConfig'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,
} from "@coreui/react"
import { getStyle } from "@coreui/utils"
import CIcon from "@coreui/icons-react"
import {
  cilArrowRight,
  cilBasket,
  cilBell,
  cilChartPie,
  cilMoon,
  cilLaptop,
  cilPeople,
  cilSettings,
  cilSpeech,
  cilSpeedometer,
  cilUser,
  cilUserFollow,
} from "@coreui/icons"
import { CChartBar, CChartLine } from "@coreui/react-chartjs"
import axios from "axios";
import WidgetsBrand from "./WidgetsBrand"
import WidgetsDropdown from "./WidgetsDropdown"
import { Autocomplete } from "@mui/material";
import { Card } from "@material-ui/core";



const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);


function Cards() {
  
  const Url = configuration.apiBaseUrl + `/dashboard/card-benchmarkers/?companyCode=${userDetails.companyCode}`;
  const [label, setLabel] = useState([])
  const [map_data, setMap_data] = useState([])
  const [records, setRecords] = useState([]);
  const [icon_val, setIcon_val] = useState([]);
  const [count , setCount] = useState();


  useEffect(() => {
    axios.get(`http://13.70.26.58:8010/api/v1/active/?companyCode=${userDetails.companyCode}`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': userDetails.token
      }
    }).then((response) => {

      setCount(response.data.count) ;
      console.log("krunal card 123", response.data.count)
      if (response.data.data.userCount) {
      
        setIcon_val(response.data.data.userCount)
      }
    })
      .catch((err) => console.log(err));

  }, []);

   const count_array = map_data && map_data.map((item, idx) => {
    console.log(item)
    return item.data.data.userCount
  });

  console.log("ajskjk", count_array)


  const Url1 = configuration.apiBaseUrl + `/dashboard/card-active-benchmarkers/?companyCode=${userDetails.companyCode}`;

  const [label1, setLabel1] = useState([])
  const [map_data1, setMap_data1] = useState([])
  const [records1, setRecords1] = useState([]);
  const [icon_val1, setIcon_val1] = useState([]);

  useEffect((token) => {
    const res = axios.get(Url1, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': userDetails.token
      }
    }).then((responses) => {

      console.log("krunal card", responses.data.data.email)
      if (responses.data.data.weeklyActiveUserCount) {
        console.log("krunal card", responses.data.data.weeklyActiveUserCount)
        setIcon_val1(responses.data.data.weeklyActiveUserCount)
      }

    })
      .catch((err) => console.log(err));

  }, []);


  const Url2 = configuration.apiBaseUrl + `/dashboard/card-benchmarkers/?companyCode=${userDetails.companyCode}`;
  const [label2, setLabel2] = useState([])
  const [map_data2, setMap_data2] = useState([])
  const [records2, setRecords2] = useState([]);
  const [userCount, setUserCount] = useState();
  useEffect((token) => {
    const res = axios.get(Url2, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': userDetails.token
      }
    }).then((responsess) => {

      setUserCount(responsess.data.data.userCount) ;
      if (responsess.data.data.weeklyNewUserCount) {
        console.log("krunal card", responsess.data.data.weeklyNewUserCount)
        setMap_data2(responsess.data.data.weeklyNewUserCount)
      }

    })
      .catch((err) => console.log(err));

  }, []);

  return (
    <div className="col-12 row" style={{ marginLeft: "auto", marginRight: "auto" ,  overflow: "auto" }} >
      <CCol className='col-4'>
        <CWidgetStatsC
          style={{ width: "20vw", height: "100%" }}
          color="warning"
          icon={<CIcon icon={cilBasket} height={60} />}
          value={<h5>Active/Mandatory - {count}</h5>}
          title="Items Updated in last 7 days"
          inverse
          progress={{ color: "warning", value: 120 }}

        />
      </CCol>
      <CCol className='col-4'>
        <CWidgetStatsC

          style={{ width: "20vw", height: "200px" }}
          color="info"
          icon={<CIcon icon={cilPeople} height={60} />}
          value={<h5>{userCount} Benchmarkers  </h5>}
          title={<lable>{icon_val1} Active This Week</lable>}
          inverse
          progress={{ color: "info", value: 120 }}

        />
      </CCol>

      <CCol className='col-4' >
        <CWidgetStatsC
          style={{ width: "20vw", height: "200px" }}
          color="success"
          icon={<CIcon icon={cilUserFollow} height={60} />}
          value={<h5>{map_data2}</h5>}
          title="New Benchmarker Added"
          // inverse
          progress={{ color: "success", value: 120 }}

        />
      </CCol>
    </div>




  )
}

export default Cards;
