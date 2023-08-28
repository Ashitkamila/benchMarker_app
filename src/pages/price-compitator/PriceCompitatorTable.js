import React from 'react'
import { makeStyles, Menu, MenuItem, Paper, TableBody, TableCell, TableRow, IconButton } from '@material-ui/core';
import { Button, Radio } from 'antd';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";



const useStyles = makeStyles(theme => ({
  pageContent: {
    // margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

const PriceCompitatorTable = () => {
  const classes = useStyles();
  return (
    <div className={classes.pageContent} style={{ marginBottom: "10px" }}>
      <span style={{ fontSize: "15px", marginBottom: "10px" }}>
        {" "}

      </span>
      <div className="col-md-12 d-flex justify-content-end">
        <form class="form-inline border" autoComplete="off">

        </form>

        <div className="d-flex align-items-center ml-6 px-4 col-1"></div>
        {/* <div className="d-flex align-items-center ml-7 px-4 col-1">
            <Button
              type="primary"
              onClick={handleClick}
              shape="circle"
              icon={<DownloadOutlined />}
            />
          </div> */}
      </div>
      <div>
        <div>
          <div className="row">
            <div className="p-0 justify-content-between">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                style={{ marginRight: "10px", width: "10vw" }}
              >
                <DesktopDatePicker
                  label="From"
                  inputFormat="MM/dd/yyyy"
                  // value={value1}
                  // onChange={handleFromChange}
                  // maxDate={maxDate}
                  renderInput={(params) => <TextField {...params} />}
                />{" "}
                &nbsp;&nbsp;
                <DesktopDatePicker
                  label="To"
                  inputFormat="MM/dd/yyyy"
                  // value={value2}
                  // onChange={handleToChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <CButton
                // onClick={props.getFilterReportData(filterDateData)}
                style={{ marginTop: "5px", width: "80px", height: "50px" }}
                color="success"
              >
                Filter
              </CButton>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PriceCompitatorTable;
