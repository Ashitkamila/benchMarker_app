import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../redux";
import { Card, Col, Row } from "reactstrap";
import _ from "lodash";
import { FormControl, IconButton, Input, Link, Select, TextField, InputLabel, MenuItem } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Redirect } from "react-router";
// import FormControl from "@material-ui/core/FormControl";
import WaycoolSidebarLogo from "../../assets/img/sidebar/WaycoolSidebarLogo.png";
import Forgetpass from "./forgotpass";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CryptoJS from "crypto-js";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { message } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { configuration } from "../../services/appConfig";
// import {} from "@mui/material";

const authStyle = {
  mainDiv: {
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    borderRadius: "5px",
    background: "#FFF",
    width: "700px",
    height: "550px",
  },
  bg: {
    backgroundImage: "linear-gradient(45deg, #3232a8, #e310c7)",
  },
  btn: {
    backgroundImage: "linear-gradient(to Right, #3232a8, #e310c7)",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "500",
    letterSpacing: "2px",
    borderRadius: "0px",
  },
  company: {
    fontFamily: "Playfair Display",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "29px",
    letterSpacing: "0.4px",
    color: "#e3d7d7",
  },
  appName: {
    position: "absolute",
    top: "35%",
    color: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  greeting: {
    color: "#e310c7",
    fontWeight: "600",
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};

// function for greeting in login page
const greeting = () => {
  var today = new Date();
  var curHr = today.getHours();
  if (curHr < 12) {
    return "Good Morning";
  } else if (curHr == 12) {
    return "Good Noon";
  } else if (curHr < 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
const type = userDetails && userDetails.userType;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: "",
      loginScreen: true,
      loginErr: false,
      showPassword: false,
      passwordError: false,
      errMsg: false,
      companycode: []
    };
  }


  loginHandler = (e) => {
    e.preventDefault();
    let loginData = {};
    const { formData } = this.state;


    loginData["email"] = formData.email;
    loginData["companyCode"] = formData.selectedCompanyCode
    loginData["password"] = CryptoJS.AES.encrypt(
      formData.password,
      "ghsjkgbftghdkgsfvhjgvbnghyujikli"
    ).toString();

    const validated = true;
    if (validated) {
      this.props.actions
        .getLogin(loginData)
        .then((res) => {

          console.log(res, "login res")
          if (res && res.status == "200") {
            message.success(res.data.message);
            // alert(res.data.message);
            toast.success(res.data.message);
            this.setState({
              loginScreen: false,
            });
            
          } else {
            if (res.status === 404) {

              toast.error("Invalid Crediential!!!");
            } else if (res.status === 400) {

              toast.error(res.data.message);
            }
          }
        })
        .catch((err) => {
          this.setState({
            loginErr: true,
          });
          toast.error(err);
        });
    }
  };

  checkPasswordText = (value) => {
    let passwordRegex = RegExp(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?!.*\s)(?=.*[^a-zA-Z0-9]).{8,}$/
    );
    return passwordRegex.test(value);
  };
  onChangeHandler = (name) => (e) => {
    const { formData } = this.state;

    if (name == "password") {
      if (!this.checkPasswordText(e.target.value)) {
        this.setState({ errMsg: true });
      } else {
        this.setState({ errMsg: false });
      }
      this.setState({
        formData: _.set({ ...formData }, name, e.target.value),
      });
      // this.setState({
      //   errMsg:_.set({...errMsg},name,e.target.value)
      // })
    } else if (name == "email") {
      this.setState({
        formData: _.set({ ...formData }, name, e.target.value),
      });
     
      this.setState({ email: e.target.value })
      let email = e.target.value
      this.getcompanycode(email)

    } else if (name == "selectedCompanyCode") {
      this.setState({
        formData: _.set({ ...formData }, name, e.target.value),
      });


    }
  };

  getcompanycode = async (value) => {
    let email = value
  
    const response = await fetch(`${configuration.apiBaseUrl}/admin-users/companyCodeList?email=${email}`, {
      method: "GET",
    });
    const body = await response.json();
    this.setState({ companycode: body.data })
    // if(body.data.length==)
    console.log(body.data, "company")
    const com = this.state.companycode
    console.log(com, 'code')




    // setPlants(
    //   body.data.map(({ name, _id }) => ({ label: name, value: _id }))


    // setLoading(true);

    this.setState({ list: [1000, 2000, 3000] })
  }
  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  OnOpenform = () => {
    <Router>
      <Switch>
        <Route path="/forgot-pass" component={Forgetpass} />
      </Switch>
    </Router>;
  };


  render() {
    const { userDetails, loginError } = this.props;
    const { formData, loginScreen, loginErr, showPassword, passwordError } =
      this.state;
    const greetingText = greeting();
    return (
      <div
        className="container-fluid  w-100 d-flex flex column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        {loginScreen && (
          <div className="row" style={authStyle.mainDiv}>
            <div className=" border col-md-6 p-4" style={authStyle.bg}>
              <div>
                <img src={WaycoolSidebarLogo} alt="logo" />
                <span className=" ml-2" style={authStyle.company}>
                  Waycool
                </span>
              </div>
              <div style={{ height: "90%", position: "relative" }}>
                <div style={authStyle.appName}>
                  <h4>Welcome To</h4>
                  <h3>Benchmarker</h3>
                  {/* <h2>Planner Tool</h2> */}
                </div>
              </div>
            </div>
            <div className=" col-md-6 px-4 py-5 " >
              <div>
                <div>Hello !</div>
                <div style={authStyle.greeting}>{greetingText}</div>
              </div>
              <div className=" d-flex justify-content-center mt-3">
                <span style={{ fontWeight: "500" }}>
                  <span style={{ color: "#e310c7" }}>Login</span> Your Account
                </span>
              </div>
              {/* {loginErr && (
                <div
                  className="text-danger  p-2 mb-4"
                  style={{ fontSize: "12px", background: "#f5e1e1" }}
                >
                  Please check your email or password!
                </div>
              )} */}
              <form
                onSubmit={this.loginHandler}
                className="d-flex flex-column mt-4"
              >
                <TextField
                  className={"mb-4"}
                  id="standard-basic"
                  label="Email Address"
                  variant="standard"
                  name="email"
                  value={formData.email === undefined ? "" : formData.email}
                  onChange={this.onChangeHandler("email")}
                />


              

                <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  variant="standard"
                  className="mb-4"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={
                      formData.password === undefined ? "" : formData.password
                    }
                    onChange={this.onChangeHandler("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {this.state.errMsg && (
                    <span className="error text-danger">
                      Password must be 8 characters long and contain one
                      uppercase and one lowercase character and one special
                      character and one numeric
                    </span>
                  )}
                </FormControl>
                <FormControl   sx={{ width: "25ch" }}>
                  <InputLabel id="demo-simple-select-label">Company Code</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.formData.selectedCompanyCode}
                    label="Company Code"
                    variant="standard"
                    onChange={this.onChangeHandler("selectedCompanyCode")}
                    MenuProps={MenuProps}
                  >
                    {
                      formData.email ? (
                        this.state.companycode && this.state.companycode.map(item => {
                          return (
                            <MenuItem value={item.companyCode}>{item.companyCode}</MenuItem>

                          )
                        })
                      ) : (
                        <MenuItem >No Company Code Found</MenuItem>

                      )
                    }

                  </Select>
                </FormControl>

                {/* {passwordError && (
                  <div
                    className="text-danger  p-2 mb-4"
                    style={{ fontSize: "12px", background: "#f5e1e1" }}
                  >
                    Password should have at least one uppercase letter, one
                    lowercase letter, one number and one special character!
                  </div>
                )} */}

                <button
                  onClick={this.loginHandler}
                  className="btn  w-100 mt-3 py-2 "
                  style={authStyle.btn}
                  type="submit"
                >
                  Submit
                </button>
                <hr className="login_hr" />

                {/* <div className=" d-flex justify-content-center mt-3">
                  <span style={{fontWeight:"500" , cursor: "pointer"}} ><span style={{color:"#e310c7"}}>forgot Password?</span> </span>
                </div> */}
                {/* <button className="btn  w-100 mt-3 py-1"  style={authStyle.btn}  cursor="pointer"> <span onClick={this.loginHandler} >Forgot Password</span></button> */}
              </form>
              <Forgetpass />
            </div>
          </div>
        )}
        {!loginScreen && (
          <Row
            style={{
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col md={6} lg={4}>
              <Card body>
                <div>
                  {/* Initially we can see LogingIn ,please Wait */}
                  {loginError == "" && <span>Loging in ,Please Wait</span>}
                </div>
                {/* if User Logged in Successdull then it will redirect to Dashboard */}
                {/* {userDetails && userDetails.name && (
                  <Redirect to="/dashboard" />
                )} */}
                {/* if login failed it redirect to one waycool Home Page. */}
                {/*          
                 {loginError!=='' && setTimeout(() => {window.location.href='http://one.waycool.in/index.php'}, 1000) && <span className="text-danger">Login Failed ,{loginError}</span>} 
                */}
              </Card>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.login.userData,
    loginError: state.loginError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getLogin: actions.signInUser,
        // LoginUser: actions.loginUser,
        LoginFailed: actions.loginFailed,
      },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
