import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete'
import * as actions from "../../redux";

import axios from "axios";
import Geocode from "react-geocode";
import { margin, padding } from '@mui/system';
import { get } from 'lodash';
import { Button, Grid, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Geocode.setApiKey("AIzaSyASRO1ULLpXIdhh75V_ye6eju4xpo5JB_Y");
// Geocode.enableDebug();

// Geocode.fromLatLng("48.8583701", "2.2922926").then(
//   response => {
//     const address = response.results[0].formatted_address;
//     console.log(address);
//   },
//   error => {
//     console.error(error);
//   }
// );

export class MapContainer extends Component {
    constructor(props) {
        console.log(props, "props_is")
        super(props)
        this.state = {
            // for google map places autocomplete
            address:this.props.address?this.props.address: '',
            // city: "",
            // area: "",
            // state: "",
            // country: "",
            // pinCode: "",
            // streetNumber: "",
            // errorPincode: "",
            // page: 1,
            // searchText: "",
            selectedRegion: [],
            activeMarker: {},
            selectedPlace: {},
            range: this.props.radius?this.props.radius:"",
            showingInfoWindow: false,  // Hides or shows the InfoWindow

            lat: this.props.coordinates?this.props.coordinates.latitude:"12.958184",
            lang: this.props.coordinates?this.props.coordinates.longitude:"77.64214659999999",
            mapcoordinates: {
                lat: this.props.selectedcoordinates?this.props.selectedcoordinates.latitude:null,
                lng: this.props.selectedcoordinates?this.props.selectedcoordinates.longitude:null,

            },
            data: [],
            geoaddress: '',


            markerPosition: {
                lat: null,
                lng: null,
            },

            updatedAddress: ''

        }

    }







    // onMarkerClick = (props, marker, e) => {

    //   console.log('props', props.name);
    //   this.setState({
    //     selectedPlace: props,
    //     activeMarker: marker,
    //     showingInfoWindow: true,

    //   }, console.log('gggggg', this.state.selectedPlace));



    // }






    onMarkerDragEnd = (t, map, coord, address) => {


        console.log('drag ended --t', t);
        console.log('drag ended -- map', map);
        console.log('drag ended -- coord', coord);
        const { latLng } = coord;
        const { name, updatedaddress } = map;
        const lat = latLng.lat();
        const lng = latLng.lng();
        // const { name, position} = event;
        this.setState({
            // address: event.name,
            mapcoordinates: { lat: lat, lng: lng },


        }, console.log('updated name', map))
        if(this.props.updateCoordinates){
            this.props.updateCoordinates({latitude:lat,longitude: lng})
        }else{

            this.props.updateLatLong([lat, lng]);
        }





        let initProducts = async () => {


            //   let updatedaddress = this.state.updatedAddress;
            //  console.log('address896896986', updatedaddress);

            await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyASRO1ULLpXIdhh75V_ye6eju4xpo5JB_Y&language=en`)
                .then(response => response.json())

                .then(response => {

                    console.log('response', response?.results)
                    console.log('products', response?.results[1]?.formatted_address);
                    var updatedaddress = response?.results[1]?.formatted_address;
                    this.setState({
                        updatedAddress: updatedaddress
                    }, console.log('updated address', this.state.updatedAddress));


                    console.log('ssss', updatedaddress);


                })




                .catch(err => console.error(err));

        }


        initProducts();







    };


    goPrev = (event) => {
        window.location.reload();
    };

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    handleChange = (address) => {
        
        // if(this.props.address){
        //     this.setState({address})
        // }
        this.setState({ address })
        
        



    }

    onLatChange = (event) => {
        const fieldValue = event.target.value

    }
    onLngChange = (event) => {
        const fieldValue = event.target.value

    }

    handlerangechange=(e)=>{
        if(e.target.value<1){
            this.setState({range:""})
        }else{

            this.setState({ range: e.target.value })
            if(this.props.setradius){
                Number(this.props.setradius(e.target.value))
                console.log(this.props.radius,"radius")
            }else{
    
                this.props.actions.setLocationAddress(e.target.value)
            }
        }
      

    }



    handleSelect = (address) => {
        this.setState({ address })
        // this.props.udpateaddress(address)
        


        console.log('address', address);
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng, address) => {

                // update center state
                this.setState({
                    mapcoordinates: latLng,
                    markerPosition: latLng,


                })
                if(this.props.updateCoordinates){
                    this.props.updateCoordinates({latitude:latLng.lat,longitude: latLng.lng})
                    this.props.setaddress(this.state.address)
                   console.log(typeof this.state.address,this.state.address,"update address is")

                }
                else{

                    this.props.updateLatLong([latLng.lat, latLng.lng,this.state.address])
                   console.log(typeof this.state.address,this.state.address,"address is")
                }


            })
            .catch((error) => console.error('Error', error))
    }

    componentDidUpdate(prevProps, updatedAddress) {
        // Typical usage (don't forget to compare props):


        if (this.props.coordinates !== prevProps.coordinates) {
            console.log('eeeee', this.props.coordinates, 'ttttt', prevProps.coordinates)

            this.setState({
                mapcoordinates: {
                    lat: this.props.coordinates[0],
                    lng: this.props.coordinates[1],
                    address: updatedAddress
                },


            },
                console.log('aaaaaaa', this.state.address))


        } 
        // else if (this.props.selectedcoordinates !== prevProps.coordinates) {
        //     console.log('eeeee', this.props.coordinates, 'ttttt', prevProps.coordinates)
      
        //     this.setState({
        //       mapcoordinates: {
        //         lat: this.props.selectedcoordinates.latitude,
        //         lng: this.props.selectedcoordinates.longitude,
        //         address: updatedAddress
        //       }
        //     })
        //   }
         else { console.log('msg pass') }



    }

    updatefencing = () => {
        // this.props.updateGeoFencing
        if (this.state.address != " " && this.state.range != " ") {
            console.log(this.state.address, "working")

        } else {
            console.log("not working")
        }
    }

    render() {
        // const { updatedAddress } = this.props;
        // console.log('vinay6777686', this.props.updatedAddress);
        console.log('lat', this.state.markerPosition.lat);
        console.log('lng', this.state.markerPosition.lng);
        // console.log('vinay', updatedAddress);
        return (
            <div className="row">
                <PlacesAutocomplete
                    value={ this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({
                        getInputProps,
                        suggestions,  
                        getSuggestionItemProps,
                        loading,
                    }) => (
                        <div className='col-12 mt-4'>
                            <TextField placeholder="Enter Address" size="medium" id="outlined-basic"  variant="outlined" fullWidth    {...getInputProps({
                                // placeholder: 'Search Nearest Location ...',
                                className: 'location-search-input',
                            })} />
                            <div classname="mt-4 " style={{ marginTop: "10px" }} >
                                <h6 > <u>Address :</u> {this.state.updatedAddress}</h6>
                            </div>

                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item'
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? {
                                            backgroundColor: '#fafafa',
                                            cursor: 'pointer',
                                        }
                                        : {
                                            backgroundColor: '#ffffff',
                                            cursor: 'pointer',
                                        }
                                    return (
                                        <div
                                            {...getSuggestionItemProps(
                                                suggestion,
                                                {
                                                    className,
                                                    style,
                                                }
                                            )}
                                        >
                                            <span>
                                                {suggestion.description}
                                            </span>

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                </PlacesAutocomplete>
                <Grid container spacing={2} mb={2}>



                    <Grid item lg={4} mt={2}>
                        <div style={{ marginLeft: "10px" }}>

                            {/* <Typography component="p" mb={1}>Latitude</Typography> */}

                            <TextField size="medium" id="outlined-basic"
                                type="number"
                                placeholder='Latitude'
                                variant="outlined" fullWidth value={this.state.mapcoordinates.lat} />
                        </div>
                    </Grid>
                    <Grid item lg={4} mt={2}>
                        <div >
                            <TextField size="medium" id="outlined-basic"
                                type="number"
                                // label="Longitude"
                                placeholder='Longitude'
                                variant='outlined'
                                fullWidth
                                value={this.state.mapcoordinates.lng} />
                        </div>
                    </Grid>
                    <Grid item lg={4} mt={2}>
                        <div style={{ marginRight: "10px" }}>
                            <TextField type="number" size="medium" id="outlined-basic" placeholder="Geo Fencing( in kilometer)" value={this.state.range} onChange={(e) =>this.handlerangechange(e)} variant="outlined" fullWidth />
                        </div>
                    </Grid>

                </Grid>

                <div id="googleMaps" style={{ height: "400px", overflow: "auto", position: "relative" }}  >
                    {
                        this.state.mapcoordinates.lat &&
                        this.state.mapcoordinates.lng &&
                        (
                            <Map style={{ height: "250px", overflow: "auto", marginRight: "20px" }}

                                google={this.props.google}

                                initialCenter={{
                                    lat: this.state.mapcoordinates.lat,
                                    lng: this.state.mapcoordinates.lng,
                                }}
                                center={{
                                    lat: this.state.mapcoordinates.lat,
                                    lng: this.state.mapcoordinates.lng,
                                }}
                            >
                                <Marker
                                    position={{

                                        // lat: this.state.markerPosition.lat,
                                        // lng: this.state.markerPosition.lng,
                                        // // lng: this.state.markerPosition.lng,
                                        lat: this.state.mapcoordinates.lat,
                                        lng: this.state.mapcoordinates.lng,
                                    }}

                                    draggable={true}
                                    onDragend={this.onMarkerDragEnd}
                                    //  onClick={this.onMarkerClick}
                                    name={this.state.address}
                                />
                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}
                                    onClose={this.onClose}
                                    position={{
                                        lat:
                                            this.state.markerPosition.lat &&
                                            this.state.markerPosition.lat + 0.0018,
                                        lng:
                                            this.state.markerPosition.lng &&
                                            this.state.markerPosition.lng,
                                    }}
                                >
                                    <div>
                                        <h6>{this.state.selectedPlace.name}</h6>
                                    </div>

                                </InfoWindow>

                            </Map>

                        )}
                    <div style={{ marginTop: "20px", width: "100%", display: "flex" }}>
                        {/* <Button variant="outlined" fullWidth>Update Geo Fencing</Button> */}
                        <button
                            style={{
                                width: "300px",
                                height: "50px",
                                borderRadius: "5px",
                                backgroundColor: "#00416b",
                                color: "#ffffff",
                                position: "absolute", bottom: "20px",
                                marginLeft: "30%",
                                marginTop: "350px"
                            }} onClick={this.props.updateMarket?this.props.updateMarket:this.props.updateGeoFencing}>
                                {
                                    this.props.updateMarket?" Update Market ":"Add Market"
                                }
                               
                                </button>
                        <button
                            style={{
                                width: "100px",
                                height: "50px",
                                borderRadius: "5px",
                                backgroundColor: "#00416b",
                                color: "#ffffff",
                                position: "absolute", bottom: "20px",
                                marginLeft: "57%",
                                marginTop: "350px"
                            }} onClick={this.goPrev}>Back</button>

                    </div>

                </div>

            </div>
        )
    }
}



const mapStateToProps = (state) => {
    console.log('asdfghjkl', state);
    return {
        // skuData: state.sku.skuData,
        error: state.sku.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                // getSku: actions.getAllSku,
                // getLocations: actions.getAllMarketLocation,
                setLocationAddress: actions.setLocationAddress,
            },
            dispatch
        ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: 'AIzaSyASRO1ULLpXIdhh75V_ye6eju4xpo5JB_Y', // To be read from .env variable
})(MapContainer))
