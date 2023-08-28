import React, { useEffect, useState } from "react";
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
} from "@coreui/react";
import {
    CChartBar,
    CChartDoughnut,
    CChartLine,
    CChartPie,
    CChartPolarArea,
    CChartRadar,
} from "@coreui/react-chartjs"
import axios from "axios";
// import { DocsLink } from "src/components"
import { configuration } from '../../services/appConfig'
import { Select } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar, DateRange } from 'react-date-range';


const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);


const PriceTrend = (props) => {
    const Url = configuration.apiBaseUrl + `/dashboard/price-trends?date=2021-12-22&location=&sort=&type=c&companyCode=${userDetails.companyCode}`;
    const [label, setLabel] = useState([])
    const [map_data, setMap_data] = useState([])
    const [records, setRecords] = useState([]);
    const [data, setData] = useState([]);
    const [item_data, setItem_data] = useState([])

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
                console.log("krunal test", response.data.data.prices)
                setItem_data(response.data.data.prices)
            }

        })
            .catch((err) => console.log(err));

    }, []);
    console.log("test")

    // useEffect(() => {
    //     setRecords(props.marketLocation);

    // }, []);


    // const durationHandler = (e) => {
    //     console.log(e.target.value)
    //     let val = e.target.value
    //     const res = axios.get(configuration.apiBaseUrl + '/dashboard/price-trends?date=' + val + '&location=&sort=&type=c', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjNzkyOTdiN2IyZjdjN2YyOTJlMmI3YjJmN2M3ODJiN2U3ODI5NzgyYjc4MmYiLCJpYXQiOjE2MzgxOTAxMjMsImV4cCI6MTYzODc5NDkyM30.UhCB2zvVlTmjwQO6EMxxTtqyr2htFkVWuenB2N4QIMs'
    //         }
    //     }).then((response) => {

    //         if (response.data.data) {

    //             setMap_data(response.data.data)
    //         }

    //     })
    //         .catch((err) => console.log(err));
    // }











    const durationHandler = (e) => {
        console.log(e.target.value)
        let val = e.target.value
        const res = axios.get(configuration.apiBaseUrl + '/dashboard/bm-performance?location=&market=&user=&duration=' + val, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': userDetails.token            }
        }).then((response) => {

            if (response.data.data) {

                setMap_data(response.data.data)
            }

        })
            .catch((err) => console.log(err));
    }
    console.log("ghapa", map_data)
    // const count_array = map_data && map_data.length > 0 && map_data.map((item, idx) => {
    //     console.log(item)
    //     return item.data
    // });

    //console.log(count_array)



    // const new_array = []

    // const label_array = map_data && map_data.length > 0 && map_data.map((item, idx) => {
    //     item.days.map((itemm, idx) => {
    //         new_array.push(itemm.data.data)
    //     })
    //     console.log(item)
    // });
    // console.log("abc", new_array)

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
    console.log("k2t", marketLocation)


    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    return (
        <div className="w-50 p-3" style={{ height: "calc(100% - 60px)" }}>
            <CCol >
                <CCard >

                    <CCardHeader>

                        <>
                            {["secondary"].map(
                                (color, index) => (
                                    <CDropdown variant="btn-group" key={index}>
                                        <h6>7 Day Price Trend</h6>                                         <CDropdownToggle color={color} style={{ height: "5vh", marginLeft: "38vh", borderRadius: "1rem" }}>Filter</CDropdownToggle>

                                        <CDropdownMenu>
                                            <CDropdownItem href="#">Choose Location:
                                                <select id="location" >
                                                    <option onChange={durationHandler} selected>Across all Loaction</option>
                                                    {marketLocation?.map((record) => (
                                                        <option value={record?.location?._id}>
                                                            {record?.location?.name ? record?.location?.name : "N/A"}
                                                        </option>
                                                    ))}
                                                </select>
                                            </CDropdownItem>
                                            {/* <CDropdownItem href="#">Choose Date:
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        style={{ width: '50px', marginLeft: '215px', height: '10px' }}
                                                        value={value}
                                                        minDate={new Date('2017-01-01')}
                                                        onChange={(durationHandler) => {
                                                            setValue(durationHandler);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>


                                            </CDropdownItem> */}
                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={item => setState([item.selection])}
                                                moveRangeOnFirstSelection={false}
                                                ranges={state}
                                            />
                                            <CDropdownItem href="#">Sort:
                                                <select>
                                                    <option>
                                                        none
                                                    </option>
                                                    <option>
                                                        Ascending
                                                    </option>
                                                    <option>
                                                        Descending
                                                    </option>
                                                </select>
                                            </CDropdownItem>

                                            <CDropdownItem href="#">Items:
                                                <select>
                                                    {item_data?.map((record) => (

                                                        <option value={record?.item?.itemId}>
                                                            {record?.item?.itemName ? record?.item?.itemName : "N/A"}
                                                        </option>
                                                    ))}
                                                </select>
                                            </CDropdownItem>
                                        </CDropdownMenu>
                                    </CDropdown>
                                ),
                            )}
                        </>








                        {/* <Select style={{ width: "150px" }}>
                        <label style={{ marginLeft: "130px" }} >Choose Location:</label>
                        <select id="location" >
                            <option onChange={durationHandler} selected>Across all Loaction</option>
                            {marketLocation?.map((record) => (
                                <option value={record?.location?._id}>
                                    {record?.location?.name ? record?.location?.name : "N/A"}
                                </option>
                            ))}
                        </select>
                        <label style={{ marginLeft: "20px", marginTop: "10px" }}><h5>Choose Date:</h5></label> &nbsp;
                        <select id="month" onChange={durationHandler}>
                            <option value="d">Day</option>
                            <option value="w" selected>Week</option>
                            <option value="m">Month</option>
                        </select>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                style={{ width: '120px', marginLeft: '215px', height: '30px' }}
                                value={value}
                                minDate={new Date('2017-01-01')}
                                onChange={(durationHandler) => {
                                    setValue(durationHandler);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <label style={{ marginTop: "10px" }}><h5>Sort:</h5></label> &nbsp;&nbsp;
                        <select>
                            <option>
                                none
                            </option>
                            <option>
                                Ascending
                            </option>
                            <option>
                                Descending
                            </option>
                        </select>
                      
                        <label ><h5>Items:</h5></label> &nbsp;&nbsp;
                        <select>
                        {item_data?.map((record) => (
                        
                                <option value={record?.item?.itemId}>
                                    {record?.item?.itemName ? record?.item?.itemName  : "N/A"}
                                           </option>
                            ))}
                            </select> 
                        </Select>  */}

                    </CCardHeader>
                    <CCardBody>
                        <CChartLine
                            data={{
                                labels: [map_data.today, map_data.todayMinusOne, map_data.todayMinustwo],
                                datasets: [
                                    {
                                        label: "My First dataset",
                                        backgroundColor: "rgba(220, 220, 220, 0.2)",
                                        borderColor: "rgba(220, 220, 220, 1)",
                                        pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                        pointBorderColor: "#fff",
                                        // data: [map_data.data.prices[0].days],
                                    },
                                    // {
                                    //     label: "My Second dataset",
                                    //     backgroundColor: "rgba(151, 187, 205, 0.2)",
                                    //     borderColor: "rgba(151, 187, 205, 1)",
                                    //     pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                    //     pointBorderColor: "#fff",
                                    //     data: [],
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
export default connect(mapStateToProps, mapDispatchToProps)(PriceTrend);
