import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import "react-datepicker/dist/react-datepicker.css";
import { API_KEY } from "../../constants/key";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  addPostItFromMark,
  deletePostItByMap,
} from "../../redux/reducers/postItsReducer";

import { setRoute } from "../../redux/reducers/schedulesReducer";

import {
  setMapMarks,
  deleteMapMarkByLatLng,
  setOrigin,
  setOriginId,
  setDestination,
  setDirectionSteps,
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
  ${"" /* width: 100%; */}
  min-width: 240px;
`;

const SearchAutocompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${"" /* width: 100%; */}
  width: 240px;
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

const DirectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0px;
  z-index: 2;
  padding: 20px;
  max-width: 240px;
  max-height: 100vh;
  border-radius: 10px;
  background: none;
  font-size: 10px;

  ${(props) =>
    props.$isMapDragged &&
    `
    opacity: .1;
  `}
`;

const DirectionCloseButton = styled.div`
  display: block;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: ${(props) => props.theme.fontSizes.small};
  cursor: pointer;
`;

const DirectionsForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
`;

const DirectionResult = styled.div`
  margin-top: 10px;
  padding: 20px;
  border: 1px solid black;
  overflow: auto;
  border-radius: 5px;
  background: white;
`;

const DirectionsBox = styled.div`
  font-size: 14px;

  & input,
  & select {
    margin-bottom: 5px;
    width: 100%;
    height: 24px;
    font-size: 14px;
  }
`;

const DirectionsButton = styled.button`
  margin-top: 5px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background: black;
  color: white;
  outline: none;
  cursor: pointer;
`;

const DirectionResultButton = styled.button`
  margin-top: 5px;
  padding: 2px;
  border: 1px solid black;
  background: white;
  outline: none;
  cursor: pointer;

  &:disabled {
    display: none;
  }
`;

const MarkAlert = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 1;
  border: 1px solid ${(props) => props.theme.primaryColors.primaryDark};
  border-radius: 5px;
  background: ${(props) => props.theme.basicColors.white};
  box-shadow: 1px 1px 3px gray;
  text-align: center;

  & button {
    margin-top: 5px;
    padding: 5px;
    width: 100%;
    outline: none;
    border: 1px solid ${(props) => props.theme.primaryColors.primaryDark};
    border-radius: 5px;
    background: ${(props) => props.theme.primaryColors.primaryLighter};
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
  const markLocations = useSelector((store) => store.mapMarks.markLocations);

  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [mapsApi, setMapsApi] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(null);
  // TODO: isMarked
  const [isMarked, setIsMarked] = useState(false);

  const [isMapDragged, setIsMapDragged] = useState(false);
  const [currentDirectionsDisplay, setCurrentDirectionsDisplay] = useState();

  if (mapsApi) {
    mapsApi.event.addListener(mapInstance, "dragstart", function () {
      setIsMapDragged(true);
    });
    mapsApi.event.addListener(mapInstance, "dragend", function () {
      setIsMapDragged(false);
    });
  }

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
      return setIsMarked(true);
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
        setIsMarked(false);
      })
    );
  }

  // TODO:
  const origin = useSelector((store) => store.mapMarks.origin);
  const originId = useSelector((store) => store.mapMarks.originId);
  const destination = useSelector((store) => store.mapMarks.destination);
  const [travelMode, setTravelMode] = useState("");

  const currentDate = useSelector((store) => store.schedules.currentDate);
  const [start, setStart] = useState("");
  const directionSteps = useSelector((store) => store.mapMarks.directionSteps);
  const [isRouteInfoShow, setIsRouteInfoShow] = useState(false);

  useEffect(() => {
    setStart(currentDate);
  }, [currentDate]);

  // TODO:
  function handleDirectionSubmit(e) {
    e.preventDefault();

    if (currentDirectionsDisplay) {
      currentDirectionsDisplay.setMap(null);
    }
    const directionsService = new mapsApi.DirectionsService();
    const directionsDisplay = new mapsApi.DirectionsRenderer();
    setCurrentDirectionsDisplay(directionsDisplay);

    directionsDisplay.setMap(mapInstance);
    // 讓重複按的時候不會重複一直貼
    document.getElementById("directionsPanel").innerText = "";
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));

    let request = {
      origin,
      destination,
      travelMode: mapsApi.TravelMode[travelMode],
      drivingOptions: {
        departureTime: new Date(start),
      },
      transitOptions: {
        departureTime: new Date(start),
      },
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        setIsRouteInfoShow(true);
        directionsDisplay.setDirections(result);
        const { duration, steps } = result.routes[0].legs[0];
        dispatch(setDirectionSteps({ duration, steps, travelMode }));
      } else {
        // TODO: 待改
        window.alert("Directions request failed due to " + status);
      }
    });
  }

  function handleResultButtonClick() {
    dispatch(setRoute({ originId, directionSteps }));
    dispatch(setOrigin(""));
    dispatch(setDestination(""));
    currentDirectionsDisplay.setMap(null);
    setIsRouteInfoShow(false);
  }

  function handleCloseDirectionForm() {
    setIsRouteInfoShow(false);
    dispatch(setOrigin(""));
    dispatch(setDestination(""));
    dispatch(setOriginId(null));
    currentDirectionsDisplay.setMap(null);
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

      {(originId || destination) && (
        <DirectionsWrapper $isMapDragged={isMapDragged}>
          <DirectionsForm onSubmit={(e) => handleDirectionSubmit(e)}>
            <DirectionCloseButton onClick={handleCloseDirectionForm}>
              ✖
            </DirectionCloseButton>
            <DirectionsBox>
              起始：
              <input value={origin} placeholder="origin" disabled />
            </DirectionsBox>
            <DirectionsBox>
              結束：
              <input value={destination} placeholder="destination" disabled />
            </DirectionsBox>
            <DirectionsBox>
              <select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
              >
                <option value="" disabled>
                  --請選擇交通方式--
                </option>
                <option value="DRIVING">開車</option>
                <option value="BICYCLING">腳踏車</option>
                <option value="TRANSIT">大眾交通工具</option>
                <option value="WALKING">走路</option>
              </select>
            </DirectionsBox>
            <DirectionsBox>
              <DatePicker
                selected={start}
                onChange={(date) => {
                  setStart(date.getTime());
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </DirectionsBox>
            <DirectionsButton
              disabled={
                !(
                  Boolean(origin) &&
                  Boolean(destination) &&
                  Boolean(travelMode)
                )
              }
            >
              計算
            </DirectionsButton>
          </DirectionsForm>
          <DirectionResult id="directionsPanel" />
          <DirectionResultButton
            disabled={!isRouteInfoShow}
            onClick={handleResultButtonClick}
          >
            確定
          </DirectionResultButton>
        </DirectionsWrapper>
      )}

      {isMarked && (
        <MarkAlert>
          <div>已經釘選過了！</div>
          <button onClick={() => setIsMarked(false)}>確定</button>
        </MarkAlert>
      )}

      <MapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY, libraries: ["places"] }}
          center={currentCenter}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        ></GoogleMapReact>
      </MapWrapper>
    </MapAreaWrapper>
  );
}
