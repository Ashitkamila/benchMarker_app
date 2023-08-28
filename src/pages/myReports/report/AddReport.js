import React from 'react'

function AddReport(props) {
    const { toggleComponent } = props;
    return (
        <div>
            Add new Time Slot
            <button onClick={toggleComponent} class="btn btn-primary">close</button>

        </div>
    )
}

export default AddReport;
