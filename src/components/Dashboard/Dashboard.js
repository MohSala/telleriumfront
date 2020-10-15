import React, { Component, useState } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import Navbar from "../shared/Navbar"
import './Dashboard.css'
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import pic from "../../assets/starICon.png"
import { connect } from "react-redux";
import { getMarket } from "../../actions/dashboard";
import { Document, Page } from 'react-pdf';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}

const center = {
  lat: 6.5244,
  lng: 3.3792
}

const locations = [
  {
    lat: 6.5244,
    lng: 3.3792
  },
  {
    lat: 6.4660,
    lng: 3.5446
  }, {
    lat: 6.4281,
    lng: 3.4219
  },
  {
    lat: 6.5355,
    lng: 3.3087
  },
]

export class Dashboard extends Component {
  state = {
    lat: 0,
    lng: 0,
    selected: "",
    modal: false,
    markets: []
  }

  componentDidMount = async () => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        this.setState({
          lat: coords.latitude,
          lng: coords.longitude
        })
      });
    }

    await this.props.getMarket();
    if (this.props.fetched) {
      this.setState({
        markets: this.props.markets
      })
    }
  }

  setModal = () => {
    return this.setState({
      modal: !this.state.modal
    })
  }

  setSelected = (marker) => {
    return this.setState({
      selected: marker
    })
  }

  toggle = (modal) => this.setModal(!modal);

  render() {
    const { lat, lng, selected, modal, markets } = this.state;
    return (
      <div>
        <Navbar name="TLLMKT" />
        <LoadScript googleMapsApiKey="AIzaSyDBt96ZqDG3Xx1f7g7Hkb6UU7I7rA7bOL4">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11}
            center={center}

          >
            {markets.map((marker) => (
              <Marker
                key={marker._id}
                position={{ lat: marker.address.coordinates[1], lng: marker.address.coordinates[0] }}
                onClick={() => {
                  this.setSelected(marker)
                  this.setModal()
                }}
              />
            ))}

            <Marker
              position={lat && lng ? { lat: lat, lng: lng } : null}
              icon={{
                url: pic,
                //  scaledSize: new window.google.maps.Size(90, 42)
              }}
              title="My Location"
            />
          </GoogleMap>
        </LoadScript>

        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Markets</ModalHeader>
          <ModalBody >

            {selected &&
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                <div style={{ justifyContent: "center" }}>
                  <h3>Name</h3>
                  <h4>{selected.name}</h4>
                  <h3>Address</h3>
                  <h4>{selected.address.address}</h4>
                  <h3>Category</h3>
                  <h4>{selected.category}</h4>
                </div>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  {selected.images.map(img => (

                    <img key={img} src={img} alt="images" style={{ width: 150, height: 100 }} />

                  ))}
                </div>
              </div>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getMarket: data => dispatch(getMarket(data))
});

const mapStateToProps = state => ({
  loading: state.dash.loading,
  fetched: state.dash.fetched,
  errorMsg: state.dash.errorMsg,
  markets: state.dash.markets,
  data: state.dash.data

});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard));
