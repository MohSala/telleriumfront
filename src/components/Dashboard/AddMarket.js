import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import loader from "../../assets/loader.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import { createAccount } from "../../actions/auth";
import Navbar from "../shared/Navbar"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api"

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


toast.configure()
// notify = (text) => toast.success(text)



function AddMarket() {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDBt96ZqDG3Xx1f7g7Hkb6UU7I7rA7bOL4",
    libraries: ["places"]
  })
  if (loadError) return "Error loading maps"
  if (!isLoaded) return "LOADING"

  return (

    <div>
      <Navbar name="TLLMKT" />
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div>
          <h1 style={{ fontFamily: 'Montserrat', marginTop: "60px" }}>Add A Market</h1>
          <div className="form-group col-sm-12" style={{ marginTop: "30px" }}>
            <label style={{ float: "left" }}>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={text => this.change("text", text)}
              style={{ fontFamily: 'Montserrat' }} />
          </div>

          <div className="form-group col-sm-12" style={{ marginTop: "30px" }}>
            <label style={{ float: "left" }}>Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
            />
          </div>

          <div className="form-group col-sm-12">
            <label style={{ float: "left" }}>Category</label>
            <select className="custom-select">
              <option defaultValue="Food">Food</option>
              <option value="2">Electronics</option>
              <option value="3">Sports</option>
            </select>
          </div>

          <Search />


          <div className="form-group col-md-12" style={{ justifyContent: "center" }}>
            <button
              type="button"
              className="btn btn-primary"
              // disabled={!this.state.email || !this.state.password}
              style={{ fontSize: "15px" }}>
              SUBMIT
            </button>
          </div>

        </div>
      </div>

    </div>

  )
}

function Search() {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 6.5244,
        lng: () => 3.3792
      },
      radius: 200 * 1000,
    }
  })

  return (
    <div className="form-group col-sm-12">
      <Combobox onSelect={(address) => console.log(address)}>
        <ComboboxInput value={value} onChange={(e) => {
          setValue(e.target.value)
        }}
          // disabled={!ready}
          placeholder="Enter an Address"
        />
        <ComboboxPopover>
          {status === "OK" && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
        </ComboboxPopover>
      </Combobox>
    </div>

  )
}

const mapDispatchToProps = dispatch => ({
  createAccount: data => dispatch(createAccount(data))
});

const mapStateToProps = state => ({
  loading: state.auth.loading,
  created: state.auth.created,
  errorMsg: state.auth.errorMsg
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMarket));
