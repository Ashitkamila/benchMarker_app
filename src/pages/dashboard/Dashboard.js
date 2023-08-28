import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CCardHeader, CRow } from "@coreui/react"
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
import PieChart from "./PieChart";
import AdoptionTracker from "./AdoptionTracker";
const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

// const type = userDetails && userDetails.userType;


function Dashboard(props) {
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
                'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjNzkyOTdiN2IyZjdjN2YyOTJlMmI3YjJmN2M3ODJiN2U3ODI5NzgyYjc4MmYiLCJpYXQiOjE2MzgxOTAxMjMsImV4cCI6MTYzODc5NDkyM30.UhCB2zvVlTmjwQO6EMxxTtqyr2htFkVWuenB2N4QIMs'
            }
        }).then((response) => {

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
                'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjNzkyOTdiN2IyZjdjN2YyOTJlMmI3YjJmN2M3ODJiN2U3ODI5NzgyYjc4MmYiLCJpYXQiOjE2MzgxOTAxMjMsImV4cCI6MTYzODc5NDkyM30.UhCB2zvVlTmjwQO6EMxxTtqyr2htFkVWuenB2N4QIMs'
            }
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
                'authorization': userDetails.token
            }
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
                console.log(itemm.name)
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
        <div className="w-100 p-2" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <Cards />
            <div style={{ display: "flex", marginTop:"15px"}}>
                <Bargraph />
                <PriceTrend />
            </div>
            <div  style={{ display: "flex", marginTop: "15px" }}>
                {/* <PieChart /> */}
                <AdoptionTracker />
            </div>



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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
