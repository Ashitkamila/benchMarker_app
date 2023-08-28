import { Paper, Button, ButtonBase, formData, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core';
import './style.css';
import useTable from '../../utils/table/useTable';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { configuration,configuration2 } from '../../services/appConfig';
import Select from 'react-select';
import { Country, State, City } from "country-state-city";
import { userLogout } from '../../Timer';
import { Typography } from '@mui/material';




function AddLocation(props) {
  const [color, setColor] = useState("#3c3c3c");
  const [textColor, setTextColor] = useState("white");
  // const { userDetails } = props;
  //  console.log('user details', userDetails);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [selectedCountry,setSelectedCountry]= useState(null)
  const [selectedState,setSelectedState]= useState(null)
  const [selectedCity,setSelectedCity]=useState(null)

  
  
  const handleNewLocation = () => {
    const user = localStorage.getItem("User");
    
    const userDetails = JSON.parse(user);
    if(selectedCountry=="" || selectedState=="" || selectedCity=="" || name=="")
    {
      toast.warn("Please fill all the fields.", { theme: "colored" });

    }
    else{

      console.log("UserDetails",userDetails)
      try {
        fetch(`${configuration2.apiBaseUrl}/location`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: userDetails.token,
          },
          body: JSON.stringify({
            companyCode:userDetails.companyCode,
            country:selectedCountry.name,
            state:selectedState.name,
            city:selectedCity.name,
            name,
            createdBy: userDetails._id,
          }),
        })
          .then((res) => {
            res.json();
    
            if (res.status === 201) {
              toast.success("Location added Successfully.", { theme: "colored" });
              window.location.reload();
            } else if (res.status === 400) {
              toast.warn("Location name can't be empty", { theme: "colored" });
            } else if (res.status === 404) {
              toast.warn("Location already exist", { theme: "colored" });
            }
          })
    
          .then((result) => setData(result.rows))
          .catch((err) => console.log("error"));
      }
      catch(error) {
        console.log(error,"Error")
        // userLogout()
      }
    };
    }
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ODI4NzkyODdiMmMyZjdhMjg3ODdkMjk3NTdjN2Y3YTdhN2Q3OTc1N2U3NDdkN2IiLCJpYXQiOjE2NDE1NTk4NzAsImV4cCI6MTY0MjE2NDY3MH0.Qg8qZCDo_PuEzATvYk-pW4YGClwIoGzLYROXOHigwMQ'

  const handleSubmit = (event) => {
    event.preventDefault();

    handleNewLocation();
  };    

  const goPrev = (event) => {
    window.location.reload();
  };

  return (
    <div>
      <div className="mt-3 d-flex justify-content-center ">
        <form
          onSubmit={handleSubmit}
          className="mt-3 border p-5 "
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <ArrowBackIcon
            // variant="outlined"
            // className="btn add-price-cancel-btn px-4 "
            style={{ color: "rgb(85,105,255)",  borderRadius: "25px",cursor: "pointer" , backgroundColor: "#d0d6f5" }}
            onClick={goPrev}
            size="medium"
            //   backgroundColor="#5078F2"
            titleAccess='Back'
          />

          <div className="mt-4">
          <Typography sx={{fontWeight:"400",mb:1}} component="p"> Country</Typography>
          <Select options={Country.getAllCountries()}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  getOptionValue={(options) => {
                    return options["name"];
                  }}
                  value={selectedCountry}
                  onChange={(item)=>{
                    setSelectedCountry(item)
                  }}
                  label="Country"
                />
            <br />
          <Typography sx={{fontWeight:"400",mb:1}} component="p"> State</Typography>

            <Select
              options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
              getOptionLabel={(options) => {
                return options["name"];
              }}
              getOptionValue={(options) => {
                return options["name"];
              }}
              value={selectedState}
              onChange={(item) => {
                setSelectedState(item);
              }}
            />
            <br />
            <Typography sx={{fontWeight:"400",mb:1}} component="p"> City</Typography>

            <Select
              options={City.getCitiesOfState(
                selectedState?.countryCode,
                selectedState?.isoCode
              )}
              getOptionLabel={(options) => {
                return options["name"];
              }}
              getOptionValue={(options) => {
                return options["name"];
              }}
              value={selectedCity}
              onChange={(item) => {
                setSelectedCity(item);
              }}
            />
          
            <br />
          <Typography sx={{fontWeight:"400",mb:1}} component="p"> Location</Typography>

            <input
              className="px-2"
              style={{ width: "500px", height: "35px", borderRadius: "5px",border:"1px solid gray" }}
              minLength="3"
              maxLength="30"
              pattern="[a-zA-Z'-'\s]*"
              value={name}
              placeholder="Add Location"
              type="text"
              onChange={(event) => setName(event.target.value)}
            ></input>
            <br />
          </div>
          <div className="mt-5">
            <button
              type="submit"
              style={{
                width: "500px",
                height: "50px",
                borderRadius: "5px",
                backgroundColor: "#00416b",
                color: "#ffffff",
              }}
            >
              {" "}
              Submit New Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  <ToastContainer transition={Zoom} theme="colored" />;
}


export default AddLocation;