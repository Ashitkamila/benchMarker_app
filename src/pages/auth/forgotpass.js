import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Cancel";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import { configuration } from "../../services/appConfig";
import { Redirect } from "react-router";
// import Swal from 'sweetalert2';
// import {useSelector} from'react-redux';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "auto",
  },
  paper: {
    backgroundColor: "unset",
    border: "0px solid #fff",
    padding: "0px",
    borderRadius: "5px",
    boxShadow: "theme.shadows[5]",
    outline: "none !important",
    // padding: theme.spacing(2, 4, 3),
  },
}));

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);

const Forgetpass = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [data, setData] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handle = (e) => {
    setEmail(e.target.value);
  };

  const popupClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // if (window.confirm('Are you sure you want to do Forgot Password')) {

    if (
      window.confirm(
        "Hi We are sending you email because you requested a password reset. Click on OK to create a new Password"
      )
    ) {
      fetch(`${configuration.apiBaseUrl}/admin-users/forgetpasswordEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': userDetails.token
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then((res) => {
          
          if (res.status === 200) {
            res.json();
            toast.success("Email sent successfully!!!");
            // window.location.reload();
            // window.history.go(-1);
            
            setOpen(false);
            // setEmployees(del)
          } else {
            // Do nothing!
            toast.error(
              "Invalid Credentials!!!"
            );
          }
        })
        .then((result) => setData(result.rows))
        .catch((err) => console.log(err, "e"));
    }
  };

  return (
    <>
      <div className=" d-flex justify-content-center mt-3">
        <span style={{ fontWeight: "500", cursor: "pointer" }}>
          <span style={{ color: "#e310c7" }} onClick={handleOpen}>
            Forgot Password?
          </span>{" "}
        </span>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="md-modal md-effect-19 addlocation">
              <div className="md-content" style={{ width: "45rem" }}>
                <div>
                  <div className="col-md-12">
                    <form
                      className="modal-content"
                      id="usermodal"
                      onSubmit={submitHandler}
                    >
                      <div
                        className="modal-header"
                        style={{ height: "370px", display: "unset" }}
                      >
                        <CancelIcon
                          id="cancelicon"
                          style={{ cursor: "pointer" }}
                          onClick={popupClose}
                        />

                        <h6 className="modal-title text-center">
                          Forgot Your Password?
                        </h6>
                        <p className="mt-1 text-center l-1">
                          Enter your registered email below to receive password
                          reset instruction
                        </p>
                        <img
                          src="http://cdn.onlinewebfonts.com/svg/img_398183.png"
                          alt="password"
                          style={{
                            width: "200px",
                            height: " 200px",
                            marginLeft: "14rem",
                          }}
                        />
                      </div>
                      <div className="modal-body">
                        <div className="add-contact-content">
                          <div id="addContactModalTitle">
                            <div className="card-body">
                              <div className="form-group">
                                <input
                                  className="form-control"
                                  placeholder="Email"
                                  value={email}
                                  type="email"
                                  autoComplete="off"
                                  onChange={(e) => handle(e)}
                                  required
                                />
                              </div>
                              <br />
                              <div className="box-footer text-center">
                                <button
                                  type="submit"
                                  className="btn btn-success submitform"
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <p id="transition-modal-description"></p>
          </div>
        </Fade>
      </Modal>
      <ToastContainer transition={Zoom} theme="colored" />
    </>
  );
};

export default Forgetpass;
