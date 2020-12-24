import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import "react-datepicker/dist/react-datepicker.css";
import { API_KEY } from "../../constants/key";

import {
  addPostItFromMark,
  deletePostIt,
} from "../../redux/reducers/postItsReducer";

import {
  setMapMarks,
  deleteMapMark,
} from "../../redux/reducers/mapMarkReducer";

const MapAreaWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const SearchBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  min-width: 240px;
`;

const SearchInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
`;

const SearchAutocompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SearchAutocomplete = styled.div`
  box-sizing: border-box;
  padding: 2px;
  background: white;
  border: 1px solid lightgray;
  border-top: none;
  font-size: 12px;
  color: gray;
  cursor: pointer;

  &:hover {
    background: wheat;
    color: black;
  }
`;

const SearchPlaceWrapper = styled.div``;

const SearchPlace = styled.div`
  width: 30px;
  height: 30px;
  background: red;
  opacity: 0.5;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.5, 1.5);
    background: pink;
    opacity: 1;
  }

  ${
    "" /* & + div {
    visibility: hidden;
  }

  &:hover + div {
    visibility: visible;
  } */
  }
`;

const LocationMark = styled.div`
  width: 20px;
  height: 20px;
  background: blue;
  transform: rotate(45deg);
  transition: all 0.5s ease;

  &:hover {
    transform: rotate(45deg) scale(1.5, 1.5);
    background: pink;
  }
`;

export default function MapArea() {
  const defaultProps = {
    center: {
      lat: 25.025763,
      lng: 121.4824579,
    },
    zoom: 18,
  };

  const dispatch = useDispatch();
  const spots = useSelector((store) => store.postIts.spots);
  const columns = useSelector((store) => store.postIts.columns);
  const postItColumn = columns.postIt.spotsIds;
  const markLocations = useSelector((store) => store.mapMarks.markLocations);

  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [mapsApi, setMapsApi] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  // const [markLocations, setMarkLocations] = useState([]);
  const [isMarked, setIsMarked] = useState(false);

  // TODO: 要把 tag 的變成 marker
  function renderMarkers() {
    const markIcon = {
      url: "http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png",
      scaledSize: new mapsApi.Size(40, 40), // scaled size
    };
    for (let i = 0; i < markLocations.length; i++) {
      const { lat, lng } = markLocations[i];
      const marker = new mapsApi.Marker({
        position: { lat, lng },
        map: mapInstance,
        icon: markIcon,
      });
    }
  }

  // useEffect(() => {
  //   if (mapInstance && mapsApi && markLocations.length > 0) {
  //     renderMarkers(mapInstance, mapsApi);
  //   }
  // }, [markLocations, mapInstance, mapsApi]);

  function handleApiLoaded(map, maps) {
    // use map and maps objects
    setMapInstance(map);
    setMapsApi(maps);
    setIsApiLoaded(true);
  }

  function handleSearchInputChange(e) {
    setIsMarked(false);
    setSearchText(e.target.value);
  }

  useEffect(() => {
    handleAutocomplete();
  }, [searchText]);

  function handleAutocomplete() {
    if (isApiLoaded && searchText.length > 0) {
      const autoCompleteService = new mapsApi.places.AutocompleteService();
      autoCompleteService.getPlacePredictions(
        { input: searchText },
        (results, status) => {
          if (status === mapsApi.places.PlacesServiceStatus.OK) {
            setAutocompleteResults(results);
          }
        }
      );
    } else {
      setAutocompleteResults(null);
    }
  }

  let markers = [];

  function handleAutocompleteClick(placeId) {
    const service = new mapsApi.places.PlacesService(mapInstance);
    const request = {
      placeId,
      fields: ["geometry", "name", "formatted_address"],
    };

    service.getDetails(request, (results, status) => {
      if (status === mapsApi.places.PlacesServiceStatus.OK) {
        setCurrentCenter({
          lat: results.geometry.location.lat(),
          lng: results.geometry.location.lng(),
        });
        setCurrentLocation(results);
        setCurrentPlaceId(placeId);
        setAutocompleteResults(null);
        setSearchText("");

        const contentString = results.name;
        const infowindow = new mapsApi.InfoWindow({
          content: contentString,
        });
        const marker = new mapsApi.Marker({
          position: {
            lat: results.geometry.location.lat(),
            lng: results.geometry.location.lng(),
          },
          map: mapInstance,
        });
        markers.push(marker);

        marker.addListener("mouseover", () => {
          infowindow.open(mapInstance, marker);
        });
        marker.addListener("mouseout", () => {
          infowindow.close(mapInstance, marker);
        });

        marker.addListener("click", () => {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];

          // TODO: click 過要加到便利貼和換 pin
          handleMarkSearchPlaceClick(results);
        });
      }
    });
  }

  // pin 地點並新增到 post-it
  function handleMarkSearchPlaceClick(pinLocations) {
    if (
      markLocations.length > 0 &&
      markLocations.find((place) => place.placeId === currentPlaceId)
    ) {
      return setIsMarked(true);
    }

    const lat = pinLocations.geometry.location.lat();
    const lng = pinLocations.geometry.location.lng();
    const { formatted_address: formattedAddress, name } = pinLocations;

    const mapMarksInfo = { name, formattedAddress, lat, lng, currentPlaceId };
    dispatch(setMapMarks(mapMarksInfo));

    const { name: location, formatted_address: memo } = pinLocations;
    dispatch(addPostItFromMark({ location, memo, currentPlaceId }));
    setCurrentCenter(null);
    setCurrentLocation(null);
  }

  function handleCancelMarkClick(placeId) {
    dispatch(deleteMapMark(placeId));
    // 刪便利貼
    const id = Object.keys(spots).find((key) => spots[key].placeId === placeId);
    const index = postItColumn.indexOf(id);
    dispatch(deletePostIt({ index, id }));
    setCurrentCenter(null);
    setCurrentLocation(null);
    setIsMarked(false);
  }

  return (
    <MapAreaWrapper>
      <SearchBoxWrapper>
        <SearchInput
          onChange={(e) => handleSearchInputChange(e)}
          value={searchText}
          placeholder="search..."
        />
        <SearchAutocompleteWrapper>
          {autocompleteResults &&
            autocompleteResults.map((result) => (
              <SearchAutocomplete
                key={result["place_id"]}
                onClick={() => handleAutocompleteClick(result["place_id"])}
              >
                {result.description}
              </SearchAutocomplete>
            ))}
        </SearchAutocompleteWrapper>
      </SearchBoxWrapper>
      <MapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY, libraries: ["places"] }}
          center={currentCenter}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <SearchPlaceWrapper>
            {/* {currentCenter ? (
              <SearchPlace
                lat={currentCenter.lat}
                lng={currentCenter.lng}
                onClick={handleMarkSearchPlaceClick}
              />
            ) : null} */}

            {/* {markLocations &&
              markLocations.map((place) => (
                <LocationMark
                  key={place.placeId}
                  lat={place.lat}
                  lng={place.lng}
                  onClick={() => handleCancelMarkClick(place.placeId)}
                />
              ))} */}
          </SearchPlaceWrapper>
        </GoogleMapReact>
      </MapWrapper>
    </MapAreaWrapper>
  );
}
