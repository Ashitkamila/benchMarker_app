import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import { Paper } from '@material-ui/core';
import MarketsTable from './MarketsTable';
import './style.css';
import AddMarket from './AddMarket';
import EditMarket from './EditMarket';
import { getMarket, getAllMarket } from './../../redux/market/marketAction';
import AddIcon from '@material-ui/icons/Add';
import { getAllLocation } from './../../redux/market/marketAction';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { configuration } from '../../services/appConfig';
import {Redirect} from "react-router-dom"
import EditMarketDetails from './EditMarketDetails';


const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

// const type = userDetails && userDetails.userType;

function Market(props) {
    const [openForm, setOpenForm] = useState(false);
    const [marketData, setMarketData] = useState([]);
    const [marketLocation, setMarketLocation] = useState([]);
    const [newTimeSlot, setNewTimeSlot] = useState([]);
    const [formData, setFormData] = useState({});
    const [editForm, setEditForm] = useState(false);
    const [data, setData] = useState([])
    const [isEdit, setEdit] = useState(false);
    
  console.log('marketLocation',marketLocation);
  const [addMode, setAddMode] = useState(true);

    useEffect(() => {
       console.log("Props",props)

        getData();

    }, [])

    function getData() {
        props.actions.getMarket().then(res => {
            setMarketData(res);
        });

        props.actions.getLocations().then(res => {
            setMarketLocation(res);
        })

    }
console.log('allmarkets',marketData);
    // open form and close form
    const toggleComponent = () => {
        setOpenForm(!openForm);
        setEditForm(false);
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

    const handleDeleteMarket = editableData => {

        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this item.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    const id = editableData._id;
            
            
                    fetch(`${configuration.apiBaseUrl}/market/`+ id   , {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userDetails.token
                    },
                    body: JSON.stringify({
                        id,
                        changedBy : userDetails.email,
                        deletedBy:userDetails._id,
                    }),
                    
                    
                    
                    })
                    .then((res) => {
                        
                        res.json();

                        toast.success('Market Deleted Successfully.');
                                
                        window.location.reload();
                    })
                    
                    //   .then((res) => { res.status(201).json()}  )
                    .then((result) => setData(result.rows))
                    .catch((err) => console.log('error'))
                    
                }
                
              },
              {
                label: 'No',
                onClick: () => toast.warn('Action Cancelled')
              }
            ]
          });
        
        // if (window.confirm('Are you sure you want to delete this market?')) {

            
            
            
        //     // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'
        //     const id = editableData._id;
            
            
        //     fetch('http://uat.apps.waycool.in:8010/api/v1/market/' + id   , {
        //       method: 'PUT',
        //       headers: {
        //         'Content-Type': 'application/json',
        //          'Authorization': userDetails.token
        //       },
              
            
        //     })
        //       .then((res) => {
                 
        //         res.json();

        //           toast.success('Location Deleted Successfully.', { theme: "colored" });
        //         // setEmployees(del)
                
        //         window.location.reload();
        //       })
            
        //     //   .then((res) => { res.status(201).json()}  )
        //       .then((result) => setData(result.rows))
        //       .catch((err) => console.log('error'))
            
        //   } else {
        //     // Do nothing!
        //     toast.success('Action Cancelled');
        //   }

        
        
        

        
    }

    return (
        <div className="w-100 p-0 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <div className="">
                <div className="col-6">
                    <h5 style={{ color: "#676767", margin: "10px" }} onClick={toggleComponent}> Market Management
                    <span>{openForm && (<span> / {editForm ? 'Edit Market' : 'Add New Market'}</span>)}</span>
                    </h5>
                    {/* <span className="user-name">{userDetails.name}</span>     */}
                </div>
                <div className="col d-flex justify-content-end px-5"  >

                    {
                        !openForm && (
                            <button onClick={toggleComponent} class="btn btn-primary"> <AddIcon fontSize="small" /> Add New Market</button>
                        )
                    }
                </div>
            </div>

            <div style={{}}>
                    {
                        !openForm ? (
                            <div>
                                {
                                    marketData?.length > 0 ? (
                                        <MarketsTable
                                            marketData={marketData}
                                            editClickHandler={editClickHandler}
                                            deleteClickHandler={handleDeleteMarket}
                                        />
                                    ) : ""
                                }
                            </div>
                        ) : (
                            !editForm ? (
                                <AddMarket
                                  marketLocation={marketLocation}
                                  setNewTimeSlot={setNewTimeSlot}
                                />

                                //   <Redirect to="/addmarket"/>
                                  
                                
                                ) : 
                                // <EditMarket marketData={marketData} formData={formData}/>
                                    <EditMarketDetails marketData={marketData} formData={formData}/>
                            
                        )
                    }
                </div>
                <ToastContainer transition={Zoom} theme="colored"
            />
        </div>
    );



}

const mapStateToProps = state => {
    console.log('state23456', state);
    return {
        marketData: state.market.marketData,
        error: state.market.error,
        marketLocation: state.marketLocation.marketLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getMarket: actions.getAllMarket,
                getLocations: actions.getAllLocation,
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Market);
