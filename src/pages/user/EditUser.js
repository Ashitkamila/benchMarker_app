import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Divider, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import { useFormik } from 'formik'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configuration } from '../../services/appConfig';

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


function EditUser(props) {

  const { submitHandler, handleChange, formData, resetAll } = props;
  const classes = useStyles();
  const { toggleComponent } = props;
  const [data, setData] = useState([])
  const [name, setName] = useState(formData.name);
    const [email, setEmail] = useState(formData.email);
    const [userType, setUserType] = useState(formData.userType);
   
    const formik = useFormik({
      initialValues:{
        name:'',
        email:'',
        userType : ''
       },
       
       onSubmit:values=>{
        
        
  
        saveUserDetails() 
          
  
        
      },
      validate:values=>{
        let errors = {};
        if (!values.name) {
          errors.name = 'Required';
        } else if (values.name.length > 15) {
          errors.name = 'Must be 15 characters or less';
        } else if (values.name.length < 4) {
          errors.name = 'Must be 4 or more characters';
        } 
  
  
        if (!values.email) {
          errors.email = 'Required ! please use only abc@waycool.in email id here to proceed';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test + !/(\W|^)[\w.+\-]*@waycool\.in(\W|$)/i.test(values.email)) {
          errors.email = 'Invalid email format!, please use only abc@waycool.in email id here to proceed';
          alert("please enter proper email")
        }
      //  if(!values.email){
      //    errors.email= 'Required!'
      //   }else if(!/(\W|^)[\w.+\-]*@waycool\.in(\W|$)/i.test(values.email)){
      //    errors.email = 'Invalid email format!, please use only abc@waycool.in email id here to proceed'
      //  }
       if (!values.userType) {
        errors.userType =  'Please select the correct user type'
      }
      
       
        return errors;
       }
      
    })
  


  const saveUserDetails = () => {

        
    

    const id = formData._id;
    

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'

    fetch(`${configuration.apiBaseUrl}/admin-users/` + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: userDetails.token,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        userType: userType,
      }),
    })
      .then((res) => {
        res.json();

        // setEmployees(del)

        // window.location.reload();

        if (res.status === 202) {
          toast.success("Details updated successfully");
          window.location.reload();
        } else if (res.status === 400) {
          toast.warn("Please enter proper email");
        }
      })

      //   .then((res) => { res.status(201).json()}  )
      .then((result) => setData(result.rows))
      .catch((err) => console.log("error"));
      
    // //    .then ((res, status, message) => { if(status === '201'){
    // //         <Alert severity="success" color="info">{message}</Alert>

    // //     }}
          
    // //   )
    
  }


    const handleSubmit = (event) => {
        event.preventDefault()
        saveUserDetails() 
        
    }


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


      <form className={classes.root} noValidate  autoComplete="off" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 ">
            <TextField
              id="standard-basic"
              className="w-100"
              label="User Name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="col-md-6 ">
            <TextField
              id="standard-basic"
              className="w-100"
              label="Email Address"
              name="email"
              onBlur={formik.handleBlur}
              value={email}
              onChange={(event) => setEmail(event.target.value)} />
            {formik.errors.email || <div className="error">{formik.errors.email}       </div>}

          </div>
          <div className="col-md-6 mt-4">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">User Type</InputLabel>
              <Select
                native
                value={userType}
                onChange={(event) => setUserType(event.target.value)}
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
      <ToastContainer transition={Zoom} />
    </div>
   
  )
}

export default EditUser;
