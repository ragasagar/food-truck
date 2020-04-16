import React, { Component } from 'react';
import "./homepage.style.scss";
import TruckMap from '../../component/map/truck-map.component.jsx';
import ApiCaller from '../../service/api-caller.service';
import { SearchBox } from '../../component/search-box/search-box.component';
import SelectBox from '../../component/select-box/select-box.component';
import { GoogleApiWrapper } from 'google-maps-react';
import Script from 'react-load-script';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trucks: [],
            currentLocation: {
                lat: 37.7749, lng: -122.4194
            },
            searchInput: "",
            selectValue: "",
            query: ""
        }
        this.apicaller = new ApiCaller();
        this.truckRef = React.createRef();
    }

    componentDidMount() {
        this.getLocation();
        this.apicaller.fetchTrucks().then(response => this.setState({
            trucks: response
        }));
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPositionState);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    setPositionState = (position) => {
        // this.setState({
        //   location: {
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude
        //   }
        // })
    }

    handleChange = (event) => {
        this.setState({
            searchInput: event.target.value
        })
    }

    onSelect = (event) => {
        this.setState({
            selectValue: event.target.value
        })
    }

    distance = (lat1, lon1, lat2, lon2) => {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    toRad = (Value) => {
        return Value * Math.PI / 180;
    }

    loadScript = () => {
        console.log(this.props.google);
        this.searchLocation = new this.props.google.maps.places.Autocomplete(document.getElementById('autocomplete'), { types: ['geocode'] });
        this.searchLocation.addListener('place_changed', this.handleSearch);
    }

    handleSearch = (event) => {
        const geolocation = this.searchLocation.getPlace();
        if (geolocation) {
            this.setState({
                currentLocation: {
                    lat: geolocation.geometry.location.lat(),
                    lng: geolocation.geometry.location.lng(),
                },
                query: geolocation.formatted_address
            })
        }
        else {
            this.setState({
                query: event.target.value
            })
        }
    }
    render() {
        const { trucks, currentLocation, searchInput, selectValue } = this.state
        const filteredTrucks = trucks
            .filter(truck => truck.fooditems && truck.fooditems.toLowerCase().includes(searchInput.toLowerCase()))
            .filter(truck => truck.facilitytype && truck.facilitytype.toLowerCase().includes(selectValue.toLowerCase()))
            .filter(truck => this.distance(currentLocation.lat, currentLocation.lng, truck.latitude, truck.longitude) <= 2);
        return <div className="homepage">
            <Script url="https://maps.googleapis.com/maps/api/js?libraries=places,geometry&key=AIzaSyB7FLBGtiHmsV4pfleTY35haRoDEYcwlY4"
                onLoad={this.loadScript} />
            <div className="search-food">
                <SearchBox
                    placeholder="Search Food Type"
                    handleChange={this.handleChange} />
                <SearchBox
                    id="autocomplete"
                    type="input"
                    placeholder="Seach City"
                    handleChange={this.handleSearch}
                    value={this.state.query}
                />
                <SelectBox onChange={this.onSelect} />
            </div>
            <TruckMap trucks={filteredTrucks} location={currentLocation} ref={this.truckRef} />

        </div >
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB7FLBGtiHmsV4pfleTY35haRoDEYcwlY4'
})(HomePage);