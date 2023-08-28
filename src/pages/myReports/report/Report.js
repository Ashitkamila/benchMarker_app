import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux';
import _ from "lodash";
import { Paper } from '@material-ui/core';
import ReportsTable from './ReportsTable';
import './style.css';
import { getReprt, getAllReport } from './../../../redux/myReport/report/reportAction';
// import AddTime from './AddTime';
import AddIcon from '@material-ui/icons/Add';
import Spinner from '../../../utils/Spinner';


function Report(props) {
    const [openForm, setOpenForm] = useState(false);
    const [reportData, setReportData] = useState([]);
    const [noData, setNoData] = useState('');
    
    
    
    useEffect(() => {
        
        
        getData();
        setNoData('No Data Available for today')
        
    }, [])
    
    function getData() {
        props.actions.getReport().then(res => {
            setReportData(res);
            console.log('reportinreport',res);
        })
    }

    // open form and close form.
    const toggleComponent = () => {
        setOpenForm(!openForm);
    }

    


    return (
        <div className="w-100 p-2 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <div className="mt-2 row">
                <div className="col-6">
                    <h5 style={{ color: "#676767" }}>Price Reports
                        
                    </h5>
                </div>
                <div className="col-6 ">
                
                </div>
            </div>
                <div style={{ overflow: "auto" }}>
                    {
                        reportData?.length > 0 ? (
                            <ReportsTable
                                reportData={reportData}
                            />
                        ) : (
                            
                             <div>
                                <ReportsTable
                                 
                                
                            />
                              
                            
                            </div>
                            
                            
                            
                            
                        )
                    }
                    
                </div>


        </div>
    )


}

const mapStateToProps = state => {
    console.log('state', state);
    return {
        reportData: state.report.reportData,
        error: state.report.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getReport: actions.getAllReport,
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Report);



























































































































































































































































































































































































































































































































































































































