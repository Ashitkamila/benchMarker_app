import React, { useEffect, useState } from "react";
import {
    Paper,
    Button,
    ButtonBase,
    FormControl,
    Checkbox,
} from "@material-ui/core";

import * as actions from "../../redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
// import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
import "./style.css";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configuration } from "../../services/appConfig";

const useStyles = makeStyles((theme) => ({
    pageContent: {
        padding: theme.spacing(3),
    },
}));

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
//  const usertoken = userDetails.token;

// const type = userDetails && userDetails.userType;



function AddImported(props) {
    const { importedData, formData, itemData } = props;


    const classes = useStyles();


    const [records, setRecords] = useState([]);

    const [anchorEl, setAnchorE1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [UoM, setUOM] = useState("");
    const [baseQuantity, setBasequantity] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [data, setData] = useState([]);






    useEffect(() => {



        setRecords(props.marketLocation);

    }, []);





    const updatefinalItemMasterDetails = () => {
        const id = formData._id
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjNzkyOTdiN2IyZjdjN2YyOTJlMmI3YjJmN2M3ODJiN2U3ODI5NzgyYjc4MmYiLCJpYXQiOjE2MzgxOTAxMjMsImV4cCI6MTYzODc5NDkyM30.UhCB2zvVlTmjwQO6EMxxTtqyr2htFkVWuenB2N4QIMs';

        fetch(`${configuration.apiBaseUrl}/item/` + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: userDetails.token,
            },
            body: JSON.stringify({
                baseQuantity,
                UoM: formData.UoM,
                category,
                imageUrl
            }),
        })
            .then((res) => {
                res.json()
                toast.success('Item master details updated Successfully.', { theme: "colored" })


                window.location.reload()
            })
            .then((result) => setData(result.rows))
            .catch((err) => console.log('error'))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updatefinalItemMasterDetails();

    };

    const handleCategorychange = (value) => {

        setCategory(value)
    };







    return (
        <div>
            <div className="mt-3 d-flex p-3  ">
            <form onSubmit={handleSubmit} className="mt-3 border p-5 " style={{ backgroundColor: "#f0f0f0" }}>
                    <div style={{ overflow: "auto" }}>
                    <h3 className="mt-0" style={{ color: "#676767" }}>
                        Edit Item
                    </h3>
                    &nbsp;&nbsp;
                    {/* <h4 className="mt-0" >
            {formData.itemName}
          </h4>
          &nbsp;&nbsp;
          <h4 className="mt-0" >
            {formData.material_no}
          </h4> */}


                    <br />
                    <div style={{ display: "flex" }}>
                        <div>
                            <h6>UoM ( Unit Of Measurement )</h6>
                            <select
                                className="mt-3 px-2"
                                    style={{ width: "30vw", height: "50px", borderRadius: "5px" }}
                            >
                                <option class="dropdown-item" value="" selected>
                                    {/* {formData.UoM} */}
                                </option>

                            </select>
                        </div>
                        &nbsp;&nbsp;
                        <div>
                            <h6>Base Quantity</h6>{" "}
                            <input
                                className="mt-3 px-2"
                                    style={{ width: "30vw", height: "50px", borderRadius: "5px" }}
                                type="number"
                                value={baseQuantity}
                                onChange={(event) => setBasequantity(event.target.value)}
                            // onkeypress="return event.charCode >= 48" maxLength="10" min="0"
                            //   placeholder={formData.baseQuantity}
                            ></input>
                        </div>
                    </div>{" "}
                    &nbsp;&nbsp;
                    <div style={{ display: "flex" }}>
                        <div>
                            <h6>Category</h6>
                            <select
                                className="mt-3 px-2"
                                    style={{ width: "30vw", height: "50px", borderRadius: "5px" }}

                                onChange={(event) => handleCategorychange(event.target.value)}
                            >
                                {/* {itemData.length &&
                                    itemData.map(({ category }) => (
                                        <option value={category._id}>{category.name}</option>
                                    ))} */}

                            </select>
                            &nbsp;&nbsp;
                        </div>
                        <div>
                            <h6>Select Image</h6>{" "}
                            <div
                                className="mt-4 px-2"
                                    style={{ width: "30vw", height: "20px", borderRadius: "5px" }}
                            >
                                <input
                                    id="imageUrl"
                                    type="file"
                                    class="form-control"
                                    placeholder="Image Url"
                                    name="imageUrl"
                                    onChange={(event) => setImageUrl(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        {/* <button
              style={{
                width: "500px",
                height: "50px",
                borderRadius: "5px",
                backgroundColor: "#263544",
                color: "#ffffff",
              }}
            >
              {" "}
              ADD{" "}
            </button> */}
                    </div>
                        <div className="mt-4" style={{ textAlign: "center" }}>
                        <button
                            style={{
                                    width: "30vw",
                                height: "50px",
                                borderRadius: "5px",
                                backgroundColor: "#263544",
                                color: "#ffffff",
                                    textAlign: "center"
                            }}
                        >
                            {" "}
                            SUBMIT{" "}
                        </button>
                    </div>
        </div>
            </form>
            </div>
        </div>
    );

}

export default AddImported;
