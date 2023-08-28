import { combineReducers } from "redux";
import { loginReducer } from "./auth/loginReducer";
import { bmManagementReducer } from "./bmManagement/bmManagementReducer";
import { roleReducer } from "./role/roleReducer";
import { marketReducer } from './market/marketReducer';
import { locationReducer } from './location/locationReducer';
import { skuReducer } from './sku/skuReducer';
import { timeReducer } from './time/timeReducer'
import { importedReducer } from "./imported/importedReducer";
import { itemReducer } from "./item/itemReducer";
import { reportReducer } from "./myReport/report/reportReducer";
import { marketLocationReducer } from "./marketLocation/marketLocationReducer";
import { fnvcategoryReducer } from "./fnvcategory/fnvcategoryReducer";
import { locationMatrixReducer } from "./locationMatrix/locationMatrixReducer";
import { conversionReducer } from "./conversionMaster/conversionMasterReducer";
import { bmreportReducer } from "./myReport/bmreport/bmreportReducer";
import { nfnvitemReducer } from "./nfnvitemmaster/nfnvitemReducer";
import { locationmatReducer } from "./myReport/locationwisereport/locationmatReducer";
import { marketwiseReducer } from "./myReport/marketwisereport/marketwiseReducer"
import { priceArbitrageReducer } from "./myReport/pricearbitrage/pricearbitrageReducer";
import { pricearbitragetrackerReducer } from "./myReport/pricearbitragetracker/pricearbitragetrackerReducer";
import { agmarkReducer } from "./agmark/agemarkReducer"
import {marketCommissionReducer} from "./marketCommission/marketCommissionReducer"
import {competitorPriceReducer} from "./competitorPrice/competitorPriceReducer"

import ccAvailabilityReducer from "./ccAvailability/ccAvailabilityReducer";


const rootReducer = combineReducers({


   

    login: loginReducer,
    users: roleReducer,
    market: marketReducer,
    location: locationReducer,
    bmManagement: bmManagementReducer,
    sku: skuReducer,
    time: timeReducer,
    item: itemReducer,
    imported: importedReducer,
    marketLocation: marketLocationReducer,
    fnvcategoryReducer: fnvcategoryReducer,
    report: reportReducer,
    bmreport: bmreportReducer,
    LocationMatrix: locationMatrixReducer,
    ConversionMaster: conversionReducer,
    NfnvItem: nfnvitemReducer,
    Locationmat: locationmatReducer,
    Marketwise: marketwiseReducer,
    PriceArbitrage: priceArbitrageReducer,
    PriceArbitrageTracker: pricearbitragetrackerReducer,
    Agmark : agmarkReducer,
    MarketCommission : marketCommissionReducer,
    competitorPrice : competitorPriceReducer,
    ccAvailability : ccAvailabilityReducer,



})

export default rootReducer;