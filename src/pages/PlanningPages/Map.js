import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import "react-datepicker/dist/react-datepicker.css";
import { API_KEY } from "../../constants/key";

import {
  addPostItFromMark,
  deletePostItByMap,
} from "../../redux/reducers/postItsReducer";

import {
  setMapMarks,
  deleteMapMarkByLatLng,
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

export default function MapArea() {
  const defaultProps = {
    center: {
      lat: 25.025763,
      lng: 121.4824579,
    },
    zoom: 18,
  };

  const dispatch = useDispatch();
  // const spots = useSelector((store) => store.postIts.spots);
  // const columns = useSelector((store) => store.postIts.columns);
  // const postItColumn = columns.postIt.spotsIds;
  const markLocations = useSelector((store) => store.mapMarks.markLocations);
  // const isMarkDeleted = useSelector((store) => store.mapMarks.isMarkDeleted);

  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [mapsApi, setMapsApi] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(null);
  // const [currentLocation, setCurrentLocation] = useState(null);
  // const [currentPlaceId, setCurrentPlaceId] = useState(null);
  // const [isMarked, setIsMarked] = useState(false);
  // const [statePinMarkers, setStatePinMarkers] = useState([]);

  function handleApiLoaded(map, maps) {
    // use map and maps objects
    setMapInstance(map);
    setMapsApi(maps);
    setIsApiLoaded(true);
  }

  function handleSearchInputChange(e) {
    // setIsMarked(false);
    setSearchText(e.target.value);
  }

  const handleAutocomplete = useCallback(() => {
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
  }, [isApiLoaded, mapsApi, searchText]);

  useEffect(() => {
    handleAutocomplete();
  }, [searchText, handleAutocomplete]);

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
        // setCurrentLocation(results);
        // setCurrentPlaceId(placeId);
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

          // click 過要加到便利貼和換 pin
          handleMarkSearchPlaceClick(results, placeId);
        });
      }
    });
  }

  // pin 地點並新增到 post-it
  function handleMarkSearchPlaceClick(pinLocations, placeId) {
    if (
      markLocations.length > 0 &&
      markLocations.find((place) => place.placeId === placeId)
    ) {
      return;
      // return setIsMarked(true);
    }

    const lat = pinLocations.geometry.location.lat();
    const lng = pinLocations.geometry.location.lng();
    const { formatted_address: formattedAddress, name } = pinLocations;

    const mapMarksInfo = { name, formattedAddress, lat, lng, placeId };
    // 重設 markLocations
    dispatch(setMapMarks(mapMarksInfo));

    const { name: location, formatted_address: memo } = pinLocations;
    dispatch(addPostItFromMark({ location, memo, placeId }));
    setCurrentCenter(null);
    // setCurrentLocation(null);

    renderPinMarkers(mapMarksInfo);
  }

  // 要把 pin 的變成 marker
  let pinMarkers = [];
  function renderPinMarkers(mapMarksInfo) {
    const markIcon = {
      url: "http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png",
      scaledSize: new mapsApi.Size(40, 40), // scaled size
    };

    const { placeId, lat, lng } = mapMarksInfo;
    const pinMarker = new mapsApi.Marker({
      place: {
        placeId,
        location: { lat, lng },
      },
      map: mapInstance,
      icon: markIcon,
    });
    pinMarkers.push(pinMarker);

    pinMarkers.map((pinMarker) =>
      pinMarker.addListener("click", (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        // 不在畫面顯示
        pinMarker.setMap(null);
        pinMarkers = [];

        // 刪掉 pinMarker
        dispatch(deleteMapMarkByLatLng({ lat, lng }));
        // 刪 store markLocations 的東東
        const placeId = pinMarker.place.placeId;
        dispatch(deletePostItByMap(placeId));
        setCurrentCenter(null);
        // setCurrentLocation(null);
        // setIsMarked(false);
      })
    );
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
