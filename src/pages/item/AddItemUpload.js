import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import './style.css';
// import PriceControlTable from './PriceControlTable';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as Actions from '../../Redux/Actions';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDropzoneArea-text': {
            fontSize: "12px"
        }
    },
    dropZone: {
        height: '100%',
        fullWidth: 'true',
    },

}));
const AddItemUpload = (props) => {
    const classes = useStyles();

    // var data = new FormData();
    // const handleChange = files =>{
    //     console.log("test",files[0]);
    //     data.append("fileUrl", files[0]);
    //     props.actions.bulkUpload(data).then(res=>{
    //         if(res){
    //           console.log("file res", res);
    //           alert(res.message);
    //         //   closeFileUpload();
    //         //   getData();
    //         }
    //       })
    //   }

    //   const submitFileData = (e) =>{
    //     e.preventDefault();
    // //    console.log("price csv", data);


    //   }
    return (
        <div >
            <div className="mx-5">
                <span className="note-csv">(Note: upload csv file type only)</span>
                <DropzoneArea
                    dropzoneText={'Drag And Drop or Browse Attachment'}
                // onChange={handleChange}
                // dropzoneClass={classes.dropZone}
                // className={classes.root}
                // previewGridClasses={{
                //   item: classes.preview,
                // }}
                />
            </div>

            <div className="row mr-1 mt-5">
                <div className="col-md-6  d-flex align-items-center">
                </div>
                <div className="col-md-6 d-flex justify-content-end  p-0">
                    <div>
                        <button type="button" className="btn add-price-cancel-btn px-4" style={{ outlineColor: "#3484F0" }}>Cancel</button>
                    </div>
                    <div>
                        <button type="button" className="btn ml-4 add-price-save-btn px-5">Save</button>
                    </div>
                </div>
            </div>
            {/* <PriceControlTable /> */}

        </div>
    )
}
// const mapStateToProps = (state) => {
//     return {
//       softForecast: state.softForecast,

//     };
//   };
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       actions: bindActionCreators(
//         {
//           bulkUpload: Actions.itemPriceBulkUpload

//         },
//         dispatch
//       ),
//     };
//   };


export default connect(null)(AddItemUpload);

