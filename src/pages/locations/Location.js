import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import { Paper } from '@material-ui/core';
import LocationsTable from './LocationsTable';
import './style.css';
import AddLocation from './AddLocation';
import EditLocation  from './EditLocation';
import { getLocation, getAllLocation, deleteLocation } from './../../redux/location/locationAction';
import AddIcon from '@material-ui/icons/Add';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { configuration } from '../../services/appConfig';
import { userLogout } from '../../Timer';


const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);
// console.log('user details', userDetails);
//    const usertoken = userDetails.token;
// const type = userDetails && userDetails.userType;

function Location(props) {
    const [openForm, setOpenForm] = useState(false);
    const [locationData, setLocationData] = useState([]);
    const [formData, setFormData] = useState({});
    const [data, setData] = useState([])
    const [rows, setRows] = useState([
        { id: "", name: "" },
    ]);
    
  
  const [editForm, setEditForm] = useState(false);
  const [isEdit, setEdit] = useState(false);
//   const [selectedLocationid, setLocationid] = useState("");
  
  const [addMode, setAddMode] = useState(true);
  useEffect(() => {
    getData()
  },[])
  

    useEffect(() => {
        const user = localStorage.getItem("User");
    
    const userDetails = JSON.parse(user);
    console.log("UserDetails",userDetails)
    if(!userDetails){

        userLogout()
}
        

    }, [editForm, openForm])

    function getData() {
        props.actions.getLocation().then(res => {
            
            console.log(res,"response ")
            
            setLocationData(res);
            
        })
        
    }

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


    

    const handleDeleteLocation = editableData => {
       
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this item.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    const id = [editableData._id];
            
            
                    fetch(`${configuration.apiBaseUrl}/location/`+ id   , {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userDetails.token
                    },
                    body: JSON.stringify({
                        id,
                        deletedBy: userDetails._id,

                    }),
                    
                    
                    
                    })
                    .then((res) => {
                        
                        res.json();

                        toast.success('Location Deleted Successfully.');
                        
                        
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

        // if (window.confirm('Are you sure you want to delete this location?')) {

            
        //     // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'
        //     const id = editableData._id;
            
        //     fetch('http://uat.apps.waycool.in:8010/api/v1/location/' + id   , {
        //       method: 'PUT',
        //       headers: {
        //         'Content-Type': 'application/json',
        //           'Authorization': userDetails.token
        //         },
              
            
        //     })
        //       .then((res) => {
                 
        //         res.json();

        //           toast.success('Location Deleted Successfully.');
                
                
        //         // window.location.reload();
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
                    <h5 style={{ color: "#676767", margin: "10px" }} onClick={toggleComponent} >Location Management
                    <span>{openForm && (<span> / {editForm ? 'Edit Location' : 'Add New Location'}</span>)}</span>
                    </h5>
                </div>
                <div style={{ overflow: "auto" }}>

                    <div className="">
                    </div>
                    <div className="col d-flex justify-content-end px-3"  >
                    {
                        !openForm && (
                            <button onClick={toggleComponent} class="btn btn-primary"> <AddIcon fontSize="small" /> Add New Location</button>
                        )
                    }
                </div>
                </div>
            </div>
            <div style={{}}>
                    {
                        !openForm ? (
                            <div>
                                {
                                    locationData?.length > 0 ? (
                                        <LocationsTable
                                            locationData={locationData}
                                            editClickHandler={editClickHandler}
                                            deleteClickHandler={handleDeleteLocation}
                                        />
                                    ) : ""
                                }
                            </div>
                        ) : (
                            !editForm ? (
                                <AddLocation
                                  
                                  
                                />
                                ) : <EditLocation  formData={formData}/>
                        )
                    }

                </div>
                <ToastContainer transition={Zoom} theme="colored"
            />

        </div>
    );


}

const mapStateToProps = state => {
    return {
        locationData: state.location.locationData,
        error: state.location.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getLocation: actions.getAllLocation,
                deleteLocation: actions.deleteLocation,
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Location);


