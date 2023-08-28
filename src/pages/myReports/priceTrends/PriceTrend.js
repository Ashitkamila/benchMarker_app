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

const PriceTrend = () => {
    return(
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <div className="clearfix">
                            <h1 className="float-start display-3 me-4">Price Trends</h1>

                        </div>

                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default PriceTrend;