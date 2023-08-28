import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import { Paper, Button } from '@material-ui/core';
import SkuTable from './SkuTable';
import './style.css';
import { getSku, getAllSku } from './../../redux/sku/skuAction';
import AddIcon from '@material-ui/icons/Add';

function Sku(props) {
    const [openForm, setOpenForm] = useState(false);
    const [skuData, setSkuData] = useState([]);



    useEffect(() => {


        getData();

    }, [])

    function getData() {
        props.actions.getSku().then(res => {
            setSkuData(res);
        })
    }

    // open form and close form
    const toggleComponent = () => {
        setOpenForm(!openForm);
    }

    console.log("skuData", skuData);


    return (
        <div className="w-100 p-5 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <div className="mt-2 row">
                <div className="col-6">
                    <h5 style={{ color: "#676767" }}>Approve New SKU

                    </h5>
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <Button variant="contained" color="primary" >
                        Accept                    </Button>&nbsp;&nbsp;

                    <Button variant="contained" color="secondary">
                        Reject
                    </Button>
                </div>
            </div>
            <Paper className="mt-3" style={{ width: "100%", height: "100%", overflow: "auto" }}>
                <div style={{ overflow: "auto" }}>
                    {
                        skuData?.length > 0 ? (
                            <SkuTable
                                skuData={skuData}
                            />
                        ) : ""
                    }
                </div>
            </Paper>

        </div>
    )


}

const mapStateToProps = state => {
    return {
        skuData: state.sku.skuData,
        error: state.sku.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getSku: actions.getAllSku,

            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sku);
