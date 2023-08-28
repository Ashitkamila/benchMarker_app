import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _ from "lodash";
import { Paper } from '@material-ui/core';
import ImportedTable from './ImportedTable';
import './style.css';
import { getImported, getAllImported } from '../../redux/imported/importedAction';
import AddIcon from '@material-ui/icons/Add';
import AddImported from './AddImported';


const user = localStorage.getItem("User");

const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

const type = userDetails && userDetails.userType;


function Imported(props) {
    // const { getAllimported } = props.actions;
    // const { importedData } = props;
    const [openForm, setOpenForm] = useState(false);
    const [importedData, setImportedData] = useState([]);
    const [marketLocation, setMarketLocation] = useState([]);
    const [data, setData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [formData, setFormData] = useState({});
    const [addMode, setAddMode] = useState(true);
    const [isEdit, setEdit] = useState(false);

    useEffect(() => {


        getData();

    }, [])

    function getData() {
        props.actions.getImported().then(res => {

            console.log("abc", res)
            if (res) {
                setData(res)
            }
            // setImportedData(res);
        });
        props.actions.getLocations().then(res => {
            setMarketLocation(res);
        })

    }
    console.log("cde", data)


    // open form and close form
    const toggleComponent = () => {
        setOpenForm(!openForm);
    }

    const editClickHandler = editableData => {

        if (editableData) {
            setEdit(!isEdit);

            setOpenForm(!openForm);
            setFormData(editableData);
            setAddMode(!addMode);
        }


    }


    return (
        <div className="w-100 p-0 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <div className="mt-2 row">
                <div className="col-6">
                    <h5 style={{ color: "#676767", margin: "10px" }} onClick={toggleComponent} >Item Master : <b style={{ color: "black" }}>Imported</b>
                        <span>{openForm && (<span> / Add Item</span>)}</span>
                    </h5>
                </div>
                <div className="col d-flex justify-content-end px-5"  >
                    {
                        !openForm && (
                            <button onClick={toggleComponent} type="button" class="btn btn-primary" backgroundcolor='#5078F2'>  <AddIcon style={{ backgroundcolor: "#5078F2", fontSize: "16px", borderRadius: "20px" }} />&nbsp;Add Item</button>
                        )
                    }
                </div>
            </div>
                <div style={{ overflow: "auto" }}>
                    {
                        !openForm ? (
                            <div>
                                {
                                    data?.length > 0 ? (
                                        <ImportedTable
                                            importedData={data}
                                            marketLocation={marketLocation}
                                        />
                                    ) : ""
                                }
                            </div>
                        ) : (
                            <AddImported />
                        )
                    }
            </div>

        </div>
    )


}

const mapStateToProps = state => {
    console.log('imported', state);
    return {
        importedData: state.imported.importedData,
        error: state.imported.error,
        marketLocation: state.marketLocation.marketLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
            
                getImported: actions.getAllImported,
                getLocations: actions.getAllMarketLocation,
                // addNewLocation: actions.addNewLocation,
                // updateLocation: actions.updateLocation
            },
            dispatch,
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Imported);
