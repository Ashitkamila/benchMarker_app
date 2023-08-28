import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Divider, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import { useFormik } from 'formik'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {configuration} from "../../services/appConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

// const type = userDetails && userDetails.userType;

function AddUser(props) {

  const { submitHandler, handleChange, formData, resetAll } = props;
  const classes = useStyles();
  const { toggleComponent } = props;
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState("")
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      userType: "",
      createdBy: userDetails._id,
    },

    onSubmit: (values) => {
      saveUserDetails();
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "Required";
      } else if (values.name.length > 15) {
        errors.name = "Must be 15 characters or less";
      } else if (values.name.length < 4) {
        errors.name = "Must be 4 or more characters";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !(/^([a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(censanext|waycool)|\.in|\.com$)/g).test(values.email)
      ) {
        errors.email =
          "Invalid email format!, please use only abc@waycool.in or abc@censanext.com email id here to proceed";
      }
      //  if(!values.email){
      //    errors.email= 'Required!'
      //   }else if(!/(\W|^)[\w.+\-]*@waycool\.in(\W|$)/i.test(values.email)){
      //    errors.email = 'Invalid email format!, please use only abc@waycool.in email id here to proceed'
      //  }
      if (!values.userType) {
        errors.userType = "Please select the correct user type";
      }

      return errors;
    },
  });

  const [data, setData] = useState([]);

  const saveUserDetails = () => {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'

    fetch(`${configuration.apiBaseUrl}/admin-users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userDetails.token,
      },
      body: JSON.stringify({
        name: formik.values.name,
        email: formik.values.email,
        userType: formik.values.userType,
        createdBy: userDetails._id,
        companyCode:userDetails.companyCode
      }),
    })
      .then((res) => {
        res.json();
        if (res.status === 201) {
          toast.success("User added Successfully.", { theme: "colored" });
          window.location.reload();
        } else if (res.status === 404) {
          toast.warn("User with given credentials already exist", {
            theme: "colored",
          });
          // window.location.reload()
        }

        // window.location.reload();
      })

      //   .then((res) => { res.status(201).json()}  )
      .then((result) => setData(result.rows))
      .catch((err) => console.log("error", err));

    //    .then ((res, status, message) => { if(status === '201'){
    //         <Alert severity="success" color="info">{message}</Alert>

    //     }}

    //   )
  };


    // const handleSubmit = (event) => {
    //     event.preventDefault()
        
    // }




  const can_handler = () => {
    window.location.reload();
  }






  return (
    <div className="p-4">
      <div className=" d-flex align-items-center mb-5">
        {/* <div className="new-user-icon-box border ">

                </div> */}
        <div className="user-info-heading">User Information</div>
      </div>

      
      <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6 ">
            <TextField
              id="standard-basic"
              className="w-100"
              label="User Name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange} 
              value={formik.values.name }
              />
              {formik.errors.name && <div className="error">{formik.errors.name}       </div>}
          </div>
          <div className="col-md-6 ">
            <TextField
              id="standard-basic"
              className="w-100"
              label="Email Address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange} 
              value={formik.values.email }  />
              {formik.errors.email && <div className="error">{formik.errors.email}       </div>}
          </div>
          <div className="col-md-6 mt-4">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">User Type</InputLabel>
              <Select
                native
                value={formik.values.userType}
                onChange={formik.handleChange} 
                inputProps={{
                  name: 'userType',
                  id: 'userType-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Imports Reports Mail User">Imports Reports Mail User</option>
                <option value="FNV Reports Mail User">FNV Reports Mail User</option>
              </Select>
              {formik.errors.userType && <div className="error">{formik.errors.userType}       </div>}
            </FormControl>
            
          </div>
        </div>
        <Divider className=" mt-4" />
        <div className="row mt-5">
          <div className="col-6  d-flex align-items-center">
            {/* <button onClick={resetAll}>Reset All</button> */}
          </div>
          <div className="col-6  d-flex justify-content-end p-0">
            <button onClick={can_handler} class="btn btn-primary" style={{ marginRight: "20px" }}>Cancel</button>
            <button  class="btn btn-primary ">Submit</button>
          </div>
        </div>
      </form>

    </div>

  );
  <ToastContainer transition={Zoom} theme="colored"
  />

}

export default AddUser
