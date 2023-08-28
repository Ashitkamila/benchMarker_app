import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import { Paper } from '@material-ui/core';
import ConversionMasterTable from './ConversionMasterTable';
import './style.css';
import { getConversion, getAllConversion } from './../../redux/conversionMaster/conversionMasterAction';
import AddIcon from '@material-ui/icons/Add';


const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

const type = userDetails && userDetails.userType;

function ConversionMaster(props) {
    const [openForm, setOpenForm] = useState(false);
    const [conversionData, setConversionData] = useState([]);
    const [formData, setFormData] = useState({});
    const [editForm, setEditForm] = useState(false);
    const [data, setData] = useState([])
    const [isEdit, setEdit] = useState(false);


    const [addMode, setAddMode] = useState(true);


    function getData() {
        props.actions.getConversion().then(res => {
            console.log("con", res)
            setConversionData(res);
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

    // const handleDeleteMarket = editableData => {

    //     if (window.confirm('Are you sure you want to delete this market?')) {




    //         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjNzkyOTdiN2IyZjdjN2YyOTJlMmI3YjJmN2M3ODJiN2U3ODI5NzgyYjc4MmYiLCJpYXQiOjE2MzcxNDQ5OTksImV4cCI6MTYzNzc0OTc5OX0.qid0qMOQRXrzXw240vrQ84-HA7-GptFKeeVlTgnR2TU'
    //         const id = editableData._id;


    //         fetch('http://uat.apps.waycool.in:8010/api/v1/market/' + id, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': token
    //             },


    //         })
    //             .then((res) => {

    //                 res.json();

    //                 alert('Location Deleted Successfully.');
    //                 // setEmployees(del)

    //                 window.location.reload();
    //             })

    //             //   .then((res) => { res.status(201).json()}  )
    //             .then((result) => setData(result.rows))
    //             .catch((err) => console.log('error'))

    //     } else {
    //         // Do nothing!
    //         window.alert('Action Cancelled');
    //     }






    // }

    return (
        <div className="w-100 p-5 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <div className="mt-2 row">
                <div className="col-6">
                    <h5 style={{ color: "#676767" }} onClick={toggleComponent}>Conversion Master
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
                                    conversionData?.length > 0 ? (
                                        <ConversionMasterTable
                                            conversionData={conversionData}
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
        conversionData: state.conversionData,
        // error: state.Price.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getConversion: actions.getAllConversion,
            
            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConversionMaster);
