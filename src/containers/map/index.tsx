import React, { useEffect, useRef } from "react";
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import Leaflet, { LeafletMouseEvent } from "leaflet";
import { addBoardElement } from "../../apis/mapDataApi";
import Sidebar from "react-sidebar";
import SidebarContent from "./SidebarContent";
import PageWrapper from "../../components/wrappers/PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../state/reducers";
import { setSelectedCircleId, updateDataById } from "../../state/actions";
import * as actions from "../../state/actions";
import { AddElementResponse, CellData } from "../../globalTypes";
import MapElement from "./MapElement";
import Header from "../../components/others/Header";

const MapPage: React.FC = () => {
  const featureGroup = useRef<FeatureGroup<
    {
      children: JSX.Element;
      ref: unknown;
    },
    L.FeatureGroup<unknown>
  > | null>(null);

  const dispatch = useDispatch();
  const mapElements = useSelector((state: AppState) => state.apiData.data);
  const sidebarVisibility = useSelector(
    (state: AppState) => state.appData.isSidebarVisible
  );
  const selectedCircleId = useSelector(
    (state: AppState) => state.appData.selectedCircleId
  );
  useEffect(() => {
    dispatch(actions.fetchMapElements());
  }, []);

  const handleElementCreation = (event: LeafletMouseEvent) => {
    const elementData: CellData = {
      x: event.layer._latlng.lat,
      y: event.layer._latlng.lng,
      data: {
        name: "user123",
        color: "#000000",
        data: {
          radius: event.layer._mRadius,
          info: "",
        },
      },
    };
    featureGroup?.current?.leafletElement.removeLayer(event.layer);
    dispatch(actions.addCircle(elementData));
  };
  const corner1 = Leaflet.latLng(-180, -90);
  const corner2 = Leaflet.latLng(180, 90);
  const bounds = Leaflet.latLngBounds(corner1, corner2);

  return (
    <>
      <Header />
      <PageWrapper>
        <Sidebar
          docked={sidebarVisibility}
          sidebar={<SidebarContent />}
          styles={{
            sidebar: { backgroundColor: "#f5f6f6", width: "240px" },
          }}
        >
          <Map
            worldCopyfJump={true}
            center={[54.68715, 25.279652]}
            zoom={13}
            minZoom={3}
            maxBoundsViscosity={1.0}
            maxBounds={bounds}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
            />
            <FeatureGroup ref={featureGroup}>
              <EditControl
                position="topleft"
                onCreated={handleElementCreation}
                draw={{
                  polygon: false,
                  polyline: false,
                  rectangle: false,
                  marker: false,
                  circlemarker: false,
                  circle: {
                    shapeOptions: { color: "#FCA311", weight: "2" },
                    showLength: false,
                    metric: false,
                    clickable: true,
                    showRadius: false,
                  },
                }}
                edit={{ edit: false, remove: false }}
              />
            </FeatureGroup>
            {mapElements.map((element) => {
              const id = element._id + "" + element.x + element.y;
              const isSelected = element._id === selectedCircleId;
              return (
                <MapElement
                  key={id}
                  element={element}
                  isSelected={isSelected}
                ></MapElement>
              );
            })}
          </Map>
        </Sidebar>
      </PageWrapper>
    </>
  );
};

export default MapPage;
