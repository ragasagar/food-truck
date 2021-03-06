import React, { Component } from 'react';
import "./truck-map.style.scss"
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import truckImage from "../../img/food-truck.png";
import cartImage from "../../img/push-cart.png";

/**
 * Class Component which render the Map Component on the DOM. It takes value form the homepage component.
 * Some other states are declared for Marker Component manipulation.
 */
class TruckMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWindow: false,
            activeMarker: {},
            selectedPlace: {
                position: {
                    lat: props.location.lat,
                    lng: props.location.lng
                }
            }
        }
    }

    /**
     * Render the TruckMap component. It includes the Map component from the google-map-react component.
     */
    render() {
        return <div className="map-container">
            <Map
                google={this.props.google}
                zoom={16}
                initialCenter={{
                    lat: this.props.location.lat,
                    lng: this.props.location.lng
                }}>

                <Marker position={{ lat: this.props.location.lat, lng: this.props.location.lng }} />
                {
                    this.props.trucks.map(d => (
                        <Marker
                            position={{ lat: d.latitude, lng: d.longitude }}
                            key={d.objectid}
                            onClick={this.onMarkerClick}
                            icon={
                                d.facilitytype === 'Truck' ? new this.props.google.maps.MarkerImage(
                                    truckImage,
                                    null, /* size is determined at runtime */
                                    null, /* origin is 0,0 */
                                    null, /* anchor is bottom center of the scaled image */
                                    new window.google.maps.Size(25, 25)
                                ) :
                                    new this.props.google.maps.MarkerImage(
                                        cartImage,
                                        null, /* size is determined at runtime */
                                        null, /* origin is 0,0 */
                                        null, /* anchor is bottom center of the scaled image */
                                        new window.google.maps.Size(25, 25)
                                    )
                            }
                            {...d}
                        />
                    ))
                }
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showWindow}
                    onClose={this.onClose}>

                    <div className="message">
                        <h4>{this.state.selectedPlace ? this.state.selectedPlace.applicant : ""}</h4>
                        <h5 className="fooditems">{this.state.selectedPlace ? this.parseFoodItem(this.state.selectedPlace.fooditems) : ""}</h5>
                        <h6 className="location">{this.state.selectedPlace ? this.state.selectedPlace.locationdescription : ""}</h6>
                        <a href={`https://www.google.com/maps/dir/?api=1&origin=${this.props.location.lat},${this.props.location.lng}&destination=${this.state.selectedPlace.position.lat},${this.state.selectedPlace.position.lng}`}
                            target="_blank"
                            rel="noopener noreferrer">Get Direction</a>
                    </div>
                </InfoWindow>
            </Map>
        </div >
    }
    /**
     * Parses the foodItems to display in pipe Format.
     */
    parseFoodItem = (fooditems) => {
        return fooditems ? fooditems.split(":").join(" | ") : "";
    }
    /**
     * Set activesMarker to marker which triggered the event. It make InfoWindow render.
     */
    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showWindow: true
        });
    }
    /**
     * This closes the InfoWindow and change states.
     */
    onClose = props => {
        if (this.state.showWindow) {
            this.setState({
                showWindow: false,
                activeMarker: null
            });
        }
    };
}

/**
 * This component uses HOC(Higher Order Component) i.e. GoogleApiWrapper to use 'google' properties. 
 */
export default GoogleApiWrapper({
    apiKey: 'AIzaSyB7FLBGtiHmsV4pfleTY35haRoDEYcwlY4'
})(TruckMap);

