import styled from "styled-components";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useSWR from "swr";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

const NavLink = styled(Link)`
  text-decoration: none;
  &: hover {
    font-size: 1.2em;
  }
`;
const PopHead = styled.p`
  padding: 0;
  margin: 0;
  font-size: 0.875em;
  text-align: center;
`;

const PopLink = styled.p`
  color: purple;
  padding: 0;
  margin: 0;
  letter-spacing: 1.5px;
  font-size: 0.775em;
  text-align: center;
`;

export default function Map() {
  const { data, isLoading, error } = useSWR("/api/locations");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) return <div>failed to load</div>;
  if (!data) {
    return <h1>Data cannot be loaded.</h1>;
  }
  console.log("Data", data);
  const locationOnIcon = L.divIcon({
    html: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    iconSize: [25, 25],
    iconAnchor: [0, 25],
  });
  return (
    <>
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
          {data.map((location) => {
            console.log("Coords", location.coords);
            return (
              <Marker
                key={location._id}
                position={location.coords}
                icon={locationOnIcon}
              >
                <NavLink href={`/locations/${location._id}`}>
                  {" "}
                  <Popup>
                    <PopHead>
                      <strong>{location.name}</strong>
                    </PopHead>
                    <PopLink>Click für mehr Infos</PopLink>
                  </Popup>
                </NavLink>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}
