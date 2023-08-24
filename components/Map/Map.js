import styled from "styled-components";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../../styles";
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";

/* const StyledMap = styled.div`
  margin-top: 15px;
  min-height: 100vh;
  background-image: url(/images/Map_Hamburg.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
`; */
/* const StyledMapDiv = styled.div`
  height: 380;
  weight: auto;
`; */

export default function Map({ data }) {
  /*   const basicIcon = L.icon({
    iconUrl: '../../public/marker.svg',
    iconSize: [40, 40],
  });
  const marker1 = L.marker([53.567067, 10.007241,], {icon: basicIcon}); */
  const locationOnIcon = L.divIcon({
    html:`<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66675 24.9999C6.66675 24.9999 8.33341 23.3333 13.3334 23.3333C18.3334 23.3333 21.6667 26.6666 26.6667 26.6666C31.6667 26.6666 33.3334 24.9999 33.3334 24.9999V4.99992C33.3334 4.99992 31.6667 6.66659 26.6667 6.66659C21.6667 6.66659 18.3334 3.33325 13.3334 3.33325C8.33341 3.33325 6.66675 4.99992 6.66675 4.99992V24.9999Z" fill="url(#paint0_linear_115_19)" stroke="#3D874D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.66675 36.6667V25" stroke="#3D874D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
    <linearGradient id="paint0_linear_115_19" x1="7" y1="4.5" x2="34.5" y2="28.5" gradientUnits="userSpaceOnUse">
    <stop offset="0.00286713" stop-color="#EAFB2C"/>
    <stop offset="0.49767" stop-color="#14C2F9"/>
    <stop offset="0.987264" stop-color="#02B109"/>
    </linearGradient>
    </defs>
    </svg>`,
    className: "",
    iconSize: [35, 35],
 /*    iconAnchor: [24, 48],
    popupAnchor: [0, -48], */
  });
  return (
    <>
      {/* <StyledMap /> */}
      <div id="map">
        <MapContainer
          className={"map"}
          center={[53.567067, 10.007241]}
          zoom={12}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap
          </a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[53.567067, 10.007241]} icon={locationOnIcon}>
            <Popup>Popup for any custom information.</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

{
  /*  {data.map((location) => {
          return (
            <Marker
              key={location._id}
              position={location.coords}
              icon={locationOnIcon}
            >
              <PopupContainer>
                <p>{location.name}</p>
              </PopupContainer>
            </Marker> */
}
