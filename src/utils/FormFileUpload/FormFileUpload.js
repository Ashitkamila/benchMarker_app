import React from 'react';
import './FormFileUpload.scss';
import { Typography } from '@material-ui/core';
import '../formControl.scss';
import {RiUploadCloudLine} from 'react-icons/ri'

class  FormFileUpload extends React.Component {
  
  render(){
    const {
      value,
      width,
      height,
      required,
      multiple,
      onFileChange
    } = this.props;
    return (
      <span className="Form-file-upload" style={{ width: "100%"}}>
        <label style={{ width: '100%'}}>
          <input type="file"  onChange={onFileChange} className="custom-file-input" multiple={multiple} required={required} />
          <span className="btn btn-primary custom-upload-button flex-horizontal-space-btw">
            <Typography>{value==''?'Upload from Source':value} <RiUploadCloudLine className="h4 ml-5" /></Typography>
          </span>
        </label>
      </span>
    );
  }
  
}
export default FormFileUpload;
