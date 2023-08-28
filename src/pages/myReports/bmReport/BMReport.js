import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux';
import _ from "lodash";

import { Paper } from '@material-ui/core';
import BMReportsTable from './BMReportsTable';
import './style.css';
import { getReprt, getAllBMReport } from './../../../redux/myReport/bmreport/bmreportAction';
// import AddTime from './AddTime';
import AddIcon from '@material-ui/icons/Add';
import { Spinner } from './../../../utils/Spinner';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BMReport(props) {
    
    const [openForm, setOpenForm] = useState(false);
    const [reportData, setReportData] = useState([]);
    const [newReportData, setNewReportData] = useState([])

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        props.actions.getReport().then(res => {
            console.log("test report data", res)
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
        props.actions.getReportByFilter(data).then(res => {
            if (res?.length > 0) {
                 toast.success("success");
                setNewReportData(res);
                console.log('res' , res);
                
            }
             else if (res?.length === 0){
                toast.error('No Data available')
                console.log('res' , res);
                setNewReportData([]);
            }
        })
    }

    return (
        <div className="w-100 p-2 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <div className="mt-2 row">
                <div className="col-6">
                    <h5 style={{ color: "#676767" }}>Benchmarker performance Reports
                        
                    </h5>
                </div>
                <div className="col-6 ">
                </div>
            </div>
            <div className="mt-3" style={{ width: "100%", height: "100%", overflow: "auto" }}>
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
                {    reportData?.length > 0 ? (
                    <BMReportsTable
                        reportData={newReportData?.length > 0 ? newReportData : reportData}
                        getFilterReportData={getFilterReportData}
                    />
                   ) : (
                    <div >
                        <BMReportsTable
                        reportData={newReportData?.length > 0 ? newReportData : reportData}
                        getFilterReportData={getFilterReportData}
                    />
                    </div>
                   )}
                </div>

            </div>
            <ToastContainer transition={Zoom} theme="colored"
            />

        </div>
    )


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
                getReport: actions.getAllBMReport,
                getReportByFilter: actions.getAllBMReportByDate
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BMReport);
