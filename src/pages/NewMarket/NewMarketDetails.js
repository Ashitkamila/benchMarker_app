import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';


function NewMarketDetails() {
    const [openForm, setOpenForm] = useState(false);
    const [editForm, setEditForm] = useState(false);



    const toggleComponent = () => {
        setOpenForm(!openForm);
        setEditForm(false);
    }

  return (
    <div>
         <div className="w-100 p-0 pt-3" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <div className="">
                <div className="col-6">
                    <h5 style={{ color: "#676767", margin: "10px" }} onClick={toggleComponent}> Market Management
                    <span>{openForm && (<span> / {editForm ? 'Edit Market' : 'Add New Market'}</span>)}</span>
                    </h5>
                    {/* <span className="user-name">{userDetails.name}</span>     */}
                </div>
                <div className="col d-flex justify-content-end px-5"  >

                    {
                        !openForm && (
                            <button onClick={toggleComponent} class="btn btn-primary"> <AddIcon fontSize="small" /> Add New Market</button>
                        )
                    }
                </div>
            </div>
            </div>
    </div>
  )
}

export default NewMarketDetails