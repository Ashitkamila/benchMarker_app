import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import { Paper } from '@material-ui/core';
import BmManagementsTable from './BmManagementsTable';
import './style.css';
import AddBmManagement from './AddBmManagement';
import AddIcon from '@material-ui/icons/Add';
import { getMarket, getAllMarket } from './../../redux/market/marketAction';
import { getAllMarketLocation } from './../../redux/marketLocation/marketLocationAction';
import EditBmManagement from './EditBmManagement';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { configuration } from '../../services/appConfig';


const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);


function BmManagement(props) {
  const { getAllBmManagement, addNewUser, updateUser } = props.actions;
  const { bmManagementData } = props;
  const [openForm, setOpenForm] = useState(false);
  // const [editForm, setEditForm] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [bmData, setBmData] = useState([]);
  const [formData, setFormData] = useState({});
  const [notify, setNotify] = useState({});
  const [addMode, setAddMode] = useState(true);
  const [marketLocation, setMarketLocation] = useState([]);

  useEffect(() => {


    getData();
  }, [])

  const getData = () => {
    getAllBmManagement().then(res => {

      // console.log("abc", res)
      setBmData(res);
    });

    props.actions.getLocations().then(res => {
      setMarketLocation(res);
    })
  }


  // open form and close form
  const toggleComponent = (e) => {
    
    
    
    
    setOpenForm(!openForm);
    setEdit(false);
    
    
  }
  
  
 

  const editClickHandler = editableData => {
    
    if (editableData) {
      setEdit(true);
      // setEditForm(!editForm);
      setOpenForm(!openForm);
      setFormData(editableData);
      setAddMode(!addMode);
    }
  }
  const handleDeleteItem = editableData => {

    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this Benchmarker.',
      buttons: [
      {
        label: 'Yes',
        onClick: () => {
          const id = editableData._id;
          // console.log("sadwert", id)
          // fetch(', {

          fetch(`${configuration.apiBaseUrl}/user/deleteUser`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userDetails.token
            },
            body: JSON.stringify({
              id,
              deletedBy : userDetails._id
            }),



          })
            .then((res) => {

              res.json();

              toast.success('Benchmarker Deleted Successfully.');

              window.location.reload();
            })

            //   .then((res) => { res.status(201).json()}  )
            .then((result) => setData(result.rows))
            .catch((error) => console.log('error'))

        }

      },
      {
        label: 'No',
        onClick: () => toast.warn('Action Cancelled')
      }
    ]
    });

}
  
  
  return (
    <div className="w-100 p-0 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
      <div className="" >
        <div className="col-6">
          <h5 style={{ color: "#676767", margin: "10px" }} onClick={toggleComponent}> &nbsp; BM Management
            <span>{openForm && (<span> / {isEdit ? 'Edit BM' : 'Add BM'}</span>)}</span>
          </h5>
        </div>
        <div style={{ overflow: "auto" }}>

          <div className="">
          </div>

          <div className="col d-flex justify-content-end px-3"  >
          {
            !openForm && (
              <button onClick={toggleComponent} class="btn btn-primary"> <AddIcon fontSize="small" /> Add New BM</button>
            )
          }
        </div>
        </div>
      </div>
        <div style={{  }}>
          {
            !openForm ? (
              <div>
                {
                  bmData && bmData.length > 0 ? (
                    <BmManagementsTable
                      bmManagementData={bmData}
                      // toggleComponent={toggleComponent}
                      editClickHandler={editClickHandler}
                    deleteClickHandler={handleDeleteItem}

                    />
                  ) : ""
                }
              </div>
            ) : (
              !isEdit ? (
                <AddBmManagement
                  marketLocation={marketLocation}   
                />
              ) : <EditBmManagement marketLocation={marketLocation} formData={formData} />
            )
          }
        </div>

      <ToastContainer transition={Zoom}
      />
    </div>
  )

}



const mapStateToProps = state => {
  return {
    bmManagementData: state.bmManagement.BmManagementData,
    error: state.bmManagement.error,
    marketLocation: state.marketLocation.marketLocation

  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getAllBmManagement: actions.getAllBmManagement,
        
        addNewUser: actions.addNewUser,
        updateUser: actions.updateUser,
        getLocations: actions.getAllLocation,
        getMarketLocation: actions.getAllMarketLocation,

      },
      dispatch,
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BmManagement);


