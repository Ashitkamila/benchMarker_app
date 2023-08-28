import React, { useEffect, useState } from "react";
import MapContainer from "./mapContainer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux";
import { useHistory } from "react-router-dom";
// import { TextField, NumericField } from '@material-ui/core';
// import _ from "lodash";
// import { Paper, Button } from '@material-ui/core';
// import SkuTable from './SkuTable';
import "./style.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configuration } from "../../services/appConfig";

const Fencing = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { toggleComponent, importedData, userDetails } = props;
  const [items, setItems] = useState([{ label: "Select Location", value: "" }]);
  // const [markets, setMarkets] = useState([
  //     { label: "Select Market", value: "" }
  // ]);
  const [markets, setMarkets] = useState([]);
  const [value, setValue] = useState(items[0].value);
  const [data, setData] = useState([]);
  // const [radiusEditable, setRadiusEditable] = useState("");
  const [radius, setRadius] = useState();
  const [coordinates, setCoordinates] = useState([null, null]);
  const [selectedmarket, setSelectedMarket] = useState({});
  console.log("selected market", selectedmarket);
  const [records, setRecords] = useState([]);

  // const [openForm, setOpenForm] = useState(false);
  // const [skuData, setSkuData] = useState([]);


  useEffect(() => {
    let unmounted = false;

    const user = localStorage.getItem("User");
    const userDetails = JSON.parse(user);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjNzkyOTdiN2IyZjdjN2YyOTJlMmI3YjJmN2M3ODJiN2U3ODI5NzgyYjc4MmYiLCJpYXQiOjE2NDI4NTA5NjMsImV4cCI6MTY0MzQ1NTc2M30.gCdRgpGemadVHn_w3QQeACY3Z_vh610tmKp7cM5ENF0'

    async function getCharacters() {
      const response = await fetch(`${configuration.apiBaseUrl}/location`, {
        headers: {
          Authorization: userDetails.token,
        },
      });
      const body = await response.json();

      console.log(body.data,"body data")
      setRecords(body.data);

      if (!unmounted) {
        setItems(
          body.data.map(({ name, _id }) => ({ label: name, value: _id }))
        );

        setLoading(true);
      }
    }
    getCharacters();
    return () => {
      unmounted = true;
    };
  }, []);

  const updateGeoFencing = () => {
    // e.preventDefault()
    const marketid = selectedmarket?._id;

    const user = localStorage.getItem("User");
    const userDetails = JSON.parse(user);
    //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjNzkyOTdiN2IyZjdjN2YyOTJlMmI3YjJmN2M3ODJiN2U3ODI5NzgyYjc4MmYiLCJpYXQiOjE2NDI4NTA5NjMsImV4cCI6MTY0MzQ1NTc2M30.gCdRgpGemadVHn_w3QQeACY3Z_vh610tmKp7cM5ENF0'

    fetch(`${configuration.apiBaseUrl}/market/` + marketid, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: userDetails.token,
      },
      body: JSON.stringify(
        {
          marketGeoLocation: { coordinates },
          radius: radius,
        },
        console.log(" updated radius", selectedmarket?.radius)
      ),
    })
      .then((res) => {
        res.json();
        setRadius(res.value);

        if (res.status === 202) {
          toast.success("Market Updated Successfully", { theme: "colored" });
          window.location.reload();
        }
        // window.location.reload()
        else if (res.status === 400) {
          toast.warn("Coordinates are empty/null", { theme: "colored" });
          // window.location.reload()
        }
      })

      .then((result) => setData(result.rows))
      .catch((err) => console.log("error"));
  };

  const handleLocationChange = (value, _id) => {
    // let unmounted = false;
    const id = value;
    console.log(value,_id,"value check")

    const user = localStorage.getItem("User");
    const userDetails = JSON.parse(user);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjNzkyOTdiN2IyZjdjN2YyOTJlMmI3YjJmN2M3ODJiN2U3ODI5NzgyYjc4MmYiLCJpYXQiOjE2NDI4NTA5NjMsImV4cCI6MTY0MzQ1NTc2M30.gCdRgpGemadVHn_w3QQeACY3Z_vh610tmKp7cM5ENF0'

    async function getCharacters() {
      const response = await fetch(
        `${configuration.apiBaseUrl}/market?location=` + id+`&companyCode=${userDetails.companyCode}`,
        {
          headers: {
            Authorization: userDetails.token,
          },
        }
      );
      const body = await response.json();

      setRecords(body.data);
      console.log(body.data,"market chedck")
    

      let marketarray = body.data.filter((item) => item.name);
console.log(marketarray,"marketarray")
      setValue(value);
      setMarkets(marketarray);
    }
    getCharacters();
  };

  const handleMarketChange = (value) => {
    props.actions.getMarketLocation(value).then((res) => {
     
      let market = records.find((item) => item._id === value);

      setRadius(market.radius);
      setSelectedMarket(market);
      setCoordinates(market.marketGeoLocation.coordinates);
      setValue(value);
    });
  };

  return (
    <div className="w-100 p-2 " style={{ height: "620px", overflow: "auto" }}>
      <div className="mt-2 row">
        <div className="col-6">
          <h5 style={{ color: "#676767" }}>Update Geo Fencing Distance</h5>
        </div>
        <div className="col-6 d-flex justify-content-end"></div>
      </div>
      <div className="jumbotron">
        <div className="mt-2 row">
          <div className="col-md-6 ">
            <select
              style={{ borderRadius: "3px" }}
              className="w-100 p-2"
              // disabled="loading"
              onChange={(e) => handleLocationChange(e.currentTarget.value)}
            >
              <option>Select Location </option>
              {items.map(({ label, value }) => (
                <option value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <select
              className="w-100 p-2"
              style={{ borderRadius: "3px" }}
              onChange={(e) => handleMarketChange(e.currentTarget.value)}
            >
              <option>Select Market </option>
              {markets.length > 0 &&
                markets.map(({ name, _id }) => (
                  <option value={_id}>{name}</option>
                ))}
            </select>
          </div>

          <div className="col-md-4 mt-5">
         
            <input
              type="number"
              class="form-control"
              placeholder="Radius in kilometer"
              name="radius"
              onChange={(e) => setRadius(e.currentTarget.value)}
              value={radius}
            />
          </div>
          <div className="col-md-4 mt-5">
            <input
              type="text"
              class="form-control"
              placeholder="Select Latitude"
              name="latitude"
              value={coordinates[0]}
            />
          </div>
          <div className="col-md-4 mt-5">
            <input
              type="text"
              class="form-control"
              placeholder="Select Longitude"
              name="longitude"
              value={coordinates[1]}
            />
          </div>

          <div className="col-12 mt-3">
            <MapContainer
              updateGeoFencing={updateGeoFencing}
              updateLatLong={setCoordinates}
              coordinates={selectedmarket?.marketGeoLocation?.coordinates}
              google={props.google}
              // center={{ lat: 12.9716, lng: 77.5946 }}
              height="435px"
              width="600px"
              zoom={15}
            />
          </div>
        
        </div>
     
      </div>

      <ToastContainer transition={Zoom} theme="colored" />
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('asdfghjkl', state);
  return {
    // skuData: state.sku.skuData,
    error: state.sku.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        // getSku: actions.getAllSku,
        // getLocations: actions.getAllMarketLocation,
        getMarketLocation: actions.getAllMarketLocation,
      },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Fencing);
