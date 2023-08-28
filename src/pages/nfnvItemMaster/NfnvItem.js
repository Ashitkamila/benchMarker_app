import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import { Paper } from '@material-ui/core';
import NfnvItemsTable from './NfnvItemsTable';
import './style.css';
// import AddTime from './AddTime';
import AddIcon from '@material-ui/icons/Add';
import EditItem from './EditNfnvItem';
import EditNfnvItem from './EditNfnvItem';
import AddNfnvItem from './AddNfnvItem';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextFormatSharp } from "@material-ui/icons";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { configuration } from '../../services/appConfig';


const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);

function NfnvItem(props) {
    const [openForm, setOpenForm] = useState(false);
    const [data, setData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [marketLocation, setMarketLocation] = useState([]);
    const [formData, setFormData] = useState({});
    const [addMode, setAddMode] = useState(true);
    const [isEdit, setEdit] = useState(false);
    console.log("item", itemData)

    useEffect(() => {
        // getData();
        props.actions.getNfnvItem();
    }, [])


    console.log("test", props.nfnv);

    function getData() {
        props.actions.getNfnvItem();


        // props.actions.getLocations().then(res => {
        //     setMarketLocation(res);
        // })
    }

    // open form and close form
    const toggleComponent = () => {
        setOpenForm(!openForm);
        setEdit(false);
    }

    const editClickHandler = editableData => {
        if (editableData) {
            
            setEdit(!isEdit);
            setOpenForm(!openForm);
            setFormData(editableData);
            setAddMode(!addMode);
        }


    }
    const handleDeleteItem = editableData => {

        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this item.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    const id = [editableData._id];
            
            
                    fetch(`${configuration.apiBaseUrl}/item?search=&size=100&location=&active=true&mandatory=true&`  , {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userDetails.token
                    },
                    body: JSON.stringify({
                        id

                    }),
                    
                    
                    
                    })
                    .then((res) => {
                        
                        res.json();

                        toast.success('NFNV Item Deleted Successfully.');
                        
                        
                        window.location.reload();
                    })
                    
                    //   .then((res) => { res.status(201).json()}  )
                    .then((result) => setData(result.rows))
                    .catch((err) => console.log('error'))
                    
                }
                
              },
              {
                label: 'No',
                onClick: () => toast.warn('Action Cancelled')
              }
            ]
          });

        // if (window.confirm('Are you sure you want to delete this Item?')) {


        //     // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjMmU3OTdjN2E3ZTc4N2E3ODdjNzkyODJiNzgyYjJlN2Y3YjdmN2Q3YjJiN2EiLCJpYXQiOjE2NDE0NzEwOTksImV4cCI6MTY0MjA3NTg5OX0.EJciFltc7-wf76lzi-mqQBidQRdStTBJV_XGyszQJcE'
        //     const id = [editableData._id];


        //     fetch('http://uat.apps.waycool.in:8010/api/v1/item?search=&size=100&location=&active=true&mandatory=true& ', {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': userDetails.token
        //         },
        //         body: JSON.stringify({
        //             id

        //         }),



        //     })
        //         .then((res) => {

        //             res.json();

        //             alert('NFNV Item Deleted Successfully.');


        //             window.location.reload();
        //         })

        //         //   .then((res) => { res.status(201).json()}  )
        //         .then((result) => setData(result.rows))
        //         .catch((err) => console.log('error'))

        // } else {
        //     // Do nothing!
        //     window.alert('Action Cancelled');
        // }






    }





    return (
            <div className="" style={{ width: "100%", height: "100%", overflow: "auto" }}>
                <div className="col-6">
                    <h5 style={{ color: "#676767", margin: "10px" }} onClick={toggleComponent} >Item Master : <b style={{ color: "black" }}>NFNV</b>
                        <span>{openForm && (<span> / {isEdit ? 'Edit Item' : 'Add Item'}</span>)}</span>                   
                    </h5>
                </div>
                <div style={{ overflow: "auto" }}>
                    <div className="">
                    </div>
                    <div className="col d-flex justify-content-end px-3"  >
                        {
                            !openForm && (
                                <button onClick={toggleComponent} type="button" class="btn btn-primary" backgroundcolor='#5078F2'>  <AddIcon style={{ backgroundcolor: "#5078F2", fontSize: "16px", borderRadius: "20px" }} />&nbsp;Add Item</button>
                            )
                        }
                    </div>
                </div>

                {/* <div style={{ overflow: "auto" }}>
                    {
                        !openForm ? (
                            <div>
                                {
                                    props.nfnv?.length > 0 && (
                                        <NfnvItemsTable
                                            records={props.nfnv}
                                            marketLocation={marketLocation}
                                            editClickHandler={editClickHandler}
                                        />
                                    )

                                }

                            </div>
                        ) : (
                            <EditItem marketLocation={marketLocation} formData={formData} itemData={itemData} />
                        ) 
                    }
                </div> */}

                <div style={{}}>          
                    {
                        !openForm ? (
                            <div>
                                {
                                    props.nfnv?.length > 0 && (
                                        <NfnvItemsTable
                                            records={props.nfnv}
                                            editClickHandler={editClickHandler}
                                            deleteClickHandler={handleDeleteItem}

                                        />
                                    )
                                }
                            </div>
                        ) : 
                            (
                            !isEdit ? (
                                    <AddNfnvItem />
                                ) : <EditNfnvItem itemData={itemData}  formData={formData} />
                        )         
                    }
                </div>

            <ToastContainer transition={Zoom} />
            </div>


    );


}

const mapStateToProps = state => {

    return {
        nfnv: state.NfnvItem.nfnv,
        itemData: state.item.itemData,
        error: state.item.error,
        marketLocation: state.marketLocation.marketLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                getNfnvItem: actions.getAllNfnvItem,
                getLocations: actions.getAllMarketLocation,
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
            },
            dispatch,
        ),
    };
};




export default connect(mapStateToProps, mapDispatchToProps)(NfnvItem);
