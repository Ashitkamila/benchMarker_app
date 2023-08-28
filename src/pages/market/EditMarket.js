/* eslint-disable react/jsx-no-duplicate-props */
import { Paper, Button, ButtonBase, formData } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
// import { Redirect } from 'react-router'
import { makeStyles } from '@material-ui/core';
import './style.css';
import useTable from '../../utils/table/useTable';
import importedHeader from '../imported/importedHeader'
import Dropdown from 'react-dropdown';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { configuration } from '../../services/appConfig';

const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

const type = userDetails && userDetails.userType;

function EditMarket(props) {

    const { formData, marketData } = props;
    
    const [name, setName ] = useState(formData.name);
    const [location, setLocation] = useState("");
    const [records, setRecords] = useState([]);
    const [data, setData] = useState([])
    







    
    useEffect(() => {

        setRecords(props.marketLocation);
    }, []);



    


   


    const submitHandler = (e) => {
          e.preventDefault();

        if (window.confirm('Are you sure you want to update these market details?')) {

            const id = formData._id;
            console.log('location id', id);
            
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'
            
            fetch(`${configuration.apiBaseUrl}/market/` + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userDetails.token
            },
            body: JSON.stringify({
                name, 
                location: id, 
                updatedBy: userDetails._id,
                // companyCode:"1000",
                
                
            }),
            })
            .then((res) => {
                    
                res.json();

                toast.success('Market Details updated successfully.', { theme: "colored" });
                  window.location.reload();
                // <Redirect to='/time-slot-management' />
                // setEmployees(del)
                
               
            })
            .then((result) => setData(result.rows))
            .catch((err) => console.log('error'))
        
            
            
          } else {
            // Do nothing!
            toast.success('Action Cancelled', { theme: "colored" });
          }
            
           
    }

    const goPrev = (event) => {
        window.location.reload();
      };


    return (
      <div>
        <Paper className="mt-3 d-flex justify-content-center ">
          <form
            className="mt-3 border p-5 "
            style={{ backgroundColor: "#f0f0f0" }}
            onSubmit={submitHandler}
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


            <div className='mt-5' style={{ overflow: "auto" }}>
              <div className="col-4 px-0">
                <input
                  className="px-2"
                  style={{
                    width: "500px",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                  defaultValue={formData?.location?.name}
                  disabled={true}
                  // onChange={(e) => setLocation(e.value)} maxLength="50" minLength="2"
                />
              
              </div>
           
            <div className="mt-5">
              <input
                // onChange={changeHandler}
                className="px-2"
                style={{ width: "500px", height: "50px", borderRadius: "5px" }}
                minLength="3"
                maxLength="30"
                pattern="[a-zA-Z'-'\s]*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name of market"
              ></input>
              <br />
            </div>
            <div className="mt-5">
              <button
                style={{
                  width: "500px",
                  height: "50px",
                  borderRadius: "5px",
                  backgroundColor: "#263544",
                  color: "#ffffff",
                }}
                onClick={(e) => submitHandler}
              >
                {" "}
                Update Market
              </button>
            </div>
            </div>
          </form>
        </Paper>
      </div>
    );
    <ToastContainer transition={Zoom} theme="colored"
    />
}


export default EditMarket;
