import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import { Paper } from '@material-ui/core';
import ItemsTable from './ItemsTable';
import './style.css';
import { getItem, getAllItem } from '../../redux/item/itemAction';
import { getAllGetItemName } from '../../redux/fnvcategory/fnvcategoryAction';
// import AddTime from './AddTime';
import AddIcon from '@material-ui/icons/Add';
import EditItem from './EditItem';
import AddItem from './AddItem';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CardItem from "./CardItem";
import AddItemUpload from './AddItemUpload';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Spinner } from "./../../utils/Spinner";
import { configuration } from '../../services/appConfig';
import EditItemDetails from './EditItemDetails';
import { Redirect } from 'react-router-dom';
import { Typography } from '@mui/material';

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
// const userDetails = JSON.parse(user);
// console.log("abc",userDetails);
function Item(props) {
  const [openForm, setOpenForm] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [marketLocation, setMarketLocation] = useState([]);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [editForm, setEditForm] = useState(false);
  const [addMode, setAddMode] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [itemName, setItemName] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    props.actions.getItem().then((res) => {
      setItemData(res);
      console.log("item", res);
    });

    // props.actions.getitemname().then((res) => {
    //   setItemName(res);
    // });
    // console.log("item name", itemName);

    props.actions.getLocations().then((res) => {
      setMarketLocation(res);
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
  const handleDeleteItem = (editableData) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete this item.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const id = [editableData._id];

            fetch(
              `${configuration.apiBaseUrl}/item?search=&size=100&location=&active=true&mandatory=true&companyCode=${userDetails.companyCode}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: userDetails.token,
                },
                body: JSON.stringify({
                  id,
                  deletedBy : userDetails._id
                }),
              }
            )
              .then((res) => {
                res.json();

                toast.success("FNV Item Deleted Successfully.");

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
      className="w-100 p-0 pt-3"
      style={{ height: "calc(100% - 64px)", overflow: "auto" }}
    >
      <div
        className=""
        style={{ width: "100%", height: "100%", overflow: "auto" }}
      >
        <div className="col-6 ">
          <h5
            style={{ color: "#676767", margin: "10px" }}
            onClick={toggleComponent}
          >
            Item Master : <b style={{ color: "black" }}>FNV</b>
            <span>
              {openForm && <span> / {isEdit ? "Edit Item" : "Add Item"}</span>}
            </span>
          </h5>
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
                &nbsp;Add Item
              </button>
            )}
          </div>
        </div>

        <div style={{}}>
          {!openForm ? (
            <div>
              {itemData && itemData.length > 0 ? (
                <ItemsTable
                  itemData={itemData}
                  editClickHandler={editClickHandler}
                  deleteClickHandler={handleDeleteItem}
                />
              ) : (
                <div className="d-flex justify-content-center">
                  {
                    itemData?( <Spinner />):(<Typography component="h3" sx={{color:"red",fontWeight:"600"}}>No Data Found</Typography>)
                  }
                 
                </div>
              )}
            </div>
          ) : !isEdit ? (
            //  window.location.href="/addItem"
          

            <AddItem />
          ) : (
            // <EditItem itemData={itemData} formData={formData} />
            <EditItemDetails itemData={itemData} formData={formData} />
          )}
        </div>
      </div>
      <ToastContainer transition={Zoom} />
    </div>
  );
}

const mapStateToProps = state => {
    
    return {
        itemData: state.item.itemData,
        error: state.item.error,
        marketLocation: state.marketLocation.marketLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getItem: actions.getAllItem,
                getLocations: actions.getAllMarketLocation,
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
                getitemname: actions.getAllGetItemName,
            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Item);
