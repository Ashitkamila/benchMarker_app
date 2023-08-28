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
import { Select,MenuItem } from "@material-ui/core";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar, DateRange } from 'react-date-range';

const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);

const Bargraph = (props) => {
    const Url = configuration.apiBaseUrl + `/dashboard/bm-performance?location=&market=&user=&duration=d&companyCode=${userDetails.companyCode}`;
    const [label, setLabel] = useState([])
    const [map_data, setMap_data] = useState([])
    const [map_data1, setMap_data1] = useState([])
    const [map_data2, setMap_data2] = useState([])
    const [records, setRecords] = useState([]);
    const [data, setData] = useState([]);
    const [marketLocation, setMarketLocation] = useState([]);

    const [items, setItems] = useState([
        { label: "Select Location", value: "" }
    ]);
    const [value, setValue] = useState(items[0].value);
    useEffect(() => {
        setRecords(props.marketLocation);

    }, []);
    useEffect((token) => {
        const res = axios.get(Url, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': userDetails.token
            }
        }).then((response) => {

            if (response.data.data) {
                console.log("krunal asdjasdkj", response.data.data)
                setMap_data(response.data.data)
            }

        })
            .catch((err) => console.log(err));

    }, []);

    // useEffect(() => {
    //     setRecords(props.marketLocation);

    // }, []);


    const durationHandler = (e) => {
        console.log(e.target.value)
        let val = e.target.value
        const res = axios.get(configuration.apiBaseUrl + '/dashboard/bm-performance?location=&market=&user=&duration=' + val, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': userDetails.token
            }
        }).then((response) => {

            if (response.data.data) {

                setMap_data(response.data.data)
            }

        })
            .catch((err) => console.log(err));
    }


    const durationHandler1 = (e) => {
        console.log("location handler", e.target.value)
        let val1 = e.target.value
        const res = axios.get(configuration.apiBaseUrl + '/dashboard/bm-performance?location=' + val1 + '&market=&user=&duration=d', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': userDetails.token
            }
        }).then((response) => {

            if (response.data.data) {

                setMap_data1(response.data.data)
            }

        })
            .catch((err) => console.log(err));
    }

    const durationHandler2 = (e) => {
        console.log(e.target.value)
        let val2 = e.target.value
        console.log('val2', val2);
        const res = axios.get(configuration.apiBaseUrl + '/dashboard/bm-performance?location=&market=&user=' + val2 + '&duration=d', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': userDetails.token
            }
        }).then((response) => {

            if (response.data.user.name) {

                setMap_data2(response.data.user.name)
            }

        })
            .catch((err) => console.log(err));
    }
    console.log("ghapa", map_data)
    const count_array = map_data && map_data.map((item, idx) => {
        console.log(item)
        return item.count
    });

    console.log(count_array)



    const new_array = []

    const label_array = map_data && map_data.map((item, idx) => {
        item.user.map((itemm, idx) => {
            new_array.push(itemm.name)
        })
        console.log("l",item)
    });
    useEffect(() => {


        getData();

    }, [])

    function getData() {
        props.actions.getImported().then(res => {

            console.log("abcd", res)
            if (res) {
                setData(res)
            }
            // setImportedData(res);
        });
        props.actions.getLocations().then(res => {
            setMarketLocation(res);
        })

    }
    console.log("kt", marketLocation)
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);


    return (
        <div className="w-50 p-3" style={{ height: "calc(100% - 60px)" }}>

            <CCol>

                <CCard >

                    <CCardHeader>


                        {
                            ["secondary"].map(
                                    (color, index) => (
                                    <CDropdown variant="btn-group" key={index} >
                                        <h6>Benchmarker Performance</h6>  <CDropdownToggle color={color} style={{ height: "5vh", marginLeft: "35vh", borderRadius: "1rem" }}>Filter</CDropdownToggle>
                                            <CDropdownMenu>
                                            {/* <CDropdownItem href="#">Choose Location:

                                                    <select id="location" onChange={durationHandler1}>
                                                    <option Checkbox >Across All Loaction</option>
                                                        {marketLocation?.map((record) => (
                                                            <option Checkbox value={record?.location?._id}>
                                                                {record?.location?.name ? record?.location?.name : "N/A"}
                                                            </option>
                                                        ))}
                                                    </select></CDropdownItem>
                                                <CDropdownItem href="#">Choose Market:
                                                    <select id="location" >
                                                        <option onChange={durationHandler2} selected>Across All Market</option>
                                                        {marketLocation?.map((record) => (
                                                            <option value={record?._id}>
                                                                {record?.name ? record?.name : "N/A"}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </CDropdownItem>
                                                <CDropdownItem href="#">Choose Benchmarker:
                                                    <select id="location" >
                                                        <option onChange={durationHandler2} selected> All Benchmarker's</option>
                                                        {marketLocation?.map((record) => (
                                                            <option value={record?._id}>
                                                                {record?.data?.map(data => <div>{`${data?.data[0].user[0].name}`}</div>)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </CDropdownItem> */}

                                                <CDropdownItem href="#">Choose Duration:
                                                    <select id="month" onChange={durationHandler}>
                                                        <option value="d" selected >Day</option>
                                                        <option value="w" >Week</option>
                                                        <option value="m">Month</option>
                                                    </select>
                                                </CDropdownItem>

                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={item => setState([item.selection])}
                                                moveRangeOnFirstSelection={false}
                                                ranges={state}
                                            />
                                            </CDropdownMenu>
                                        </CDropdown>

                                    ),
                        )}

                      
                    </CCardHeader>
                    <CCardBody>
                        <CChartBar
                            data={{
                                labels: new_array,
                                datasets: [
                                    {
                                        label: "Price Count",
                                        backgroundColor: "#f87979",
                                        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#94CE3D", "#DB7028"],
                                        data: count_array,
                                    },
                                ],
                            }}
                            labels="months" 
                        />  
                    </CCardBody>
                </CCard>
            </CCol>
        </div>


    ) 
}


const mapStateToProps = state => {
    console.log('imported', state);
    return {
        importedData: state.imported.importedData,
        error: state.imported.error,
        marketLocation: state.marketLocation.marketLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getImported: actions.getAllImported,
                getLocations: actions.getAllMarketLocation,
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bargraph);

