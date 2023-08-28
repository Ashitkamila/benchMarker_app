import React from "react"
import {
    CButton,
    CCol,
    CContainer,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilAccountLogout, cilMagnifyingGlass } from "@coreui/icons"
import { Link } from "react-router-dom"
// import 'antd/dist/antd.css';
// import './index.css';
import { Result, Button } from 'antd';

const Page404 = () => {
    return (
        <div className="w-100 p-2" style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">

                    <CCol md={6}>
                        <Result
                            status="404"
                            // title="404"
                            // subTitle="Sorry, the page you visited does not exist."
                            // extra={<Button type="primary">Back Home</Button>}
                        />
                        <div className="clearfix">
                            <strong className="float-start display-3 me-4">404</strong>
                            <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
                            <p className="text-medium-emphasis float-start">
                                The page you are looking for was not found.
                            </p>
                        </div>
                        <CInputGroup className="input-prepend">
                            <CInputGroupText>
                            <div >
                                <strong><a href=" http://benchmarker.waycool.in:8030/#/auth/login?key=a3J1bmFsLnRvdGVAd2F5Y29vbC5pbg==">Older Version</a></strong>
                                </div>
                                </CInputGroupText> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <CInputGroupText>
                                <strong><a href="https://benchmarkers.waycool.in/">New Version</a></strong>

                                </CInputGroupText>

                          

                        </CInputGroup>
                    </CCol>
                </CRow>
                <strong class="bottomright" style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "16px",
                    fontSize: "18px",
                }}>©2021 WayCool Foods and Products Pvt. Ltd. </strong>

            </CContainer>
        </div>
        </div>
    )
}

export default Page404
