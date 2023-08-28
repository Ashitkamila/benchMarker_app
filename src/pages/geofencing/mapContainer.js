import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import axios from "axios";
import Geocode from "react-geocode";
import { margin, padding } from '@mui/system';
import { get } from 'lodash';

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
    super(props)
    this.state = {
      // for google map places autocomplete
      address: '',
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
      showingInfoWindow: false,  // Hides or shows the InfoWindow

      lat: "12.958184",
      lang: "77.64214659999999",
      mapcoordinates: {
        lat: null,
        lng: null,

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


    }, console.log('updated name', updatedaddress))
    this.props.updateLatLong([lat, lng]);





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
          }, console.log('updated name', this.state.updatedAddress));


          console.log('ssss', updatedaddress);


        })




        .catch(err => console.error(err));

    }


    initProducts();







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
    this.setState({ address })

  }

  onLatChange = (event) => {
    const fieldValue = event.target.value

  }
  onLngChange = (event) => {
    const fieldValue = event.target.value

  }



  handleSelect = (address) => {
    this.setState({ address })


    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng, address) => {

        // update center state
        this.setState({
          mapcoordinates: latLng,
          markerPosition: latLng,


        })
        this.props.updateLatLong([latLng.lat, latLng.lng])

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
      }, console.log('aaaaaaa', this.state.address))


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
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className='col-12'>
              <div className='mb-1'>Enter Address</div>

              <input
                className='w-100 p-2'
                style={{ width: "100%", borderRadius: "3px", padding: "10px" }}

                {...getInputProps({
                  placeholder: 'Search Nearest Location ...',
                  className: 'location-search-input',
                })}
              />
              <div classname="mt-4" >
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

        <div id="googleMaps" style={{ height: "350px", overflow: "auto", position: "relative" }}  >
          {
            this.state.mapcoordinates.lat &&
            this.state.mapcoordinates.lng &&
            (
              <Map style={{ width: '100%', height: "300px", position: "fixed" }}

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
          <div>

            <button
              style={{
                width: "400px",
                height: "50px",
                borderRadius: "5px",
                backgroundColor: "#00416b",
                color: "#ffffff",
                position: "absolute", bottom: "20px",
                marginLeft: "30%",
                marginTop: "300px"
              }} onClick={this.props.updateGeoFencing}>Update Geo Fencing</button>
          </div>

        </div>

      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyASRO1ULLpXIdhh75V_ye6eju4xpo5JB_Y', // To be read from .env variable
})(MapContainer)
