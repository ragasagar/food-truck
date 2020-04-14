import React, { Component } from 'react';
import "./truck-map.style.scss"
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';

class TruckMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trucks: props.trucks,
            location: props.location,
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
    render() {
        return <div className="map-container">
            <Map
                google={this.props.google}
                zoom={18}
                initialCenter={{
                    lat: this.state.location.lat,
                    lng: this.state.location.lng
                }}>

                <Marker position={{ lat: this.state.location.lat, lng: this.state.location.lng }} />
                {
                    this.state.trucks.map(d => (
                        <Marker
                            position={{ lat: d.latitude, lng: d.longitude }}
                            name={d.applicant}
                            key={d.objectid}
                            onClick={this.onMarkerClick}
                        />
                    ))
                }
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showWindow}
                    onClose={this.onClose}>

                    <div className="message">
                        <h4>{this.state.selectedPlace ? this.state.selectedPlace.name : ""}</h4>
                        <a href={`https://www.google.com/maps/dir/?api=1&origin=${this.state.location.lat},${this.state.location.lng}&destination=${this.state.selectedPlace.position.lat},${this.state.selectedPlace.position.lng}`}>Get Direction</a>
                    </div>
                </InfoWindow>
            </Map>
        </div >
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showWindow: true
        });
    }

    onClose = props => {
        if (this.state.showWindow) {
            this.setState({
                showWindow: false,
                activeMarker: null
            });
        }
    };
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyB7FLBGtiHmsV4pfleTY35haRoDEYcwlY4'
})(TruckMap);

