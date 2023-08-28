import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux';
import _ from "lodash";
import { Paper, InputLabel } from '@material-ui/core';
import './style.css';
// import AddTime from './AddTime';
import AddIcon from '@material-ui/icons/Add';
import { Spinner } from './../../../utils/Spinner';
import axios from 'axios';
import { Label } from 'reactstrap';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocationwiseTable from './locationwisetable';
import {
    CButton,
    CCol,
    CContainer,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from "@coreui/react"

function LocationwiseReport(props) {

    const [openForm, setOpenForm] = useState(false);
    const [reportData, setReportData] = useState([]);
    const [newReportData, setNewReportData] = useState([])
    const [state, stateMethod] = useState(0)

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        props.actions.getlocation().then(res => {
            console.log("test", res)
            setReportData(res);
        })
        
    }

    // open form and close form
    const toggleComponent = () => {
        setOpenForm(!openForm);
    }

    const getFilterReportData = (data) => (e) => {

        e.preventDefault();
        console.log('data', data);
        // const data = {
        //     from: '2022-01-04',
        //     to: '2022-01-05'
        // }
        props.actions.getLocationReportByFilter(data).then(res => {
            if (res?.length > 0) {
                toast.success("success", { theme: "colored" });
                setNewReportData(res);
                console.log('res', res);
            }
            else {
                toast.error('No Data available for selected Date', { theme: "colored" })
                console.log('res', res);
                setNewReportData([]);
                
            }
        })
    }


    const getFilterReportData1 = (data) => (e) => {
        props.actions.getLocationReportByFilter(data).then(res => {
            if (res) {
                toast.error("no data for the day", { theme: "colored" });
                setNewReportData(res);
            }
        })
    }
    return (
        <div className="w-100 p-2 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <div className="mt-2 row">
                <div className="col-6">
                    <h5 style={{ color: "#676767" }}>Location Wise Reports</h5>
                </div>
                <div className="col-6 ">

                </div>
            </div>
            <div style={{ overflow: "auto" }}>
                {/* {
                        reportData?.length > 0 ? (
                            <BMReportsTable
                                reportData={reportData}
                            />
                        ) : (
                            <div className="d-flex justify-content-center">
                                <Spinner />
                            </div>
                        )
                    } */}
                {reportData?.length > 0 ? (
                    <LocationwiseTable
                        reportData={newReportData?.length > 0 ? newReportData : reportData}
                        getFilterReportData={getFilterReportData}
                    />
                ) : (
                    <div >
                        <LocationwiseTable
                            reportData={newReportData?.length > 0 ? newReportData : reportData}
                            getFilterReportData={getFilterReportData}
                        />
                    </div>
                )}
            </div>
            <ToastContainer transition={Zoom} theme="colored"
            />


        </div>
    );



}

const mapStateToProps = state => {
    console.log('state', state);
    return {
        reportData: state.bmreport.usersData,
        error: state.report.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getlocation: actions.getAllLocationmat,
                getLocationReportByFilter: actions.getAllLocationByDate,
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LocationwiseReport);