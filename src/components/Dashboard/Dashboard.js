import React, { Component, useState } from 'react'
import Navbar from "../shared/Navbar"
import './Dashboard.css'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import pic from "../../assets/monk.png"

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
const libraries = ["places"]

export default function Dashboard() {

  const [markers, setMarkers] = useState([]);
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [selected, setSelected] = useState(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDBt96ZqDG3Xx1f7g7Hkb6UU7I7rA7bOL4",
    libraries: libraries
  })
  if (loadError) return "Error loading maps"
  if (!isLoaded) return "LOADING"

  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = pos.coords;
      setLat(coords.latitude)
      setLng(coords.longitude)
    });
  }

  return (
    <div>
      <Navbar name="TLLMKT" />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
      >
        {locations.map((marker) => (
          <Marker
            key={marker.lat}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker)
              setModal(!modal)
            }}
          />
        ))}

        <Marker
          position={lat && lng ? { lat: lat, lng: lng } : null}
          icon={{
            url: pic,
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          title="My Location"
        />
      </GoogleMap>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          {selected ? selected.lat : null}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div >
  )
}

