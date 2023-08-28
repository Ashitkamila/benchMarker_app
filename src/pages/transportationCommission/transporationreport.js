import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux";
import _ from "lodash";
import { Paper, InputLabel } from "@material-ui/core";
// import './style.css';
// import AddTime from './AddTime';
import AddIcon from "@material-ui/icons/Add";
import { Spinner } from "./../../utils/Spinner";
import axios from "axios";
import { Label } from "reactstrap";
import { ToastContainer, toast, Zoom } from "react-toastify";
import addtransportationcommision from "./addtransportationcommision";
import "react-toastify/dist/ReactToastify.css";
import TransportationTable from "./transportationtable";
import EditTransportationcommission from "./edittransportationcommission"
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import Addtransportationcommision from "./addtransportationcommision";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { configuration } from "../../services/appConfig";

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);

function Transportationreport(props) {
  const [openForm, setOpenForm] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [newReportData, setNewReportData] = useState([]);
  const [state, stateMethod] = useState(0);
  const [formData, setFormData] = useState({});
  console.log("formdata", formData);
  const [editForm, setEditForm] = useState(false);
  const [addMode, setAddMode] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [itemName, setItemName] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    props.actions.getTransporation().then((res) => {
      console.log("test", res);
      setReportData(res);
    });
  }

  // open form and close form
  const toggleComponent = () => {
    setOpenForm(!openForm);
    setEdit(false);
  };

  const editClickHandler = (editableData) => {
    if (editableData) {
      setEdit(!isEdit);

      setOpenForm(!openForm);
      setFormData(editableData);
      setAddMode(!addMode);
    }
  };

  const getFilterReportData = (data) => (e) => {
    e.preventDefault();
    console.log("data", data);
    // const data = {
    //     from: '2022-01-04',
    //     to: '2022-01-05'
    // }
    props.actions.getMarketwiseReportByFilter(data).then((res) => {
      if (res?.length > 0) {
        toast.success("success", { theme: "colored" });
        setNewReportData(res);
        console.log("res", res);
      } else {
        toast.error("No Data available for selected Date", {
          theme: "colored",
        });
        console.log("res", res);
        setNewReportData([]);
      }
    });
  };

  const getFilterReportData1 = (data) => (e) => {
    props.actions.getMarketwiseReportByFilter(data).then((res) => {
      if (res) {
        toast.error("no data for the day", { theme: "colored" });
        setNewReportData(res);
      }
    });
  };

  const handleDeleteItem = (editableData, res) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: `Are you sure you want to delete  ${reportData[0].item}.`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const id = editableData._id;

            fetch(`${configuration.apiBaseUrl}/transportation/arbitrage/cost/remove`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: userDetails.token,
              },
              body: JSON.stringify({
                id,
                deletedBy : userDetails._id
              }),
            })
              .then((res) => {
                res.json();

                toast.success("Deleted Successfully.");

                window.location.reload();
              })

              //   .then((res) => { res.status(201).json()}  )
              .then((result) => setData(result.rows))
              .catch((err) => console.log("error"));
          },
        },
        {
          label: "No",
          onClick: () => toast.warn("Action Cancelled"),
        },
      ],
    });
  };

  return (
    <div
      className="w-100 p-2 pt-3"
      style={{ height: "calc(100% - 64px)", overflow: "auto" }}
    >
      <div className="mt-2 row">
        <div className="col-6">
          <h5 style={{ color: "#676767" }}>Transportation Cost</h5>
        </div>
        <div className="col-6 "></div>
      </div>
      <div style={{ overflow: "auto" }}>
        <div className=""></div>
        <div className="col d-flex justify-content-end px-3">
          {!openForm && (
            <button
              onClick={toggleComponent}
              type="button"
              class="btn btn-primary"
              backgroundcolor="#5078F2"
            >
              {" "}
              <AddIcon
                style={{
                  backgroundcolor: "#5078F2",
                  fontSize: "16px",
                  borderRadius: "20px",
                }}
              />
              &nbsp;Add Transportation Cost(₹/km)
            </button>
          )}
        </div>
      </div>
      {/* <div style={{ overflow: "auto" }}>
     
        {reportData?.length > 0 ? (
          <TransportationTable
            reportData={newReportData?.length > 0 ? newReportData : reportData}
            getFilterReportData={getFilterReportData}
          />
        ) : (
        
            <EditTransportationcommission
              reportData={
                newReportData?.length > 0 ? newReportData : reportData
              }
              getFilterReportData={getFilterReportData}
            />
        
        )}
      </div> */}

      <div style={{}}>
        {!openForm ? (
          <div>
            {reportData && reportData.length > 0 ? (
              <TransportationTable
                reportData={reportData}
                editClickHandler={editClickHandler}
                deleteClickHandler={handleDeleteItem}
              />
            ) : (
              <TransportationTable reportData={reportData} />
            )}
          </div>
        ) : !isEdit ? (
          <Addtransportationcommision />
        ) : (
          <EditTransportationcommission
            reportData={reportData}
            formData={formData}
          />
        )}
      </div>
      <ToastContainer transition={Zoom} theme="colored" />
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    reportData: state.bmreport.usersData,
    error: state.report.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getmarketwise: actions.getAllMarketwise,
        getMarketwiseReportByFilter: actions.getAllMarketwiseByDate,
        getTransporation: actions.getAllTransporation,
        // addNewLocation: actions.addNewLocation,
        // updateLocation: actions.updateLocation
      },
      dispatch
    ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transportationreport);
