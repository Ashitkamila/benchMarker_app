import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../redux'
import _ from 'lodash'
import { Paper } from '@material-ui/core'

import TimesTable from './TimesTable'
import EditTime  from './EditTime'
import './style.css'
import AddTime from './AddTime'
import { getTime, getAllTime } from './../../redux/time/timeAction'
import AddIcon from '@material-ui/icons/Add'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { configuration } from '../../services/appConfig'

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

// const type = userDetails && userDetails.userType;

function Time(props) {
    const [openForm, setOpenForm] = useState(false)
    const [timeData, setTimeData] = useState([])
    const [marketLocation, setMarketLocation] = useState([])
    const [editForm, setEditForm] = useState(false);
    const [formData, setFormData] = useState({});
    const [addMode, setAddMode] = useState(true);
    const [data, setData] = useState([])
    // const [openForm, setOpenForm] = useState(false);
    // const [editForm, setEditForm] = useState(false);
    const [isEdit, setEdit] = useState(false);

    useEffect(() => {
        props.actions.getTime().then((res) => {
            setTimeData(res)
        })
        props.actions.getLocations().then((res) => {
            setMarketLocation(res)
        })
    }, [])

    // open form and close form
    const toggleComponent = (e) => {
        setOpenForm(!openForm)
        setEditForm(false);
        e.preventDefault()
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

    

    const handleDeleteLocation = editableData => {

        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this item.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    const id = editableData._id;
            
            
                    fetch(`${configuration.apiBaseUrl}/timeslot/` + id, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: userDetails.token,
                      },
                      body: JSON.stringify({
                        id,
                        deletedBy: userDetails._id,
                      }),
                    })
                      .then((res) => {
                        res.json();

                        toast.success("Timeslot Deleted Successfully.");

                        window.location.reload();
                      })

                      //   .then((res) => { res.status(201).json()}  )
                      .then((result) => setData(result.rows))
                      .catch((err) => console.log("error"));
                    
                }
                
              },
              {
                label: 'No',
                onClick: () => toast.warn('Action Cancelled')
              }
            ]
          });

       
        // if (window.confirm('Are you sure you want to delete this TimeSlot?')) {

        //     // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'

        //     const id = editableData._id;
            
            
        //     fetch('http://uat.apps.waycool.in:8010/api/v1/timeslot/' + id   , {
        //       method: 'PUT',
        //       headers: {
        //         'Content-Type': 'application/json',
        //          'Authorization': userDetails.token
        //       },
              
            
        //     })
        //       .then((res) => {
                 
        //         res.json();

        //           toast.success('TimeSlot Deleted Successfully.', { theme: "colored" });
                
                
        //         window.location.reload();
        //       })
            
        //     //   .then((res) => { res.status(201).json()}  )
        //       .then((result) => setData(result.rows))
        //       .catch((err) => console.log('error'))
            
        //   } else {
        //     // Do nothing!
        //     toast.success('Action Cancelled', { theme: "colored" });
        //   }

        
        
        

        
    }

    return (
        <div className="w-100 p-0 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <div className="">

                <div className="col-6">
                    <h5 style={{ color: '#676767' , cursor: "pointer" }} onClick={toggleComponent} >
                   &nbsp;     Time Slot Management
                        <span>{openForm && (<span> / {editForm ? 'Edit TimeSlot' : 'Add New TimeSlot'}</span>)}</span>
                    </h5>
                </div>
                <div className="col d-flex justify-content-end px-5"  >
                    {!openForm && (
                        <button
                            onClick={toggleComponent}
                            class="btn btn-primary"
                        >
                            {' '}
                            <AddIcon fontSize="small" /> New Time Slot{' '}
                        </button>
                    )}
                </div>
            </div>
            <Paper
                className="mt-3"
                style={{ width: '100%', height: '100%', overflow: 'auto' }}
            >
                <div style={{ overflow: 'auto' }}>
                    {!openForm ? (
                        <div>
                            {timeData?.length > 0 ? (
                                <TimesTable timeData={timeData} editClickHandler={editClickHandler} deleteClickHandler={handleDeleteLocation} />
                            ) : (
                                ''
                            )}
                        </div>
                    ) : (
                        
                        !editForm ? (
                            <AddTime
                              marketLocation={marketLocation}
                              
                            />
                            ) : <EditTime marketLocation={marketLocation} formData={formData}/>
                    )}
                </div>
                <ToastContainer transition={Zoom} theme="colored"
                />
            </Paper>
        </div>
    )
}

const mapStateToProps = (state) => {
    
    return {
        timeData: state.time.timeData,
        error: state.time.error,
        marketLocation: state.marketLocation.marketLocation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                getTime: actions.getAllTime,
                getLocations: actions.getAllLocation,
                getMarketLocation: actions.getAllMarketLocation
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
            },
            dispatch
        ),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Time)
