import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _, { add } from "lodash";
import { Paper } from '@material-ui/core';
import UsersTable from './UsersTable';
import './style.css';
import AddUser from './AddUser';
import EditUser from './EditUser';
import Spinner from '../../utils/Spinner';
import AddIcon from '@material-ui/icons/Add';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { configuration } from '../../services/appConfig';

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;
// const type = userDetails && userDetails.userType;

function UserManagement(props) {
  const { usersData } = props;
  const { getAllUsers, addNewUser, updateUser } = props.actions;
  const [openForm, setOpenForm] = useState(false);
  // const [usersData, setUsersData]=  useState([]);
  const [formData, setFormData] = useState({});
  const [notify, setNotify] = useState({});
  const [addMode, setAddMode] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [data, setData] = useState([])
  const [isEdit, setEdit] = useState(false);
  const user = localStorage.getItem('User');
  const userDetails = JSON.parse(user);


  useEffect(() => {
    getAllUsers();
  }, [getAllUsers,]);


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

  const handleDeleteUser = editableData => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this item.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const id = [editableData._id];


            fetch(`${configuration.apiBaseUrl}/admin-users/`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': userDetails.token
              },
              body: JSON.stringify({
                id,
                deletedBy: userDetails._id

              }),



            })
              .then((res) => {

                res.json();

                toast.success('Admin User Deleted Successfully.');


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
    // if (window.confirm('Are you sure you want to delete this user?')) {




    //     const id = editableData._id;

    //     // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'

    //     fetch('http://uat.apps.waycool.in:8010/api/v1/admin-users/' + id, {
    //       method: 'PATCH',
    //       headers: {
    //         'Content-Type': 'application/json',
    //          'Authorization': userDetails.token
    //       },
    //       body: JSON.stringify({
    //         deleteStatus: 'true'
    //      })


    //     })

    //     .then((res) => {

    //         res.json();

    //       toast.success('User deleted Successfully.', { theme: "colored" });
    //         // setEmployees(del)
    //          window.location.reload();
    //       })



    //     //   .then((res) => { res.status(201).json()}  )
    //       .then((result) => setData(result.rows))
    //       .catch((err) => console.log('error'))

    //     //    .then ((res, status, message) => { if(status === '201'){
    //     //         <Alert severity="success" color="info">{message}</Alert>

    //   } else {
    //     // Do nothing!
    //   toast.success('Action Cancelled', { theme: "colored" });
    //   }






  }



  return (
    <div className="w-100 p-5 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
      <div className="mt-2 row">
        <div className="col-6">
          <h5 style={{ color: "#676767" }} onClick={toggleComponent}>
            Admin Role Management
            <span>{openForm && (<span> / {editForm ? 'Edit User' : 'Add New User'}</span>)}</span>
          </h5>
        </div>
        <div className="col-6 d-flex justify-content-end">
          {
            !openForm && (
              <button onClick={toggleComponent} class="btn btn-primary"> <AddIcon fontSize="small" /> Add New User</button>
            )
          }
        </div>
      </div>
      <Paper className="mt-3" style={{ width: "100%", height: "100%", overflow: "auto" }}>
        <div style={{ overflow: "auto" }}>
          {
            !openForm ? (
              <div>
                {
                  usersData && usersData.length > 0 ? (
                    <UsersTable
                      usersData={usersData}
                      toggleComponent={toggleComponent}
                      editClickHandler={editClickHandler}
                      deleteClickHandler={handleDeleteUser}
                    />
                  ) : (
                    <div className="d-flex justify-content-center">
                      <Spinner />
                    </div>
                  )
                }
              </div>

            ) : (

              !editForm ? (
                <AddUser
                  formData={formData}
                />



              ) : <EditUser usersData={usersData} formData={formData} />
            )
          }
        </div>
        <ToastContainer transition={Zoom} theme="colored"
        />
      </Paper>

    </div>
  );



}

const mapStateToProps = state => {
  return {
    usersData: state.users.usersData,
    error: state.users.error
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getAllUsers: () => dispatch(actions.getAllUsers()),
//     addNewUser: () => dispatch(actions.addNewUser()),
//     updateUser: () => dispatch(actions.updateUser()),
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getAllUsers: actions.getAllUsers,
        addNewUser: actions.addNewUser,
        updateUser: actions.updateUser
      },
      dispatch,
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
