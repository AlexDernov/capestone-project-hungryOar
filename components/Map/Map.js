import styled from "styled-components";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import Filter from "../Filter";

export default function Map({ locationsInfo, data }) {
  const [menuTypes, setMenuTypes] = useState([
    { type: "Cafe", id: "Cafe", checked: false },
    { type: "Bar", id: "Bar", checked: false },
    { type: "Restaurant", id: "Restaurant", checked: false },
    { type: "Kuchen", id: "Kuchen", checked: false },
    { type: "Eis", id: "Eis", checked: false },
    { type: "Snacks", id: "Snacks", checked: false },
  ]);

  const [rental, setRental] = useState("egal");
  let [hidden, setHidden] = useState(true);

 function hiddenOn(){
  setHidden(true)
 }
 function handleOnClick() {
  setHidden(!hidden);
}

  const menuCheck = menuTypes
    .filter((menuType) => menuType.checked)
    .map((menuTypeChecked) => menuTypeChecked.type);

  const filterOfRental = data.filter((loc) =>
    rental === "ja"
      ? loc.verleihOpt === true
      : rental === "nein"
      ? loc.verleihOpt === false
      : true
  );
  const filterdData = filterOfRental.filter((location) =>
    menuCheck.every((menu) => location.art.includes(menu))
  );

  function handleFilter(id) {
    setMenuTypes(
      menuTypes.map((menuType) =>
        menuType.id === id ? { ...menuType, checked: !menuType.checked } : menuType
      )
    );
  }

  function onOptionChange(event) {
    setRental(event.target.value);
  }
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
  const locationOnIconFav = L.divIcon({
    html: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66675 24.9999C6.66675 24.9999 8.33341 23.3333 13.3334 23.3333C18.3334 23.3333 21.6667 26.6666 26.6667 26.6666C31.6667 26.6666 33.3334 24.9999 33.3334 24.9999V4.99992C33.3334 4.99992 31.6667 6.66659 26.6667 6.66659C21.6667 6.66659 18.3334 3.33325 13.3334 3.33325C8.33341 3.33325 6.66675 4.99992 6.66675 4.99992V24.9999Z" fill="url(#paint0_linear_115_22)" stroke="#3D874D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.66675 36.6667V25" stroke="#3D874D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
    <linearGradient id="paint0_linear_115_22" x1="9" y1="7.5" x2="33" y2="24.5" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FBC332"/>
    <stop offset="0.421574" stop-color="#FB326E"/>
    <stop offset="1" stop-color="#7821CF" stop-opacity="0.85"/>
    </linearGradient>
    </defs>
    </svg>`,
    className: "",
    iconSize: [25, 25],
    iconAnchor: [0, 25],
  });

  return (
    <>
      <Filter
        onOptionChange={onOptionChange}
        handleFilter={handleFilter}
        hidden={hidden}
        setHidden={setHidden}
        handleOnClick={handleOnClick}
        menuTypes={menuTypes}
        rental={rental}
        setRental={setRental}
      />
      <div id="map">
        <StyledMapContainer
        
          className={"map"}
          center={[53.577067, 10.007241]}
          zoom={12}
          scrollWheelZoom={true}
        >
          <TileLayer
          onClick={hiddenOn}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap
          </a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filterdData.map((location) => {
            const isLiked = locationsInfo.find(
              (locI) => locI.id === location._id
            )?.isLiked;
            return (
              <Marker
                key={location._id}
                position={location.coords}
                icon={!isLiked ? locationOnIcon : locationOnIconFav}
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
        </StyledMapContainer>
      </div>
    </>
  );
}

const StyledMapContainer = styled(MapContainer)`
  position: relativ;
  z-index: 1;
`;

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
