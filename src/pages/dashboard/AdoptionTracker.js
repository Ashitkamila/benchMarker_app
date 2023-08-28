import React, { useEffect, useState } from "react";
// import { CCard, CCardBody, CCol, CCardHeader, CRow } from "@coreui/react"
import {
    CChartBar,
    CChartDoughnut,
    CChartLine,
    CChartPie,
    CChartPolarArea,
    CChartRadar,
} from "@coreui/react-chartjs"
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDropdown,
    CDropdownDivider,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CRow,
} from "@coreui/react"
import axios from "axios";
// import { DocsLink } from "src/components"
import { configuration } from '../../services/appConfig'
import { Select, MenuItem } from "@material-ui/core";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar, DateRange } from 'react-date-range';
import moment from "moment";


const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);

function AdoptionTracker() {
    
    const [day, setDay] = useState();
    const Url = configuration.apiBaseUrl + `/adaptionData/?companyCode=${userDetails.companyCode}`;
    const [map_data, setMap_data] = useState([]);
    const [adoptionId, setAdoptionId] = useState();  
    const [adoptionCount, setAdoptionCount] = useState([]);

    useEffect((token) => {
        const res = axios.get(Url, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': userDetails.token
            }
        }).then((response) => {

            if (response.data.data) {
                console.log("krunal", response.data.data)
                // const fetchoneiddata = response.data.data.map(ele => ele.createdAt)
                const updatedfromdate = moment(response.data.data[0].createdAt).format('DD/MM/YYYY');
                const updatedfromdate1 = moment(response.data.data[1].createdAt).format('DD/MM/YYYY');
                const updatedfromdate2 = moment(response.data.data[2].createdAt).format('DD/MM/YYYY');
                const updatedfromdate3 = moment(response.data.data[3].createdAt).format('DD/MM/YYYY');
               const updatedfromdate4 = moment(response.data.data[4].createdAt).format('DD/MM/YYYY');
                const updatedfromdate5 = moment(response.data.data[5].createdAt).format('DD/MM/YYYY');
                const updatedtodate = moment(response.data.data[6].createdAt).format('DD/MM/YYYY');
                const updateddate = [updatedfromdate, updatedfromdate1, updatedfromdate2, updatedfromdate3, updatedfromdate4, updatedfromdate5, updatedtodate]
                  
                console.log("vinay 123", updateddate )
                const fetchonecountdata = response.data.data.map(ele => ele.count)
                console.log("vinay 123878787", fetchonecountdata)
                setMap_data(response.data.data.createdAt)
                  setAdoptionId(updateddate)
                
                 setAdoptionCount(fetchonecountdata)
            }

        })
            .catch((err) => console.log(err));

    }, []);

    // const new_array = []

    // const _id = map_data && map_data.map((item, idx) => {
    //     item.user.map((itemm, idx) => {
    //         new_array.push(itemm._id)
    //     })
    //     console.log("kt", _id)
    // });
    // const new_array1 = []

    // const count = map_data && map_data.map((item, idx) => {
    //     item.user.map((itemm, idx) => {
    //         new_array1.push(itemm.count)
    //     })
    //     console.log("kt1", count)
    // });
    return (
        <div className="col-12 row " style={{ marginLeft: "auto", marginRight: "auto", marginTop: "" }} >
            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader> <h6>Adoption Tracker</h6></CCardHeader>
                    <CCardBody>
                        <CChartLine
                            data={{

                                labels: adoptionId,
                                datasets: [
                                    {
                                        data: adoptionCount,
                                        label: "No. of Items Benchmarked",
                                        backgroundColor: "rgba(151, 187, 205, 0.2)",
                                        pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                        pointBorderColor: "#fff",
                                        borderColor: 'rgb(75, 192, 192)',
                                        tension: 0.1,
                                       

                                    },
                                    // {
                                    //     label: "My Second dataset",
                                    //     backgroundColor: "rgba(151, 187, 205, 0.2)",
                                    //     borderColor: "rgba(151, 187, 205, 1)",
                                    //     pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                    //     pointBorderColor: "#fff",
                                    //     data:"",
                                    // },
                                ],
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </div>
    )
}
export default AdoptionTracker;
