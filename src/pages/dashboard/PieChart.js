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
} from "@coreui/react"
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
import Bargraph from './Bargraph';
import PriceTrend from './PriceTrend'
import Cards from "./Cards";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";

const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

// const type = userDetails && userDetails.userType;


function PieChart(props) {
    const { getAllimported } = props.actions;
    const { importedData } = props;
    const Url = configuration.apiBaseUrl + `/dashboard/pie?location=&duration=m&companyCode=${userDetails.companyCode}`;
    const [label, setLabel] = useState([])
    const [map_data, setMap_data] = useState([])
    const [records, setRecords] = useState([]);
    const [data, setData] = useState([]);
    const [marketLocation, setMarketLocation] = useState([]);


    const [label_val, setLabel_val] = useState([]);
    const [data_val, setData_val] = useState([]);

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
            console.log('pieChartResponse', response.data.data);

            if (response.data.data) {

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
        const res = axios.get(configuration.apiBaseUrl + '/dashboard/pie?location=&duration=' + val, {
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


    const durationHandler1 = (e) => {
        console.log(e.target.value)
        let val = e.target.value
        const res = axios.get(configuration.apiBaseUrl + '/dashboard/pie?location=' + val + '&duration=m', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': userDetails.token            }
        }).then((response) => {

            if (response.data.data) {
                console.log(response.data.data)
                setMap_data(response.data.data)
            }

        })
            .catch((err) => console.log(err));
    }

    const count_array = map_data && map_data.map((item, idx) => {
        return item.count
    });

    const new_array = []
    useEffect(() => {

        // const [label_val, setLabel_val] = useState([]);
        // const [data_val, setData_val] = useState([]);

        const count_array = map_data && map_data.map((item, idx) => {
            return item.count
        });

        const label_array = map_data && map_data.map((item, idx) => {
            item.category.map((itemm, idx) => {
                console.log("abc", itemm.name)
                new_array.push(itemm.name)
            })
        });

        setLabel_val(label_array)

        setData_val(count_array)


    }, [])

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
    console.log("cde", marketLocation)





    return (
       
       <div className="w-50 p-3" style={{ height: "calc(100% - 60px)" }}>

<CCol>

    <CCard >

        <CCardHeader>
                            <>
                                {["secondary"].map(
                                    (color, index) => (
                                        <CDropdown variant="btn-group" key={index}>
                                            <h6>Category wise price updates by Benchmarker </h6>                                                       <CDropdownToggle color={color} style={{ height: "5vh", marginLeft: "10vh", borderRadius: "2rem" }}>Filter</CDropdownToggle>

                                            <CDropdownMenu>
                                                <CDropdownItem href="#">Choose Location:
                                                    <select id="location" >
                                                        <option onChange={durationHandler1} selected>Across all Loaction</option>
                                                        {marketLocation?.map((record) => (
                                                            <option value={record?.location?._id}>
                                                                {record?.location?.name ? record?.location?.name : "N/A"}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </CDropdownItem>
                                                <CDropdownItem href="#">Choose Duration:
                                                    <select id="month" onChange={durationHandler}>
                                                        <option value="d">Day</option>
                                                        <option value="w" >Week</option>
                                                        <option value="m" selected>Month</option>
                                                    </select>
                                                </CDropdownItem>


                                            </CDropdownMenu>
                                        </CDropdown>
                                    ),
                                )}
                            </>

                            {/* 

                            <label style={{ marginLeft: "130px" }} >Choose Location:</label>
                            <select id="location" >
                                <option onChange={durationHandler1} selected>Across all Loaction</option>
                                {marketLocation?.map((record) => (
                                    <option value={record?.location?._id}>
                                        {record?.location?.name ? record?.location?.name : "N/A"}
                                    </option>
                                ))}
                            </select>


                            <label style={{ marginLeft: "200px" }}>Choose Duration:</label> &nbsp;
                            <select id="month" onChange={durationHandler}>
                                <option value="d">Day</option>
                                <option value="w" >Week</option>
                                <option value="m" selected>Month</option>
                            </select>
                           */}

                        </CCardHeader>

                        <CCardBody>
                            <CChartPie
                                data={{
                                    labels: label_val,
                                    datasets: [
                                        {
                                            data: count_array,
                                            backgroundColor: ['rgba(26, 188, 156,1.0)',
                                                'rgba(46, 204, 113,1.0)',
                                                'rgba(52, 152, 219,1.0)',
                                                'rgba(155, 89, 182,1.0)',
                                                'rgba(52, 73, 94,1.0)',
                                                'rgba(241, 196, 15,1.0)',
                                                'rgba(230, 126, 34,1.0)',
                                                'rgba(231, 76, 60,1.0)',
                                                'rgba(234, 32, 39,1.0)',
                                                'rgba(0, 98, 102,1.0)',
                                                'rgba(27, 20, 100,1.0)',
                                                'rgba(87, 88, 187,1.0)',
                                                'rgba(111, 30, 81,1.0)',
                                                'rgba(131, 52, 113,1.0)',
                                                'rgba(153, 128, 250,1.0)',
                                                'rgba(6, 82, 221,1.0)',
                                                'rgba(0, 148, 50,1.0)',
                                                'rgba(238, 90, 36,1.0)'],

                                            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                                        },
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
export default connect(mapStateToProps, mapDispatchToProps)(PieChart);
