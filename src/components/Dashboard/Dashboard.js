import React, { Component, useState } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import Navbar from "../shared/Navbar"
import loader from "../../assets/loader.svg";
import './Dashboard.css'
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import pic from "../../assets/starICon.png"
import { connect } from "react-redux";
import { getMarket, getMarkets } from "../../actions/dashboard";

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}

const center = {
  lat: 6.5244,
  lng: 3.3792
}

export class Dashboard extends Component {
  state = {
    lat: 0,
    lng: 0,
    selected: "",
    modal: false,
    markets: [],
    searchedMarkets: [],
    search: "",
    searchModal: false,
    showReturnModal: false,
    error: false,
    errorMsg: ""
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
    else {
      this.setState({
        error: true,
        errorMsg: "No markets"
      })
    }
  }

  setModal = () => {
    return this.setState({
      modal: !this.state.modal
    })
  }

  handleChange = (name, e) => {
    this.setState({
      [name]: e.target.value,
      error: false,
      empty: false
    });
  };

  handleSearch = async () => {
    this.searchToggle();
    const { search } = this.state
    await this.props.getMarkets(search);
    if (this.props.retrieved) {
      console.log("res ", this.props.results);
      this.setState({
        searchedMarkets: this.props.results
      })
    }
    this.setState({
      showReturnModal: true
    })
  }

  setSelected = (marker) => {
    return this.setState({
      selected: marker
    })
  }

  toggle = (modal) => this.setModal(!modal);
  searchToggle = () => this.setState({
    searchModal: !this.state.searchModal
  });

  render() {
    const {
      lat,
      lng,
      selected,
      modal,
      searchModal,
      showReturnModal,
      markets,
      error,
      errorMsg,
      searchedMarkets } = this.state;
    const options = {
      disableDefaultUI: true
    }
    return (
      <div>
        <Navbar name="TLLMKT" />
        {error &&
          <div className="alert alert-dismissible alert-danger">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <strong>{errorMsg}</strong>
          </div>
        }
        <LoadScript googleMapsApiKey="AIzaSyDBt96ZqDG3Xx1f7g7Hkb6UU7I7rA7bOL4">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11}
            center={center}
            options={options}

          >
            {/* search input */}
            <div className="form-group col-sm-6" style={{ marginTop: "10px", justifyContent: "center", alignItems: "center" }}>
              <input
                type="text"
                autoComplete="off"
                placeholder="I am looking for..."
                className="form-control" name="email"
                onChange={text => this.handleChange("search", text)}
                style={{ fontFamily: 'Montserrat', border: "2px solid black" }} />
              <button
                type="button"
                onClick={this.handleSearch}
                disabled={!this.state.search}
                className="btn btn-primary">

                {!this.props.loading ?
                  <div>SEARCH<span role="img" aria-label="rocket">🔎</span> </div> : <img alt='loading'
                    src={loader} style={{ width: '23px' }} />}
              </button>
            </div>
            {/* search input */}
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
              }}
              title="My Location"
            />
          </GoogleMap>
        </LoadScript>

        {/* CLICK VIEW MARKET MODAL */}
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
        {/* CLICK VIEW MARKET MODAL */}

        {/* SEARCH RESULTS MODAL */}
        {
          showReturnModal &&
          <Modal isOpen={searchModal} toggle={this.searchToggle}>
            <ModalHeader toggle={this.searchToggle}>Searched Markets</ModalHeader>
            <ModalBody >
              {
                searchedMarkets.length > 0 ?
                  searchedMarkets.map(mkt => (
                    <div key={mkt.id}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column"
                      }}>
                      <div style={{ alignItems: "center", display: "flex", flexDirection: "row" }}>
                        <div>
                          <img src={mkt.images ? mkt.images[0] : ""} alt="image" style={{ width: 100, height: 100, marginRight: 20 }} />
                        </div>
                        <div>
                          <h5>Name: </h5><h6>{mkt.name}</h6>
                          <p>{mkt.description}</p>
                        </div>
                      </div>
                    </div>

                  ))
                  : "NO MARKET DATA FOUND"
              }
            </ModalBody>
          </Modal>
        }
        {/* SEARCH RESULTS MODAL */}
      </div >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getMarket: data => dispatch(getMarket(data)),
  getMarkets: data => dispatch(getMarkets(data))
});

const mapStateToProps = state => ({
  loading: state.dash.loading,
  fetched: state.dash.fetched,
  retrieved: state.dash.retrieved,
  results: state.dash.results,
  errorMsg: state.dash.errorMsg,
  markets: state.dash.markets,
  data: state.dash.data

});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard));
