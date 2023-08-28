

import React, { useState, useEffect } from "react";
import { RecordVoiceOver } from "@mui/icons-material";
import "antd/dist/antd.css";

import * as actions from '../../redux';
import _ from "lodash";
import CompetitorPriceTable from "./CompetitorPriceTable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";




function CompetitorPrice(props) {


   
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);



    const handleChangePage = (event, newPage) => {
      
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
       
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    useEffect(() => {

        props.actions.getCompetitorPrice(page, rowsPerPage);

        // props.actions.getCompetitorPrice_all()

    }, [page, rowsPerPage]);

    console.log('records1', page);
    console.log('records2', rowsPerPage);

    return (
        <div
            className="w-100 p-2 pt-3"
            style={{ height: "calc(100% - 64px)", overflow: "auto" }}
        >
            <div className="mt-2 row">
                <div className="col-6">
                    <h5 style={{ color: "#676767" }}>CompetitorPrice</h5>
                </div>
                <div className="col-6 "></div>
            </div>
            <div style={{ overflow: "auto" }}>
                {/* <AgmarkFilter records={props.agmarkData} submitHandler={onFilterClick}/> */}
                <CompetitorPriceTable page={page} rowsPerPage={rowsPerPage} allData={props.competitorPriceData} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />



            </div>
        </div>
    );
}






const mapStateToProps = (state) => {
   
    return {
        competitorPriceData: state.competitorPrice.usersData.data,
        // competitorPriceData_all :state.competitorPrice_all


    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
          
            {
                getCompetitorPrice: actions.getAllCompetitorPrice,



            },
            dispatch
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CompetitorPrice);
