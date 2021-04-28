import React, { useEffect, useRef } from "react";
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { LeafletMouseEvent } from "leaflet";
import Sidebar from "react-sidebar";
import SidebarContent from "./SidebarContent";
import PageWrapper from "../../components/wrappers/PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../state/reducers";
import { actions } from "../../state/actions";
import { CellData } from "../../types";
import MapElement from "./MapElement";
import Header from "./Header";
import CategoriesModal from "./CategoriesModal";
import { auth } from "../../config/firebaseConfig";
import HowToModal from "./HowToModal";
import { defaultCircleColor } from "../../constants/other";

import styled from "styled-components";
import Message from "../../components/messages/NotificationMessage";

const MapPage: React.FC = () => {
  const featureGroup = useRef<FeatureGroup<
    {
      children: JSX.Element;
      ref: unknown;
    },
    L.FeatureGroup<unknown>
  > | null>(null);

  const dispatch = useDispatch();
  const mapElements = useSelector(
    (state: AppState) => state.circlesData.circles
  );
  const sidebarVisibility = useSelector(
    (state: AppState) => state.appData.isSidebarVisible
  );
  const selectedCircleId = useSelector(
    (state: AppState) => state.circlesData.selectedCircleId
  );
  const categories = useSelector(
    (state: AppState) => state.categoriesData.categories
  );
  useEffect(() => {
    dispatch(actions.circles.fetchCirclesAndCategoriesRequest());
  }, []);

  const handleElementCreation = (event: LeafletMouseEvent) => {
    featureGroup?.current?.leafletElement.removeLayer(event.layer);
    if (
      -180 <= event.layer._latlng.lng &&
      event.layer._latlng.lng <= 180 &&
      -90 <= event.layer._latlng.lat &&
      event.layer._latlng.lat <= 90
    ) {
      const elementData: CellData = {
        x: event.layer._latlng.lat,
        y: event.layer._latlng.lng,
        userId: auth.currentUser?.uid,
        data: {
          name: "user123",
          color: "#000000",
          data: {
            radius: event.layer._mRadius,
          },
        },
      };

      dispatch(actions.circles.addCircle(elementData));
    }
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <Message />
        <CategoriesModal />
        {!localStorage.getItem("howToModal") && <HowToModal />}
        <Sidebar
          docked={sidebarVisibility}
          sidebar={
            selectedCircleId ? (
              <SidebarContent selectedCircleId={selectedCircleId} />
            ) : (
              ""
            )
          }
          styles={{
            sidebar: { backgroundColor: "#f5f6f6", width: "240px" },
          }}
        >
          <Map center={[50, 50]} zoom={4} minZoom={1}>
            <TileLayer
              noWrap={true}
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
                    shapeOptions: { color: defaultCircleColor, weight: "2" },
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
              const category = categories.find(
                (category) => category.id === element.data.data.category
              );
              return (
                <MapElement
                  key={id}
                  element={element}
                  isSelected={isSelected}
                  color={category?.color}
                />
              );
            })}
          </Map>
        </Sidebar>
      </PageWrapper>
    </>
  );
};

export default MapPage;
