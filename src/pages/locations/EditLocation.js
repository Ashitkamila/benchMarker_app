import { Paper, Button, ButtonBase, formData } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core';
import './style.css';
import useTable from '../../utils/table/useTable';
import Page404 from '../page404';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { configuration } from '../../services/appConfig';

const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

// const type = userDetails && userDetails.userType;

function EditLocation(props) {
  const { formData } = props;

  const [name, setName] = useState(formData.name);
  const [data, setData] = useState([]);

  const handleEditLocation = (event) => {
    event.preventDefault();

    const id = formData._id;
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'

    fetch(`${configuration.apiBaseUrl}/location/` + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: userDetails.token,
      },
      body: JSON.stringify({
        name,
        updatedBy: userDetails._id,
      }),
    })
      .then((res) => {
        res.json();

        if (res.status === 202) {
          toast.success("Location updated successfully.");
          window.location.reload();
        } else if (res.status === 400) {
          toast.warn("Location name can't be empty");
        } else if (res.status === 404) {
          //    alert("User with given credentials already exist")
          <Page404 />;
        }
      })

      .then((result) => setData(result.rows))
      .catch((err) => console.log("error"));
  };
  const goPrev = (event) => {
    window.location.reload();
  };
  return (
    <div>
      <Paper className="mt-3 d-flex justify-content-center">
        <form
          className="mt-3 border p-5 "
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <ArrowBackIcon
            // variant="outlined"
            // className="btn add-price-cancel-btn px-4 "
            style={{
              color: "rgb(85,105,255)",
              borderRadius: "25px",
              cursor: "pointer",
              backgroundColor: "#d0d6f5",
            }}
            onClick={goPrev}
            size="medium"
            //   backgroundColor="#5078F2"
            titleAccess="Back"
          />
          <div className="mt-5">
            <input
              // onChange={changeHandler}
              className="px-2"
              style={{ width: "500px", height: "50px", borderRadius: "5px" }}
              minLength="3"
              maxLength="30"
              pattern="[a-zA-Z'-'\s]*"
              value={name}
              placeholder="Enter name of Location"
              type="text"
              onChange={(event) => setName(event.target.value)}
            ></input>
            <br />
          </div>
          <div className="mt-5">
            <button
              onClick={handleEditLocation}
              style={{
                width: "500px",
                height: "50px",
                borderRadius: "5px",
                backgroundColor: "#263544",
                color: "#ffffff",
              }}
            >
              {" "}
              Update Location
            </button>
          </div>
        </form>
      </Paper>
    </div>
  );
  <ToastContainer transition={Zoom} theme="colored" />;
}


export default EditLocation;