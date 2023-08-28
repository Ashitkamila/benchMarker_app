import React, { useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Input } from '@mui/material';
import axios from "axios";
// import PasswordField from 'material-ui-password-field';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import { Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { configuration } from "../../services/appConfig";

// import { DocsCallout, DocsExample } from "src/components"
function AddNewPassword(props) {
  const user = localStorage.getItem("User");
  const userDetails = JSON.parse(user);

  const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  const [new_password, setNewPassword] = React.useState("");
  const [password, setOldPassword] = React.useState("");
  // const [newpassword, SetNewPassword] = React.useState("");
  const [data, setData] = useState([]);

  const handle = (e) => {
    setEmail(e.target.value);
  };

  const oldPass = (e) => {
    setOldPassword(e.target.value);
  };

  const newPass = (e) => {
    setNewPassword(e.target.value);
  };
   

  const submitHandler = (event) => {
    event.preventDefault();
   
    (async () => {
      try {
        const data = {
          email: userDetails.email,
          new_password,
          password,
          companyCode:userDetails.companyCode
        };
        
        let  pattern  =  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?!.*\s)(?=.*[^a-zA-Z0-9]).{8,}$/; // upper,lower,symbol,digits
        let regexValue = pattern.test(new_password)
        if(regexValue){
          const incomingdata = await axios
          .post(`${configuration.apiBaseUrl}/admin-users/resetpassword`, data)
          .then((response) => {
            if (response.status == 200) {
              
              toast.success(response.data.message);
              window.location.reload();
            } else {
             
              toast.error(response.data.message);
            }
          });
        }else{
          toast.error( <span className="error text-light">
          Password must be 8 characters long and contain one
          uppercase and one lowercase character and one special
          character and one numeric
        </span>);
        }
       
      } catch (err) {
      
        if (err.response.data) {
         
          toast.error(err.response.data.message);
        } else {
          
        }
      }
    })();
  };

  const submitHandler12 = (e) => {
    e.preventDefault();

    // if (window.confirm('Are you sure you want to do Forgot Password')) {

    // if (window.confirm('HI We are sending you email because you requested a password reset. Click on OK to create a new Password')) {

    fetch(`${configuration.apiBaseUrl}/user/resetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': userDetails.token
      },
      body: JSON.stringify({
        email: userDetails.email,
        new_password,
        password,
      }),
    })
      .then((res) => {
        // console.log(res, "absc");
        if (res.status === 200) {
          res.json();
          toast.success("Password reseted successfully!!!");
          window.location.reload();
          // <Redirect to='/time-slot-management' />
          // setEmployees(del)
        }

        else {
          // Do nothing!
          return res.json();
          
        }
      })
      .then((result) => setData(result.rows))
      .catch((err) => console.log(err, "e"));
  };

  return (
    <div
      className="container-fluid  d-flex flex column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="container-md forget-password">
        <div className="row">
          <div className="col-md-12 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <img
                    src="http://cdn.onlinewebfonts.com/svg/img_398183.png"
                    alt="password"
                    border="0"
                    style={{ width: "100px", height: " 100px" }}
                  />
                  <h2 className="text-center">Change Password</h2>
                  <div autocomplete="on" className="form">
                    <br />
                    <div className="form-group">
                      <Space direction="vertical">
                        <input
                          name="email id"
                          placeholder="Email Id"
                          // className="form-control"
                          // type="email"
                          // autocomplete="off"
                          id="email"
                          style={{
                            width: "30vw",
                            textAlign: "center",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            border: "none",
                            fontSize: "20px",
                            background: "none",
                          }}
                          //  maxlength="4" minLength="4" pattern="[0-9]+"
                          defaultValue={userDetails.email}
                          // autoComplete="off"
                          // onChange={(e)=>handle(e)}
                          disabled
                          // required
                        />


                        <Input.Password
                          placeholder="Old password"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                          allowClear
                          onChange={(e) => oldPass(e)}
                          // placeholder="Old Password"
                          className="form-control"
                          type="text"
                          autocomplete="off"
                          id="password"
                          // inputProps={{ maxLength: "4" }}
                          // maxLength="8"
                          // minLength="4"
                          pattern="(?=.*[A-Z])(?=.*[a-z])(?!.*[&%$])(?=.*\d).{8,}$"
                          style={{
                            width: "30vw",
                            borderRadius: "5px",
                            fontWeight: "bold",
                          }}
                          value={password}
                        />

                        <Input.Password
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                          allowClear
                          name="new password"
                          //value="password"
                          placeholder="New Password"
                          className="form-control"
                          type="text"
                          autocomplete="off"
                          id="password"
                          style={{
                            width: "30vw",
                            borderRadius: "5px",
                            fontWeight: "bold",
                          }}
                          value={new_password}
                          //   autoComplete="off"
                          onChange={(e) => newPass(e)}
                        />
                        <br />
                        {/* <br/> */}
                      </Space>
                    </div>

                    <div className="form-group">
                      <input
                        className="btn btn-lg btn-primary btn-block"
                        value="Set New Password"
                        type="button"
                        onClick={submitHandler}
                      />
                      <br />
                      <br />
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer transition={Zoom} theme="colored" />
    </div>
  );
}

export default AddNewPassword;
