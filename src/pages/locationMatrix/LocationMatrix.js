import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import { Paper } from '@material-ui/core';
import LocationMatixTable from './LocationMatixTable';
import './style.css';
import { getLocationMatrix, getAllLocationMatrix } from './../../redux/locationMatrix/locationMatrixAction';
import AddIcon from '@material-ui/icons/Add';
// import { getAllLocationMatrix } from './../../redux/locationMatrix/locationMatrixAction';
import transportationMatrixData from './transportationMatrixData';


const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

const type = userDetails && userDetails.userType;

function LocationMatrix(props) {
    const [openForm, setOpenForm] = useState(false);
    const [locationMatrixData, setLocationMatrixData] = useState([]);
    const [formData, setFormData] = useState({});
    const [editForm, setEditForm] = useState(false);
    const [data, setData] = useState([])
    const [isEdit, setEdit] = useState(false);
    const [addMode, setAddMode] = useState(true);


    function getData() {
        props.actions.getLocationMatrix().then(res => {
            setLocationMatrixData(res);
        });

    }


    useEffect(() => {


        getData();

    }, [])

    // open form and close form
    const toggleComponent = () => {
        setOpenForm(!openForm);
    }

    const editClickHandler = editableData => {

        if (editableData) {
            setEdit(!isEdit);
            setEditForm(true);
            setOpenForm(!openForm);
            setFormData(editableData);
            setAddMode(!addMode);
        }


    }

    






    



    return (
        <div className="w-100 p-5 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <div className="mt-2 row">
                <div className="col-6">
                    <h5 style={{ color: "#676767" }} > Location Matrix
                        {/* <span>{openForm && (<span> / {editForm ? 'Edit Market' : 'Add New Market'}</span>)}</span> */}
                    </h5>
                </div>
                {/* <div className="col-6 d-flex justify-content-end">
                    {
                        !openForm && (
                            <button onClick={toggleComponent} class="btn btn-primary"> <AddIcon fontSize="small" /> Add New Market</button>
                        )
                    }
                </div> */}
            </div>
            <Paper className="mt-3" style={{ width: "100%", height: "100%", overflow: "auto" }}>
                <div style={{ overflow: "auto" }}>
                    {
                        !openForm ? (
                            <div>
                                {
                                    locationMatrixData?.length > 0 ? (
                                        <LocationMatixTable
                                            locationMatrixData={locationMatrixData}
                                            editClickHandler={editClickHandler}

                                        />
                                    ) : ""
                                }
                            </div>
                        ) : ""
                    }
                </div>
            </Paper>

        </div>
    )


}

const mapStateToProps = state => {
    console.log('state', state);
    return {
        transportationMatrixData: state.transportationMatrixData,
        // error: state.Price.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getLocationMatrix: actions.getAllLocationMatrix,
                // getLocations: actions.getAllLocation,
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LocationMatrix);
