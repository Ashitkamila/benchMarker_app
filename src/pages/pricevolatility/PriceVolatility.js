import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import { Paper } from '@material-ui/core';
import PriceVolatilityTable from './PriceVolatilityTable';
import './style.css';
import { getPrice, getAllPrice } from './../../redux/pricevolatility/pricevolatilityAction';
import AddIcon from '@material-ui/icons/Add';


const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

const type = userDetails && userDetails.userType;

function PriceVolatility(props) {
    const [openForm, setOpenForm] = useState(false);
    const [priceData, setPriceData] = useState([]);
    const [formData, setFormData] = useState({});
    const [editForm, setEditForm] = useState(false);
    const [data, setData] = useState([])
    const [isEdit, setEdit] = useState(false);


    const [addMode, setAddMode] = useState(true);


    function getData() {
        props.actions.getPrice().then(res => {
            setPriceData(res);
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
                    <h5 style={{ color: "#676767" }} >Price Volatility Factor
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
                                    priceData?.length > 0 ? (
                                        <PriceVolatilityTable
                                            getPrice={props.actions.getPrice}
                                            priceData={priceData}
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
        priceData: state.PriceData,
        // error: state.Price.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getPrice: actions.getAllPrice,
                // getLocations: actions.getAllLocation,
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PriceVolatility);
