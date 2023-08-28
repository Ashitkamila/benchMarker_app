import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "../src/pages/dashboard/Dashboard";
import BMReport from "../src/pages/myReports/bmReport/BMReport";
import PriceArbitrage from "../src/pages/myReports/priceArbitrage/PriceArbitrage";
import PriceArbitrageTracker from "../src/pages/myReports/priceArbitrageTracker/PriceArbitrageTracker";
import PriceTrend from "../src/pages/myReports/priceTrends/PriceTrend";
import Report from "./pages/myReports/report/Report";
import NavBar from "./components/NavBar";
import Location from "./pages/locations/Location";
import Market from "./pages/market/Market";
import Login from "./pages/auth/Login";
import UserManagement from "./pages/user/UserManagement";
import BmManagement from "./pages/bmManagement/BMManagement";
// import Sku from './pages/sku/Sku';
import Time from "./pages/time/Time";
import Item from "./pages/item/item";
import PriceVolatility from "./pages/pricevolatility/PriceVolatility";
import Fencing from "./pages/geofencing/fencing";
import Imported from "./pages/imported/Imported";
import LocationMatrix from "./pages/locationMatrix/LocationMatrix";
// import ConversionMaster from './pages/conversionMaster/ConversionMaster';
import Page404 from "./pages/page404";
import NfnvItem from "./pages/nfnvItemMaster/NfnvItem";
import LocationwiseReport from "./pages/myReports/locationWiseReport/locationwisereport";
import marketwisereport from "./pages/myReports/marketWiseReport/marketwisereport";
import Forgetpass from "./pages/auth/forgotpass";
import AddNewPassword from "./pages/auth/addnewpass";
import transporationreport from "./pages/transportationCommission/transporationreport";
import Agmark from "./pages/myReports/agmark/Agmark";
import MarketCommissionMain from "./pages/marketCommission/MarketCommissionMain";
// import CompetitorPrice from "./pages/CompetitorPrice/CompetitorPrice";
import NewMarketDetails from "./pages/NewMarket/NewMarketDetails";
import CcAvailability from "./pages/ccAvailability/CcAvailability";
import ConversionMaster from "./pages/conversionMaster/ConversionMaster";
import AddNewTimeSlot from "./pages/market/AddNewTimeSlot";
import AddMarket from "./pages/market/AddMarket";
import AddNewItem from "./pages/market/AddNewItem";
import AddItem from "./pages/item/AddItem";
import CompetitorPrice from "./pages/CompetitorPrice/CompetitorPrice";
import axios from "axios";

const user = localStorage.getItem("User");
const timeFromLocal = localStorage.getItem("loginTime");
const userDetails = JSON.parse(user);
const type = userDetails && userDetails.userType;
const App = () => {
  // console.log("userDetails", userDetails);
  const [inactive, setInactive] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true);

  // for refresh token

  const getAuthToken = userDetails?.accessToken;
  const getRefreshToken = userDetails?.refreshToken;
  const getTimeFromLocalStorage = JSON.parse(timeFromLocal);

  const handleLogout = () => {
    // Clear the token and login time from storage
    localStorage.removeItem("User");
    localStorage.removeItem("loginTime");

    const getData_All = async () => {
      const headers = {
        "Content-Type": "application/json",
        authorization: userDetails.token,
      };
      await axios
        .get(`http://20.219.104.23:8010/api/v1/refreshToken`, { headers })
        .then((response) => {
          if (response.status === 200) {
            console.log(response, "response");
            const testObject = response.data.data;
            const token = response.data.data.token;
            localStorage.setItem("User", JSON.stringify(token));
            const currentTime = Date.now();
            localStorage.setItem("loginTime", String(currentTime));
          } else if (response.status === 503) {
          }
        })
        .catch((err) => console.log(err));
    };
   getData_All();
  };

  const checkLogoutTime = () => {
    const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;

    if (getAuthToken && getTimeFromLocalStorage) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - getTimeFromLocalStorage;

      // Check if 7 days have passed since login
      if (elapsedTime >= sevenDaysInMillis) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    // Check logout time when the component mounts and on subsequent renders
    checkLogoutTime();
  });

  //last

  if (userDetails == null || !userDetails) {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <Sidebar
            onCollapse={(value) => {
              setInactive(value);
            }}
          />
          <div className={`main-content ${inactive ? "inactive" : ""}`}>
            <NavBar />
            <Switch>
              {/* <Route exact path="/" component={(props) => <Login {...props} />} /> */}
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/reports" component={Report} />
              <Route exact path="/price-trends" component={PriceTrend} />
              <Route exact path="/price-arbitrage" component={PriceArbitrage} />
              <Route exact path="/priceArbitrage" component={PriceArbitrage} />
              <Route
                exact
                path="/price-arbitrage-tracker"
                component={PriceArbitrageTracker}
              />
              <Route exact path="/bm-report" component={BMReport} />
              <Route exact path="/bm-management" component={BmManagement} />
              <Route exact path="/locations" component={Location} />
              <Route exact path="/market" component={Market} />
              <Route exact path="/addmarket" component={AddMarket} />

              <Route exact path="/addTimeSlot" component={AddNewTimeSlot} />
              <Route exact path="/addItem" component={AddItem} />

              <Route exact path="/newmarket" component={NewMarketDetails} />
              <Route
                exact
                path="/competitor-price"
                component={CompetitorPrice}
              />
              {/* <Route
                exact
                path="/CC-competitor-price"
                component={CompetitorPrice}
              /> */}
              <Route
                exact
                path="/admin-role-management"
                component={UserManagement}
              />
              <Route exact path="/time-slot-management" component={Time} />
              <Route exact path="/page404" component={Page404} />
              <Route exact path="/forgot-password" component={Forgetpass} />
              <Route exact path="/new-password" component={AddNewPassword} />
              <Route exact path="/geo-fencing" component={Fencing} />
              {/* <Route exact path="/approve-new-sku" component={Sku} /> */}
              <Route exact path="/fnv-item-master" component={Item} />
              <Route exact path="/Nfnv-item-master" component={NfnvItem} />
              <Route exact path="/import-item-master" component={Imported} />
              <Route
                exact
                path="/price-volatility-factor"
                component={PriceVolatility}
              />
              <Route exact path="/location-matrix" component={LocationMatrix} />
              <Route exact path="/agmark-report" component={Agmark} />
              <Route
                exact
                path="/conversion-master"
                component={ConversionMaster}
              />

              <Route exact path="/cc-availability" component={CcAvailability} />

              {/* <Route exact path="/conversion-master" component={ConversionMaster} /> */}
              <Route
                exact
                path="/market-commision"
                component={MarketCommissionMain}
              />
              {/* <Route  path="/" component={Login} />  */}
              <Route
                exact
                path="/location-report"
                component={LocationwiseReport}
              />
              {/* <Route exact path="/market-report" component={MarketwiseReport} /> */}
              <Route exact path="/market-report" component={marketwisereport} />
              <Route
                exact
                path="/transportation-cost"
                component={transporationreport}
              />
              {/* <Route exact path="/*" component={Page404} /> */}
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
};

export default App;
